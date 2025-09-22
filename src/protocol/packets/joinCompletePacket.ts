import { FlyffPacket } from "../../libraries/flyffPacket";
import { PacketType } from "../packetType";
import { FlyffSnapshot } from "../../libraries/snapshot";

/**
 * JOIN_COMPLETE packet for completing the join process
 * Based on Rhisis JoinCompletePacket
 */
export class JoinCompletePacket extends FlyffPacket {
  constructor() {
    super(PacketType.JOIN_COMPLETE);
  }

  /**
   * Add snapshots to the join complete packet
   */
  addSnapshots(...snapshots: FlyffSnapshot[]): void {
    this.writeInt32(snapshots.length);

    for (const snapshot of snapshots) {
      // Write snapshot data directly to this packet
      const snapshotBuffer = snapshot.buffer;
      this.writeBytes(snapshotBuffer);
    }
  }
}