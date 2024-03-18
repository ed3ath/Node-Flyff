import { PacketType } from "../../../common/packetType";
import { PacketHandler, SetPacketType } from "../../../libraries/packetHandler";

@SetPacketType(PacketType.ERROR)
export default class PingHandler extends PacketHandler {
  constructor() {
    super();
  }

  execute(): void {
    if ( this.server.isUserConnected(this.userConnection)) {
        this.server.disconnectUser(this.userConnection);
    }
  }
}
