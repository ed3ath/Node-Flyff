import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";

@SetPacketType(PacketType.QUERY_TICK_COUNT)
export default class Handler extends PacketHandler {
  time: number;
  constructor(packet: FlyffPacket) {
    super();
    this.time = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const packet = FlyffPacket.createWithHeader(PacketType.QUERY_TICK_COUNT);
    const elapsed = new Date().getTime() - this.server.time;
    packet.writeUInt32LE(this.time);
    packet.writeInt64LE(elapsed);
    this.send(packet);
  }
}
