import { Vector3 } from "../abstract/vector3";
import { AuthorityType } from "../common/authorityType";
import { DefineJob } from "../common/defineJob";
import { DefineSpecialEffects } from "../common/defineSpecialEffects";
import { DefineText } from "../common/defineText";
import { GenderType } from "../common/genderType";
import { MapItemType } from "../common/mapItemType";
import { ModeType } from "../common/modeType";
import { ObjectMessageType } from "../common/objectMessageType";
import { MoverProperties, JobProperties } from "../interfaces/resource";
import { IUserConnection } from "../interfaces/connection";
import { FlyffPacket } from "../libraries/flyffPacket";
import { MotionSnapshot } from "../protocol/snapshots/motion";
import { Item } from "../common/item";
import { Mover } from "./mover";
import { MapItemObject } from "./mapItemObject";

// Forward declaration to avoid circular dependency
interface Monster extends Mover {
  properties: MoverProperties;
}

// Interfaces for Player components
interface HumanVisualAppearance {
  gender: GenderType;
  hairId?: number;
  hairColor?: number;
  faceId?: number;
  skinSetId?: number;
}

class Inventory {
  static readonly INVENTORY_SIZE = 42;
  static readonly INVENTORY_EQUIP_PARTS = 31;

  private items: Map<number, Item> = new Map();

  constructor(private readonly owner: Player) {}

  getRange(start: number, count: number): Array<{ item: Item | null }> {
    const result: Array<{ item: Item | null }> = [];
    for (let i = start; i < start + count; i++) {
      result.push({ item: this.items.get(i) || null });
    }
    return result;
  }

  createItem(item: Item): number {
    // Find first available slot
    for (let i = 0; i < Inventory.INVENTORY_SIZE; i++) {
      if (!this.items.has(i)) {
        this.items.set(i, item);
        return i;
      }
    }
    return -1; // No space available
  }

  getEquippedItems(): Item[] {
    return this.getRange(Inventory.INVENTORY_SIZE, Inventory.INVENTORY_EQUIP_PARTS)
      .map(slot => slot.item)
      .filter(item => item !== null) as Item[];
  }
}

class Gold {
  private amount: number = 0;

  constructor(private readonly owner: Player) {}

  get value(): number {
    return this.amount;
  }

  increase(amount: number): boolean {
    if (amount <= 0) return false;
    this.amount += amount;
    return true;
  }

  decrease(amount: number): boolean {
    if (amount <= 0 || this.amount < amount) return false;
    this.amount -= amount;
    return true;
  }
}

class Experience {
  private currentExp: number = 0;
  private currentLevel: number = 1;

  constructor(private readonly owner: Player) {}

  get exp(): number {
    return this.currentExp;
  }

  get level(): number {
    return this.currentLevel;
  }

  increase(amount: number): void {
    if (amount <= 0) return;
    this.currentExp += amount;
    // TODO: Check for level up based on exp table
  }
}

class Skill {
  constructor(
    public readonly properties: any,
    public level: number = 0,
    public readonly player: Player
  ) {}
}

class SkillTree {
  static readonly SkillPointUsage: Record<string, number> = {};

  private skills: Map<number, Skill> = new Map();

  constructor(private readonly owner: Player) {}

  [Symbol.iterator](): Iterator<Skill> {
    return this.skills.values();
  }

  setSkill(skill: Skill): void {
    this.skills.set(skill.properties.id, skill);
  }

  getSkill(id: number): Skill | undefined {
    return this.skills.get(id);
  }
}

class QuestDiary {
  private quests: Map<number, any> = new Map();

  constructor(private readonly owner: Player) {}

  onMonsterKilled(monster: Monster): void {
    // TODO: Update quest progress based on killed monster
  }
}

class Taskbar {
  private shortcuts: Map<number, any> = new Map();

  constructor() {}
}

// Configuration constants
const GameOptions = {
  Current: {
    DefaultCharacter: {
      Man: { Strength: 15, Stamina: 15, Dexterity: 15, Intelligence: 15 },
      Woman: { Strength: 15, Stamina: 15, Dexterity: 15, Intelligence: 15 }
    },
    Rates: { Experience: 1 }
  }
};

const USHORT_MAX_VALUE = 65535;

export class Player extends Mover {
  public readonly id: number;
  public readonly loggedInAt: Date;
  public readonly slot: number;
  public readonly authority: AuthorityType;
  public readonly appearance: HumanVisualAppearance;
  public readonly inventory: Inventory;
  public readonly gold: Gold;
  public readonly experience: Experience;
  public readonly skills: SkillTree;
  public readonly questDiary: QuestDiary;
  public readonly taskbar: Taskbar;

  public job: JobProperties;
  public deathLevel: number = 0;
  public mode: ModeType[] = [];
  public availablePoints: number = 0;
  public skillPoints: number = 0;
  public currentShopName: string = '';

  public constructor(
    private readonly _connection: IUserConnection,
    properties: MoverProperties,
    playerData: {
      id: number;
      loggedInAt: Date;
      slot: number;
      authority: AuthorityType;
      job: JobProperties;
      appearance: HumanVisualAppearance;
      deathLevel?: number;
      mode?: ModeType[];
      availablePoints?: number;
      skillPoints?: number;
    }
  ) {
    super(properties);

    this.id = playerData.id;
    this.loggedInAt = playerData.loggedInAt;
    this.slot = playerData.slot;
    this.authority = playerData.authority;
    this.job = playerData.job;
    this.appearance = playerData.appearance;
    this.deathLevel = playerData.deathLevel || 0;
    this.mode = playerData.mode || [];
    this.availablePoints = playerData.availablePoints || 0;
    this.skillPoints = playerData.skillPoints || 0;

    this.inventory = new Inventory(this);
    this.gold = new Gold(this);
    this.experience = new Experience(this);
    this.skills = new SkillTree(this);
    this.questDiary = new QuestDiary(this);
    this.taskbar = new Taskbar();
  }

  update(): void {
    if (this.isDead || !this.isSpawned) {
      return;
    }

    if (!this.isFighting) {
      this.health.idleHeal();
    }

    this.lookAround();
    this.updateMoves();
  }

  public lookAround(): void {
    if (!this.isSpawned || !this.isVisible) {
      return;
    }

    if (!this.mapLayer) {
      return;
    }

    // TODO: Implement getVisibleObjects method in MapLayer
    const currentVisibleEntities: import("../abstract/worldObject").WorldObject[] = [];
    const appearingEntities = currentVisibleEntities.filter(entity => !this.visibleObjects.includes(entity));
    const disappearingEntities = this.visibleObjects.filter(entity => !currentVisibleEntities.includes(entity));

    if (appearingEntities.length > 0 || disappearingEntities.length > 0) {
      // TODO: Implement proper snapshot system
      // For now, just update visible objects
      for (const appearingObject of appearingEntities) {
        this.addVisibleEntity(appearingObject);
      }

      for (const disappearingObject of disappearingEntities) {
        this.removeVisibleEntity(disappearingObject);
      }
    }
  }

  public getEquippedItems(): Item[] {
    return this.inventory.getEquippedItems();
  }

  public updateStatistics(strength: number, stamina: number, dexterity: number, intelligence: number): void {
    const total = strength + stamina + dexterity + intelligence;

    if (this.availablePoints <= 0 || total > this.availablePoints) {
      throw new Error(`${this.name} doesn't have enough statistic points.`);
    }

    if (strength > this.availablePoints || stamina > this.availablePoints ||
        dexterity > this.availablePoints || intelligence > this.availablePoints || total <= 0 ||
        total > USHORT_MAX_VALUE) {
      throw new Error("Statistics point bad calculation. (Hack attempt)");
    }

    this.statistics.strength += strength;
    this.statistics.stamina += stamina;
    this.statistics.dexterity += dexterity;
    this.statistics.intelligence += intelligence;
    this.availablePoints -= total;

    this.health.regenerateAll();
    this.defense.update();

    // TODO: Implement proper snapshot system
    // const setStateSnapshot = new SetStatisticsStateSnapshot(this);
    // this.send(setStateSnapshot);
  }

  public resetStatistics(): void {
    const defaultCharacter = this.appearance.gender === GenderType.Male ?
      GameOptions.Current.DefaultCharacter.Man :
      GameOptions.Current.DefaultCharacter.Woman;

    this.statistics.strength = defaultCharacter.Strength;
    this.statistics.stamina = defaultCharacter.Stamina;
    this.statistics.dexterity = defaultCharacter.Dexterity;
    this.statistics.intelligence = defaultCharacter.Intelligence;
    this.availablePoints = (this.level - 1) * 2;

    this.health.regenerateAll();
    this.defense.update();

    // TODO: Implement proper snapshot system
    // const setStateSnapshot = new SetStatisticsStateSnapshot(this);
    // this.send(setStateSnapshot);
  }

  public addSkillPoints(skillPointsToAdd: number, sendToPlayer = true): void {
    this.skillPoints += skillPointsToAdd;

    if (sendToPlayer) {
      // TODO: Implement proper snapshot system
      // const snapshot = new SetExperienceSnapshot(this);
      // this.send(snapshot);
    }
  }

  public resetSkills(): void {
    for (const skill of this.skills) {
      this.skillPoints += (skill.level || 0) * (SkillTree.SkillPointUsage[skill.properties?.jobType] || 1);
      skill.level = 0;
    }
  }

  public resetAvailableSkillPoints(): void {
    this.skillPoints = 0;
  }
  
  public changeJob(job: DefineJob): void {
    if (this.job.id === job) {
      return;
    }

    // TODO: Implement job resources lookup
    // const jobProperties = GameResources.Current.Jobs.get(job);
    // if (!jobProperties) {
    //   throw new Error(`Failed to find job '${job}'.`);
    // }

    // TODO: Implement skill system
    // const jobSkills = GameResources.Current.Skills.getJobSkills(job);
    // if (jobSkills.length > 0) {
    //   for (const skill of jobSkills) {
    //     this.skills.setSkill(new Skill(skill, 0, this));
    //   }
    // }

    // this.job = jobProperties;

    // TODO: Implement proper snapshot system
    // const snapshots = new FFSnapshot([
    //   new SetJobSkill(this),
    //   new CreateSfxObjectSnapshot(this, DefineSpecialEffects.XI_GEN_LEVEL_UP01)
    // ]);
    // this.sendToVisible(snapshots, true);
  }

  public speak(message: string): void {
    // TODO: Implement proper snapshot system
    // const snapshot = new ChatSnapshot(this, message);
    // this.sendToVisible(snapshot, true);
  }

  public sendDefinedText(textId: DefineText, params: string): void {
    // TODO: Implement proper snapshot system
    // const snapshot = new DefinedTextSnapshot(this, textId, params);
    // this.send(snapshot);
  }
  
  public pickupItem(mapItem: MapItemObject, sendPickupMotion = true): void {
    if (mapItem.owner && mapItem.owner !== this) {
      this.sendDefinedText(DefineText.TID_GAME_PRIORITYITEMPER, `"${mapItem.item.name}"`);
      return;
    }

    let itemPickedUp = false;

    if (mapItem.isGold) {
      itemPickedUp = this.gold.increase(mapItem.item.quantity);
    } else {
      itemPickedUp = this.inventory.createItem(mapItem.item) > -1;
      this.sendDefinedText(DefineText.TID_GAME_REAPITEM, `"${mapItem.item.name}"`);
    }

    if (itemPickedUp) {
      if (mapItem.itemType === MapItemType.QuestItem) {
        mapItem.despawn();
      } else {
        // TODO: Implement removeItem method in MapLayer
        // this.mapLayer?.removeItem(mapItem);
      }
    }

    if (sendPickupMotion) {
      const motionSnapshot = new MotionSnapshot(this, ObjectMessageType.OBJMSG_PICKUP);
      this.sendToVisible(motionSnapshot, true);
    }
  }

  public teleport(mapId: number, position: Vector3, sendToPlayer = true): void {
    const setPlayerPosition = (newPosition: Vector3): void => {
      this.unfollow();
      this.stopMoving();
      this.position.copy(newPosition);
    };

    if (this.map?.id === mapId) {
      if (!this.map.isInBounds(position)) {
        throw new Error(`Attempt to teleport '${this.name}' to an invalid position: ${position} in map: '${this.map.name}'.`);
      }

      setPlayerPosition(position);

      // TODO: Implement proper snapshot system
      // const snapshots = new FFSnapshot([
      //   new SetPositionSnapshot(this),
      //   new WorldReadInfoSnapshot(this)
      // ]);
      // this.sendToVisible(snapshots, sendToPlayer);
    } else {
      // TODO: Implement map manager
      // const destinationMap = MapManager.Current.get(mapId);
      // if (!destinationMap) {
      //   throw new Error(`Cannot teleport to map with id: '${mapId}'. Map not found.`);
      // }

      // if (!destinationMap.isInBounds(position)) {
      //   throw new Error(`Attempt to teleport '${this.name}' to an invalid position: ${position} in map: '${destinationMap.name}'.`);
      // }

      // this.isSpawned = false;
      // this.mapLayer?.removePlayer(this);

      // setPlayerPosition(position);

      // this.map = destinationMap;
      // this.mapLayer = destinationMap.getDefaultLayer() || null;
      // if (this.mapLayer) this.mapLayer.addPlayer(this);

      // if (sendToPlayer) {
      //   const snapshots = new FFSnapshot([
      //     new ReplaceSnapshot(this),
      //     new WorldReadInfoSnapshot(this),
      //     new AddObjectSnapshot(this)
      //   ]);

      //   this.send(snapshots);
      // }

      // this.isSpawned = true;
    }
  }

  public onTargetKilled(target: Mover): void {
    if (target instanceof Player) {
      // TODO: PK
    } else {
      // Check if target has monster properties
      const monster = target as Monster;
      if (monster.properties?.dwExpValue) {
        this.experience.increase(monster.properties.dwExpValue * GameOptions.Current.Rates.Experience);
        this.questDiary.onMonsterKilled(monster);
      }
    }
  }

  public onKilled(killer: Mover): void {
    super.onKilled(killer);
  }
  
  public dispose(): void {
    for (const visibleObject of this.visibleObjects) {
      if (!(visibleObject instanceof Player)) {
        this.removeVisibleEntity(visibleObject);
      }
    }

    this.mapLayer?.removePlayer(this);
  }
  
  protected onArrived(): void {
    if (this.isFollowing && this.followTarget instanceof MapItemObject) {
      this.pickupItem(this.followTarget);
      this.unfollow();
    }
  }
  
  public cancelSkillUsage(): void {
    // TODO: Implement proper snapshot system
    // const snapshot = new ClearUseSkillSnapshot(this);
    // this.sendToVisible(snapshot, true);
  }

  public sendSnoopMessage(message: string): void {
    // TODO: Implement proper snapshot system
    // const snapshot = new SnoopSnapshot(message);
    // this.send(snapshot);
  }

  public send(packet: FlyffPacket): void {
    this._connection.send(packet);
  }
  
  private addVisibleEntity(entity: import("../abstract/worldObject").WorldObject): void {
    if (!this.visibleObjects.includes(entity)) {
      this.visibleObjects.push(entity);
    }

    if (!(entity instanceof Player) && !entity.visibleObjects.includes(this)) {
      entity.visibleObjects.push(this);
    }
  }

  private removeVisibleEntity(entity: import("../abstract/worldObject").WorldObject): void {
    const index = this.visibleObjects.indexOf(entity);
    if (index > -1) {
      this.visibleObjects.splice(index, 1);
    }

    const eIndex = entity.visibleObjects.indexOf(this);
    if (eIndex > -1) {
      entity.visibleObjects.splice(eIndex, 1);
    }
  }
}
