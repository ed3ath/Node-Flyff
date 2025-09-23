import { QuestEndConditionProperties } from "./questEndConditionProperties";
import { QuestItemDropProperties } from "./questItemDropProperties";
import { QuestRewardProperties } from "./questRewardProperties";
import { QuestStartRequirementsProperties } from "./questStartRequirementsProperties";

export class QuestProperties {
  public readonly id: number;
  public readonly name: string;
  public readonly title: string;
  public readonly startCharacter: string;
  public readonly endCharacter: string;

  public readonly rewards: QuestRewardProperties;
  public readonly startRequirements: QuestStartRequirementsProperties;
  public readonly questEndCondition: QuestEndConditionProperties;

  public readonly drops: ReadonlyArray<QuestItemDropProperties>;
  public readonly beginDialogs: ReadonlyArray<string>;
  public readonly acceptedDialogs: ReadonlyArray<string>;
  public readonly declinedDialogs: ReadonlyArray<string>;
  public readonly completedDialogs: ReadonlyArray<string>;
  public readonly notFinishedDialogs: ReadonlyArray<string>;

  constructor(args: {
    id: number;
    name: string;
    title: string;
    startCharacter: string;
    endCharacter: string;

    rewards: QuestRewardProperties;
    startRequirements: QuestStartRequirementsProperties;
    questEndCondition: QuestEndConditionProperties;

    drops?: QuestItemDropProperties[];
    beginDialogs?: string[];
    acceptedDialogs?: string[];
    declinedDialogs?: string[];
    completedDialogs?: string[];
    notFinishedDialogs?: string[];
  }) {
    this.id = args.id;
    this.name = args.name;
    this.title = args.title;
    this.startCharacter = args.startCharacter;
    this.endCharacter = args.endCharacter;

    this.rewards = args.rewards;
    this.startRequirements = args.startRequirements;
    this.questEndCondition = args.questEndCondition;

    this.drops = Object.freeze(args.drops ?? []);
    this.beginDialogs = Object.freeze(args.beginDialogs ?? []);
    this.acceptedDialogs = Object.freeze(args.acceptedDialogs ?? []);
    this.declinedDialogs = Object.freeze(args.declinedDialogs ?? []);
    this.completedDialogs = Object.freeze(args.completedDialogs ?? []);
    this.notFinishedDialogs = Object.freeze(args.notFinishedDialogs ?? []);
  }
}