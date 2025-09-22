import { SnapshotType } from "../../protocol/snapshotType";
import { Player } from "../../entities/player";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class QueryPlayerDataSnapshot extends FlyffSnapshot {
  constructor(player: Player) {
    super(SnapshotType.QUERY_PLAYER_DATA, player.objectId);

    // Write player's detailed data for client
    this.writeInt32(player.objectId); // Player object ID
    this.writeString(player.name); // Player name

    // Write player stats
    this.writeInt32(player.statistics?.strength || 15);
    this.writeInt32(player.statistics?.stamina || 15);
    this.writeInt32(player.statistics?.dexterity || 15);
    this.writeInt32(player.statistics?.intelligence || 15);

    // Write health/mana/fatigue
    this.writeInt32(player.health?.hp || 100);
    this.writeInt32(player.health?.maxHp || 100);
    this.writeInt32(player.health?.mp || 100);
    this.writeInt32(player.health?.maxMp || 100);
    this.writeInt32(player.health?.fp || 100);
    this.writeInt32(player.health?.maxFp || 100);

    // Write level and experience
    this.writeInt32(player.level || 1);
    this.writeInt32((player.experience as any)?.currentExp || 0);
    this.writeInt32((player.experience as any)?.requiredExp || 1000);

    // Write job information
    this.writeInt32(player.job?.id || 0);
    this.writeInt32(player.availablePoints || 0);
    this.writeInt32(player.skillPoints || 0);

    // Write gold
    this.writeInt32((player.gold as any)?.amount || 0);

    // Write position info
    this.writeSingle(player.position.x);
    this.writeSingle(player.position.y);
    this.writeSingle(player.position.z);
    this.writeSingle(player.rotationAngle || 0);

    // Write map ID
    this.writeInt32((player as any).mapId || player.map?.id || 1);

    // Write appearance
    this.writeByte(player.appearance?.gender || 0);
    this.writeInt32(player.appearance?.skinSetId || 0);
    this.writeInt32(player.appearance?.hairId || 0);
    this.writeInt32(player.appearance?.hairColor || 0);
    this.writeInt32(player.appearance?.faceId || 0);

    // Write guild/party info (default to none for now)
    this.writeInt32(0); // Guild ID
    this.writeString(""); // Guild name
    this.writeInt32(0); // Party ID
    this.writeByte(0); // Party member count

    // Write PK/PVP status
    this.writeByte(0); // PK mode
    this.writeInt32(0); // PK value
    this.writeInt32(0); // Fame

    // Write additional flags
    this.writeByte(1); // Is alive
    this.writeByte(0); // Is flying
    this.writeByte(0); // Is in duel
  }
}