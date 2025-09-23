import { DefineJob, JobType, SkillGroupDisciple } from '../../game/definitions/defineJob';
import { ItemKind3, ItemKind2 } from '../../types/itemKind';
import { ElementType } from '../../types/elementType';
import { DefineSpecialEffects } from '../../game/definitions/defineSpecialEffects';
import { SkillType } from '../../types/skillType';
import { SpellRegionType } from '../../types/spellRegionType';
import { SpellType } from '../../types/spellType';
import { SkillExecuteTargetType } from '../../types/skillExecuteTargetType';
import { DefineAttributes } from '../../game/definitions/defineAttributes';
import { SkillReferTargetType } from '../../types/skillPreferTargetType';
import { WeaponHandType } from '../../types/weaponHandType';
import { SkillLevelProperties } from './skillLevelProperties';

export class SkillProperties {
  public version: number;
  public id: number;
  public index: number;
  public name: string;
  public jobType: JobType;
  public job: DefineJob;
  public group: SkillGroupDisciple;
  public linkKind: ItemKind3 | null;
  public bulletLinkKind: ItemKind2 | null;
  public element: ElementType | null;
  public continuousPainTime: number;
  public requiredLevel: number;
  public requiredSkillId1: number;
  public requiredSkillLevel1: number;
  public requiredSkillId2: number;
  public requiredSkillLevel2: number;
  public skillReadyTime: number;
  public specialEffect1: DefineSpecialEffects;
  public specialEffect2: DefineSpecialEffects;
  public specialEffect3: DefineSpecialEffects;
  public specialEffect4: DefineSpecialEffects;
  public specialEffect5: DefineSpecialEffects;
  public maxLevel: number;
  public type: SkillType;
  public spellRegionType: SpellRegionType;
  public spellType: SpellType;
  public executeTarget: SkillExecuteTargetType;
  public referStat1: DefineAttributes;
  public referStat2: DefineAttributes;
  public referTarget1: SkillReferTargetType;
  public referValue1: number;
  public referTarget2: SkillReferTargetType;
  public referValue2: number;
  public handed: WeaponHandType | null;
  public skillLevels: ReadonlyMap<number, SkillLevelProperties>;

  constructor(
    version: number,
    id: number,
    index: number,
    name: string,
    jobType: JobType,
    job: DefineJob,
    group: SkillGroupDisciple,
    linkKind: ItemKind3 | null,
    bulletLinkKind: ItemKind2 | null,
    element: ElementType | null,
    continuousPainTime: number,
    requiredLevel: number,
    requiredSkillId1: number,
    requiredSkillLevel1: number,
    requiredSkillId2: number,
    requiredSkillLevel2: number,
    skillReadyTime: number,
    specialEffect1: DefineSpecialEffects,
    specialEffect2: DefineSpecialEffects,
    specialEffect3: DefineSpecialEffects,
    specialEffect4: DefineSpecialEffects,
    specialEffect5: DefineSpecialEffects,
    maxLevel: number,
    type: SkillType,
    spellRegionType: SpellRegionType,
    spellType: SpellType,
    executeTarget: SkillExecuteTargetType,
    referStat1: DefineAttributes,
    referStat2: DefineAttributes,
    referTarget1: SkillReferTargetType,
    referValue1: number,
    referTarget2: SkillReferTargetType,
    referValue2: number,
    handed: WeaponHandType | null,
    skillLevels: ReadonlyMap<number, SkillLevelProperties>
  ) {
    this.version = version;
    this.id = id;
    this.index = index;
    this.name = name;
    this.jobType = jobType;
    this.job = job;
    this.group = group;
    this.linkKind = linkKind;
    this.bulletLinkKind = bulletLinkKind;
    this.element = element;
    this.continuousPainTime = continuousPainTime;
    this.requiredLevel = requiredLevel;
    this.requiredSkillId1 = requiredSkillId1;
    this.requiredSkillLevel1 = requiredSkillLevel1;
    this.requiredSkillId2 = requiredSkillId2;
    this.requiredSkillLevel2 = requiredSkillLevel2;
    this.skillReadyTime = skillReadyTime;
    this.specialEffect1 = specialEffect1;
    this.specialEffect2 = specialEffect2;
    this.specialEffect3 = specialEffect3;
    this.specialEffect4 = specialEffect4;
    this.specialEffect5 = specialEffect5;
    this.maxLevel = maxLevel;
    this.type = type;
    this.spellRegionType = spellRegionType;
    this.spellType = spellType;
    this.executeTarget = executeTarget;
    this.referStat1 = referStat1;
    this.referStat2 = referStat2;
    this.referTarget1 = referTarget1;
    this.referValue1 = referValue1;
    this.referTarget2 = referTarget2;
    this.referValue2 = referValue2;
    this.handed = handed;
    this.skillLevels = skillLevels;
  }
}