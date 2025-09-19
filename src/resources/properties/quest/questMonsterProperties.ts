export class QuestMonsterProperties {
  public readonly id: string;
  public readonly amount: number;

  constructor(args: { id: string; amount: number }) {
    this.id = args.id;
    this.amount = args.amount;
  }
}
