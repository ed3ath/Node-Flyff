import { ItemResources } from "../resources/itemResource";
import { MonsterResources } from "../resources/monsterResource";
import { DefineAttributes } from "../common/defineAttributes";
import { DefineJob, JobType } from "../common/defineJob";
export interface GameResources {
  itemResources: ItemResources;
  monsterResources: MonsterResources;
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
  dwDestParam1: number;
  dwDestParam2: number;
  dwDestParam3: number;
  nAdjParamVal1: number;
  nAdjParamVal2: number;
  nAdjParamVal3: number;
  dwCircleTime: number;
  dwSfxObj: number;
  dwSfxObj2: number;
  dwSfxObj3: number;
  dwSfxObj4: number;
  dwSfxObj5: number;
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
  bCharged: boolean;
  dwReferStat2: number;
  dwReferTarget1: number;
  dwReferTarget2: number;
  dwReferValue1: number;
  dwReferValue2: number;
  dwFlightLimit: number;
  dwFFuelReMax: number;
  dwAFuelReMax: number;
  dwLimitLevel: number;
  dwReflect: number;
  szIcon: string;
  dwQuestID: number;
  szTextFile: string;
  szComment: string;
  readonly stackable?: boolean;
  readonly Params?: Readonly<Record<DefineAttributes, number>>;
}

export interface MonsterProperties {
  id: number;
  dwID: string;
  szName: string;
  dwAI: string;
  dwStr: number;
  dwSta: number;
  dwDex: number;
  dwInt: number;
  dwHR: number;
  dwER: number;
  dwRace: string;
  dwBelligerence: string;
  dwGender: string;
  dwLevel: number;
  dwFlightLevel: number;
  dwSize: number;
  dwClass: number;
  bIfPart: string;
  dwKarma: string;
  dwUseable: string;
  dwActionRadius: number;
  dwAtkMin: number;
  dwAtkMax: number;
  dwAtk1: number;
  dwAtk2: number;
  dwAtk3: number;
  dwHorizontalRate: number;
  dwVerticalRate: number;
  dwDiagonalRate: number;
  dwThrustRate: number;
  dwChestRate: number;
  dwHeadRate: number;
  dwArmRate: number;
  dwLegRate: number;
  dwAttackSpeed: number;
  dwReAttackDelay: number;
  dwAddHp: number;
  dwAddMp: number;
  dwNaturealArmor: number;
  nAbrasion: number;
  nHardness: number;
  dwAdjAtkDelay: number;
  eElementType: string;
  wElementAtk: number;
  dwHideLevel: number;
  fSpeed: number;
  dwShelter: number;
  bFlying: string;
  dwJumpIng: number;
  dwAirJump: number;
  bTaming: string;
  dwResisMagic: number;
  fResistElecricity: number;
  fResistFire: number;
  fResistWind: number;
  fResistWater: number;
  fResistEarth: number;
  dwCash: number;
  dwSourceMaterial: number;
  dwMaterialAmount: number;
  dwCohesion: number;
  dwHoldingTime: number;
  dwCorrectionValue: number;
  dwExpValue: number;
  nFxpValue: number;
  nBodyState: number;
  dwAddAbility: number;
  bKillable: string;
  dwVirtItem1: string;
  dwVirtType1: string;
  dwVirtItem2: string;
  dwVirtType2: string;
  dwVirtItem3: string;
  dwVirtType3: string;
  dwSndAtk1: number;
  dwSndAtk2: number;
  dwSndDie1: number;
  dwSndDie2: number;
  dwSndDmg1: number;
  dwSndDmg2: number;
  dwSndDmg3: number;
  dwSndIdle1: number;
  dwSndIdle2: number;
  szComment: string;
  dwAreaColor: number;
  szNpcMark: string;
  dwMadrigalGiftPoint: number;
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
  id: DefineJob,
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