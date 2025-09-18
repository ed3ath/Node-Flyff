import { SkillProperties, SkillLevelProperties } from "../../interfaces/resource";
import { SkillType } from "../../types/skillType";
import { SkillExecuteTargetType } from "../../types/skillExecuteTargetType";

export enum SkillUseType {
  Normal = 0,
  Skill = 1,
  Magic = 2
}

export class Skill {
  private _level: number = 0;
  private _nextSkillUsageTime: number = 0;
  private _databaseId?: number;
  private _properties: SkillProperties;
  private _ownerId: number;

  constructor(skillProperties: SkillProperties, ownerId: number, level: number, databaseId?: number) {
    if (!skillProperties) {
      throw new Error("Cannot create a skill instance with undefined skill properties.");
    }

    this._properties = skillProperties;
    this._ownerId = ownerId;
    this.level = level;
    this._databaseId = databaseId;
  }

  /**
   * Gets the skill id.
   */
  get id(): number {
    return this._properties.id;
  }

  /**
   * Gets the skill name.
   */
  get name(): string {
    return this._properties.szName;
  }

  /**
   * Gets the skill type.
   */
  get type(): SkillType {
    // TODO: Map from properties to SkillType
    return SkillType.Skill;
  }

  /**
   * Gets the skill owner id.
   */
  get ownerId(): number {
    return this._ownerId;
  }

  /**
   * Gets or sets the skill database id in case of the owner is a Player.
   */
  get databaseId(): number | undefined {
    return this._databaseId;
  }

  set databaseId(value: number | undefined) {
    this._databaseId = value;
  }

  /**
   * Gets or sets the skill level.
   */
  get level(): number {
    return this._level;
  }

  set level(value: number) {
    // TODO: Get max level from properties
    const maxLevel = 20; // Default max level
    this._level = Math.max(0, Math.min(value, maxLevel));
  }

  /**
   * Gets the skill properties.
   */
  get properties(): SkillProperties {
    return this._properties;
  }

  /**
   * Gets the skill level properties.
   */
  get levelProperties(): SkillLevelProperties | undefined {
    return this._properties.skillLevels?.[this._level];
  }

  /**
   * Gets the skill casting in milliseconds.
   * @returns Skill casting time in milliseconds.
   */
  getCastingTime(): number {
    if (this.type === SkillType.Skill) {
      return 1000;
    } else {
      // TODO: Calculate based on level properties and owner attributes
      const levelProps = this.levelProperties;
      if (!levelProps) return 1000;

      let castingTime = Math.floor((levelProps.tmCastingTime / 1000) * (60 / 4));
      // TODO: Apply spell rate reduction
      // castingTime -= castingTime * (owner.attributes.get(DefineAttributes.DST_SPELL_RATE) / 100);

      return Math.max(castingTime, 0);
    }
  }

  /**
   * Sets the skill cool-time.
   * @param coolTime Skill cool time in milliseconds.
   */
  setCoolTime(coolTime: number): void {
    if (coolTime > 0) {
      this._nextSkillUsageTime = Date.now() + coolTime;
    }
  }

  /**
   * Gets a boolean value that indicates if the skill cool-time is elapsed.
   * @returns True if the cool-time is elapsed; false otherwise.
   */
  isCoolTimeElapsed(): boolean {
    return this._nextSkillUsageTime < Date.now();
  }

  /**
   * Serialize the skill into the given packet instance.
   * @param packet Packet to write to.
   */
  serialize(packet: any): void {
    packet.writeInt32(this.id);
    packet.writeInt32(this.level);
  }

  /**
   * Compares the current instance with another Skill instance.
   * @param otherSkill Other skill instance.
   * @returns True if the two skills are the same; false otherwise.
   */
  equals(otherSkill: Skill | null): boolean {
    return this.id === otherSkill?.id && this.ownerId === otherSkill?.ownerId;
  }

  /**
   * Checks if the current owner can use the current skill on the given target.
   * @param targetId Target entity ID.
   * @param ownerLevel Owner's level.
   * @param ownerMp Owner's current MP.
   * @param ownerFp Owner's current FP.
   * @returns True if the skill can be used; false otherwise.
   */
  canUse(targetId?: number, ownerLevel: number = 1, ownerMp: number = 0, ownerFp: number = 0): boolean {
    if (this.level <= 0) {
      return false;
    }

    if (!this.isCoolTimeElapsed()) {
      // TODO: Send defined text TID_GAME_SKILLWAITTIME
      return false;
    }

    const levelProps = this.levelProperties;
    if (!levelProps) {
      return false;
    }

    if (levelProps.dwReqMP > 0 && ownerMp < levelProps.dwReqMP) {
      // TODO: Send defined text TID_GAME_REQMP
      return false;
    }

    if (levelProps.dwReqFP > 0 && ownerFp < levelProps.dwReqFP) {
      // TODO: Send defined text TID_GAME_REQFP
      return false;
    }

    // TODO: Add weapon and item requirements checks
    // TODO: Add magic skill checks
    // TODO: Add dual weapon checks

    return true;
  }

  /**
   * Uses the current skill on the given target.
   * @param targetId Target entity ID.
   * @param skillUseType Skill usage type.
   */
  use(targetId?: number, skillUseType: SkillUseType = SkillUseType.Normal): void {
    // TODO: Implement skill execution based on executeTarget type
    const executeTarget = this.getExecuteTargetType();

    switch (executeTarget) {
      case SkillExecuteTargetType.MeleeAttack:
        this.castMeleeSkill(targetId, skillUseType);
        break;
      case SkillExecuteTargetType.MagicAttack:
        this.castMagicSkill(targetId, skillUseType);
        break;
      case SkillExecuteTargetType.MagicAttackShot:
        // TODO: Implement magic attack shot
        break;
      case SkillExecuteTargetType.AnotherWith:
        this.castBuffSkill(targetId, skillUseType);
        break;
      default:
        throw new Error(`Unknown execute target type for skill ${this.name}`);
    }
  }

  private getExecuteTargetType(): SkillExecuteTargetType {
    // TODO: Map from properties to SkillExecuteTargetType
    return SkillExecuteTargetType.MeleeAttack;
  }

  private castMeleeSkill(targetId?: number, skillUseType: SkillUseType = SkillUseType.Normal): void {
    const skillCastingTime = this.getCastingTime();

    // TODO: Handle AoE skills
    this.castSkill(targetId, skillCastingTime, this.levelProperties?.tmComboSkillTime || 0, skillUseType, () => {
      this.execute(targetId);
    });
  }

  private castMagicSkill(targetId?: number, skillUseType: SkillUseType = SkillUseType.Normal): void {
    const skillCastingTime = this.getCastingTime();

    // TODO: Handle AoE skills
    this.castSkill(targetId, skillCastingTime, this.levelProperties?.tmCastingTime || 0, skillUseType, () => {
      this.execute(targetId);
    });
  }

  private castBuffSkill(targetId?: number, skillUseType: SkillUseType = SkillUseType.Normal): void {
    const skillCastingTime = this.getCastingTime();
    const levelProps = this.levelProperties;

    if (!levelProps) return;

    // TODO: Handle resurrection and heal skills
    // TODO: Handle buff application

    const buffTime = levelProps.tmSkillTime || 0;

    if (buffTime > 0) {
      // TODO: Apply buff attributes after casting time
      setTimeout(() => {
        // Apply buff logic here
      }, skillCastingTime);
    }

    this.setCoolTime(levelProps.tmCooldown || 0);
    this.sendSkillMotion(targetId, skillCastingTime, skillUseType);
  }

  private castSkill(targetId: number | undefined, skillCastingTime: number, skillDelayTime: number, skillUseType: SkillUseType, skillActionCallback: () => void): void {
    if (!skillActionCallback) {
      throw new Error("Skill action callback is required");
    }

    this.sendSkillMotion(targetId, skillCastingTime, skillUseType);

    setTimeout(() => {
      skillActionCallback();
    }, skillDelayTime);
  }

  private execute(targetId?: number, reduceCasterPoints: boolean = true): void {
    // TODO: Implement skill execution logic
    // - Check if owner can attack target
    // - Calculate damage based on skill type
    // - Apply damage to target
    // - Set cooldown
    // - Reduce caster points (MP/FP)
  }

  private sendSkillMotion(targetId: number | undefined, skillCastingTime: number, skillUseType: SkillUseType): void {
    // TODO: Send UseSkillSnapshot to visible players
    // using UseSkillSnapshot snapshot = new(Owner, target, this, skillCastingTime, skillUseType);
    // Owner.SendToVisible(snapshot, sendToSelf: true);
  }

  toString(): string {
    return this.name;
  }
}