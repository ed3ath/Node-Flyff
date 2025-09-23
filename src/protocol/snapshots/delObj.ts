import { SnapshotType } from "../snapshotType";
import { FlyffSnapshot } from "../../libraries/snapshot";

/**
 * DEL_OBJ Snapshot (0x00f1)
 * Purpose: Remove objects from world when they leave view range or are destroyed
 * C++ Reference: SNAPSHOTTYPE_DEL_OBJ
 */
export class DelObjSnapshot extends FlyffSnapshot {
  constructor(objectId: number) {
    super(SnapshotType.DEL_OBJ, objectId);

    // Write the object ID to remove
    this.writeInt32(objectId);
  }
}