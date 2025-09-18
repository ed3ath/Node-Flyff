import { DefineAttributes } from "../game/definitions/defineAttributes";
import { DefineJob, JobType } from "../game/definitions/defineJob";
import { ItemResources } from "../resources/itemResource";
import { MonsterResources } from "../resources/monsterResource";
import { DeathPenaltyResources } from "../resources/deathPenaltyResource";
import { ExpTableResources } from "../resources/expTableResource";
import { JobResources } from "../resources/jobResource";
import { MapResources } from "../resources/mapResources";
import { NpcResources } from "../resources/npcResource";
import { DropItemProperties, DropItemKindProperties } from "./dropItemProperties";
import { QuestResourcesYaml } from "../resources/questResourcesYaml";
import { ElementType } from "../types/elementType";
import { MoverClassType } from "../types/moverClassType";
export interface GameResources {
  itemResources: ItemResources;
  monsterResources: MonsterResources;
  npcResources: NpcResources;
  jobResources: JobResources;
  expTableResources: ExpTableResources;
  deathPenaltyResource: DeathPenaltyResources;
  mapResource: MapResources;
  questResources: QuestResourcesYaml;
}
export interface ItemProperties {
  id: number;
  ver6: number;
  dwID: string;
  szName: string;
  szNameId: string;
  dwPackMax: number;
  dwItemKind1: string;
  dwItemKind2: string;
  dwItemKind3: string;
  dwItemJob: string;
  bPermanence: boolean;
  dwUseable: boolean;
  dwItemSex: number;
  dwCost: number;
  dwLimitLevel1: number;
  dwParts: string;
  dwAbilityMin: number;
  dwAbilityMax: number;
  eItemType: string;
  dwItemLV: number;
  dwItemRare: number;
  dwAttackSpeed: number;
  dwDestParam1: string;
  dwDestParam2: string;
  dwDestParam3: string;
  nAdjParamVal1: number;
  nAdjParamVal2: number;
  nAdjParamVal3: number;
  dwCircleTime: number;
  dwSfxObj: string;
  dwSfxObj2: string;
  dwSfxObj3: string;
  dwSfxObj4: string;
  dwSfxObj5: string;
  dwSkillReady: number;
  dwWeaponType: number;
  dwItemAtkOrder1: number;
  dwItemAtkOrder2: number;
  dwItemAtkOrder3: number;
  dwItemAtkOrder4: number;
  dwSkillReadyType: number;
  dwReferStat1: string;
  dwAddSkillMin: number;
  dwAddSkillMax: number;
  dwReqMp: number;
  dwReqFp: number;
  dwReferStat2: string;
  dwReferTarget1: string;
  dwReferTarget2: string;
  dwReferValue1: number;
  dwReferValue2: number;
  dwFlightLimit: number;
  dwFFuelReMax: number;
  dwAFuelReMax: number;
  dwReflect: number;
  dwQuestID: number;
  szComment: string;
  readonly stackable?: boolean;
  readonly Params?: Readonly<Record<DefineAttributes, number>>;
}

/**
 * Represents a Mover data structure from the propMover.txt resource file.
 * Converted from C# Rhisis.Game.Resources.Properties.MoverProperties class.
 */
export interface MoverProperties {
  /** Mover ID */
  id: number;

  /** Mover identifier name */
  identifierName: string;

  /** Mover name */
  name: string;

  /** Mover AI id */
  AI: number;

  /** Mover belligerence */
  belligerence: number;

  /** Mover speed */
  speed: number;

  /** Mover Hit Points (HP) */
  addHp: number;

  /** Mover Magic Points (MP) */
  addMp: number;

  /** Mover level */
  level: number;

  /** Mover flight level */
  flightLevel: number;

  /** Mover attack min */
  attackMin: number;

  /** Mover attack max */
  attackMax: number;

  /** Mover strength */
  strength: number;

  /** Mover stamina */
  stamina: number;

  /** Mover dexterity */
  dexterity: number;

  /** Mover intelligence */
  intelligence: number;

  /** Mover hit rate */
  hitRating: number;

  /** Mover escape rate */
  escapeRating: number;

  /** Mover class */
  class: MoverClassType;

  /** Mover natural armor */
  naturalArmor: number;

  /** Mover magic resistance */
  magicResistance: number;

  /** Mover attack delay */
  reAttackDelay: number;

  /** Mover attack speed */
  attackSpeed: number;

  /** Monster correction value */
  correctionValue: number;

  /** Amount of experience given when the mover dies */
  experience: number;

  /** Monster element type */
  element: ElementType;

  /** Mover's resistance to electricity */
  electricityResistance: number;

  /** Mover's resistance to fire */
  fireResistance: number;

  /** Mover's resistance to wind */
  windResistance: number;

  /** Mover's resistance to water */
  waterResistance: number;

  /** Mover's resistance to earth */
  earthResistance: number;

  /** Boolean value that indicates if the mover is flying or not */
  isFlying: boolean;

  /** Minimal amount of gold dropped when the mover dies */
  dropGoldMin: number;

  /** Maximal amount of gold dropped when the mover dies */
  dropGoldMax: number;

  /** Maximal amount of items dropped when the mover dies */
  maxDropItem: number;

  /** Collection of items the mover can drop */
  dropItems: DropItemProperties[];

  /** Collection of item kinds the mover can drop */
  dropItemsKind: DropItemKindProperties[];
}

export interface NpcProperties {
  id: string;
  name: string;
  modelId?: number;
  hairId?: number;
  hairColor?: number;
  faceId?: number;
  items?: number[];
  shop?: ShopProperties;
  hasShop: boolean;
  dialog?: DialogProperties;
  hasDialog: boolean;
  canBuff: boolean;
}

export interface ShopProperties {
  name: string;
  items: ShopItemProperties[];
}
export interface ShopItemProperties {
  id: number;
  refine: number;
  element: number;
  elementRefine: number;
}

export interface DialogProperties {
  name: string;
  shoutText: string;
  introText: string;
  byeText: string;
  links: Set<DialogLink>;
}

export interface DialogLink {
  id: number;
  title: string;
  texts: Set<string>;
  questId?: number;
}

export interface JobProperties {
  id: DefineJob;
  identifier: string;
  attackSpeed: number;
  maxHpFactor: number;
  maxMpFactor: number;
  maxFpFactor: number;
  defenseFactor: number;
  hpRecoveryFactor: number;
  mpRecoveryFactor: number;
  fpRecoveryFactor: number;
  meleeSword: number;
  meleeAxe: number;
  meleeStaff: number;
  meleeStick: number;
  meleeKnuckle: number;
  magicWand: number;
  blocking: number;
  meleeYoyo: number;
  critical: number;
  type: JobType;
  parent: JobType;
  minLevel: number;
  maxLevel: number;
}
export interface CharacterExp {
  level: number;
  exp: number;
  pxp: number;
  gp: number;
  limitExp: number;
}
export interface DropLuck {
  level: number;
  chance: number[];
}
export interface PenaltyValue {
  level: number;
  value: number;
}
export interface DeathPenalty {
  revivalPenalty: PenaltyValue[];
  decreaseExpPenalty: PenaltyValue[];
  levelDownPenalty: PenaltyValue[];
}

export interface WorldPath {
  id: string;
  name: string;
}

export interface WorldData {
  width: number;
  length: number;
  mpu: number;
  indoor: boolean;
  fly: boolean;
  revivalMapId: number;
  revivalKey: string;
}

export interface WorldProperties {}

export interface SkillLevelProperties {
  id: number;
  dwID: string;
  dwName: string;
  dwNameId: string;
  dwSkillLvl: number;
  dwAbilityMin: number;
  dwAtkAbilityMax: number;
  dwAbilityMinPVP: number;
  dwAbilityMaxPVP: number;
  dwAttackSpeed: number;
  dwDmgShift: boolean;
  nProbability: number;
  nProbabilityPVP: number;
  dwTaunt: number;
  dwDestParam1: string;
  nAdjParamVal1: number;
  dwDestParam2: string;
  nAdjParamVal2: number;
  dwReqMp: number;
  dwRepFp: number;
  dwCooldown: number;
  dwCastingTime: number;
  dwSkillRange: number;
  dwCircleTime: number;
  dwPainTime: number;
  dwSkillTime: number;
  dwSkillCount: number;
  dwSkillExp: number;
  dwExp: number;
  dwComboSkillTime: number;
}

export interface SkillProperties {
  id: number;
  ver: number;
  dwID: string;
  szName: string;
  szNameId: string;
  dwItemKind1: string;
  dwItemKind2: string;
  dwItemKind3: string;
  dwLinkKind: string;
  dwLinkKindBullet: string;
  eItemType: string;
  tmContinuousPain: number;
  dwReqDisLV: number;
  dwReSkill1: number;
  dwReSkillLevel1: number;
  dwReSkill2: number;
  dwReSkillLevel2: number;
  dwSkillReady: number;
  dwSfxObj: string;
  dwSfxObj2: string;
  dwSfxObj3: string;
  dwSfxObj4: string;
  dwSfxObj5: string;
  ExpertMax: number;
  dwSkillType: string;
  dwSpellRegion: string;
  dwSpellType: string;
  dwExeTarget: string;
  dwReferStat1: string;
  dwReferStat2: string;
  dwReferTarget1: string;
  dwReferValue1: number;
  dwReferTarget2: string;
  dwReferValue2: number;
  dwHanded?: string;
  skillLevels?: Record<number, SkillLevelProperties>;
  szComment: string;
}
