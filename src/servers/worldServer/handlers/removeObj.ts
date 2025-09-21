import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { DelObjSnapshot } from "../../../protocol/snapshots/delObj";
import { WorldUser } from "../worldUser";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";

/**
 * REMOVEOBJ packet handler (0x00ff0003)
 * Purpose: Despawn objects when they leave view range or are destroyed
 * C++ Reference: H:\game\v19\Source\Source\WORLDSERVER\User.cpp:AddRemoveObj
 */
@SetPacketType(PacketType.REMOVEOBJ)
export default class RemoveObjHandler extends PacketHandler {
  objectId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.objectId = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn("REMOVEOBJ: Player not found for user connection");
      return;
    }

    this.logger.info(`REMOVEOBJ request from ${player.name} for object ID: ${this.objectId}`);

    // Validate object ID
    if (this.objectId <= 0) {
      this.logger.warn(`REMOVEOBJ: Invalid object ID ${this.objectId}`);
      return;
    }

    // Don't allow removing self
    if (this.objectId === player.objectId) {
      this.logger.warn(`REMOVEOBJ: Player ${player.name} attempted to remove self (ID: ${this.objectId})`);
      return;
    }

    try {
      // Create DelObj snapshot to remove the object from client view
      const delObjSnapshot = new DelObjSnapshot(this.objectId);

      // Send the snapshot to the client
      this.userConnection.sendSnapshot(delObjSnapshot);

      // Get the world map layer to clean up object references
      const mapLayer = player.mapLayer;
      if (mapLayer) {
        // Remove object from player's view list if it exists
        mapLayer.removeObjectFromPlayerView(player.objectId, this.objectId);
      }

      WorldPacketLogger.logRemoveObjHandler(
        player.name,
        this.objectId
      );

      this.logger.info(`✓ REMOVEOBJ: Sent DelObj snapshot for object ID ${this.objectId} to ${player.name}`);
    } catch (error) {
      this.logger.error(`REMOVEOBJ: Failed to send DelObj snapshot for object ${this.objectId}: ${error}`);
    }
  }
}