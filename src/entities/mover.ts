import { Attributes } from "../abstract/attributes";
import { AttackResult } from "../abstract/battle/attackResult";
import { Buffs } from "../abstract/buffs";
import { Defense } from "../abstract/defense";
import { Delayer } from "../abstract/delayer";
import { Health } from "../abstract/health";
import { Projectile } from "../abstract/projectile";
import { ProjectileList } from "../abstract/projectileList";
import { Statistics } from "../abstract/statistics";
import { Vector3 } from "../abstract/vector3";
import { WorldObject } from "../abstract/worldObject";
import { AttackFlags } from "../common/attackFlag";
import { AttackType } from "../common/attackType";
import { DefineAttributes } from "../common/defineAttributes";
import { Item } from "../common/item";
import { ModeType } from "../common/modeType";
import { ObjectMessageType } from "../common/objectMessageType";
import { ObjectState } from "../common/objectState";
import { StateFlags } from "../common/stateFlags";
import { WorldObjectType } from "../common/worldObjectType";
import { isMeleeAttack } from "../helpers/rangeAttack";
import { timeInSeconds } from "../helpers/time";
import { MoverProperties } from "../interfaces/resource";
import { DestPositionSnapshot } from "../protocol/snapshots/destPosition";
import { MotionSnapshot } from "../protocol/snapshots/motion";
import { MoverSetDestObjectSnapshot } from "../protocol/snapshots/moverSetDestObject";
import { MapItemObject } from "./mapItemObject";
import { Player } from "./player";

export class Mover extends WorldObject {
  public readonly Type = WorldObjectType.Mover;

  constructor(public readonly properties: MoverProperties) {
    super();
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
      (this.properties.fSpeed +
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

  public readonly health: Health;
  public readonly attributes: Attributes;
  public readonly statistics: Statistics;
  public readonly defense: Defense;
  public readonly delayer: Delayer = new Delayer();
  public readonly projectiles: ProjectileList = new ProjectileList();
  public readonly buffs: Buffs;

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
    this.sendMotion(ObjectMessageType.OBJMSG_STOP_TURN, false);
    this.sendMotion(ObjectMessageType.OBJMSG_STAND, false);
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
      ? timeInSeconds() + global.GameConfig?.cluster_server?.settings?.drops['ownership-time']
      : 0;

    // this.mapLayer.addItem(itemObject);
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

    let attackResult: AttackResult | null = null;

    if (
      !this.tryInflictDamagesIfOneHitKillMode(target, attackType, attackResult)
    ) {
      const arbiter = new MeleeAttackArbiter(this, target);
      attackResult = arbiter.calculateDamages();

      if (!(attackResult.flags & AttackFlags.AF_MISS)) {
        const reducer = new MeleeAttackReducer(this, target);
        attackResult = reducer.reduceDamages(attackResult);

        this.inflictDamages(target, attackResult, attackType);
      }
    }

    const meleeAttackSnapshot = new MeleeAttackSnapshot(
      this,
      target,
      attackType,
      attackResult.flags
    );
    this.sendToVisible(meleeAttackSnapshot);

    return true;
  }

  public tryRangeAttack(
    target: Mover,
    power: number,
    attackType: AttackType
  ): boolean {
    if (!this.canAttack(target) || !attackType.isRangeAttack()) {
      return false;
    }

    let projectile: Projectile | null = null;

    if (attackType.causesArrowProjectile()) {
      projectile = new ArrowProjectile(this, target, power, () => {
        if (!this.tryInflictDamagesIfOneHitKillMode(target, attackType, null)) {
          const arbiter = new MeleeAttackArbiter(
            this,
            target,
            AttackFlags.AF_GENERIC | AttackFlags.AF_RANGE
          );
          const attackResult = arbiter.calculateDamages();

          if (!(attackResult.flags & AttackFlags.AF_MISS)) {
            const reducer = new MeleeAttackReducer(this, target);
            const reducedResult = reducer.reduceDamages(attackResult);

            this.inflictDamages(target, reducedResult, attackType);
          }
        }
      });
    } else if (attackType.causesMagicProjectile()) {
      projectile = new MagicProjectile(this, target, power, () => {
        if (!this.tryInflictDamagesIfOneHitKillMode(target, attackType, null)) {
          const arbiter = new MagicAttackArbiter(this, target, power);
          const attackResult = arbiter.calculateDamages();

          if (!(attackResult.flags & AttackFlags.AF_MISS)) {
            this.inflictDamages(target, attackResult, attackType);
          }
        }
      });
    }

    if (!projectile) {
      return false;
    }

    const projectileId = this.projectiles.add(projectile);

    let snapshot = null;
    if (projectile instanceof MagicProjectile) {
      snapshot = new MagicAttackSnapshot(
        this,
        attackType,
        target.objectId,
        power,
        projectileId
      );
    } else if (projectile instanceof ArrowProjectile) {
      snapshot = new RangeAttackSnapshot(
        this,
        attackType,
        target.objectId,
        power,
        projectileId
      );
    }

    if (snapshot) {
      this.sendToVisible(snapshot);
      return true;
    }

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
    attackType: AttackType,
    attackResult: AttackResult | null
  ): boolean {
    if (this instanceof Player && this.mode & ModeType.ONEKILL_MODE) {
      attackResult = {
        damages: target.health.hp,
        flags: AttackFlags.AF_GENERIC,
      };

      this.inflictDamages(target, attackResult, attackType);
      return true;
    }

    return false;
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
