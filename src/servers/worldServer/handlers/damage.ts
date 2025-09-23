import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { DamageSnapshot, DamageType } from "../../../protocol/snapshots/damage";
import { WorldUser } from "../worldUser";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";

/**
 * DAMAGE packet handler (0x00ff000c)
 * Purpose: Process and broadcast damage events
 * C++ Reference: Combat damage system
 */
@SetPacketType(PacketType.DAMAGE)
export default class DamageHandler extends PacketHandler {
  targetId: number;
  damage: number;
  damageType: number;
  attackerId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.targetId = packet.readInt32();
    this.damage = packet.readInt32();
    this.damageType = packet.readByte();
    this.attackerId = packet.readInt32();
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn("DAMAGE: Player not found for user connection");
      return;
    }

    this.logger.info(`DAMAGE from ${player.name}: Target=${this.targetId}, Damage=${this.damage}, Type=${this.damageType}, Attacker=${this.attackerId}`);

    // Validate damage parameters
    if (this.targetId <= 0) {
      this.logger.warn(`DAMAGE: Invalid target ID ${this.targetId}`);
      return;
    }

    if (this.damage < 0) {
      this.logger.warn(`DAMAGE: Invalid damage amount ${this.damage}`);
      return;
    }

    // Get the world map layer
    const mapLayer = player.mapLayer;
    if (!mapLayer) {
      this.logger.warn(`DAMAGE: No map layer found for player ${player.name}`);
      return;
    }

    // Find the target object
    const target = mapLayer.getObjectById(this.targetId);
    if (!target) {
      this.logger.warn(`DAMAGE: Target with ID ${this.targetId} not found in map layer`);
      return;
    }

    // Validate attacker (should be the player sending the packet or authorized source)
    if (this.attackerId !== player.objectId && this.attackerId !== 0) {
      this.logger.warn(`DAMAGE: Player ${player.name} attempted to send damage for different attacker ${this.attackerId}`);
      return;
    }

    try {
      // Check if target has health (is a Mover)
      if (!('health' in target && 'isDead' in target)) {
        this.logger.warn(`DAMAGE: Target ${this.targetId} is not a valid damage target`);
        return;
      }

      // Process damage on server side
      const actualDamage = this.calculateActualDamage(player, target, this.damage);
      const actualDamageType = this.determineDamageType(actualDamage, this.damage);

      // Apply damage to target (cast to Mover-like object)
      const moverTarget = target as any;
      if (moverTarget.health) {
        const oldHp = moverTarget.health.hp;
        moverTarget.health.hp = Math.max(0, moverTarget.health.hp - actualDamage);

        // Check if target is killed
        if (moverTarget.health.hp === 0 && oldHp > 0) {
          moverTarget.isDead = true;
          this.logger.info(`DAMAGE: Target ${target.name || target.objectId} was killed by ${player.name}`);
        }
      }

      // Create damage snapshot for visual feedback
      const damageSnapshot = new DamageSnapshot(this.targetId, actualDamage, actualDamageType);

      // Get all players in view range to broadcast damage
      const playersInRange = mapLayer.getPlayersInRange(target.position, 32); // 32 unit view range

      // Broadcast damage to all players in range
      for (const nearbyPlayer of playersInRange) {
        if (nearbyPlayer.userConnection) {
          nearbyPlayer.userConnection.sendSnapshot(damageSnapshot);
        }
      }

      WorldPacketLogger.logDamageHandler(
        player.name,
        this.targetId,
        target.name || "Unknown",
        actualDamage,
        actualDamageType,
        moverTarget.health?.hp || 0,
        moverTarget.isDead
      );

      this.logger.info(`✓ DAMAGE: Processed ${actualDamage} damage to ${target.name || target.objectId} from ${player.name}, broadcasted to ${playersInRange.length} players`);
    } catch (error) {
      this.logger.error(`DAMAGE: Failed to process damage: ${error}`);
    }
  }

  /**
   * Calculate actual damage based on attacker stats, target defense, etc.
   * This is a simplified version - expand based on game mechanics
   */
  private calculateActualDamage(attacker: any, target: any, requestedDamage: number): number {
    // Basic damage validation
    if (requestedDamage <= 0) return 0;

    // For now, accept client damage but add basic validation
    // In a full implementation, calculate damage server-side based on:
    // - Attacker's attack power
    // - Target's defense
    // - Weapon stats
    // - Skill modifiers
    // - Critical hit chance
    // - etc.

    const maxDamage = 9999; // Maximum damage cap
    return Math.min(requestedDamage, maxDamage);
  }

  /**
   * Determine the actual damage type based on calculations
   */
  private determineDamageType(actualDamage: number, requestedDamage: number): DamageType {
    // If damage was reduced significantly, it might be a block/miss
    if (actualDamage === 0) return DamageType.MISS;
    if (actualDamage < requestedDamage * 0.5) return DamageType.BLOCK;

    // Check for critical hit (simplified logic)
    if (actualDamage > requestedDamage * 1.5) return DamageType.CRITICAL;

    // Default to normal damage
    return DamageType.NORMAL;
  }
}