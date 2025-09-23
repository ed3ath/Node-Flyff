import { ShopItemProperties } from './shopItemProperties';

export class ShopProperties {
  public name: string;
  public items: ShopItemProperties[][];

  constructor(name: string, items: ShopItemProperties[][]) {
    this.name = name;
    this.items = items;
  }
}