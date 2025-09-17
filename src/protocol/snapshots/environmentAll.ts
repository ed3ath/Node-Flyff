import { SnapshotType } from "../../common/snapshotType";
import { Player } from "../../entities/player";
import { FlyffSnapshot } from "../../libraries/snapshot";

export enum SeasonType {
  None = 0,
  Spring = 1,
  Summer = 2,
  Autumn = 3,
  Winter = 4
}

export class EnvironmentAllSnapshot extends FlyffSnapshot {
  constructor(player: Player, season: SeasonType = SeasonType.None) {
    super(SnapshotType.ENVIRONMENT_ALL, player.objectId);
    this.writeInt32(season);
  }
}