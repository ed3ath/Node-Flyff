import { QuestItemProperties } from "./questItemProperties";
import { QuestMonsterProperties } from "./questMonsterProperties";
import { QuestPatrolProperties } from "./questPatrolProperties";

export class QuestEndConditionProperties {
  public readonly items: ReadonlyArray<QuestItemProperties>;
  public readonly monsters: ReadonlyArray<QuestMonsterProperties>;
  public readonly patrols: ReadonlyArray<QuestPatrolProperties>;

  constructor(args: {
    items?: QuestItemProperties[];
    monsters?: QuestMonsterProperties[];
    patrols?: QuestPatrolProperties[];
  }) {
    this.items = Object.freeze(args.items ?? []);
    this.monsters = Object.freeze(args.monsters ?? []);
    this.patrols = Object.freeze(args.patrols ?? []);
  }
}
