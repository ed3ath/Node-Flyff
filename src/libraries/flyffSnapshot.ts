import { PacketType } from "../protocol/packetType";
import { SnapshotType } from "../protocol/snapshotType";
import { FlyffPacket } from "./flyffPacket";

/**
 * FlyFF Snapshot implementation based on C# Rhisis.Protocol.FFSnapshot
 * Structure:
 * - PacketType.SNAPSHOT
 * - Reserved (4 bytes)
 * - Count (2 bytes)
 * - For each snapshot: ObjectID + SnapshotType + Data
 */
export class FFSnapshot extends FlyffPacket {
  static readonly SnapshotHeaderOffset = 1 + 4; // sizeof(byte) + sizeof(int)
  static readonly SnapshotAmountOffset =
    FFSnapshot.SnapshotHeaderOffset + 4 + 4;
  static readonly SnapshotContentOffset = FFSnapshot.SnapshotAmountOffset + 2;

  private count: number = 0;

  constructor() {
    super(PacketType.SNAPSHOT);
    this.writeInt32(0); // Reserved
    this.writeInt16(this.count); // Count
  }

  /**
   * Creates snapshot with single snapshot data
   */
  static createSingle(
    snapshotType: SnapshotType,
    objectId: number
  ): FFSnapshot {
    const snapshot = new FFSnapshot();
    snapshot.count = 1;

    // Update count at correct position (after PacketType + Reserved)
    const currentPos = snapshot.position;
    snapshot.position = 9; // 5 (packet header) + 4 (reserved) = 9
    snapshot.writeInt16(snapshot.count);
    snapshot.position = currentPos;

    // Write snapshot data
    snapshot.writeUInt32(objectId);
    snapshot.writeInt16(snapshotType);

    return snapshot;
  }

  /**
   * Merge another snapshot into this one
   */
  mergeSnapshot(otherSnapshot: FFSnapshot): FFSnapshot {
    this.count += otherSnapshot.count;

    // Update count
    const currentPos = this.position;
    this.position = 9; // 5 (packet header) + 4 (reserved) = 9
    this.writeInt16(this.count);
    this.position = currentPos;

    // Copy snapshot content
    const content = otherSnapshot.getContent();
    this.writeBuffer(content);

    return this;
  }

  /**
   * Get snapshot content (data after headers)
   */
  getContent(): Buffer {
    return this.buffer.subarray(11); // 5 (packet header) + 4 (reserved) + 2 (count) = 11
  }

  /**
   * Get the count of snapshots
   */
  getCount(): number {
    return this.count;
  }
}