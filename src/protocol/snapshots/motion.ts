import { ObjectMessageType } from "../../types/objectMessageType";
import { SnapshotType } from "../../protocol/snapshotType";
import { Mover } from "../../entities/mover";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class MotionSnapshot extends FlyffSnapshot {
  constructor(mover: Mover, objectMessageType: ObjectMessageType) {
    super(SnapshotType.MOTION, mover.objectId);
    this.writeInt32(objectMessageType);
  }
}
