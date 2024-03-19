import { PacketType } from "../../../../common/packetType";
import { FlyffPacket } from "../../../../libraries/flyffPacket";
import {
  PacketHandler,
  SetPacketType,
} from "../../../../libraries/packetHandler";

@SetPacketType(PacketType.PING)
export default class PingHandler extends PacketHandler {
  constructor() {
    super();
  }

  async execute(): Promise<void> {
    const packet = FlyffPacket.createWithHeader(PacketType.PING);
    const time = Math.trunc(new Date().getTime() / 1000);
    packet.writeInt32(time);
    this.send(packet);
  }
}
