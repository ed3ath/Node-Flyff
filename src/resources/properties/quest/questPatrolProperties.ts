export class QuestPatrolProperties {
  public readonly mapId: string;
  public readonly left: number;
  public readonly top: number;
  public readonly right: number;
  public readonly bottom: number;

  constructor(args: {
    mapId: string;
    left: number;
    top: number;
    right: number;
    bottom: number;
  }) {
    this.mapId = args.mapId;
    this.left = args.left;
    this.top = args.top;
    this.right = args.right;
    this.bottom = args.bottom;
  }
}
