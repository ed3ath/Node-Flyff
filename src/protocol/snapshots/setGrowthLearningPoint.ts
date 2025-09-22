import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";

/**
 * SET_GROWTH_LEARNING_POINT snapshot for stat/skill points
 * Based on Rhisis SetGrowthLearningPointSnapshot
 */
export class SetGrowthLearningPointSnapshot extends FlyffSnapshot {
  constructor(player: Player) {
    super(SnapshotType.SET_GROWTH_LEARNING_POINT, player.objectId);

    // Write learning points data like C# implementation
    this.writeInt32(player.availablePoints || 0); // Available stat points
    this.writeInt32(player.skillPoints || 0); // Available skill points
  }
}