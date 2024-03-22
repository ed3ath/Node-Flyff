import "reflect-metadata";
import { createServer, Server, Socket } from "net";

import { FlyffPacket } from "./flyffPacket";
import { HandlerConstructor } from "./packetHandler";
import { PacketType, ToStringHex } from "../common/packetType";
import { Logger } from "../helpers/logger";
import { ServerType } from "../common/serverType";
import { IUserConnection } from "../interfaces/connection";
import { IRedisClient } from "../interfaces/redis";
import { IConfig } from "../interfaces/config";

// Interface for server configuration
export interface IServerConfig {
  host: string;
  port: number;
}

// Main TCP Server class
export class TcpServer {
  private serverType: ServerType;
  private options: IServerConfig;
  time: number;
  server!: Server;
  handlers: Map<PacketType, HandlerConstructor> = new Map();
  connections: Map<number, IUserConnection> = new Map();
  instance!: any;
  redisClient!: IRedisClient;
  logger: Logger;
  config: IConfig;

  // Constructor to initialize TcpServer instance
  constructor(serverType: ServerType, options: IServerConfig) {
    this.logger = new Logger(serverType);
    this.serverType = serverType;
    this.options = options;
  }

  // Method to start the server
  start() {
    this.logger.main("Starting...");
    if (!this.handlers.size) {
      this.logger.warn("No packet handlers imported.");
    }
    this.server = createServer(this.onConnection.bind(this));
    this.server.listen(
      this.options.port,
      this.options.host,
      this.onServerStart.bind(this)
    );
  }

  setConfig(config: IConfig) {
    this.config = config;
  }

  addHandlers(handlers: Map<PacketType, HandlerConstructor>) {
    this.handlers = handlers;
  }

  addRedisClient(redisClient: IRedisClient) {
    this.redisClient = redisClient;
  }

  // Method called when server starts listening
  protected onServerStart(): void {
    this.logger.info(
      `Server listening on ${this.options.host}:${this.options.port}`
    );
    this.time = new Date().getTime();
  }

  // Method called when a new connection is established
  protected onConnection(socket: Socket): void {
    const userConnection = new UserConnection(socket);
    this.connections.set(userConnection.sessionId, userConnection);
    this.logger.success(
      `New connection established with session ID: ${userConnection.sessionId} (${socket.remoteAddress}:${socket.remotePort})`
    );

    if (this.serverType !== ServerType.CORE_SERVER) {
      // Send welcome packet to the client
      const packet = FlyffPacket.createEmpty();
      packet.writeUInt32LE(PacketType.WELCOME);
      packet.writeUInt32LE(userConnection.sessionId);
      userConnection.send(packet);
    }

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
      handlerInstance.wrappedExecute();
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
    console.log(error);
    if (sessionId) {
      this.logger.error(`Error occurred for session ID ${sessionId}: ${error}`);
    } else {
      this.logger.error(error);
    }
  }

  // Utility method to get packet type ID as string
  getPacketTypeId(value: number): string | undefined {
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

  disconnect(): void {
    this.socket.destroy();
  }
}
