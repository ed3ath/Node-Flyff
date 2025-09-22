import { ItemKind1, ItemKind2, ItemKind3 } from '../../types/itemKind';
import { DefineJob } from '../../game/definitions/defineJob';
import { ItemPartType } from '../../types/itemPartyType';
import { ElementType } from '../../types/elementType';
import { WeaponKindType } from '../../types/weaponKindType';
import { WeaponType } from '../../types/weaponType';
import { DefineAttributes } from '../../game/definitions/defineAttributes';

export class ItemProperties {
  public version: number;
  public id: number;
  public identifierName: string;
  public name: string;
  public nameKey: string;
  public packMax: number;
  public itemKind1: ItemKind1;
  public itemKind2: ItemKind2;
  public itemKind3: ItemKind3;
  public itemJob: DefineJob;
  public itemSex: number;
  public cost: number;
  public limitLevel: number;
  public parts: ItemPartType;
  public abilityMin: number;
  public abilityMax: number;
  public element: ElementType;
  public level: number;
  public rare: number;
  public attackSpeed: number;
  public destParam1: string;
  public destParam2: string;
  public destParam3: string;
  public adjustParam1: number;
  public adjustParam2: number;
  public adjustParam3: number;
  public circleTime: number;
  public isUseable: boolean;
  public sfxObject: number;
  public sfxObject2: number;
  public sfxObject3: number;
  public sfxObject4: number;
  public sfxObject5: number;
  public isPermanant: boolean;
  public coolTime: number;
  public weaponTypeId: number;
  public itemAtkOrder1: number;
  public itemAtkOrder2: number;
  public itemAtkOrder3: number;
  public itemAtkOrder4: number;
  public skillReadyType: number;
  public weaponKind: WeaponKindType;
  public attackSkillMin: number;
  public attackSkillMax: number;
  public params: ReadonlyMap<DefineAttributes, number>;

  constructor(config: {
    id: number;
    name: string;
    identifierName: string;
    parts: ItemPartType;
    isStackable?: boolean;
    packMax?: number;
    limitLevel?: number;
    itemSex?: number;
    itemJob?: DefineJob;
    itemKind2?: ItemKind2;
    itemKind3?: ItemKind3;
    isUseable?: boolean;
    coolTime?: number;
    version?: number;
    nameKey?: string;
    itemKind1?: ItemKind1;
    cost?: number;
    abilityMin?: number;
    abilityMax?: number;
    element?: ElementType;
    level?: number;
    rare?: number;
    attackSpeed?: number;
    destParam1?: string;
    destParam2?: string;
    destParam3?: string;
    adjustParam1?: number;
    adjustParam2?: number;
    adjustParam3?: number;
    circleTime?: number;
    sfxObject?: number;
    sfxObject2?: number;
    sfxObject3?: number;
    sfxObject4?: number;
    sfxObject5?: number;
    isPermanant?: boolean;
    weaponTypeId?: number;
    itemAtkOrder1?: number;
    itemAtkOrder2?: number;
    itemAtkOrder3?: number;
    itemAtkOrder4?: number;
    skillReadyType?: number;
    weaponKind?: WeaponKindType;
    attackSkillMin?: number;
    attackSkillMax?: number;
    params?: ReadonlyMap<DefineAttributes, number>;
  }) {
    this.version = config.version || 0;
    this.id = config.id;
    this.identifierName = config.identifierName;
    this.name = config.name;
    this.nameKey = config.nameKey || '';
    this.packMax = config.packMax || (config.isStackable ? 999 : 1);
    this.itemKind1 = config.itemKind1 || ItemKind1.GENERAL;
    this.itemKind2 = config.itemKind2 || ItemKind2.GENERAL;
    this.itemKind3 = config.itemKind3 || ItemKind3.GENERAL;
    this.itemJob = config.itemJob || DefineJob.JOB_VAGRANT;
    this.itemSex = config.itemSex || -1;
    this.cost = config.cost || 0;
    this.limitLevel = config.limitLevel || 0;
    this.parts = config.parts;
    this.abilityMin = config.abilityMin || 0;
    this.abilityMax = config.abilityMax || 0;
    this.element = config.element || ElementType.None;
    this.level = config.level || 0;
    this.rare = config.rare || 0;
    this.attackSpeed = config.attackSpeed || 0;
    this.destParam1 = config.destParam1 || '';
    this.destParam2 = config.destParam2 || '';
    this.destParam3 = config.destParam3 || '';
    this.adjustParam1 = config.adjustParam1 || 0;
    this.adjustParam2 = config.adjustParam2 || 0;
    this.adjustParam3 = config.adjustParam3 || 0;
    this.circleTime = config.circleTime || 0;
    this.isUseable = config.isUseable || false;
    this.sfxObject = config.sfxObject || 0;
    this.sfxObject2 = config.sfxObject2 || 0;
    this.sfxObject3 = config.sfxObject3 || 0;
    this.sfxObject4 = config.sfxObject4 || 0;
    this.sfxObject5 = config.sfxObject5 || 0;
    this.isPermanant = config.isPermanant || false;
    this.coolTime = config.coolTime || 0;
    this.weaponTypeId = config.weaponTypeId || 0;
    this.itemAtkOrder1 = config.itemAtkOrder1 || 0;
    this.itemAtkOrder2 = config.itemAtkOrder2 || 0;
    this.itemAtkOrder3 = config.itemAtkOrder3 || 0;
    this.itemAtkOrder4 = config.itemAtkOrder4 || 0;
    this.skillReadyType = config.skillReadyType || 0;
    this.weaponKind = config.weaponKind || WeaponKindType.General;
    this.attackSkillMin = config.attackSkillMin || 0;
    this.attackSkillMax = config.attackSkillMax || 0;
    this.params = config.params || new Map();
  }

  public get weaponType(): WeaponType {
    return this.weaponTypeId as WeaponType;
  }

  public get isStackable(): boolean {
    return this.packMax > 1;
  }

  // Legacy compatibility getters for dw* properties
  public get dwAbilityMin(): number { return this.abilityMin; }
  public get dwAbilityMax(): number { return this.abilityMax; }
  public get dwReferStat1(): string { return this.destParam1; }
  public get dwWeaponType(): number { return this.weaponTypeId; }
  public get dwAddSkillMin(): number { return this.attackSkillMin; }
  public get dwAddSkillMax(): number { return this.attackSkillMax; }
}