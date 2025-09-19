import { MoverClassType } from '../../types/moverClassType';
import { ElementType } from '../../types/elementType';
import { DropItemProperties } from './dropItemProperties';
import { DropItemKindProperties } from './dropItemKindProperties';

export class MoverProperties {
  public id: number;
  public identifierName: string;
  public name: string;
  public ai: number;
  public belligerence: number;
  public speed: number;
  public addHp: number;
  public addMp: number;
  public level: number;
  public flightLevel: number;
  public attackMin: number;
  public attackMax: number;
  public strength: number;
  public stamina: number;
  public dexterity: number;
  public intelligence: number;
  public hitRating: number;
  public escapeRating: number;
  public class: MoverClassType;
  public naturalArmor: number;
  public magicResistance: number;
  public reAttackDelay: number;
  public attackSpeed: number;
  public correctionValue: number;
  public experience: number;
  public element: ElementType;
  public electricityResistance: number;
  public fireResistance: number;
  public windResistance: number;
  public waterResistance: number;
  public earthResistance: number;
  public isFlying: boolean;
  public dropGoldMin: number;
  public dropGoldMax: number;
  public maxDropItem: number;
  public dropItems: DropItemProperties[];
  public dropItemsKind: DropItemKindProperties[];

  constructor(
    id: number,
    identifierName: string,
    name: string,
    ai: number,
    belligerence: number,
    speed: number,
    addHp: number,
    addMp: number,
    level: number,
    flightLevel: number,
    attackMin: number,
    attackMax: number,
    strength: number,
    stamina: number,
    dexterity: number,
    intelligence: number,
    hitRating: number,
    escapeRating: number,
    moverClass: MoverClassType,
    naturalArmor: number,
    magicResistance: number,
    reAttackDelay: number,
    attackSpeed: number,
    correctionValue: number,
    experience: number,
    element: ElementType,
    electricityResistance: number,
    fireResistance: number,
    windResistance: number,
    waterResistance: number,
    earthResistance: number,
    isFlying: boolean,
    dropGoldMin: number,
    dropGoldMax: number,
    maxDropItem: number,
    dropItems: DropItemProperties[],
    dropItemsKind: DropItemKindProperties[]
  ) {
    this.id = id;
    this.identifierName = identifierName;
    this.name = name;
    this.ai = ai;
    this.belligerence = belligerence;
    this.speed = speed;
    this.addHp = addHp;
    this.addMp = addMp;
    this.level = level;
    this.flightLevel = flightLevel;
    this.attackMin = attackMin;
    this.attackMax = attackMax;
    this.strength = strength;
    this.stamina = stamina;
    this.dexterity = dexterity;
    this.intelligence = intelligence;
    this.hitRating = hitRating;
    this.escapeRating = escapeRating;
    this.class = moverClass;
    this.naturalArmor = naturalArmor;
    this.magicResistance = magicResistance;
    this.reAttackDelay = reAttackDelay;
    this.attackSpeed = attackSpeed;
    this.correctionValue = correctionValue;
    this.experience = experience;
    this.element = element;
    this.electricityResistance = electricityResistance;
    this.fireResistance = fireResistance;
    this.windResistance = windResistance;
    this.waterResistance = waterResistance;
    this.earthResistance = earthResistance;
    this.isFlying = isFlying;
    this.dropGoldMin = dropGoldMin;
    this.dropGoldMax = dropGoldMax;
    this.maxDropItem = maxDropItem;
    this.dropItems = dropItems;
    this.dropItemsKind = dropItemsKind;
  }
}