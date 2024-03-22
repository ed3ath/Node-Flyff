import { PacketType } from "../../../common/packetType";
import {
  PacketHandler,
  SetPacketType,
} from "../../../libraries/packetHandler";

@SetPacketType(PacketType.ERROR)
export default class PingHandler extends PacketHandler {
  constructor() {
    super();
  }

  async execute(): Promise<void> {
    if (
      this.server.instance?.server?.isUserConnected(this.userConnection)
    ) {
      this.server.instance.server.disconnectUser(this.userConnection);
    }
  }
}
