import { SnapshotType } from "../snapshotType";
import { FlyffSnapshot } from "../../libraries/snapshot";

/**
 * Damage types for visual feedback
 */
export enum DamageType {
  NORMAL = 0,
  CRITICAL = 1,
  MISS = 2,
  BLOCK = 3,
  ABSORB = 4,
  HEAL = 5,
  MANA = 6
}

/**
 * DAMAGE Snapshot (0x0013)
 * Purpose: Damage number display for visual feedback
 * C++ Reference: SNAPSHOTTYPE_DAMAGE
 */
export class DamageSnapshot extends FlyffSnapshot {
  constructor(targetId: number, damage: number, damageType: DamageType = DamageType.NORMAL) {
    super(SnapshotType.DAMAGE, targetId);

    // Write damage information for visual feedback
    this.writeInt32(damage);        // Damage amount
    this.writeByte(damageType);     // Damage type (normal, critical, miss, etc.)
    this.writeByte(0);             // Damage flags (reserved)
    this.writeInt32(0);            // Attacker ID (0 if environmental damage)

    // Write damage position offset for floating text
    this.writeSingle(0);         // X offset
    this.writeSingle(0);         // Y offset
    this.writeSingle(0);         // Z offset
  }
}