import { SnapshotType } from "../protocol/snapshotType";
import { PacketType } from "../protocol/packetType";
import { FlyffPacket } from "./flyffPacket";

/**
 * Abstract base class for FlyFF snapshots
 * Based on Rhisis.Protocol.FFSnapshot
 *
 * Structure matches C# implementation:
 * - Extends FlyffPacket with SNAPSHOT type
 * - Constructor takes SnapshotType and ObjectId
 * - Subclasses implement their specific data writing
 */
export abstract class AbstractSnapshot extends FlyffPacket {
  protected objectId: number;
  protected snapshotType: SnapshotType;

  /**
   * Creates a new snapshot
   * @param snapshotType The type of snapshot
   * @param objectId The object ID this snapshot is for
   */
  protected constructor(snapshotType: SnapshotType, objectId: number) {
    super(PacketType.SNAPSHOT);

    this.snapshotType = snapshotType;
    this.objectId = objectId;

    // Write snapshot packet structure:
    // Reserved (4 bytes) + Count (2 bytes) + ObjectId (4 bytes) + SnapshotType (2 bytes)
    this.writeInt32(0); // Reserved
    this.writeInt16(1); // Count (always 1 for single snapshot)
    this.writeUInt32(objectId); // Object ID
    this.writeInt16(snapshotType); // Snapshot Type

    // Note: writeSnapshotData() will be called manually by subclasses after super()
  }

  /**
   * Method to finalize the snapshot after construction
   * Call this after setting all properties in the subclass
   */
  protected finalizeSnapshot(): void {
    this.writeSnapshotData();
  }

  /**
   * Abstract method that subclasses must implement to write their specific data
   * This is called after the basic snapshot structure is written
   */
  protected abstract writeSnapshotData(): void;

  /**
   * Gets the object ID for this snapshot
   */
  getObjectId(): number {
    return this.objectId;
  }

  /**
   * Gets the snapshot type
   */
  getSnapshotType(): SnapshotType {
    return this.snapshotType;
  }

  /**
   * Dispose method for compatibility with C# pattern
   * In TypeScript, this is mainly for interface compatibility
   */
  dispose(): void {
    // Nothing to dispose in TypeScript, but keeping for C# compatibility
  }
}