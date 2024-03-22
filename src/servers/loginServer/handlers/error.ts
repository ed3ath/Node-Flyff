import { PacketType } from "../../../common/packetType";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";

@SetPacketType(PacketType.ERROR)
export default class Handler extends PacketHandler {
  constructor() {
    super();
  }

  async execute(): Promise<void> {
    if (this.server.instance?.server?.isUserConnected(this.userConnection)) {
      this.server.instance.server.disconnectUser(this.userConnection);
    }
  }
}
