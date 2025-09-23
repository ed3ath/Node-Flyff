import { SnapshotType } from "../../protocol/snapshotType";
import { Player } from "../../entities/player";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class AddFriendGameJoinSnapshot extends FlyffSnapshot {
  constructor(player: Player) {
    super(SnapshotType.ADD_FRIEND_GAME_JOIN, player.objectId);

    // Write player name for friend notifications
    this.writeString(player.name);

    // Write player's current map and channel info
    this.writeInt32((player as any).mapId || player.map?.id || 1); // Map ID
    this.writeInt32(1); // Channel ID (default to 1)

    // Write player's online status
    this.writeByte(1); // Online status (1 = online)

    // Write player level for friend list display
    this.writeInt32(player.level || 1);

    // Write job for friend list display
    this.writeInt32(player.job?.id || 0);

    // Write gender for display
    this.writeByte(player.appearence?.gender || 0);

    // Write timestamp of login
    this.writeInt32(Math.floor(Date.now() / 1000)); // Current timestamp

    // Write messenger state (0 = normal, 1 = away, 2 = busy, etc.)
    this.writeByte(0); // Normal messenger state
  }
}