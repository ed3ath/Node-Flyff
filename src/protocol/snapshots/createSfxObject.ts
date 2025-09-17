import { WorldObject } from "../../abstract/worldObject";
import { DefineSpecialEffects } from "../../common/defineSpecialEffects";
import { SnapshotType } from "../../common/snapshotType";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class CreateSfxObjectSnapshot extends FlyffSnapshot {
  constructor(
    worldObject: WorldObject,
    specialEffect: DefineSpecialEffects,
    followObject: boolean = true
  ) {
    super(SnapshotType.CREATE_SFX_OBJ, worldObject.objectId);

    this.writeInt32(specialEffect);

    if (followObject) {
      this.writeSingle(0);
      this.writeSingle(0);
      this.writeSingle(0);
    } else {
      this.writeSingle(worldObject.position.x);
      this.writeSingle(worldObject.position.y);
      this.writeSingle(worldObject.position.z);
    }
  }
}
