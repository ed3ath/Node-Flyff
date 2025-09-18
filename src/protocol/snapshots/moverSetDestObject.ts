import { WorldObject } from "../../game/world/worldObject";
import { SnapshotType } from "../../protocol/snapshotType";
import { Mover } from "../../entities/mover";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class MoverSetDestObjectSnapshot extends FlyffSnapshot {
  constructor(mover: Mover, target: WorldObject, distance: number = 1) {
    super(SnapshotType.MOVER_SET_DEST_OBJ, mover.objectId);
    this.writeUInt32(target.objectId);
    this.writeSingle(distance);
  }
}
