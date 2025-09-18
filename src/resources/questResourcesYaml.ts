import fs from "fs-extra";
import path from "path";
import yaml from "js-yaml";
import { Logger } from "../helpers/logger";
import { ResourcePaths } from "./resourcePaths";
import { DefineJob } from "../common/defineJob";
import { GenderType } from "../common/genderType";
import { QuestProperties } from "./properties/quest/quest";
import { QuestEndConditionProperties } from "./properties/quest/questEndCondition";
import { QuestItemDropProperties } from "./properties/quest/questItemDrop";
import { QuestRewardProperties } from "./properties/quest/questReward";
import { QuestStartRequirementsProperties } from "./properties/quest/questStartRequirements";
import { QuestItemProperties } from "./properties/quest/questItem";
import { QuestMonsterProperties } from "./properties/quest/questMonster";
import { QuestPatrolProperties } from "./properties/quest/questPatrol";

interface YamlQuestData {
  quest_id: string;
  title: string;
  character: string;
  end_character?: string;
  start_requirements?: {
    min_level?: number;
    max_level?: number;
    previous_quest?: string;
    job?: string[];
  };
  rewards?: {
    gold?: number;
    exp?: number;
    skill_points?: number;
    items?: Array<{
      id: string;
      quantity: number;
      sex: string;
      remove: boolean;
    }>;
  };
  end_conditions?: {
    items?: Array<{
      id: string;
      quantity: number;
      sex: string;
      remove: boolean;
    }>;
    monsters?: Array<{
      id: string;
      amount: number;
    }>;
    patrols?: Array<{
      map_id: string;
      left: number;
      top: number;
      right: number;
      bottom: number;
    }>;
  };
  drops?: Array<{
    item_id: string;
    probability: number;
    quantity: number;
    monsters: string[];
  }>;
  dialogs?: {
    begin?: string[];
    begin_yes?: string[];
    begin_no?: string[];
    completed?: string[];
    not_finished?: string[];
  };
}

export class QuestResourcesYaml {
  private readonly logger: Logger;
  private readonly defines: Map<string, number>;
  private readonly quests: Map<number, QuestProperties> = new Map();
  private readonly questByIdentifiers: Map<string, QuestProperties> = new Map();
  private readonly questsYamlPath: string;

  constructor(defines: Map<string, number>) {
    this.logger = new Logger("QuestResourcesYaml");
    this.defines = defines;
    this.questsYamlPath = path.join(path.dirname(ResourcePaths.questsPath), "quests-yaml");
  }

  public async loadDefines(): Promise<void> {
    const startTime = Date.now();

    if (!fs.existsSync(ResourcePaths.defineQuest)) {
      this.logger.warn(`Quest defines file not found: ${ResourcePaths.defineQuest}`);
      return;
    }

    try {
      const content = fs.readFileSync(ResourcePaths.defineQuest, 'utf-8');
      const lines = content.split('\n');

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#define QUEST_')) {
          const match = trimmed.match(/#define\s+(\w+)\s+(\d+)/);
          if (match) {
            const questName = match[1];
            const questId = parseInt(match[2], 10);
            this.defines.set(questName, questId);
          }
        }
      }

      const elapsed = Date.now() - startTime;
      this.logger.info(`${this.defines.size} quest defines loaded in ${elapsed}ms`);
    } catch (error) {
      this.logger.error("Failed to load quest defines:", error);
    }
  }

  public get(questId: number): QuestProperties | null {
    return this.quests.get(questId) || null;
  }

  public getByIdentifier(questIdentifier: string): QuestProperties | null {
    const questId = parseInt(questIdentifier, 10);
    if (!isNaN(questId)) {
      return this.get(questId);
    } else {
      return this.questByIdentifiers.get(questIdentifier) || null;
    }
  }

  public where(predicate: (quest: QuestProperties) => boolean): QuestProperties[] {
    const results: QuestProperties[] = [];
    for (const quest of this.quests.values()) {
      if (predicate(quest)) {
        results.push(quest);
      }
    }
    return results;
  }

  public getLoadedCount(): number {
    return this.quests.size;
  }

  public load(): void {
    const startTime = Date.now();

    if (!fs.existsSync(this.questsYamlPath)) {
      this.logger.warn(`Quests YAML directory not found: ${this.questsYamlPath}`);
      this.logger.info("Falling back to Lua quest loading...");
      return;
    }

    const questFilePaths = fs.readdirSync(this.questsYamlPath)
      .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'))
      .map(file => path.join(this.questsYamlPath, file));

    if (questFilePaths.length === 0) {
      this.logger.warn("No YAML quest files found");
      return;
    }

    let loadedCount = 0;
    let errorCount = 0;

    for (const questFilePath of questFilePaths) {
      try {
        const questData = this.loadYamlQuest(questFilePath);
        if (questData) {
          this.quests.set(questData.id, questData);
          this.questByIdentifiers.set(questData.name, questData);
          loadedCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        this.logger.warn(`Failed to load quest file: ${questFilePath}`, error);
        errorCount++;
      }
    }

    const elapsed = Date.now() - startTime;
    this.logger.info(`${loadedCount} YAML quests loaded in ${elapsed}ms (${errorCount} errors)`);
  }

  private loadYamlQuest(filePath: string): QuestProperties | null {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const yamlData = yaml.load(fileContent) as YamlQuestData;

      if (!yamlData || !yamlData.quest_id) {
        this.logger.warn(`Invalid YAML quest data in ${filePath}`);
        return null;
      }

      const questId = this.tryGetQuestId(yamlData.quest_id);
      if (!questId) {
        this.logger.warn(`Cannot find quest id for quest: '${yamlData.quest_id}' in ${filePath}`);
        return null;
      }

      return this.convertYamlToQuestProperties(yamlData, questId);

    } catch (error) {
      this.logger.error(`Failed to parse YAML quest file ${filePath}:`, error);
      return null;
    }
  }

  private convertYamlToQuestProperties(yamlData: YamlQuestData, questId: number): QuestProperties {
    return new QuestProperties({
      id: questId,
      name: yamlData.quest_id,
      title: yamlData.title || "",
      startCharacter: yamlData.character || "",
      endCharacter: yamlData.end_character || yamlData.character || "",
      startRequirements: this.convertStartRequirements(yamlData.start_requirements),
      questEndCondition: this.convertEndConditions(yamlData.end_conditions),
      rewards: this.convertRewards(yamlData.rewards),
      drops: this.convertDrops(yamlData.drops),
      beginDialogs: yamlData.dialogs?.begin || [],
      acceptedDialogs: yamlData.dialogs?.begin_yes || [],
      declinedDialogs: yamlData.dialogs?.begin_no || [],
      completedDialogs: yamlData.dialogs?.completed || [],
      notFinishedDialogs: yamlData.dialogs?.not_finished || []
    });
  }

  private convertStartRequirements(data?: YamlQuestData['start_requirements']): QuestStartRequirementsProperties {
    if (!data) {
      return new QuestStartRequirementsProperties({
        minLevel: 0,
        maxLevel: 0
      });
    }

    return new QuestStartRequirementsProperties({
      previousQuestId: data.previous_quest,
      minLevel: data.min_level || 0,
      maxLevel: data.max_level || 0,
      jobs: data.job?.map(jobStr => {
        const jobKey = jobStr as keyof typeof DefineJob;
        return DefineJob[jobKey];
      }).filter(job => job !== undefined)
    });
  }

  private convertEndConditions(data?: YamlQuestData['end_conditions']): QuestEndConditionProperties {
    if (!data) {
      return new QuestEndConditionProperties({});
    }

    return new QuestEndConditionProperties({
      items: data.items?.map(item => new QuestItemProperties({
        id: item.id,
        quantity: item.quantity,
        sex: this.parseGenderType(item.sex),
        remove: item.remove
      })),
      monsters: data.monsters?.map(monster => new QuestMonsterProperties({
        id: monster.id,
        amount: monster.amount
      })),
      patrols: data.patrols?.map(patrol => new QuestPatrolProperties({
        mapId: patrol.map_id,
        left: patrol.left,
        top: patrol.top,
        right: patrol.right,
        bottom: patrol.bottom
      }))
    });
  }

  private convertRewards(data?: YamlQuestData['rewards']): QuestRewardProperties {
    if (!data) {
      return new QuestRewardProperties({});
    }

    return new QuestRewardProperties({
      exp: data.exp,
      gold: data.gold,
      skillPoints: data.skill_points,
      items: data.items?.map(item => new QuestItemProperties({
        id: item.id,
        quantity: item.quantity,
        sex: this.parseGenderType(item.sex),
        remove: item.remove
      }))
    });
  }

  private convertDrops(data?: YamlQuestData['drops']): QuestItemDropProperties[] {
    if (!data) return [];

    const questItemDrops: QuestItemDropProperties[] = [];

    for (const drop of data) {
      if (!drop.item_id || !drop.monsters) continue;

      for (const monsterId of drop.monsters) {
        questItemDrops.push({
          itemId: drop.item_id,
          monsterId: monsterId,
          probability: drop.probability,
          quantity: drop.quantity || 1
        });
      }
    }

    return questItemDrops;
  }

  private parseGenderType(sex: string): GenderType {
    switch (sex?.toLowerCase()) {
      case 'male': return GenderType.Male;
      case 'female': return GenderType.Female;
      case 'any':
      default: return GenderType.Any;
    }
  }

  private tryGetQuestId(questIdentifier: string): number | null {
    let questId = this.defines.get(questIdentifier);

    if (!questId) {
      if (questIdentifier.startsWith("QUEST_")) {
        const idStr = questIdentifier.replace("QUEST_", "");
        const parsedId = parseInt(idStr, 10);
        if (!isNaN(parsedId)) {
          questId = parsedId;
        }
      }
    }

    return questId || null;
  }
}