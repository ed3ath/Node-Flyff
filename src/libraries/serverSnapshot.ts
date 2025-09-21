import { PacketType } from "../protocol/packetType";
import { SnapshotType } from "../protocol/snapshotType";
import { ServerPacket } from "./serverPacket";

/**
 * Server-side snapshot implementation using proper Form #3 packet structure
 */
export class ServerSnapshot extends ServerPacket {
  private snapshotCount: number = 0;
  private snapshotCountPosition: number;

  constructor() {
    super();

    // Write packet type for snapshot
    this.writeUInt32LE(PacketType.SNAPSHOT);

    // Write DPID (placeholder - will be set when sending)
    this.writeUInt32LE(0);

    // Write snapshot count (placeholder - will be updated)
    this.snapshotCountPosition = this.buffer.length;
    this.writeUInt16LE(0);
  }

  /**
   * Add a snapshot to this packet following C++ format exactly:
   * ObjectID << SnapshotType << ObjectType << ObjectIndex << SerializedData
   */
  addSnapshot(snapshotType: SnapshotType, objectId: number, objectType: number, objectIndex: number, serializedData: Buffer): void {
    // Write object ID (DWORD)
    this.writeUInt32LE(objectId);

    // Write snapshot type (USHORT)
    this.writeUInt16LE(snapshotType);

    // Write object type (BYTE)
    this.writeByte(objectType);

    // Write object index (DWORD)
    this.writeUInt32LE(objectIndex);

    // Write serialized object data
    this.writeBytes(serializedData);

    // Increment snapshot count
    this.snapshotCount++;
  }

  /**
   * Finalize the snapshot packet
   */
  finalize(dpidUser: number = 0): Buffer {
    // Update DPID
    this.buffer.writeUInt32LE(dpidUser, 9); // Position after packet type

    // Update snapshot count
    this.buffer.writeUInt16LE(this.snapshotCount, this.snapshotCountPosition);

    // Call parent finalize to update length
    return super.finalize();
  }

  /**
   * Get snapshot count
   */
  getSnapshotCount(): number {
    return this.snapshotCount;
  }
}