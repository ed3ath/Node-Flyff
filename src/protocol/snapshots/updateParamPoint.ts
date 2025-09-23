import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";
import { Mover } from "../../entities/mover";
import { DefineAttributes } from "../../game/definitions/defineAttributes";

/**
 * UPDATE_PARAM_POINT snapshot for updating player parameters like gold, stats, etc.
 * Based on Rhisis UpdateParamPointSnapshot
 */
export class UpdateParamPointSnapshot extends FlyffSnapshot {
  constructor(player: Player | Mover, attribute: DefineAttributes, value: number) {
    super(SnapshotType.SET_POINT_PARAM, player.objectId);

    this.writeInt32(attribute); // Attribute type (DST_GOLD, etc.)
    this.writeInt32(value);     // New value
  }
}