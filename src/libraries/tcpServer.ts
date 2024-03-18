import "reflect-metadata";
import { createServer, Server, Socket } from "net";
import * as fs from "fs-extra";
import * as path from "path";

import { FlyffPacket } from "./flyffPacket";
import { HandlerConstructor } from "./packetHandler";
import { PacketType, ToStringHex } from "../common/packetType";
import { cwd } from "process";
import { Logger } from "../helpers/logger";
import { ConfigLoader } from "./config";
import { ServerTypes } from "../common/serverTypes";
import { Database } from "../database/database";

export interface ServerConfig {
  host: string;
  port: number;
  buildVersion: string;
  accountVerification: boolean;
  passwordEncryptionKey: string;
  maxConnection: number;
  clientBufferSize: number;
}

export class TcpServer {
  private options: ServerConfig;
  private server!: Server;
  private connections: Map<number, UserConnection> = new Map();
  private handlers: Map<PacketType, HandlerConstructor> = new Map();
  basePath: string;
  config: ConfigLoader;
  database: Database;

  constructor(basePath: string) {
    this.basePath = basePath ?? cwd();
  }

  start() {
    this.loadConfig()
      .then(() => {
        this.loadHandlers()
          .then(async () => {
            const dbConfig = this.config.getValue("database");
            this.database = new Database({
              type: dbConfig.provider,
              database: dbConfig["connection-string"],
            });
            this.database.basePath = this.basePath;
            this.database.start().then(() => {
              this.server = createServer(this.onConnection.bind(this));
              this.server.listen(
                this.options.port,
                this.options.host,
                this.onServerStart.bind(this)
              );
            });
          })
          .catch(this.onError.bind(this));
      })
      .catch(this.onError.bind(this));
  }

  protected async loadConfig() {
    this.config = new ConfigLoader(ServerTypes.LOGIN_SERVER);
    Logger.success("Loaded configuration");
    this.options = this.config.getValue("server");
  }

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

  protected onServerStart(): void {
    Logger.info(
      `Server listening on ${this.options.host}:${this.options.port}`
    );
  }

  protected onConnection(socket: Socket): void {
    const userConnection = new UserConnection(socket);
    this.connections.set(userConnection.sessionId, userConnection);
    Logger.success(
      `New connection established with session ID: ${userConnection.sessionId} (${socket.remoteAddress}:${socket.remotePort})`
    );

    const packet = FlyffPacket.createEmpty();
    packet.writeUInt32LE(PacketType.WELCOME);
    packet.writeUInt32LE(userConnection.sessionId);
    userConnection.send(packet);

    socket.on("data", (data) => this.onData(data, userConnection));
    socket.on("close", () => this.onDisconnect(userConnection.sessionId));
    socket.on("error", (error) =>
      this.onError(error, userConnection.sessionId)
    );
  }

  protected onData(data: Buffer, userConnection: UserConnection): void {
    const packet = new FlyffPacket(data);
    const HandlerClass = this.handlers.get(packet.PacketType);
    if (HandlerClass) {
      const handlerInstance = new HandlerClass(packet);
      handlerInstance.userConnection = userConnection;
      handlerInstance.server = this;
      handlerInstance.execute();
    } else {
      Logger.warn(
        `Unimplemented packet ${this.getPacketTypeId(
          packet.PacketType
        )} (${ToStringHex(packet.PacketType)})`
      );
    }
  }

  protected onDisconnect(sessionId: number): void {
    if (this.connections.has(sessionId)) {
      this.connections.delete(sessionId);
      Logger.warn(`Connection with session ID ${sessionId} closed`);
    }
  }

  protected onError(error: Error, sessionId: number | null = null): void {
    if (sessionId) {
      Logger.error(`Error occurred for session ID ${sessionId}: ${error}`);
    } else {
      Logger.error(error);
    }
  }

  private getPacketTypeId(value: number): string | undefined {
    for (const key in PacketType) {
      if (PacketType[key as keyof typeof PacketType] === value) {
        return key;
      }
    }
    return undefined;
  }

  disconnectUser(userConnection: UserConnection) {
    userConnection.socket.destroy();
  }

  isUserConnected = (userConnection: UserConnection) =>
    this.connections.has(userConnection.sessionId);
}

export class UserConnection {
  public readonly sessionId: number;
  public readonly socket: Socket;

  constructor(socket: Socket) {
    this.sessionId = Math.floor(Math.random() * Math.pow(2, 32));
    this.socket = socket;
  }

  protected onData(_packet: FlyffPacket): void {}

  send(packet: FlyffPacket) {
    this.socket.write(FlyffPacket.appendHeader(packet.buffer));
  }
}
