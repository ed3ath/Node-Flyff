import { PacketType } from "../protocol/packetType";
import { SnapshotType } from "../protocol/snapshotType";
import { BinaryStream } from "./binaryStream";
import { FlyffPacket } from "./flyffPacket";

export class FlyffSnapshot extends FlyffPacket {
  static readonly SnapshotHeaderOffset: number = 1 + 4;
  static readonly SnapshotAmountOffset: number =
    FlyffSnapshot.SnapshotHeaderOffset + 4 + 4;
  static readonly SnapshotContentOffset: number =
    FlyffSnapshot.SnapshotAmountOffset + 2;

  count: number;

  constructor();
  constructor(snapshots: FlyffSnapshot[]);
  constructor(snapshot: SnapshotType, objectId: number);
  constructor(param1?: FlyffSnapshot[] | SnapshotType, param2?: number) {
    super(PacketType.SNAPSHOT);
    if (param1 instanceof Array) {
      for (const snapshot of param1) {
        this.mergeSnapshots(snapshot);
      }
    } else if (param1 && param2) {
      this.count = 0;
      this.writeInt32(0);
      this.writeInt16(++this.count);
      this.writeUInt32(param2);
      this.writeUInt16(param1);
    } else {
      this.count = 0;
      this.writeInt32(0);
      this.writeInt16(this.count);
    }
  }
  mergeSnapshots(snapshot: FlyffSnapshot) {
    this.merge(snapshot.buffer);
  }

  getContent(): Buffer {
    return this.getSnapshotContent(this);
  }

  private getSnapshotContent(snapshot: FlyffSnapshot): Buffer {
    const snapshotBuffer = snapshot.buffer;
    return snapshotBuffer.subarray(FlyffSnapshot.SnapshotContentOffset);
  }
}
