import { PacketType } from "../common/packetType";
import { FlyffPacket } from "./flyffPacket";


export type HandlerConstructor = new (packet: FlyffPacket) => IPacketHandler;

export function PacketHandler(key: PacketType): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata("packetType", key, target);
  };
}

export interface IPacketHandler {
  execute(): void;
}
