import { ShopProperties, DialogProperties } from '../../interfaces/resource';

export class NpcProperties {
  public id: string;
  public name: string;
  public modelId: number;
  public hairId: number;
  public hairColor: number;
  public faceId: number;
  public items: number[];
  public shop: ShopProperties | null;
  public dialog: DialogProperties | null;
  public canBuff: boolean;

  constructor(
    id: string,
    name: string,
    shop: ShopProperties | null = null,
    dialog: DialogProperties | null = null
  ) {
    this.id = id;
    this.name = name;
    this.modelId = 0;
    this.hairId = 0;
    this.hairColor = 0;
    this.faceId = 0;
    this.items = [];
    this.shop = shop;
    this.dialog = dialog;
    this.canBuff = false;
  }

  public get hasShop(): boolean {
    return this.shop !== null;
  }

  public get hasDialog(): boolean {
    return this.dialog !== null;
  }
}