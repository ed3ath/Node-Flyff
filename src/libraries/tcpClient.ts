import { Socket, SocketConstructorOpts } from "net";
import { IUserConnection, UserConnection } from "./connection";
import { ServerType } from "../common/serverType";
import { Logger } from "../helpers/logger";
import { FlyffPacket } from "./flyffPacket";
import { PacketType, ToStringHex } from "../common/packetType";
import { HandlerConstructor } from "./packetHandler";

export class TcpClient {
  private logger: Logger;
  private options: SocketConstructorOpts;
  private socket: Socket;
  handlers: Map<PacketType, HandlerConstructor>

  constructor(options: SocketConstructorOpts, serverType: ServerType) {
    this.logger = new Logger(serverType);
    this.options = options;
  }

  connect(): void {
    this.socket = new Socket(this.options);
    this.socket.on("connect", this.onConnection.bind(this));
  }

  protected onConnection(socket: Socket): void {
    const userConnection = new UserConnection(socket);
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
    // if (this.connections.has(sessionId)) {
    //   this.logger.warn(`Connection with session ID ${sessionId} closed`);
    // }
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
  private getPacketTypeId(value: number): string | undefined {
    for (const key in PacketType) {
      if (PacketType[key as keyof typeof PacketType] === value) {
        return key;
      }
    }
    return undefined;
  }
}
