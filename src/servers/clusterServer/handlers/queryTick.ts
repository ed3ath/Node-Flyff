import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";

@SetPacketType(PacketType.QUERY_TICK_COUNT)
export default class Handler extends PacketHandler {
  constructor() {
    super();
  }

  async execute(): Promise<void> {
    const packet = FlyffPacket.createWithHeader(PacketType.QUERY_TICK_COUNT);
    const elapsed = new Date().getTime() - this.server.time;
    const time = Math.trunc(new Date().getTime() / 1000);
    packet.writeUInt32LE(time);
    packet.writeInt64LE(elapsed);
    this.send(packet);
  }
}
