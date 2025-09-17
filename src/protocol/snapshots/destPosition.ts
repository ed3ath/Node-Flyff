import { SnapshotType } from "../../common/snapshotType";
import { Mover } from "../../entities/mover";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class DestPositionSnapshot extends FlyffSnapshot {
    constructor(mover: Mover) {
        super(SnapshotType.DEST_POS, mover.objectId);
        this.writeSingle(mover.destinationPosition.x);
        this.writeSingle(mover.destinationPosition.y);
        this.writeSingle(mover.destinationPosition.z);
        this.writeByte(1);
    }
}