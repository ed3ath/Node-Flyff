import { SnapshotType } from "../../common/snapshotType";
import { Player } from "../../entities/player";
import { Mover } from "../../entities/mover";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class AddObjectSnapshot extends FlyffSnapshot {
  constructor(worldObject: Mover, excludeItems: boolean = false) {
    super(SnapshotType.ADD_OBJ, worldObject.objectId);

    // Write object type (1 for mover/player)
    this.writeByte(1);

    // Write object ID
    this.writeInt32(worldObject.objectId);

    // Write mover/model ID
    this.writeInt32(worldObject.properties?.id || (worldObject as any).id || worldObject.objectId);

    // Write position
    this.writeSingleLE(worldObject.position.x);
    this.writeSingleLE(worldObject.position.y);
    this.writeSingleLE(worldObject.position.z);

    // Write rotation angle
    this.writeSingleLE(worldObject.rotationAngle || 0);

    // Write additional mover data
    this.writeInt32(worldObject.level || 1);
    this.writeInt32(worldObject.health?.hp || 100);
    this.writeInt32(worldObject.health?.mp || 100);
    this.writeInt32(worldObject.health?.fp || 100);

    if (worldObject instanceof Player) {
      // Write player-specific data
      this.writeString(worldObject.name);
      this.writeByte(worldObject.appearance.gender);
      this.writeInt32(worldObject.appearance.skinSetId || 0);
      this.writeInt32(worldObject.appearance.hairId || 0);
      this.writeInt32(worldObject.appearance.hairColor || 0);
      this.writeInt32(worldObject.appearance.faceId || 0);
      this.writeInt32(worldObject.job?.id || 0);

      // Write equipment (simplified for now)
      if (!excludeItems) {
        const equippedItems = worldObject.getEquippedItems();
        this.writeByte(equippedItems.length);
        for (const item of equippedItems) {
          this.writeInt32(item.id);
          this.writeInt32(item.quantity);
        }
      } else {
        this.writeByte(0); // No items
      }
    } else {
      this.writeString(worldObject.name || "Unknown");
    }
  }
}