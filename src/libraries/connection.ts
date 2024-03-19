import { Socket } from "net";
import { FlyffPacket } from "./flyffPacket";

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