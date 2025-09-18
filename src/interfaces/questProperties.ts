import { DefineJob } from "../common/defineJob";
import { GenderType } from "../common/genderType";

export interface QuestItemProperties {
  id: string;
  quantity: number;
  sex: GenderType;
  remove: boolean;
}

export interface QuestMonsterProperties {
  id: string;
  amount: number;
}

export interface QuestPatrolProperties {
  mapId: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface QuestStartRequirementsProperties {
  previousQuestId?: string;
  minLevel: number;
  maxLevel: number;
  jobs?: DefineJob[];
}

export interface QuestEndConditionProperties {
  items?: QuestItemProperties[];
  monsters?: QuestMonsterProperties[];
  patrols?: QuestPatrolProperties[];
}

export interface QuestRewardProperties {
  exp?: number;
  gold?: number;
  items?: QuestItemProperties[];
  skillPoints?: number;
}

export interface QuestItemDropProperties {
  itemId: string;
  monsterId: string;
  probability: number;
  quantity: number;
}

export interface QuestProperties {
  id: number;
  name: string;
  title: string;
  startCharacter: string;
  endCharacter: string;
  startRequirements: QuestStartRequirementsProperties;
  questEndCondition: QuestEndConditionProperties;
  rewards: QuestRewardProperties;
  drops: QuestItemDropProperties[];
  beginDialogs: string[];
  acceptedDialogs: string[];
  declinedDialogs: string[];
  completedDialogs: string[];
  notFinishedDialogs: string[];
}