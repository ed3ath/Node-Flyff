import { DefineJob } from "../../../game/definitions/defineJob";

export class QuestStartRequirementsProperties {
  public readonly minLevel: number;
  public readonly maxLevel: number;
  public readonly jobs: ReadonlyArray<DefineJob>;
  public readonly previousQuestId?: string;

  constructor(args: {
    minLevel: number;
    maxLevel: number;
    jobs?: DefineJob[];
    previousQuestId?: string;
  }) {
    this.minLevel = args.minLevel;
    this.maxLevel = args.maxLevel;
    this.jobs = Object.freeze(args.jobs ?? []);
    this.previousQuestId = args.previousQuestId;
  }
}
