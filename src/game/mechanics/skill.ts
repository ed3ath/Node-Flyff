import { SkillProperties, SkillLevelProperties } from "../../interfaces/resource";
import { SkillType } from "../../types/skillType";
import { SkillExecuteTargetType } from "../../types/skillExecuteTargetType";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { IPacketSerializer } from "./taskbar";

export enum SkillUseType {
  Normal = 0,
  Skill = 1,
  Magic = 2
}

/// <summary>
/// This class describes the behavior of a Skill.
/// </summary>
export class Skill implements IPacketSerializer {
  private _level: number;
  private _nextSkillUsageTime: number;

  /// <summary>
  /// Gets the skill id.
  /// </summary>
  public get Id(): number {
    return this.Properties.id;
  }

  /// <summary>
  /// Gets the skill name.
  /// </summary>
  public get Name(): string {
    return this.Properties.szName;
  }

  /// <summary>
  /// Gets the skill type.
  /// </summary>
  public get Type(): SkillType {
    // TODO: Map from dwSkillType to SkillType enum
    return SkillType.Skill;
  }

  /// <summary>
  /// Gets the skill owner instance.
  /// </summary>
  public Owner: any; // TODO: Replace with proper Mover type

  /// <summary>
  /// Gets or sets the skill database id in case of the owner is a Player.
  /// </summary>
  public DatabaseId?: number;

  /// <summary>
  /// Gets or sets the skill level.
  /// </summary>
  public get Level(): number {
    return this._level;
  }

  public set Level(value: number) {
    this._level = Math.Clamp(value, 0, this.Properties.ExpertMax);
  }

  /// <summary>
  /// Gets the skill properties.
  /// </summary>
  public Properties: SkillProperties;

  /// <summary>
  /// Gets the skill level properties.
  /// </summary>
  public get LevelProperties(): SkillLevelProperties | undefined {
    return this.Properties.skillLevels?.[this.Level];
  }

  public constructor(skillProperties: SkillProperties, owner: any, level: number, databaseId?: number) {
    if (!skillProperties) {
      throw new Error("Cannot create a skill instance with undefined skill properties.");
    }
    this.Properties = skillProperties;
    this.Owner = owner;
    this.Level = level;
    this.DatabaseId = databaseId;
  }

  /// <summary>
  /// Gets the skill casting in seconds.
  /// </summary>
  /// <returns>Skill casting time in seconds.</returns>
  public GetCastingTime(): number {
    if (this.Properties.dwSkillType === "SKILL") {
      return 1000;
    } else {
      const levelProps = this.LevelProperties;
      if (!levelProps) return 1000;

      let castingTime = (levelProps.dwCastingTime / 1000) * (60 / 4);

      // TODO: Apply spell rate reduction
      // castingTime -= castingTime * (this.Owner.Attributes.Get(DefineAttributes.DST_SPELL_RATE) / 100);

      return Math.Max(castingTime, 0);
    }
  }

  /// <summary>
  /// Sets the skill cool-time.
  /// </summary>
  /// <param name="coolTime">Skill cool time in milliseconds.</param>
  public SetCoolTime(coolTime: number): void {
    if (coolTime > 0) {
      this._nextSkillUsageTime = Date.now() + coolTime;
    }
  }

  /// <summary>
  /// Gets a boolean value that indicates if the skill cool-time is elapsed.
  /// </summary>
  /// <returns>True if the cool-time is elapsed; false otherwise.</returns>
  public IsCoolTimeElapsed(): boolean {
    return this._nextSkillUsageTime < Date.now();
  }

  /// <summary>
  /// Serialize the skill into the given packet instance.
  /// </summary>
  /// <param name="packet">Packet.</param>
  public serialize(packet: FlyffPacket): void {
    packet.writeInt32(this.Id);
    packet.writeInt32(this.Level);
  }

  /// <summary>
  /// Compares the current instance with another <see cref="Skill"/> instance.
  /// </summary>
  /// <param name="otherSkill">Other skill instance.</param>
  /// <returns>True if the two skills are the same; false otherwise.</returns>
  public Equals(otherSkill: Skill | null): boolean {
    return this.Id === otherSkill?.Id && this.Owner?.ObjectId === otherSkill?.Owner?.ObjectId;
  }

  /// <summary>
  /// Checks if the current owner can use the current skill on the given target.
  /// </summary>
  /// <param name="target">Skill target.</param>
  /// <returns>True if the skill can be used; false otherwise.</returns>
  public CanUse(target: any): boolean { // TODO: Replace with proper Mover type
    if (this.Level <= 0 || this.Level > Object.keys(this.Properties.skillLevels || {}).length) {
      return false;
    }

    if (!this.IsCoolTimeElapsed()) {
      // TODO: Send defined text TID_GAME_SKILLWAITTIME
      return false;
    }

    const levelProps = this.LevelProperties;
    if (!levelProps) return false;

    if (levelProps.dwReqMp > 0 && this.Owner.Health.Mp < levelProps.dwReqMp) {
      // TODO: Send defined text TID_GAME_REQMP
      return false;
    }

    if (levelProps.dwRepFp > 0 && this.Owner.Health.Fp < levelProps.dwRepFp) {
      // TODO: Send defined text TID_GAME_REQFP
      return false;
    }

    // TODO: Add weapon and item requirements checks
    // TODO: Add magic skill checks

    return true;
  }

  /// <summary>
  /// Uses the current skill on the given target.
  /// </summary>
  /// <param name="target">Target.</param>
  /// <param name="skillUseType">Skill usage type.</param>
  public Use(target: any, skillUseType: SkillUseType = SkillUseType.Normal): void { // TODO: Replace with proper Mover type
    switch (this.Properties.dwExeTarget) {
      case "MELEE_ATTACK":
        this.CastMeleeSkill(target, skillUseType);
        break;
      case "MAGIC_ATTACK":
        this.CastMagicSkill(target, skillUseType);
        break;
      case "MAGIC_ATTACK_SHOT":
        // TODO: Implement magic attack shot
        break;
      case "ANOTHER_WITH":
        this.CastBuffSkill(target, skillUseType);
        break;
      default:
        throw new Error(`Unknown execute target type for skill ${this.Name}`);
    }
  }

  private CastMeleeSkill(target: any, skillUseType: SkillUseType = SkillUseType.Normal): void {
    const skillCastingTime = this.GetCastingTime();
    const levelProps = this.LevelProperties;

    // TODO: Handle AoE skills
    this.CastSkill(target, this.GetCastingTime(), levelProps?.dwComboSkillTime || 0, skillUseType, () => {
      this.Execute(target);
    });
  }

  private CastMagicSkill(target: any, skillUseType: SkillUseType = SkillUseType.Normal): void {
    const skillCastingTime = this.GetCastingTime();
    const levelProps = this.LevelProperties;

    // TODO: Handle AoE skills
    this.CastSkill(target, skillCastingTime, levelProps?.dwCastingTime || 0, skillUseType, () => {
      this.Execute(target);
    });
  }

  private CastBuffSkill(target: any, skillUseType: SkillUseType = SkillUseType.Normal): void {
    const skillCastingTime = this.GetCastingTime();
    const levelProps = this.LevelProperties;

    // TODO: Handle resurrection and heal skills
    // TODO: Handle buff application

    const buffTime = levelProps?.dwSkillTime || 0;

    if (buffTime > 0) {
      // TODO: Apply buff attributes after casting time
      setTimeout(() => {
        // Apply buff logic here
      }, skillCastingTime);
    }

    this.SetCoolTime(levelProps?.dwCooldown || 0);
    this.SendSkillMotion(target, skillCastingTime, skillUseType);
  }

  private CastSkill(target: any, skillCastingTime: number, skillDelayTime: number, skillUseType: SkillUseType, skillActionCallback: () => void): void {
    if (!skillActionCallback) {
      throw new Error("Skill action callback is required");
    }

    this.SendSkillMotion(target, skillCastingTime, skillUseType);

    setTimeout(() => {
      skillActionCallback();
    }, skillDelayTime);
  }

  private Execute(target: any, reduceCasterPoints: boolean = true): void {
    // TODO: Implement skill execution logic
    // - Check if owner can attack target
    // - Calculate damage based on skill type
    // - Apply damage to target
    // - Set cooldown
    // - Reduce caster points (MP/FP)
  }

  private SendSkillMotion(target: any, skillCastingTime: number, skillUseType: SkillUseType): void {
    // TODO: Send UseSkillSnapshot to visible players
    // using UseSkillSnapshot snapshot = new(Owner, target, this, skillCastingTime, skillUseType);
    // Owner.SendToVisible(snapshot, sendToSelf: true);
  }

  public toString(): string {
    return this.Name;
  }
}

// Helper function for Math.Clamp
declare global {
  interface Math {
    Clamp(value: number, min: number, max: number): number;
    Max(a: number, b: number): number;
  }
}

Math.Clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

Math.Max = (a: number, b: number): number => {
  return Math.max(a, b);
};