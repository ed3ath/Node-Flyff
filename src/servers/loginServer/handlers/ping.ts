import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler, SetPacketType } from "../../../libraries/packetHandler";
import { UserConnection } from "../../../libraries/tcpServer";

@SetPacketType(PacketType.PING)
export default class PingHandler extends PacketHandler {

  constructor() {
    super();
  }

  execute(): void {
    const packet = FlyffPacket.createWithHeader(PacketType.PING);
    const time = Math.trunc(new Date().getTime() / 1000);
    packet.writeInt32(time);
    this.send(packet);
  }
}
