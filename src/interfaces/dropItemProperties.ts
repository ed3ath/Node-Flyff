import { ItemKind3 } from "../types/itemKind";

export interface DropItemProperties {
  itemId: number;
  probability: number;
  itemMaxRefine: number;
  count: number;
}

export interface DropItemKindProperties {
  itemKind: ItemKind3;
  uniqueMin: number;
  uniqueMax: number;
}