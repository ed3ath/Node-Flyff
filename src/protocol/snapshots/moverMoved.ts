import { SnapshotType } from "../snapshotType";
import { FlyffSnapshot } from "../../libraries/snapshot";
import { Mover } from "../../entities/mover";
import { Vector3 } from "../../abstract/vector3";

/**
 * MOVERMOVED Snapshot (0x00ca)
 * Purpose: Other player movement updates - notify clients when other players move
 * C++ Reference: SNAPSHOTTYPE_MOVERMOVED
 */
export class MoverMovedSnapshot extends FlyffSnapshot {
  constructor(mover: Mover, position: Vector3, angle: number) {
    super(SnapshotType.MOVERMOVED, mover.objectId);

    // Write movement data for other players
    this.writeSingle(position.x); // New position X
    this.writeSingle(position.y); // New position Y
    this.writeSingle(position.z); // New position Z
    this.writeSingle(angle);      // New rotation angle

    // Write movement flags
    this.writeByte(0); // Motion type (0 = walking, 1 = running, 2 = flying)
    this.writeByte(0); // Movement state flags

    // Write turn angle (for smooth client interpolation)
    this.writeSingle(angle);
  }
}