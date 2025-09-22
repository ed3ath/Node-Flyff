import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";

/**
 * SET_EXPERIENCE snapshot for updating player experience
 * Based on Rhisis SetExperienceSnapshot
 */
export class SetExperienceSnapshot extends FlyffSnapshot {
  constructor(player: Player) {
    super(SnapshotType.SET_EXPERIENCE, player.objectId);

    // Write experience data like C# implementation
    this.writeInt32((player.experience as any)?.amount || 0); // Current experience
    this.writeInt32(player.level || 1); // Current level
  }
}