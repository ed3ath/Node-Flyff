import { ItemKind3 } from '../../types/itemKind';

export class DropItemKindProperties {
  public itemKind: ItemKind3;
  public uniqueMin: number;
  public uniqueMax: number;

  constructor(itemKind: ItemKind3, uniqueMin: number, uniqueMax: number) {
    this.itemKind = itemKind;
    this.uniqueMin = uniqueMin;
    this.uniqueMax = uniqueMax;
  }
}