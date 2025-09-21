import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { WorldUser } from "../worldUser";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";

/**
 * RECHARGE_ID_STACK packet handler (0x00000004)
 * Purpose: Recharge or refresh ID stacks for object management
 * This is typically sent when the client needs to refresh object IDs
 */
@SetPacketType(PacketType.RECHARGE_ID_STACK)
export default class RechargeIdStackHandler extends PacketHandler {
  stackType: number;
  stackSize: number;

  constructor(packet: FlyffPacket) {
    super();
    // Read stack parameters from packet
    this.stackType = packet.readInt32LE();
    this.stackSize = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn("RECHARGE_ID_STACK: Player not found for user connection");
      return;
    }

    this.logger.info(`RECHARGE_ID_STACK request from ${player.name} - Type: ${this.stackType}, Size: ${this.stackSize}`);

    try {
      // Get the world map layer for object management
      const mapLayer = player.mapLayer;
      if (!mapLayer) {
        this.logger.warn(`RECHARGE_ID_STACK: No map layer found for player ${player.name}`);
        return;
      }

      // This packet is typically sent when client needs object ID refreshing
      // We'll acknowledge it and potentially trigger a refresh of nearby objects
      if (this.stackType === 0) {
        // Object ID refresh - resend nearby objects to ensure client has correct IDs
        const nearbyObjects = mapLayer.getVisibleObjects(player);

        for (const obj of nearbyObjects) {
          if (obj.objectId !== player.objectId) {
            // Send DelObj followed by AddObj to refresh the object on client
            const { DelObjSnapshot } = await import("../../../protocol/snapshots/delObj");
            const { AddObjectSnapshot } = await import("../../../protocol/snapshots/addObject");

            // First remove the object
            const delSnapshot = new DelObjSnapshot(obj.objectId);
            this.userConnection.sendSnapshot(delSnapshot);

            // Then add it back to refresh its state
            if ('health' in obj && 'statistics' in obj) {
              const addSnapshot = new AddObjectSnapshot(obj as any);
              this.userConnection.sendSnapshot(addSnapshot);
            }
          }
        }

        this.logger.info(`✓ RECHARGE_ID_STACK: Refreshed ${nearbyObjects.length} objects for ${player.name}`);
      }

      // Send acknowledgment back to client (packet with same command)
      const response = new FlyffPacket(PacketType.RECHARGE_ID_STACK);
      response.writeInt32LE(this.stackType);
      response.writeInt32LE(this.stackSize);

      this.userConnection.send(response);

      WorldPacketLogger.logRechargeIdStack(
        player.name,
        this.stackType,
        this.stackSize
      );

      this.logger.debug(`✓ RECHARGE_ID_STACK: Sent acknowledgment to ${player.name}`);
    } catch (error) {
      this.logger.error(`RECHARGE_ID_STACK: Failed to process request for ${player.name}: ${error}`);
    }
  }
}