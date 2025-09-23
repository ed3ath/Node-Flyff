export class DropItemProperties {
  public itemId: number;
  public probability: number;
  public itemMaxRefine: number;
  public count: number;

  constructor(itemId: number, probability: number, itemMaxRefine: number, count: number) {
    this.itemId = itemId;
    this.probability = probability;
    this.itemMaxRefine = itemMaxRefine;
    this.count = count;
  }
}