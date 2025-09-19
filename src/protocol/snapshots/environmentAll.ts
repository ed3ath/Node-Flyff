import { SnapshotType } from "../../protocol/snapshotType";
import { Player } from "../../entities/player";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class EnvironmentAllSnapshot extends FlyffSnapshot {
  constructor(player: Player, rain: boolean = false, snow: boolean = false) {
    super(SnapshotType.ENVIRONMENT_ALL, player.objectId);
    // Send rain and snow boolean values as expected by client OnEnvironmentAll
    this.writeInt32(rain ? 1 : 0); // m_bRain
    this.writeInt32(snow ? 1 : 0); // m_bSnow
  }
}