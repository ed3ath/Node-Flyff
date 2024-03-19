import { PacketType } from "../../../../common/packetType";
import {
  PacketHandler,
  SetPacketType,
} from "../../../../libraries/packetHandler";

@SetPacketType(PacketType.ERROR)
export default class PingHandler extends PacketHandler {
  constructor() {
    super();
  }

  async execute(): Promise<void> {
    if (
      global.loginServerInstance.server.isUserConnected(this.userConnection)
    ) {
      global.loginServerInstance.server.disconnectUser(this.userConnection);
    }
  }
}
