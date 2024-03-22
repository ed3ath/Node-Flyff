import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import {
  PacketHandler,
  SetPacketType,
} from "../../../libraries/packetHandler";

@SetPacketType(PacketType.PING)
export default class PingHandler extends PacketHandler {
  time: number;
  timedOut: boolean;
  
  constructor(packet: FlyffPacket) {
    super();
    try {
      this.time = packet.readInt32LE();
      this.timedOut = false;
    } catch {
      this.time = 0;
      this.timedOut = true;
    }
  }

  async execute(): Promise<void> {
    const packet = FlyffPacket.createWithHeader(PacketType.PING);
    packet.writeInt32(this.time);
    this.send(packet);
  }
}
