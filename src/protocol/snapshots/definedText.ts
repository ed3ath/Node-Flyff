import { WorldObject } from "../../game/world/worldObject";
import { DefineText } from "../../game/definitions/defineText";
import { SnapshotType } from "../../protocol/snapshotType";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class DefinedTextSnapshot extends FlyffSnapshot {
    constructor(worldObject: WorldObject, textId: DefineText, ...parameters: any[]) {
        super(parameters.length > 0 ? SnapshotType.DEFINED_TEXT : SnapshotType.DEFINED_TEXT, worldObject.objectId);

        this.writeInt32(textId);
        this.writeString(parameters.join(" "));
    }
}
