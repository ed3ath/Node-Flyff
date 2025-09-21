import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { AddObjectSnapshot } from "../../../protocol/snapshots/addObject";
import { FlyffSnapshot } from "../../../libraries/snapshot";
import { WorldUser } from "../worldUser";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";

/**
 * ADDOBJ packet handler (0x00ff0002)
 * Purpose: Spawn other players/NPCs in the world when they enter view range
 * C++ Reference: H:\game\v19\Source\Source\WORLDSERVER\User.cpp:AddAddObj
 */
@SetPacketType(PacketType.ADDOBJ)
export default class AddObjHandler extends PacketHandler {
  objectId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.objectId = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn("ADDOBJ: Player not found for user connection");
      return;
    }

    this.logger.info(`ADDOBJ request from ${player.name} for object ID: ${this.objectId}`);

    // Get the world map layer
    const mapLayer = player.mapLayer;
    if (!mapLayer) {
      this.logger.warn(`ADDOBJ: No map layer found for player ${player.name}`);
      return;
    }

    // Find the object to add (could be another player, NPC, or monster)
    const objectToAdd = mapLayer.getObjectById(this.objectId);
    if (!objectToAdd) {
      this.logger.warn(`ADDOBJ: Object with ID ${this.objectId} not found in map layer`);
      return;
    }

    // Check if object is within view range
    const distance = player.position.distanceTo(objectToAdd.position);
    const viewRange = 32; // Standard view range in FlyFF

    if (distance > viewRange) {
      this.logger.warn(`ADDOBJ: Object ${this.objectId} is outside view range (${distance} > ${viewRange})`);
      return;
    }

    try {
      // Check if the object is a Mover (Player, NPC, Monster)
      if (!('health' in objectToAdd && 'statistics' in objectToAdd)) {
        this.logger.warn(`ADDOBJ: Object ${this.objectId} is not a Mover type`);
        return;
      }

      // Create AddObject snapshot for the requested object (cast to Mover type)
      const addObjectSnapshot = new AddObjectSnapshot(objectToAdd as any);

      // Send the snapshot to the client
      this.userConnection.sendSnapshot(addObjectSnapshot);

      WorldPacketLogger.logAddObjHandler(
        player.name,
        this.objectId,
        objectToAdd.name || "Unknown",
        objectToAdd.position,
        distance
      );

      this.logger.info(`✓ ADDOBJ: Sent AddObject snapshot for ${objectToAdd.name || "object"} (ID: ${this.objectId}) to ${player.name}`);
    } catch (error) {
      this.logger.error(`ADDOBJ: Failed to send AddObject snapshot for object ${this.objectId}: ${error}`);
    }
  }
}