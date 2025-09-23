import { DefineAttributes } from '../../game/definitions/defineAttributes';

export class SkillLevelProperties {
  public skillLevelId: number;
  public skillId: number;
  public level: number;
  public abilityMin: number;
  public abilityMax: number;
  public abilityMinPVP: number;
  public abilityMaxPVP: number;
  public attackSpeed: number;
  public damageShift: boolean;
  public probability: number;
  public probabilityPVP: number;
  public taunt: number;
  public destParam1: DefineAttributes;
  public destParam1Value: number;
  public destParam2: DefineAttributes;
  public destParam2Value: number;
  public requiredMP: number;
  public requiredFP: number;
  public cooldownTime: number;
  public castingTime: number;
  public skillRange: number;
  public circleTime: number;
  public painTime: number;
  public skillTime: number;
  public skillCount: number;
  public skillExp: number;
  public experience: number;
  public comboSkillTime: number;

  constructor(
    skillLevelId: number,
    skillId: number,
    level: number,
    abilityMin: number,
    abilityMax: number,
    abilityMinPVP: number,
    abilityMaxPVP: number,
    attackSpeed: number,
    damageShift: boolean,
    probability: number,
    probabilityPVP: number,
    taunt: number,
    destParam1: DefineAttributes,
    destParam1Value: number,
    destParam2: DefineAttributes,
    destParam2Value: number,
    requiredMP: number,
    requiredFP: number,
    cooldownTime: number,
    castingTime: number,
    skillRange: number,
    circleTime: number,
    painTime: number,
    skillTime: number,
    skillCount: number,
    skillExp: number,
    experience: number,
    comboSkillTime: number
  ) {
    this.skillLevelId = skillLevelId;
    this.skillId = skillId;
    this.level = level;
    this.abilityMin = abilityMin;
    this.abilityMax = abilityMax;
    this.abilityMinPVP = abilityMinPVP;
    this.abilityMaxPVP = abilityMaxPVP;
    this.attackSpeed = attackSpeed;
    this.damageShift = damageShift;
    this.probability = probability;
    this.probabilityPVP = probabilityPVP;
    this.taunt = taunt;
    this.destParam1 = destParam1;
    this.destParam1Value = destParam1Value;
    this.destParam2 = destParam2;
    this.destParam2Value = destParam2Value;
    this.requiredMP = requiredMP;
    this.requiredFP = requiredFP;
    this.cooldownTime = cooldownTime;
    this.castingTime = castingTime;
    this.skillRange = skillRange;
    this.circleTime = circleTime;
    this.painTime = painTime;
    this.skillTime = skillTime;
    this.skillCount = skillCount;
    this.skillExp = skillExp;
    this.experience = experience;
    this.comboSkillTime = comboSkillTime;
  }
}