import { SnapshotType } from "../../protocol/snapshotType";
import { Player } from "../../entities/player";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class WorldReadInfoSnapshot extends FlyffSnapshot {
  constructor(player: Player) {
    super(SnapshotType.WORLD_READINFO, player.objectId);

    // Write world ID and position (client expects: DWORD dwWorldId + D3DXVECTOR3 vPos)
    this.writeInt32((player as any).mapId || player.map?.id || 1); // World/Map ID
    this.writeSingleLE(player.position.x);
    this.writeSingleLE(player.position.y);
    this.writeSingleLE(player.position.z);
    // Note: Client only expects worldId + position(x,y,z), no rotation angle here
  }
}