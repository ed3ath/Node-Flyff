import { PacketType } from "../../../common/packetType";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { FlyffPacket } from "../../../libraries/flyffPacket";

@SetPacketType(PacketType.CLOSE_EXISTING_CONNECTION)
export default class Handler extends PacketHandler {
  username: string;
  constructor(packet: FlyffPacket) {
    super();

    this.username = packet.readStringLE();
  }

  async execute(): Promise<void> {
    if (this.username) {
      const userConnection =
        this.server.instance?.server?.getConnectionByAccount(this.username);
      if (userConnection) {
        userConnection.disconnect();
      }
    }
  }
}
