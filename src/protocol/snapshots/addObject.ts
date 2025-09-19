import { SnapshotType } from "../../protocol/snapshotType";
import { Player } from "../../entities/player";
import { Mover } from "../../entities/mover";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class AddObjectSnapshot extends FlyffSnapshot {
  constructor(worldObject: Mover, excludeItems: boolean = false) {
    super(SnapshotType.ADD_OBJ, worldObject.objectId);

    // Write object type (1 for mover/player, 2 for item, 3 for NPC, etc.)
    const objectType = worldObject instanceof Player ? 1 : 3;
    this.writeByte(objectType);

    // Write object ID
    this.writeInt32(worldObject.objectId);

    // Write mover/model ID - for players, use gender-based model
    let modelId = worldObject.properties?.id || (worldObject as any).id || worldObject.objectId;
    if (worldObject instanceof Player) {
      // Use gender-based model ID like C# (11 for male, 12 for female)
      modelId = worldObject.appearance?.gender === 1 ? 12 : 11;
    }
    this.writeInt32(modelId);

    // Write position
    this.writeSingleLE(worldObject.position.x);
    this.writeSingleLE(worldObject.position.y);
    this.writeSingleLE(worldObject.position.z);

    // Write rotation angle
    this.writeSingleLE(worldObject.rotationAngle || 0);

    // Write movement state and mode
    this.writeByte(0); // Motion (0 = standing)
    this.writeByte(0); // Action state
    this.writeInt32(0); // State flags

    // Write vital stats
    this.writeInt32(worldObject.level || 1);
    this.writeInt32(worldObject.health?.hp || 100);
    this.writeInt32(worldObject.health?.maxHp || 100);
    this.writeInt32(worldObject.health?.mp || 100);
    this.writeInt32(worldObject.health?.maxMp || 100);
    this.writeInt32(worldObject.health?.fp || 100);
    this.writeInt32(worldObject.health?.maxFp || 100);

    if (worldObject instanceof Player) {
      // Write player-specific data
      this.writeString(worldObject.name);
      this.writeByte(worldObject.appearance?.gender || 0);
      this.writeInt32(worldObject.appearance?.skinSetId || 0);
      this.writeInt32(worldObject.appearance?.hairId || 0);
      this.writeInt32(worldObject.appearance?.hairColor || 0);
      this.writeInt32(worldObject.appearance?.faceId || 0);
      this.writeInt32(worldObject.job?.id || 0);

      // Write player stats
      this.writeInt32(worldObject.statistics?.strength || 15);
      this.writeInt32(worldObject.statistics?.stamina || 15);
      this.writeInt32(worldObject.statistics?.dexterity || 15);
      this.writeInt32(worldObject.statistics?.intelligence || 15);

      // Write experience and points (fixed from Int64 to Int32)
      this.writeInt32((worldObject.experience as any)?.currentExp || 0);
      this.writeInt32(worldObject.availablePoints || 0);
      this.writeInt32(worldObject.skillPoints || 0);

      // Write gold
      this.writeInt32((worldObject.gold as any)?.amount || 0);

      // Write guild/party info
      this.writeInt32(0); // Guild ID (none for now)
      this.writeString(""); // Guild name
      this.writeInt32(0); // Party ID (none for now)

      // Write PK/PVP status
      this.writeByte(0); // PK mode
      this.writeInt32(0); // PK value
      this.writeInt32(0); // Fame

      // Write authority level (fixed type conversion)
      this.writeByte(Number(worldObject.authority) || 0);

      // Write equipment
      if (!excludeItems) {
        const equippedItems = worldObject.getEquippedItems();
        this.writeByte(equippedItems.length);
        for (const item of equippedItems) {
          this.writeInt32(item.Id);
          this.writeInt32(item.Quantity || 1);
          this.writeInt32(item.Refine || 0);
          this.writeByte(item.Element || 0);
          this.writeInt32(item.ElementRefine || 0);
          this.writeInt32(item.SerialNumber || 0);
        }
      } else {
        this.writeByte(0); // No items
      }

      // Write buff/status effects (empty for now)
      this.writeByte(0); // Number of buffs

      // Write additional player flags
      this.writeByte(1); // Is alive
      this.writeByte(0); // Is flying
      this.writeByte(0); // Is in duel
      this.writeByte(0); // Is in PK mode
      this.writeByte(0); // Is in guild war

    } else {
      // Write NPC/Monster data
      this.writeString(worldObject.name || "Unknown");
      this.writeInt32(0); // NPC/Monster type
      this.writeByte(0); // Belligerence
      this.writeInt32(0); // AI type
    }

    // Write velocity/movement data
    this.writeSingleLE(0); // Velocity X
    this.writeSingleLE(0); // Velocity Y
    this.writeSingleLE(0); // Velocity Z

    // Write destination if moving
    this.writeSingleLE(worldObject.position.x); // Dest X (same as current for stationary)
    this.writeSingleLE(worldObject.position.y); // Dest Y
    this.writeSingleLE(worldObject.position.z); // Dest Z
  }
}