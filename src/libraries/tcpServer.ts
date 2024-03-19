import "reflect-metadata";
import { createServer, Server, Socket } from "net";

import { FlyffPacket } from "./flyffPacket";
import { HandlerConstructor } from "./packetHandler";
import { PacketType, ToStringHex } from "../common/packetType";
import { Logger } from "../helpers/logger";
import { ConfigLoader } from "./config";
import { ServerType } from "../common/serverType";
import { Database } from "./database";
import { IUserConnection, UserConnection } from "./connection";

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
  private logger: Logger;
  private serverType: ServerType;
  private options: IServerConfig;
  private server!: Server;
  private handlers: Map<PacketType, HandlerConstructor> = new Map();
  private connections: Map<number, IUserConnection> = new Map();

  // Constructor to initialize TcpServer instance
  constructor(
    serverType: ServerType,
    options: IServerConfig,
    handlers: Map<PacketType, HandlerConstructor>
  ) {
    this.logger = new Logger(serverType);
    this.options = options;
    this.handlers = handlers;
  }

  // Method to start the server
  create() {
    this.server = createServer(this.onConnection.bind(this));
    this.server.listen(
      this.options.port,
      this.options.host,
      this.onServerStart.bind(this)
    );
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
