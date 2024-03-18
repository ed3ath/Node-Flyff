import { PacketType } from "../common/packetType";
import { FlyffPacket } from "./flyffPacket";
import { TcpServer, UserConnection } from "./tcpServer";

export type HandlerConstructor = new (...args: any) => PacketHandler;

export function SetPacketType(key: PacketType): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata("packetType", key, target);
  };
}

export class PacketHandler {
  userConnection: UserConnection;
  server: TcpServer;

  constructor() {}

  execute(): void {}

  send(packet: FlyffPacket) {
    console.log(packet);
    this.userConnection.send(packet);
  }
}
