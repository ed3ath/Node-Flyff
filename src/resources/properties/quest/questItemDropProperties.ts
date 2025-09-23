export class QuestItemDropProperties {
  public readonly monsterId: string;
  public readonly itemId: string;
  public readonly probability: number; // long in C#; number in TS
  public readonly quantity: number;

  constructor(args: {
    monsterId: string;
    itemId: string;
    probability: number;
    quantity: number;
  }) {
    this.monsterId = args.monsterId;
    this.itemId = args.itemId;
    this.probability = args.probability;
    this.quantity = args.quantity;
  }
}