import { PacketType } from "../protocol/packetType";
import { ServerPacket } from "./serverPacket";

/**
 * Join complete packet implementation following C# Rhisis structure
 * PacketType.JOIN with embedded snapshots
 */
export class JoinCompletePacket extends ServerPacket {
  private snapshots: Buffer[] = [];

  constructor() {
    super();

    // Write packet type for JOIN (not SNAPSHOT!)
    this.writeUInt32LE(PacketType.JOIN);
  }

  /**
   * Add snapshot data to this JOIN packet
   */
  addSnapshot(snapshotData: Buffer): void {
    this.snapshots.push(snapshotData);
  }

  /**
   * Finalize the packet following C# structure
   */
  finalize(dpidUser: number = 0): Buffer {
    // Write the JOIN packet structure (matching C# JoinCompletePacket)
    this.writeUInt32LE(0); // Not used (C# line 18)
    this.writeUInt16LE(this.snapshots.length); // Snapshot count (C# line 19)

    // Write all snapshot data (C# lines 21-28)
    for (const snapshotData of this.snapshots) {
      this.writeBytes(snapshotData);
    }

    // Call parent finalize to update length
    return super.finalize();
  }

  /**
   * Get snapshot count
   */
  getSnapshotCount(): number {
    return this.snapshots.length;
  }
}