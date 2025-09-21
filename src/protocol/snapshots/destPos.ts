import { SnapshotType } from "../snapshotType";
import { BaseSnapshot } from "../../libraries/flyffSnapshot";
import { FlyffPacket } from "../../libraries/flyffPacket";

/**
 * DEST_POS Snapshot (0x0002)
 * Purpose: Player movement destination
 * C++ Reference: SNAPSHOTTYPE_DESTPOS
 *
 * C++ Format: ar << GETID(pCtrl) << SNAPSHOTTYPE_DESTPOS; ar << x << y << z << forward;
 */
export class DestPosSnapshot extends BaseSnapshot {
  private x: number;
  private y: number;
  private z: number;
  private forward: number;

  constructor(playerId: number, x: number, y: number, z: number, forward: number = 1) {
    super(playerId, SnapshotType.DEST_POS);

    this.x = x;
    this.y = y;
    this.z = z;
    this.forward = forward;

    // Build the data buffer now that properties are set
    this.buildData();

    console.log(`🔍 DestPosSnapshot Created: Player ${playerId} moving to (${x}, ${y}, ${z}) forward=${forward}`);
  }

  protected writeDataToPacket(packet: FlyffPacket): void {
    // Write position as floats
    packet.writeSingleLE(this.x);
    packet.writeSingleLE(this.y);
    packet.writeSingleLE(this.z);

    // Write forward flag as byte
    packet.writeByte(this.forward);
  }
}