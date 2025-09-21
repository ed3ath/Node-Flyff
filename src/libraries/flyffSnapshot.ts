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
  static readonly SnapshotAmountOffset = FFSnapshot.SnapshotHeaderOffset + 4 + 4;
  static readonly SnapshotContentOffset = FFSnapshot.SnapshotAmountOffset + 2;

  private count: number = 0;

  constructor() {
    super(PacketType.SNAPSHOT);
    this.writeInt32LE(0); // Reserved
    this.writeInt16LE(this.count); // Count
  }

  /**
   * Creates snapshot with single snapshot data
   */
  static createSingle(snapshotType: SnapshotType, objectId: number): FFSnapshot {
    const snapshot = new FFSnapshot();
    snapshot.count = 1;

    // Update count at correct position (after PacketType + Reserved)
    const currentPos = snapshot.position;
    snapshot.position = 9; // 5 (packet header) + 4 (reserved) = 9
    snapshot.writeInt16LE(snapshot.count);
    snapshot.position = currentPos;

    // Write snapshot data
    snapshot.writeUInt32LE(objectId);
    snapshot.writeInt16LE(snapshotType);

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
    this.writeInt16LE(this.count);
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

/**
 * Abstract base class for individual snapshot content
 * Used to build data that gets added to FFSnapshot
 */
export abstract class BaseSnapshot {
  private objectId: number;
  private snapshotType: SnapshotType;
  private dataBuffer: Buffer;

  constructor(objectId: number, snapshotType: SnapshotType) {
    this.objectId = objectId;
    this.snapshotType = snapshotType;

    // Initialize dataBuffer - will be set by buildData()
    this.dataBuffer = Buffer.alloc(0);
  }

  /**
   * Build the data buffer - call this after constructor
   */
  protected buildData(): void {
    // Create data buffer using FlyffPacket for consistency
    const tempPacket = new FlyffPacket(PacketType.SNAPSHOT);
    this.writeDataToPacket(tempPacket);
    this.dataBuffer = tempPacket.buffer.subarray(5); // Skip packet headers
  }

  /**
   * Abstract method for subclasses to write their data
   */
  protected abstract writeDataToPacket(packet: FlyffPacket): void;

  /**
   * Create a complete FFSnapshot containing this snapshot
   */
  toFFSnapshot(): FFSnapshot {
    const snapshot = FFSnapshot.createSingle(this.snapshotType, this.objectId);
    snapshot.writeBuffer(this.dataBuffer);
    return snapshot;
  }

  /**
   * Get the object ID
   */
  getObjectId(): number {
    return this.objectId;
  }

  /**
   * Get the snapshot type
   */
  getSnapshotType(): SnapshotType {
    return this.snapshotType;
  }

  /**
   * Get the data buffer
   */
  getDataBuffer(): Buffer {
    return this.dataBuffer;
  }
}