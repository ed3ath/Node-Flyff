import { SnapshotType } from "../snapshotType";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { FlyffSnapshot } from "../../libraries/snapshot";

/**
 * DEST_POS Snapshot (0x0002)
 * Purpose: Player movement destination
 * C++ Reference: SNAPSHOTTYPE_DESTPOS
 *
 * C++ Format: ar << GETID(pCtrl) << SNAPSHOTTYPE_DESTPOS; ar << x << y << z << forward;
 */
export class DestPosSnapshot extends FlyffSnapshot {
  private x: number;
  private y: number;
  private z: number;
  private forward: number;

  constructor(
    playerId: number,
    x: number,
    y: number,
    z: number,
    forward: number = 1
  ) {
    super(playerId, SnapshotType.DEST_POS);

    this.x = x;
    this.y = y;
    this.z = z;
    this.forward = forward;

    console.log(
      `🔍 DestPosSnapshot Created: Player ${playerId} moving to (${x}, ${y}, ${z}) forward=${forward}`
    );
    // Write position as floats
    this.writeSingle(this.x);
    this.writeSingle(this.y);
    this.writeSingle(this.z);

    // Write forward flag as byte
    this.writeByte(this.forward);
  }
}
