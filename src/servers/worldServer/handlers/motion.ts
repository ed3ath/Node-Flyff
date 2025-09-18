import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { WorldUser } from "../worldUser";
import { ObjectMessageType } from "../../../common/objectMessageType";

@SetPacketType(PacketType.MOTION)
export default class Handler extends PacketHandler {
  motionEnum: ObjectMessageType;

  constructor(packet: FlyffPacket) {
    super();
    // Read as Int32 and cast to ObjectMessageType enum like C# implementation
    this.motionEnum = packet.readInt32LE() as ObjectMessageType;
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn(
        "MOTION packet received but player is not available"
      );
      return;
    }

    try {
      // Call the existing sendMotion method (equivalent to C# Player.Motion)
      player.sendMotion(this.motionEnum);

      this.logger.info(
        `Player ${player.name} performed motion: ${ObjectMessageType[this.motionEnum]} (${this.motionEnum})`
      );
    } catch (error) {
      this.logger.error(
        `Failed to process motion for player ${player.name}: ${error}`
      );
    }
  }
}