import { PacketType } from "../common/packetType";

export function SetPacketType(key: PacketType): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata("packetType", key, target);
  };
}
