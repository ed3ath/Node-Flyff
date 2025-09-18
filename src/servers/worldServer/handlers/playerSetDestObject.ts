import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { SetPacketType } from "../../../decorators/packetHandler";
import { WorldPacketHandler } from "../worldPacketHandler";

@SetPacketType(PacketType.PLAYERSETDESTOBJ)
export default class Handler extends WorldPacketHandler {
  targetObjectId: number;
  distance: number;

  constructor(packet: FlyffPacket) {
    super();

    // Read packet data matching C# PlayerDestObjectPacket structure
    this.targetObjectId = packet.readUInt32LE();
    this.distance = packet.readSingle();
  }

  async execute(): Promise<void> {
    if (!this.player) {
      this.logger.warn(
        "PLAYERSETDESTOBJ packet received but player is not available"
      );
      return;
    }

    try {
      // Validate target object id (like C# implementation)
      if (this.targetObjectId <= 0) {
        this.logger.error(
          `Invalid target object id: '${this.targetObjectId}'`
        );
        return;
      }

      // Check if player is trying to target themselves (like C# implementation)
      if (this.player.objectId === this.targetObjectId) {
        this.logger.warn(
          `Player ${this.player.name} trying to target themselves (objectId: ${this.targetObjectId})`
        );
        return;
      }

      // Find the target object in visible objects (like C# implementation)
      const worldObject = this.player.visibleObjects?.find(
        (obj) => obj.objectId === this.targetObjectId
      );

      if (!worldObject) {
        this.logger.error(
          `Cannot find object with id: ${this.targetObjectId} in '${this.player.name}' visible objects`
        );
        return;
      }

      // Follow the target object (like C# implementation)
      if (this.player.follow) {
        this.player.follow(worldObject);
        this.logger.info(
          `Player ${this.player.name} started following object ${this.targetObjectId} at distance ${this.distance}`
        );
      } else {
        this.logger.warn(
          `Player ${this.player.name} does not have follow method implemented`
        );
      }

    } catch (error) {
      this.logger.error(
        `Failed to process PLAYERSETDESTOBJ for player ${this.player?.name}: ${error}`
      );
    }
  }
}