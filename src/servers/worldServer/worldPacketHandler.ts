import { PacketHandler } from "../../libraries/packetHandler";
import { WorldUser } from "./worldUser";
import { Player } from "../../entities/player";

export abstract class WorldPacketHandler extends PacketHandler {

  get user(): WorldUser {
    return this.userConnection as WorldUser;
  }

  get player(): Player | null {
    return this.user.getPlayer();
  }

  protected constructor() {
    super();
  }
}