import { Attributes } from "../game/mechanics/attributes";
import { AttackResult } from "../game/battle/attackResult";
import { Buffs } from "../game/mechanics/buffs";
import { Defense } from "../game/mechanics/defense";
import { Delayer } from "../abstract/delayer";
import { Health } from "../game/mechanics/health";
import { Projectile } from "../game/mechanics/projectile";
import { ProjectileList } from "../game/mechanics/projectileList";
import { Statistics } from "../game/mechanics/statistics";
import { Vector3 } from "../abstract/vector3";
import { WorldObject } from "../game/world/worldObject";
import { AttackFlags } from "../types/attackFlag";
import { AttackType } from "../types/attackType";
import { DefineAttributes } from "../game/definitions/defineAttributes";
import { Item } from "../game/mechanics/item";
import { ModeType } from "../types/modeType";
import { ObjectMessageType } from "../types/objectMessageType";
import { ObjectState } from "../types/objectState";
import { StateFlags } from "../types/stateFlags";
import { WorldObjectType } from "../types/worldObjectType";
import { isMeleeAttack } from "../helpers/rangeAttack";
import { timeInSeconds } from "../helpers/time";
import { MoverProperties } from "../interfaces/resource";
import { DestPositionSnapshot } from "../protocol/snapshots/destPosition";
import { MotionSnapshot } from "../protocol/snapshots/motion";
import { MoverSetDestObjectSnapshot } from "../protocol/snapshots/moverSetDestObject";
import { MapItemObject } from "./mapItemObject";

export class Mover extends WorldObject {
  public get type(): WorldObjectType {
    return WorldObjectType.Mover;
  }

  public readonly properties: MoverProperties;
  public readonly health: Health;
  public readonly attributes: Attributes;
  public readonly statistics: Statistics;
  public readonly defense: Defense;
  public readonly delayer: Delayer = new Delayer();
  public readonly buffs: Buffs;

  protected constructor(properties: MoverProperties) {
    super();
    this.properties = properties ?? (() => { throw new Error("Cannot create a mover with no properties."); })();
    this.attributes = new Attributes(this);
    this.statistics = new Statistics(this);
    this.health = new Health(this);
    this.defense = new Defense(this);
    this.buffs = new Buffs(this);
  }

  public speedFactor: number = 1;
  public destinationPosition: Vector3 = new Vector3();
  public level: number = 0;
  public followTarget: WorldObject | null = null;
  public followDistance: number = 0;
  public target: Mover | null = null;
  public isFighting: boolean = false;

  public get speed(): number {
    return (
      ((this.properties.fSpeed || 0.1) +
        this.attributes.get(DefineAttributes.DST_SPEED) / 100) *
      this.speedFactor
    );
  }

  public get isDead(): boolean {
    return this.health.hp <= 0;
  }

  public get isMoving(): boolean {
    return (
      (this.objectState & ObjectState.OBJSTA_MOVE_ALL) !== 0 &&
      !this.destinationPosition.isZero()
    );
  }

  public get isFollowing(): boolean {
    return this.followTarget !== null;
  }

  public readonly projectiles: ProjectileList = new ProjectileList();

  public move(x: number, y: number, z: number): void {
    this.objectState |= ObjectState.OBJSTA_FMOVE;
    this.objectState &= ~ObjectState.OBJSTA_STAND;
    this.destinationPosition = new Vector3(x, y, z);
    this.rotationAngle = Vector3.angleBetween(
      this.position,
      this.destinationPosition
    );

    const packet = new DestPositionSnapshot(this);
    this.sendToVisible(packet);
  }

  public stopMoving(): void {
    this.objectState &= ~ObjectState.OBJSTA_FMOVE;
    this.objectState |= ObjectState.OBJSTA_STAND;

    this.destinationPosition.reset();
    this.onArrived();
  }

  public follow(target: WorldObject, distance: number = 1): void {
    this.followTarget = target;
    this.followDistance = distance;
    this.destinationPosition.copy(target.position);
    this.objectState &= ~ObjectState.OBJSTA_STAND;
    this.objectState |= ObjectState.OBJSTA_FMOVE;

    const snapshot = new MoverSetDestObjectSnapshot(this, target, distance);
    this.sendToVisible(snapshot);
  }

  public unfollow(): void {
    this.followTarget = null;
    this.followDistance = 0;
  }

  public sendMotion(
    motion: ObjectMessageType,
    sendToSelf: boolean = true
  ): void {
    const snapshot = new MotionSnapshot(this, motion);
    this.sendToVisible(snapshot, sendToSelf);
  }

  public dropItem(item: Item, owner: Mover | null = null): void {
    const itemObject = new MapItemObject(item);
    itemObject.position.copy(this.position);
    itemObject.isSpawned = true;
    itemObject.isVisible = true;
    itemObject.map = this.map;
    itemObject.mapLayer = this.mapLayer;
    if (owner) itemObject.owner = owner;
    itemObject.ownershipTime = owner
      ? timeInSeconds() + ((global as any).GameOptions?.Current?.Drops?.OwnershipTime || 30)
      : 0;

    this.mapLayer?.addItem?.(itemObject);
  }

  public canAttack(target: Mover): boolean {
    if (this.isDead || target === this || target.isDead) {
      return false;
    }

    return true;
  }

  public tryMeleeAttack(target: Mover, attackType: AttackType): boolean {
    if (!this.canAttack(target) || !isMeleeAttack(attackType)) {
      return false;
    }

    this.target = target;

    const oneHitResult = this.tryInflictDamagesIfOneHitKillMode(target, attackType);
    let attackResult: AttackResult;

    if (!oneHitResult.success) {
      // TODO: Implement MeleeAttackArbiter when available
      // const arbiter = new MeleeAttackArbiter(this, target);
      // attackResult = arbiter.calculateDamages();
      attackResult = {
        damages: 10, // Placeholder damage
        flags: AttackFlags.AF_GENERIC
      };

      if (!(attackResult.flags & AttackFlags.AF_MISS)) {
        // TODO: Implement MeleeAttackReducer when available
        // const reducer = new MeleeAttackReducer(this, target);
        // attackResult = reducer.reduceDamages(attackResult);

        this.inflictDamages(target, attackResult, attackType);
      }
    } else {
      attackResult = oneHitResult.attackResult!;
    }

    // TODO: Implement MeleeAttackSnapshot when available
    // const meleeAttackSnapshot = new MeleeAttackSnapshot(
    //   this,
    //   target,
    //   attackType,
    //   attackResult.flags
    // );
    // this.sendToVisible(meleeAttackSnapshot);

    return true;
  }

  // TODO: Implement range attack system when projectile classes are available
  public tryRangeAttack(
    target: Mover,
    power: number,
    attackType: AttackType
  ): boolean {
    // Placeholder implementation
    return false;
  }

  public inflictDamages(
    target: Mover,
    attackResult: AttackResult,
    attackType: AttackType
  ): void {
    this.target = target;
    target.health.sufferDamages(
      this,
      Math.max(0, attackResult.damages),
      attackType,
      attackResult.flags
    );
    target.onSufferDamages(this, attackResult.damages, attackResult.flags);
  }

  private tryInflictDamagesIfOneHitKillMode(
    target: Mover,
    attackType: AttackType
  ): { success: boolean; attackResult?: AttackResult } {
    if ('mode' in this && Array.isArray(this.mode) && this.mode.includes(ModeType.ONEKILL_MODE)) {
      const attackResult: AttackResult = {
        damages: target.health.hp,
        flags: AttackFlags.AF_GENERIC,
      };

      this.inflictDamages(target, attackResult, attackType);
      return { success: true, attackResult };
    }

    return { success: false };
  }

  protected updateMoves(): void {
    if (!this.isMoving) {
      return;
    }

    const arrivalRange = this.isFollowing ? this.followDistance : 1;

    if (this.position.isInCircle(this.destinationPosition, arrivalRange)) {
      this.position.copy(this.destinationPosition);
      this.stopMoving();
    } else {
      let entitySpeed = this.speed;

      if (this.objectStateFlags & StateFlags.OBJSTAF_WALK) {
        entitySpeed /= 4;
      } else if (this.objectState & ObjectState.OBJSTA_BMOVE) {
        entitySpeed /= 5;
      }

      const distanceX = this.destinationPosition.x - this.position.x;
      const distanceZ = this.destinationPosition.z - this.position.z;
      const distance = Math.sqrt(distanceX * distanceX + distanceZ * distanceZ);

      // Normalize
      let offsetX = (distanceX / distance) * entitySpeed;
      let offsetZ = (distanceZ / distance) * entitySpeed;

      if (Math.abs(offsetX) > Math.abs(distanceX)) {
        offsetX = distanceX;
      }

      if (Math.abs(offsetZ) > Math.abs(distanceZ)) {
        offsetZ = distanceZ;
      }

      this.position.x += offsetX;
      this.position.z += offsetZ;
    }
  }

  protected onArrived(): void {}

  protected onSufferDamages(
    attacker: Mover,
    damages: number,
    attackFlags: AttackFlags
  ): void {}

  public onKilled(killer: Mover): void {}

  public onTargetKilled(target: Mover): void {}
}
