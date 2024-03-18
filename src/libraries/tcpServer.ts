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
export interface ServerConfig {
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
  private options: ServerConfig;
  private server!: Server;
  private connections: Map<number, UserConnection> = new Map();
  private handlers: Map<PacketType, HandlerConstructor> = new Map();
  basePath: string;
  config: ConfigLoader;
  database: Database;

  // Constructor to initialize TcpServer instance
  constructor(basePath: string) {
    this.basePath = basePath ?? cwd(); // Set base path to current working directory if not provided
  }

  // Method to start the server
  start() {
    this.loadConfig()
      .then(() => {
        this.loadHandlers()
          .then(() => {
            // Initialize database connection
            const dbConfig = this.config.getValue("database");
            this.database = new Database({
              type: dbConfig.provider,
              database: dbConfig["connection-string"],
            });
            this.database.basePath = this.basePath;
            this.database
              .start()
              .then(() => {
                // Create and start TCP server
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
      })
      .catch(this.onError.bind(this));
  }

  // Method to load server configuration
  protected async loadConfig() {
    this.config = new ConfigLoader(ServerTypes.LOGIN_SERVER);
    Logger.success("Loaded configuration");
    this.options = this.config.getValue("server");
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
    Logger.info(
      `Server listening on ${this.options.host}:${this.options.port}`
    );
  }

  // Method called when a new connection is established
  protected onConnection(socket: Socket): void {
    const userConnection = new UserConnection(socket);
    this.connections.set(userConnection.sessionId, userConnection);
    Logger.success(
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
  protected onData(data: Buffer, userConnection: UserConnection): void {
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
      Logger.warn(
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
      Logger.warn(`Connection with session ID ${sessionId} closed`);
    }
  }

  // Method called when an error occurs
  protected onError(error: Error, sessionId: number | null = null): void {
    if (sessionId) {
      Logger.error(`Error occurred for session ID ${sessionId}: ${error}`);
    } else {
      Logger.error(error);
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
  disconnectUser(userConnection: UserConnection) {
    userConnection.socket.destroy();
  }

  // Method to check if a user is connected
  isUserConnected = (userConnection: UserConnection) =>
    this.connections.has(userConnection.sessionId);
}

// Class representing a user connection
export class UserConnection {
  public readonly sessionId: number;
  public readonly socket: Socket;

  // Constructor to initialize a user connection
  constructor(socket: Socket) {
    this.sessionId = Math.floor(Math.random() * Math.pow(2, 32));
    this.socket = socket;
  }

  // Method called when data is received (can be overridden)
  protected onData(_packet: FlyffPacket): void { }

  // Method to send a packet to the client
  send(packet: FlyffPacket) {
    this.socket.write(FlyffPacket.appendHeader(packet.buffer));
  }
}
