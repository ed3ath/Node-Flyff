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
import { SkillResources } from "../resources/skillResources";
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
  skillResource: SkillResources;
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

  /** Mover string identifier (legacy compatibility) */
  dwID?: string;

  /** Mover identifier name */
  identifierName?: string;

  /** Mover name */
  name?: string;
  szName?: string;

  /** Mover AI id */
  AI?: number;
  dwAI?: string;

  /** Mover belligerence */
  belligerence?: number;
  dwBelligerence?: string;

  /** Mover speed */
  speed?: number;
  fSpeed?: number;

  /** Mover Hit Points (HP) */
  addHp?: number;
  dwAddHp?: number;

  /** Mover Magic Points (MP) */
  addMp?: number;
  dwAddMp?: number;

  /** Mover level */
  level?: number;
  dwLevel?: number;

  /** Mover flight level */
  flightLevel?: number;
  dwFlightLevel?: number;

  /** Mover attack min */
  attackMin?: number;
  dwAtkMin?: number;

  /** Mover attack max */
  attackMax?: number;
  dwAtkMax?: number;

  /** Mover strength */
  strength?: number;
  dwStr?: number;

  /** Mover stamina */
  stamina?: number;
  dwSta?: number;

  /** Mover dexterity */
  dexterity?: number;
  dwDex?: number;

  /** Mover intelligence */
  intelligence?: number;
  dwInt?: number;

  /** Mover hit rate */
  hitRating?: number;
  dwHR?: number;

  /** Mover escape rate */
  escapeRating?: number;
  dwER?: number;

  /** Mover class */
  class?: MoverClassType;
  dwClass?: number;

  /** Mover natural armor */
  naturalArmor?: number;
  dwNaturealArmor?: number;

  /** Mover magic resistance */
  magicResistance?: number;
  dwResisMagic?: number;

  /** Mover attack delay */
  reAttackDelay?: number;
  dwReAttackDelay?: number;

  /** Mover attack speed */
  attackSpeed?: number;
  dwAttackSpeed?: number;

  /** Monster correction value */
  correctionValue?: number;
  dwCorrectionValue?: number;

  /** Amount of experience given when the mover dies */
  experience?: number;
  dwExpValue?: number;

  /** Monster element type */
  element?: ElementType;
  eElementType?: string;

  /** Mover's resistance to electricity */
  electricityResistance?: number;
  fResistElecricity?: number;

  /** Mover's resistance to fire */
  fireResistance?: number;
  fResistFire?: number;

  /** Mover's resistance to wind */
  windResistance?: number;
  fResistWind?: number;

  /** Mover's resistance to water */
  waterResistance?: number;
  fResistWater?: number;

  /** Mover's resistance to earth */
  earthResistance?: number;
  fResistEarth?: number;

  /** Boolean value that indicates if the mover is flying or not */
  isFlying?: boolean;
  bFlying?: string;

  /** Minimal amount of gold dropped when the mover dies */
  dropGoldMin?: number;

  /** Maximal amount of gold dropped when the mover dies */
  dropGoldMax?: number;

  /** Maximal amount of items dropped when the mover dies */
  maxDropItem?: number;

  /** Collection of items the mover can drop */
  dropItems?: DropItemProperties[];

  /** Collection of item kinds the mover can drop */
  dropItemsKind?: DropItemKindProperties[];

  // Additional legacy properties for compatibility
  dwRace?: string;
  dwGender?: string;
  dwSize?: number;
  bIfPart?: string;
  dwKarma?: string;
  dwUseable?: string;
  dwActionRadius?: number;
  dwAtk1?: number;
  dwAtk2?: number;
  dwAtk3?: number;
  dwHorizontalRate?: number;
  dwVerticalRate?: number;
  dwDiagonalRate?: number;
  dwThrustRate?: number;
  dwChestRate?: number;
  dwHeadRate?: number;
  dwArmRate?: number;
  dwLegRate?: number;
  dwAdjAtkDelay?: number;
  wElementAtk?: number;
  dwHideLevel?: number;
  dwShelter?: number;
  dwJumpIng?: number;
  dwAirJump?: number;
  bTaming?: string;
  dwCash?: number;
  dwSourceMaterial?: number;
  dwMaterialAmount?: number;
  dwCohesion?: number;
  dwHoldingTime?: number;
  nFxpValue?: number;
  nBodyState?: number;
  dwAddAbility?: number;
  bKillable?: string;
  dwVirtItem1?: string;
  dwVirtType1?: string;
  dwVirtItem2?: string;
  dwVirtType2?: string;
  dwVirtItem3?: string;
  dwVirtType3?: string;
  dwSndAtk1?: number;
  dwSndAtk2?: number;
  dwSndDie1?: number;
  dwSndDie2?: number;
  dwSndDmg1?: number;
  dwSndDmg2?: number;
  dwSndDmg3?: number;
  dwSndIdle1?: number;
  dwSndIdle2?: number;
  szComment?: string;
  dwAreaColor?: number;
  szNpcMark?: string;
  dwMadrigalGiftPoint?: number;
  nAbrasion?: number;
  nHardness?: number;
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
