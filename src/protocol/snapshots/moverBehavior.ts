import { SnapshotType } from "../snapshotType";
import { FlyffSnapshot } from "../../libraries/snapshot";
import { Mover } from "../../entities/mover";

/**
 * Behavior types for player movement
 */
export enum BehaviorType {
  STANDING = 0,
  WALKING = 1,
  RUNNING = 2,
  FLYING = 3,
  SWIMMING = 4,
  SITTING = 5,
  DEAD = 6
}

/**
 * MOVERBEHAVIOR Snapshot (0x00cb)
 * Purpose: Other player behavior updates (walking, running, flying, sitting, etc.)
 * C++ Reference: SNAPSHOTTYPE_MOVERBEHAVIOR
 */
export class MoverBehaviorSnapshot extends FlyffSnapshot {
  constructor(mover: Mover, behavior: BehaviorType) {
    super(SnapshotType.MOVERBEHAVIOR, mover.objectId);

    // Write behavior state changes
    this.writeByte(behavior);       // Behavior type
    this.writeByte(0);             // Behavior flags (reserved)
    this.writeInt32(0);            // State duration (0 = indefinite)

    // Write additional state information
    this.writeByte(mover.isDead ? 1 : 0); // Is dead flag
    this.writeByte(0);             // Is PK mode
    this.writeByte(0);             // Is in combat
  }
}