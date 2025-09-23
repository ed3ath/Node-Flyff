import { PacketType } from "../../../protocol/packetType";
import { SnapshotType } from "../../../protocol/snapshotType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { FlyffSnapshot } from "../../../libraries/snapshot";
import { Vector3 } from "../../../abstract/vector3";
import { WorldUser } from "../worldUser";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";
import { PlayerDataService } from "../../../services/playerDataService";

/**
 * PLAYERCORR packet handler (0xffffff05)
 * Purpose: Position correction for client-server sync and anti-cheat
 * C++ Reference: Movement correction system
 */
@SetPacketType(PacketType.PLAYERCORR)
export default class PlayerCorrHandler extends PacketHandler {
  positionX: number;
  positionY: number;
  positionZ: number;
  angle: number;
  frame: number;

  constructor(packet: FlyffPacket) {
    super();
    this.positionX = packet.readSingle();
    this.positionY = packet.readSingle();
    this.positionZ = packet.readSingle();
    this.angle = packet.readSingle();
    this.frame = packet.readInt32();
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn("PLAYERCORR: Player not found for user connection");
      return;
    }

    const clientPosition = new Vector3(this.positionX, this.positionY, this.positionZ);
    const serverPosition = player.position;

    // Calculate distance between client and server positions
    const distance = serverPosition.distanceTo(clientPosition);

    // Position correction threshold (adjust based on game requirements)
    const correctionThreshold = 5.0; // Allow 5 units difference
    const maxSpeed = 10.0; // Maximum allowed speed per frame
    const timeThreshold = 1000; // Maximum time between updates (ms)

    this.logger.debug(`PLAYERCORR from ${player.name}: Client(${this.positionX.toFixed(2)}, ${this.positionY.toFixed(2)}, ${this.positionZ.toFixed(2)}) Server(${serverPosition.x.toFixed(2)}, ${serverPosition.y.toFixed(2)}, ${serverPosition.z.toFixed(2)}) Distance: ${distance.toFixed(2)}`);

    // Check for impossible movement (teleportation/speed hack detection)
    const timeDelta = Date.now() - (player.lastUpdateTime || Date.now());
    const maxAllowedDistance = (maxSpeed * timeDelta) / 1000;

    if (distance > maxAllowedDistance && timeDelta < timeThreshold) {
      this.logger.warn(`PLAYERCORR: Possible speed hack detected for ${player.name}. Distance: ${distance.toFixed(2)}, Max allowed: ${maxAllowedDistance.toFixed(2)}, Time delta: ${timeDelta}ms`);

      // Send position correction back to client (force them to server position)
      try {
        const correctionSnapshot = new FlyffSnapshot(SnapshotType.MOVERCORR, player.objectId);
        correctionSnapshot.writeSingle(serverPosition.x);
        correctionSnapshot.writeSingle(serverPosition.y);
        correctionSnapshot.writeSingle(serverPosition.z);
        correctionSnapshot.writeSingle(player.rotationAngle || 0);
        correctionSnapshot.writeInt32(this.frame);

        this.userConnection.sendSnapshot(correctionSnapshot);

        WorldPacketLogger.logPlayerCorrectionForced(
          player.name,
          clientPosition,
          serverPosition,
          distance,
          "speed_hack_detected"
        );

        this.logger.info(`✓ PLAYERCORR: Forced position correction sent to ${player.name}`);
        return;
      } catch (error) {
        this.logger.error(`PLAYERCORR: Failed to send correction snapshot: ${error}`);
        return;
      }
    }

    // Check if correction is needed
    if (distance > correctionThreshold) {
      // Send position correction back to client
      try {
        const correctionSnapshot = new FlyffSnapshot(SnapshotType.MOVERCORR, player.objectId);
        correctionSnapshot.writeSingle(serverPosition.x);
        correctionSnapshot.writeSingle(serverPosition.y);
        correctionSnapshot.writeSingle(serverPosition.z);
        correctionSnapshot.writeSingle(player.rotationAngle || 0);
        correctionSnapshot.writeInt32(this.frame);

        this.userConnection.sendSnapshot(correctionSnapshot);

        WorldPacketLogger.logPlayerCorrectionForced(
          player.name,
          clientPosition,
          serverPosition,
          distance,
          "position_mismatch"
        );

        this.logger.info(`✓ PLAYERCORR: Position correction sent to ${player.name} (distance: ${distance.toFixed(2)})`);
      } catch (error) {
        this.logger.error(`PLAYERCORR: Failed to send correction snapshot: ${error}`);
      }
    } else {
      // Position is acceptable, update server position
      player.position.x = this.positionX;
      player.position.y = this.positionY;
      player.position.z = this.positionZ;
      player.rotationAngle = this.angle;
      player.lastUpdateTime = Date.now();

      // Save position to database periodically (every 30 seconds or significant movement)
      this.savePositionIfNeeded(player);

      WorldPacketLogger.logPlayerCorrectionAccepted(
        player.name,
        clientPosition,
        distance
      );

      this.logger.debug(`✓ PLAYERCORR: Position accepted for ${player.name} (distance: ${distance.toFixed(2)})`);
    }
  }

  /**
   * Save player position to database if enough time has passed or significant movement occurred
   */
  private async savePositionIfNeeded(player: any): Promise<void> {
    const now = Date.now();
    const lastSaveTime = (player as any).lastPositionSave || 0;
    const timeSinceLastSave = now - lastSaveTime;

    // Save every 30 seconds or if player moved more than 50 units since last save
    const shouldSaveByTime = timeSinceLastSave > 30000; // 30 seconds
    const lastSavedPosition = (player as any).lastSavedPosition;
    let shouldSaveByDistance = false;

    if (lastSavedPosition) {
      const distanceSinceLastSave = player.position.distanceTo(lastSavedPosition);
      shouldSaveByDistance = distanceSinceLastSave > 50; // 50 units
    } else {
      shouldSaveByDistance = true; // First time, always save
    }

    if (shouldSaveByTime || shouldSaveByDistance) {
      try {
        const playerDataService = PlayerDataService.getInstance();
        await playerDataService.savePlayerPosition(player);

        // Update tracking variables
        (player as any).lastPositionSave = now;
        (player as any).lastSavedPosition = player.position.clone();

        this.logger.debug(`Saved position for ${player.name} (time: ${shouldSaveByTime}, distance: ${shouldSaveByDistance})`);
      } catch (error) {
        this.logger.error(`Failed to save position for ${player.name}: ${error}`);
      }
    }
  }
}