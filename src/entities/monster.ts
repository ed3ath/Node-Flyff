import { Vector3 } from "../abstract/vector3";
import { Rectangle } from "../abstract/rectangle";
import { AttackFlags } from "../common/attackFlag";
import { AttackType } from "../common/attackType";
import { DefineItem } from "../common/defineItem";
import { ObjectState } from "../common/objectState";
import { Item } from "../common/item";
import { MoverProperties } from "../interfaces/resource";
import { FFRandom } from "../helpers/FFRandom";
import { timeInSeconds } from "../helpers/time";
import { Mover } from "./mover";

// Interfaces for Monster-specific properties
interface DropItemProperties {
  itemId: number;
  probability: number;
  itemMaxRefine: number;
}

interface DropItemKindProperties {
  itemKind: string;
  uniqueMin: number;
  uniqueMax: number;
}

interface MonsterProperties extends MoverProperties {
  dropGoldMin: number;
  dropGoldMax: number;
  maxDropItem: number;
  correctionValue: number;
  reAttackDelay: number;
  dropItems: DropItemProperties[];
  dropItemsKind: DropItemKindProperties[];
  isFlying: boolean;
}

// Configuration constants
const GameOptions = {
  Current: {
    Rates: {
      Gold: 1,
      Drop: 1
    }
  }
};

export class Monster extends Mover {
  private _nextMoveTime: number = 0;
  private _nextAttackTime: number = 0;
  private _nextRespawnTime: number = 0;
  private _despawnTime: number = 0;
  private _isReturningToBeginPosition: boolean = false;

  public readonly respawnTime: number;
  public readonly region: Rectangle;
  public readonly beginPosition: Vector3;

  constructor(properties: MonsterProperties, respawnTime: number = 30, region?: Rectangle) {
    super(properties);

    this.name = properties.szName;
    this.respawnTime = respawnTime;
    this.region = region || new Rectangle(
      this.position.x - 10,
      this.position.z - 10,
      20,
      20
    );
    this.beginPosition = this.position.clone();
  }

  public update(): void {
    if (this.isDead) {
      if (this.canDespawn()) {
        this.despawn();
      } else if (this.canRespawn()) {
        this.respawn();
      }
      return;
    }

    if (this.isFighting && this.target !== null) {
      if (this.isFollowing) {
        if (this.speedFactor !== 2) {
          this.setSpeedFactor(2);
        }

        if (this.followTarget && this.position.isInCircle(this.followTarget.position, this.followDistance)) {
          if (this._nextAttackTime < Date.now()) {
            this.tryMeleeAttack(this.target, AttackType.MeleeAttack1);
            this._nextAttackTime = Date.now() + (this.properties as MonsterProperties).reAttackDelay;
          }
        } else {
          if (this.position.isInRange(this.beginPosition, 40)) {
            this.follow(this.target);
          } else {
            this.returnToBeginPosition();
          }
        }
      } else {
        this.follow(this.target);
      }
    } else {
      if ((this.objectState & ObjectState.OBJSTA_STAND) !== 0 && this._nextMoveTime < timeInSeconds()) {
        let randomPosition = this.region.getRandomPosition();

        while (this.position.getDistance2D(randomPosition) > 10) {
          randomPosition = this.region.getRandomPosition();
        }

        if ((this.properties as MonsterProperties).isFlying && this.map) {
          // TODO: Implement map height calculation
          // randomPosition.y = this.map.getHeight(randomPosition.x, randomPosition.z) + FFRandom.random(0, 6);
          randomPosition.y = this.position.y + FFRandom.random(-2, 2);
        }

        this.move(randomPosition.x, randomPosition.y, randomPosition.z);
      }

      if ((this.objectState & ObjectState.OBJSTA_FMOVE) !== 0) {
        if (this._isReturningToBeginPosition && this.position.isInCircle(this.beginPosition, 3.0) && this.speedFactor >= 2) {
          this.setSpeedFactor(1);
        }
      }
    }

    this.updateMoves();
  }

  protected onArrived(): void {
    if (!this.isFighting) {
      const nextMoveTime = this._isReturningToBeginPosition ?
        FFRandom.longRandom(1, 3) :
        FFRandom.longRandom(5, 10);

      this._nextMoveTime = timeInSeconds() + nextMoveTime;
      this.beginPosition.copy(this.position);

      if (this._isReturningToBeginPosition) {
        this.health.regenerateAll();
        this._isReturningToBeginPosition = false;
      }

      if (this.speedFactor > 2) {
        this.setSpeedFactor(1);
      }
    }
  }

  protected onSufferDamages(attacker: Mover, damages: number, attackFlags: AttackFlags): void {
    if (this.isDead) {
      this.unfollow();
      this.target = null;
      this.isFighting = false;
    } else {
      this.follow(attacker);
      this.target = attacker;
      this.isFighting = true;
    }
  }

  public onKilled(killer: Mover): void {
    console.log(`${this.name} killed by ${killer.name}...:("`);

    this.dropGold(killer);
    this.dropItems(killer);
    this.isFighting = false;
    this.target = null;
    this._despawnTime = timeInSeconds() + 3;
  }

  public onTargetKilled(target: Mover): void {
    this.returnToBeginPosition();
  }

  private setSpeedFactor(speedFactor: number): void {
    this.speedFactor = speedFactor;

    // TODO: Implement SetSpeedFactorSnapshot when available
    // const snapshot = new SetSpeedFactorSnapshot(this, speedFactor);
    // this.sendToVisible(snapshot);
  }

  private returnToBeginPosition(): void {
    this._isReturningToBeginPosition = true;
    this.unfollow();
    this.target = null;
    this.setSpeedFactor(2.66);
    this.move(this.beginPosition.x, this.beginPosition.y, this.beginPosition.z);
  }

  private canDespawn(): boolean {
    return this.isSpawned && this.isDead && this._despawnTime < timeInSeconds();
  }

  private despawn(): void {
    this.isSpawned = false;
    this._nextRespawnTime = timeInSeconds() + this.respawnTime;
  }

  private canRespawn(): boolean {
    return !this.isSpawned && this.isDead && this._nextRespawnTime < timeInSeconds();
  }

  private respawn(): void {
    this.position.copy(this.region.getRandomPosition());
    this.destinationPosition.reset();
    this.health.regenerateAll();
    this.target = null;
    this.unfollow();
    this.objectState = ObjectState.OBJSTA_STAND;
    this._nextMoveTime = timeInSeconds() + FFRandom.longRandom(5, 15);
    this.speedFactor = 1;
    this.isSpawned = true;
  }

  private dropGold(owner: Mover): void {
    const DROP_GOLD_LIMIT1 = 9;
    const DROP_GOLD_LIMIT2 = 49;
    const DROP_GOLD_LIMIT3 = 99;
    const goldMultiplier = GameOptions.Current.Rates.Gold;
    const monsterProps = this.properties as MonsterProperties;
    const goldAmount = Math.max(0, FFRandom.random(monsterProps.dropGoldMin, monsterProps.dropGoldMax)) * goldMultiplier;

    if (goldAmount > 0) {
      let goldItemId: DefineItem;

      if (goldAmount > DROP_GOLD_LIMIT3 * goldMultiplier) {
        goldItemId = DefineItem.II_GOLD_SEED4;
      } else if (goldAmount > DROP_GOLD_LIMIT2 * goldMultiplier) {
        goldItemId = DefineItem.II_GOLD_SEED3;
      } else if (goldAmount > DROP_GOLD_LIMIT1 * goldMultiplier) {
        goldItemId = DefineItem.II_GOLD_SEED2;
      } else {
        goldItemId = DefineItem.II_GOLD_SEED1;
      }

      // TODO: Implement proper item creation when GameResources is available
      // const goldItem = new Item(GameResources.Current.Items.Get(goldItemId));
      // goldItem.quantity = goldAmount;
      // this.dropItem(goldItem, owner);

      console.log(`Monster ${this.name} would drop ${goldAmount} gold (item ID: ${goldItemId})`);
    }
  }

  private dropItems(owner: Mover): void {
    const MAX_DROP_CHANCE = 3000000000;
    const monsterProps = this.properties as MonsterProperties;

    // Drop items
    let itemCount = 0;
    for (const dropItemProperties of monsterProps.dropItems || []) {
      if (itemCount >= monsterProps.maxDropItem) {
        break;
      }

      const dropChance = FFRandom.longRandom(0, MAX_DROP_CHANCE);

      if (dropItemProperties.probability * GameOptions.Current.Rates.Drop >= dropChance) {
        const itemRefine = FFRandom.random(0, dropItemProperties.itemMaxRefine);

        // TODO: Implement proper item creation when GameResources is available
        // const itemProperties = GameResources.Current.Items.Get(dropItemProperties.itemId);
        // const itemToDrop = new Item(itemProperties);
        // itemToDrop.refine = itemRefine;
        // itemToDrop.quantity = 1;
        // this.dropItem(itemToDrop, owner);

        console.log(`Monster ${this.name} would drop item ID: ${dropItemProperties.itemId} with refine: ${itemRefine}`);
        itemCount++;
      }
    }

    // Drop item kinds
    for (const dropItemKind of monsterProps.dropItemsKind || []) {
      // TODO: Implement item kind drops when GameResources is available
      console.log(`Monster ${this.name} would potentially drop item kind: ${dropItemKind.itemKind}`);
    }
  }
}