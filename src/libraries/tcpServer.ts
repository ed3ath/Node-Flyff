import "reflect-metadata";
import { createServer, Server, Socket } from "net";
import * as fs from "fs-extra";
import * as path from "path";
import { cwd } from "process";

import { FlyffPacket } from "./flyffPacket";
import { HandlerConstructor } from "./packetHandler";
import { PacketType, ToStringHex } from "../common/packetType";
import { Logger } from "../helpers/logger";
import { ConfigLoader } from "./config";
import { ServerTypes } from "../common/serverTypes";
import { Database } from "../database/database";

// Interface for server configuration
export interface IServerConfig {
  host: string;
  port: number;
  buildVersion?: string;
  accountVerification?: boolean;
  passwordEncryptionKey?: string;
  maxConnection: number;
  clientBufferSize: number;
}

// Main TCP Server class
export class TcpServer {
  private logger: Logger
  private serverType: ServerTypes
  private options: IServerConfig;
  private server!: Server;
  private connections: Map<number, IUserConnection> = new Map();
  private handlers: Map<PacketType, HandlerConstructor> = new Map();
  private configLoader: ConfigLoader;
  basePath: string;
  database: Map<string, Database> = new Map();

  // Constructor to initialize TcpServer instance
  constructor(basePath: string, serverType: ServerTypes) {
    this.logger = new Logger(serverType);
    this.basePath = basePath ?? cwd(); // Set base path to current working directory if not provided
    this.serverType = serverType
  }

  // Method to start the server
  start() {
    this.loadConfig()
      .then(() => {
        this.loadHandlers()
          .then( async () => {
            // Initialize database connection
            const dbConfigs = this.configLoader.getValue("database");
            dbConfigs.forEach((dbConfig: any) => {
              this.database.set(
                dbConfig.name,
                new Database(
                  dbConfig.name,
                  {
                    type: dbConfig.provider,
                    database: dbConfig["connection-string"],
                  },
                  this.basePath
                )
              );
            });
            for(const database of this.database.values()) {
              await database.start().catch(this.onError.bind(this));
            }
            this.server = createServer(this.onConnection.bind(this));
            this.server.listen(
              this.options.port,
              this.options.host,
              this.onServerStart.bind(this)
            );
          })
          .catch(this.onError.bind(this));
      })
      .catch(this.onError.bind(this));
  }

  // Method to load server configuration
  protected async loadConfig() {
    this.configLoader = new ConfigLoader(this.serverType);
    this.options = this.configLoader.getValue("server");
  }

  // Method to load packet handlers
  protected async loadHandlers() {
    if (!this.basePath) {
      throw new Error(`Cannot find path ${this.basePath}`);
    }
    const handlersFolder = path.join(this.basePath, "handlers");
    if (fs.existsSync(handlersFolder)) {
      const files = fs.readdirSync(handlersFolder);
      if (files.length) {
        await Promise.all(
          files.map(async (file) => {
            const handlerModule = await import(path.join(handlersFolder, file));
            if (handlerModule && handlerModule.default) {
              const HandlerClass = handlerModule.default as HandlerConstructor;
              const decoratedKey = Reflect.getMetadata(
                "packetType",
                HandlerClass
              );
              if (decoratedKey) {
                this.handlers.set(decoratedKey, HandlerClass);
              }
            }
          })
        );
      }
    }
  }

  // Method called when server starts listening
  protected onServerStart(): void {
    this.logger.info(
      `Server listening on ${this.options.host}:${this.options.port}`
    );
  }

  // Method called when a new connection is established
  protected onConnection(socket: Socket): void {
    const userConnection = new UserConnection(socket);
    this.connections.set(userConnection.sessionId, userConnection);
    this.logger.success(
      `New connection established with session ID: ${userConnection.sessionId} (${socket.remoteAddress}:${socket.remotePort})`
    );

    // Send welcome packet to the client
    const packet = FlyffPacket.createEmpty();
    packet.writeUInt32LE(PacketType.WELCOME);
    packet.writeUInt32LE(userConnection.sessionId);
    userConnection.send(packet);

    // Attach event listeners for data, close, and error events
    socket.on("data", (data) => this.onData(data, userConnection));
    socket.on("close", () => this.onDisconnect(userConnection.sessionId));
    socket.on("error", (error) =>
      this.onError(error, userConnection.sessionId)
    );
  }

  // Method called when data is received from a client
  protected onData(data: Buffer, userConnection: IUserConnection): void {
    const packet = new FlyffPacket(data);
    const HandlerClass = this.handlers.get(packet.PacketType);
    if (HandlerClass) {
      // Execute the corresponding packet handler
      const handlerInstance = new HandlerClass(packet);
      handlerInstance.userConnection = userConnection;
      handlerInstance.server = this;
      handlerInstance.execute();
    } else {
      // Log unimplemented packet type
      this.logger.warn(
        `Unimplemented packet ${this.getPacketTypeId(
          packet.PacketType
        )} (${ToStringHex(packet.PacketType)})`
      );
    }
  }

  // Method called when a connection is closed
  protected onDisconnect(sessionId: number): void {
    if (this.connections.has(sessionId)) {
      this.connections.delete(sessionId);
      this.logger.warn(`Connection with session ID ${sessionId} closed`);
    }
  }

  // Method called when an error occurs
  protected onError(error: Error, sessionId: number | null = null): void {
    console.log(error)
    if (sessionId) {
      this.logger.error(`Error occurred for session ID ${sessionId}: ${error}`);
    } else {
      this.logger.error(error);
    }
  }

  // Utility method to get packet type ID as string
  private getPacketTypeId(value: number): string | undefined {
    for (const key in PacketType) {
      if (PacketType[key as keyof typeof PacketType] === value) {
        return key;
      }
    }
    return undefined;
  }

  // Method to disconnect a user
  disconnectUser(userConnection: IUserConnection) {
    userConnection.socket.destroy();
  }

  // Method to check if a user is connected
  isUserConnected = (userConnection: IUserConnection) =>
    this.connections.has(userConnection.sessionId);
}

export interface IUserConnection extends UserConnection {
  username: string | null;
  userId: number | null;
  sessionId: number;
  socket: Socket;
  send(packet: FlyffPacket): void;
}

// Class representing a user connection
export class UserConnection {
  public userId: number | null = null;
  public username: string | null = null;
  public readonly sessionId: number;
  public readonly socket: Socket;

  // Constructor to initialize a user connection
  constructor(socket: Socket) {
    this.sessionId = Math.floor(Math.random() * Math.pow(2, 32));
    this.socket = socket;
  }

  // Method called when data is received (can be overridden)
  protected onData(packet: FlyffPacket): void {}

  // Method to send a packet to the client
  send(packet: FlyffPacket): void {
    this.socket.write(FlyffPacket.appendHeader(packet.buffer));
  }
}
