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

  constructor(
    version: number,
    id: number,
    identifierName: string,
    name: string,
    nameKey: string,
    packMax: number,
    itemKind1: ItemKind1,
    itemKind2: ItemKind2,
    itemKind3: ItemKind3,
    itemJob: DefineJob,
    itemSex: number,
    cost: number,
    limitLevel: number,
    parts: ItemPartType,
    abilityMin: number,
    abilityMax: number,
    element: ElementType,
    level: number,
    rare: number,
    attackSpeed: number,
    destParam1: string,
    destParam2: string,
    destParam3: string,
    adjustParam1: number,
    adjustParam2: number,
    adjustParam3: number,
    circleTime: number,
    isUseable: boolean,
    sfxObject: number,
    sfxObject2: number,
    sfxObject3: number,
    sfxObject4: number,
    sfxObject5: number,
    isPermanant: boolean,
    coolTime: number,
    weaponTypeId: number,
    itemAtkOrder1: number,
    itemAtkOrder2: number,
    itemAtkOrder3: number,
    itemAtkOrder4: number,
    skillReadyType: number,
    weaponKind: WeaponKindType,
    attackSkillMin: number,
    attackSkillMax: number,
    params: ReadonlyMap<DefineAttributes, number>
  ) {
    this.version = version;
    this.id = id;
    this.identifierName = identifierName;
    this.name = name;
    this.nameKey = nameKey;
    this.packMax = packMax;
    this.itemKind1 = itemKind1;
    this.itemKind2 = itemKind2;
    this.itemKind3 = itemKind3;
    this.itemJob = itemJob;
    this.itemSex = itemSex;
    this.cost = cost;
    this.limitLevel = limitLevel;
    this.parts = parts;
    this.abilityMin = abilityMin;
    this.abilityMax = abilityMax;
    this.element = element;
    this.level = level;
    this.rare = rare;
    this.attackSpeed = attackSpeed;
    this.destParam1 = destParam1;
    this.destParam2 = destParam2;
    this.destParam3 = destParam3;
    this.adjustParam1 = adjustParam1;
    this.adjustParam2 = adjustParam2;
    this.adjustParam3 = adjustParam3;
    this.circleTime = circleTime;
    this.isUseable = isUseable;
    this.sfxObject = sfxObject;
    this.sfxObject2 = sfxObject2;
    this.sfxObject3 = sfxObject3;
    this.sfxObject4 = sfxObject4;
    this.sfxObject5 = sfxObject5;
    this.isPermanant = isPermanant;
    this.coolTime = coolTime;
    this.weaponTypeId = weaponTypeId;
    this.itemAtkOrder1 = itemAtkOrder1;
    this.itemAtkOrder2 = itemAtkOrder2;
    this.itemAtkOrder3 = itemAtkOrder3;
    this.itemAtkOrder4 = itemAtkOrder4;
    this.skillReadyType = skillReadyType;
    this.weaponKind = weaponKind;
    this.attackSkillMin = attackSkillMin;
    this.attackSkillMax = attackSkillMax;
    this.params = params;
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