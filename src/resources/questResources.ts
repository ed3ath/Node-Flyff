import * as fs from "fs-extra";
import * as path from "path";
import { Logger } from "../helpers/logger";
import { ResourcePaths } from "./resourcePaths";
import { QuestProperties } from "./properties/quest/questProperties";
import { QuestStartRequirementsProperties } from "./properties/quest/questStartRequirementsProperties";
import { QuestEndConditionProperties } from "./properties/quest/questEndConditionProperties";
import { QuestRewardProperties } from "./properties/quest/questRewardProperties";
import { QuestItemDropProperties } from "./properties/quest/questItemDropProperties";
import { QuestItemProperties } from "./properties/quest/questItemProperties";
import { QuestMonsterProperties } from "./properties/quest/questMonsterProperties";
import { QuestPatrolProperties } from "./properties/quest/questPatrolProperties";
import { LuaParser, LuaTable } from "../helpers/luaParser";
import { DefineJob } from "../game/definitions/defineJob";
import { GenderType } from "../types/genderType";

export class QuestResources {
  private readonly logger: Logger;
  private readonly defines: Map<string, number>;
  private readonly quests: Map<number, QuestProperties> = new Map();
  private readonly questByIdentifiers: Map<string, QuestProperties> = new Map();

  constructor(defines: Map<string, number>) {
    this.logger = new Logger("QuestResources");
    this.defines = defines;
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
    for (const quest of Array.from(this.quests.values())) {
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

    if (!fs.existsSync(ResourcePaths.questsPath)) {
      this.logger.warn(`Quests directory not found: ${ResourcePaths.questsPath}`);
      return;
    }

    const questFilePaths = fs.readdirSync(ResourcePaths.questsPath)
      .filter(file => file.endsWith('.lua'))
      .map(file => path.join(ResourcePaths.questsPath, file));

    if (questFilePaths.length > 0) {
      const luaParser = new LuaParser();

      for (const questFilePath of questFilePaths) {
        const questIdentifier = path.basename(questFilePath, '.lua');

        const questId = this.tryGetQuestId(questIdentifier);
        if (!questId) {
          this.logger.warn(`Cannot find quest id for quest: '${questIdentifier}'.`);
          continue;
        }

        const luaData = luaParser.parseFile(questFilePath);
        if (!luaData || !luaData[questIdentifier]) {
          this.logger.warn(`Failed to parse quest file: ${questFilePath}`);
          continue;
        }

        const questTable = luaData[questIdentifier] as LuaTable;

        const quest: QuestProperties = {
          id: questId,
          name: questIdentifier,
          title: questTable.getValue<string>("title") || "",
          startCharacter: questTable.getValue<string>("character") || "",
          endCharacter: questTable.getValue<string>("end_character") || questTable.getValue<string>("character") || "",
          startRequirements: this.parseStartRequirements(questTable),
          questEndCondition: this.parseEndConditions(questTable),
          rewards: this.parseRewards(questTable),
          drops: this.loadQuestItemDrops(questTable.getValue<LuaTable>("drops")),
          beginDialogs: this.parseDialogs(questTable, "dialogs.begin"),
          acceptedDialogs: this.parseDialogs(questTable, "dialogs.begin_yes"),
          declinedDialogs: this.parseDialogs(questTable, "dialogs.begin_no"),
          completedDialogs: this.parseDialogs(questTable, "dialogs.completed"),
          notFinishedDialogs: this.parseDialogs(questTable, "dialogs.not_finished")
        };

        this.quests.set(quest.id, quest);
        this.questByIdentifiers.set(quest.name, quest);
      }
    }

    const elapsed = Date.now() - startTime;
    this.logger.info(`${this.quests.size} quests loaded in ${elapsed}ms.`);
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

  private parseStartRequirements(questTable: LuaTable): QuestStartRequirementsProperties {
    const startReqTable = questTable.getValue<LuaTable>("start_requirements");
    const jobTable = questTable.getValue<LuaTable>("start_requirements.job");

    return {
      previousQuestId: startReqTable?.getValue<string>("previous_quest"),
      minLevel: startReqTable?.getValue<number>("min_level") || 0,
      maxLevel: startReqTable?.getValue<number>("max_level") || 0,
      jobs: jobTable?.getValues<string>()?.map(jobStr => {
        const jobKey = jobStr as keyof typeof DefineJob;
        return DefineJob[jobKey];
      }).filter(job => job !== undefined) || []
    };
  }

  private parseEndConditions(questTable: LuaTable): QuestEndConditionProperties {
    const itemsTable = questTable.getValue<LuaTable>("end_conditions.items");
    const monstersTable = questTable.getValue<LuaTable>("end_conditions.monsters");
    const patrolsTable = questTable.getValue<LuaTable>("end_conditions.patrols");

    return {
      items: itemsTable?.getValues<LuaTable>()?.map(itemTable => new QuestItemProperties({
        id: itemTable.getValue<string>("id") || "",
        quantity: itemTable.getValue<number>("quantity") || 0,
        sex: itemTable.getValue<GenderType>("sex") || GenderType.Any,
        refine: itemTable.getValue<number>("refine") || 0,
        element: itemTable.getValue<number>("element") || 0,
        elementRefine: itemTable.getValue<number>("elementRefine") || 0,
        remove: itemTable.getValue<boolean>("remove") || false
      })) || [],
      monsters: monstersTable?.getValues<LuaTable>()?.map(monsterTable => ({
        id: monsterTable.getValue<string>("id") || "",
        amount: monsterTable.getValue<number>("quantity") || 0
      })) || [],
      patrols: patrolsTable?.getValues<LuaTable>()?.map(patrolTable => ({
        mapId: patrolTable.getValue<string>("map") || "",
        left: patrolTable.getValue<number>("left") || 0,
        top: patrolTable.getValue<number>("top") || 0,
        right: patrolTable.getValue<number>("right") || 0,
        bottom: patrolTable.getValue<number>("bottom") || 0
      })) || []
    };
  }

  private parseRewards(questTable: LuaTable): QuestRewardProperties {
    const rewardsTable = questTable.getValue<LuaTable>("rewards");
    const rewardItemsTable = rewardsTable?.getValue<LuaTable>("items");

    return new QuestRewardProperties({
      exp: rewardsTable?.getValue<number>("exp") || 0,
      gold: rewardsTable?.getValue<number>("gold") || 0,
      skillPoints: rewardsTable?.getValue<number>("skill_points") || 0,
      items: rewardItemsTable?.getValues<LuaTable>()?.map(itemTable => new QuestItemProperties({
        id: itemTable.getValue<string>("id") || "",
        quantity: itemTable.getValue<number>("quantity") || 0,
        sex: itemTable.getValue<GenderType>("sex") || GenderType.Any,
        refine: itemTable.getValue<number>("refine") || 0,
        element: itemTable.getValue<number>("element") || 0,
        elementRefine: itemTable.getValue<number>("elementRefine") || 0,
        remove: false
      })) || []
    });
  }

  private parseDialogs(questTable: LuaTable, dialogPath: string): string[] {
    const dialogTable = questTable.getValue<LuaTable>(dialogPath);
    return dialogTable?.getValues<string>() || [];
  }

  private loadQuestItemDrops(dropsTable: LuaTable | undefined): QuestItemDropProperties[] {
    const questItemDrops: QuestItemDropProperties[] = [];

    if (!dropsTable) {
      return questItemDrops;
    }

    const dropItems = dropsTable.getValues<LuaTable>();

    for (const dropItem of dropItems) {
      const itemId = dropItem.getValue<string>("item_id");
      const probability = dropItem.getValue<number>("probability");

      if (!itemId || !probability) {
        continue;
      }

      let monsterIds: string[];
      const monstersTable = dropItem.getValue<LuaTable>("monsters");

      if (monstersTable && monstersTable.getValues<string>().length > 0) {
        monsterIds = monstersTable.getValues<string>();
      } else {
        const monsterId = dropItem.getValue<string>("monster_id");
        if (!monsterId) {
          continue;
        }
        monsterIds = [monsterId];
      }

      const quantity = dropItem.getValueOrDefault<number>("quantity", 1);

      for (const monsterId of monsterIds) {
        questItemDrops.push({
          itemId: itemId,
          monsterId: monsterId,
          probability: probability,
          quantity: quantity
        });
      }
    }

    return questItemDrops;
  }
}