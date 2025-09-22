import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";

/**
 * SET_LEVEL snapshot for level up notifications
 * Based on Rhisis SetLevelSnapshot
 */
export class SetLevelSnapshot extends FlyffSnapshot {
  constructor(player: Player, level: number) {
    super(SnapshotType.SET_LEVEL, player.objectId);

    // Write level data like C# implementation
    this.writeInt32(level); // New level
  }
}