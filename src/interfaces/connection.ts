import { Socket } from "net";
import { FlyffPacket } from "../libraries/flyffPacket";
import { UserConnection } from "../libraries/tcpServer";

export interface IUserConnection extends UserConnection {
  username: string | null;
  userId: number | null;
  sessionId: number;
  socket: Socket;
  send(packet: FlyffPacket): void;
}