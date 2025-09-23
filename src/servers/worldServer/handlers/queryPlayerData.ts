import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { QueryPlayerDataSnapshot } from "../../../protocol/snapshots/queryPlayerData";
import { WorldUser } from "../worldUser";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";

/**
 * QUERY_PLAYER_DATA packet handler (0xf000f802)
 * Purpose: Send player's detailed data to client
 * Called when client needs to refresh player information
 */
@SetPacketType(PacketType.QUERY_PLAYER_DATA)
export default class QueryPlayerDataHandler extends PacketHandler {
  playerId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.playerId = packet.readInt32();
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn("QUERY_PLAYER_DATA: Player not found for user connection");
      return;
    }

    this.logger.info(`QUERY_PLAYER_DATA request from ${player.name} for player ID: ${this.playerId} (player's actual ID: ${player.objectId})`);

    // If no specific player ID is provided, or player is requesting their own data
    const isSelfRequest = (this.playerId === 0 || this.playerId === player.objectId);
    this.logger.debug(`QUERY_PLAYER_DATA: isSelfRequest = ${isSelfRequest} (${this.playerId} === 0 || ${this.playerId} === ${player.objectId})`);

    if (isSelfRequest) {
      try {
        // Create and send player data snapshot
        const queryPlayerDataSnapshot = new QueryPlayerDataSnapshot(player);
        this.userConnection.sendSnapshot(queryPlayerDataSnapshot);

        WorldPacketLogger.logQueryPlayerData(
          player.name,
          this.playerId,
          "self"
        );

        this.logger.info(`✓ QUERY_PLAYER_DATA: Sent player data snapshot for ${player.name}`);
      } catch (error) {
        this.logger.error(`QUERY_PLAYER_DATA: Failed to send player data snapshot: ${error}`);
      }
    } else {
      // Player is requesting data for another player
      const mapLayer = player.mapLayer;
      if (!mapLayer) {
        this.logger.warn(`QUERY_PLAYER_DATA: No map layer found for player ${player.name}`);
        return;
      }

      // Find the target player
      const targetObject = mapLayer.getObjectById(this.playerId);
      if (!targetObject || !('name' in targetObject)) {
        this.logger.warn(`QUERY_PLAYER_DATA: Target player with ID ${this.playerId} not found`);
        return;
      }

      try {
        // Send the target player's data
        const queryPlayerDataSnapshot = new QueryPlayerDataSnapshot(targetObject as any);
        this.userConnection.sendSnapshot(queryPlayerDataSnapshot);

        WorldPacketLogger.logQueryPlayerData(
          player.name,
          this.playerId,
          (targetObject as any).name
        );

        this.logger.info(`✓ QUERY_PLAYER_DATA: Sent player data snapshot for ${(targetObject as any).name} to ${player.name}`);
      } catch (error) {
        this.logger.error(`QUERY_PLAYER_DATA: Failed to send target player data snapshot: ${error}`);
      }
    }
  }
}