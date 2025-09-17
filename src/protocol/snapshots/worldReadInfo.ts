import { SnapshotType } from "../../common/snapshotType";
import { Player } from "../../entities/player";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class WorldReadInfoSnapshot extends FlyffSnapshot {
  constructor(player: Player) {
    super(SnapshotType.WORLD_READINFO, player.objectId);

    // Write player's current map and position information
    this.writeInt32((player as any).mapId || player.map?.id || 1); // mapId
    this.writeSingleLE(player.position.x);
    this.writeSingleLE(player.position.y);
    this.writeSingleLE(player.position.z);
    this.writeSingleLE(player.rotationAngle || 0);
  }
}