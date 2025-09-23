import { Quest } from "./quest";
import { QuestState } from "./questState";
import { GenderType } from "../../types/genderType";
import { QuestProperties } from "../../resources/properties/quest/questProperties";

export class QuestDiary {
  private readonly _player: any; // Player reference
  private readonly _quests: Quest[] = [];

  constructor(owner: any) {
    this._player = owner;
  }

  /**
   * Gets the active quests.
   */
  get activeQuests(): Quest[] {
    return this._quests.filter(x => !x.isFinished);
  }

  /**
   * Gets the checked quests.
   */
  get checkedQuests(): Quest[] {
    return this.activeQuests.filter(x => x.isChecked);
  }

  /**
   * Gets the completed quests.
   */
  get completedQuests(): Quest[] {
    return this._quests.filter(x => x.isFinished);
  }

  /**
   * Accepts and adds a new quest to the diary.
   * @param questProperties Quest properties.
   * @throws Error when the given quest is null or already exists.
   */
  acceptQuest(questProperties: QuestProperties): void {
    if (!questProperties) {
      throw new Error("Cannot add an undefined quest.");
    }

    if (this._quests.some(x => x.id === questProperties.id)) {
      throw new Error(`Quest '${questProperties.id}' for player with id '${this._player.id}' already exists.`);
    }

    const quest = new Quest(questProperties, this._player);
    quest.startTime = new Date();

    this._quests.push(quest);
    this.sendSetQuestPacket(this._player, quest);
    this._player.sendDefinedText("TID_EVE_STARTQUEST", `"${questProperties.title}"`);
  }

  /**
   * Completes the given quest.
   * @param quest Quest to complete.
   */
  completeQuest(quest: Quest): void {
    if (!quest) {
      throw new Error("Cannot finish an undefined quest.");
    }

    // Check if player has enough space for reward items
    if (quest.properties.rewards.items && quest.properties.rewards.items.length > 0) {
      const itemsForPlayer = quest.properties.rewards.items.filter(
        x => x.sex === this._player.appearance.gender || x.sex === GenderType.Any
      );

      if (this._player.inventory.getStorageCount() + itemsForPlayer.length > this._player.inventory.capacity) {
        this._player.sendDefinedText("TID_QUEST_NOINVENTORYSPACE");
        return;
      }

      for (const rewardItem of itemsForPlayer) {
        const rewardItemProperties = this._player.gameResources.items.get(rewardItem.id);

        if (rewardItemProperties) {
          const item = {
            ...rewardItemProperties,
            refine: rewardItem.refine,
            element: rewardItem.element,
            elementRefine: rewardItem.elementRefine
          };

          this._player.inventory.createItem(item);
          this._player.sendDefinedText("TID_GAME_REAPITEM", `"${item.name}"`);
        }
      }
    }

    // Remove quest items from inventory
    if (quest.properties.questEndCondition.items && quest.properties.questEndCondition.items.length > 0) {
      for (const questItem of quest.properties.questEndCondition.items) {
        if (questItem.remove) {
          if (questItem.sex === GenderType.Any || questItem.sex === this._player.appearance.gender) {
            const inventoryItemSlot = this._player.inventory.findSlot(
              (x: any) => x.hasItem && x.item.id === parseInt(questItem.id)
            );

            if (inventoryItemSlot) {
              this._player.inventory.deleteItem(inventoryItemSlot, questItem.quantity);
            }
          }
        }
      }
    }

    if (quest.properties.rewards.gold > 0) {
      this._player.gold.increase(quest.properties.rewards.gold);
    }

    if (quest.properties.rewards.experience > 0) {
      this._player.experience.increase(quest.properties.rewards.experience);
    }

    if (quest.properties.rewards.hasJobReward && quest.properties.rewards.hasJobReward()) {
      // TODO: set new job to player
    }

    if (quest.properties.rewards.restat) {
      this._player.resetStatistics();
    }

    if (quest.properties.rewards.reskill) {
      this._player.resetSkills();
    }

    if (quest.properties.rewards.skillPoints > 0) {
      this._player.addSkillPoints(quest.properties.rewards.skillPoints);
    }

    quest.isFinished = true;
    quest.isChecked = false;
    quest.state = QuestState.Completed;
    quest.endTime = new Date();

    this._player.sendDefinedText("TID_EVE_ENDQUEST", `"${quest.properties.title}"`);
    this.sendSetQuestPacket(this._player, quest);
  }

  /**
   * Gets the quest by its id.
   * @param questId Quest id to look for.
   * @returns The quest if found; undefined otherwise.
   */
  getQuest(questId: number): Quest | undefined {
    return this._quests.find(x => x.id === questId);
  }

  /**
   * Gets the active quest by its id.
   * @param questId Quest id to look for.
   * @returns The quest if found; undefined otherwise.
   */
  getActiveQuest(questId: number): Quest | undefined {
    return this.activeQuests.find(x => x.id === questId);
  }

  /**
   * Gets all checked quests.
   * @returns Array of checked quests.
   */
  getCheckedQuests(): Quest[] {
    return this.checkedQuests;
  }

  /**
   * Checks if the diary contains the quest identified by the given id.
   * @param questId Quest id.
   * @returns True if the diary contains the quest; false otherwise.
   */
  hasQuest(questId: number): boolean {
    return this._quests.some(x => x.id === questId);
  }

  /**
   * Checks if the diary contains the active quest identified by the given id.
   * @param questId Quest id.
   * @returns True if the diary contains the active quest; false otherwise.
   */
  hasActiveQuest(questId: number): boolean {
    return this.activeQuests.some(x => x.id === questId);
  }

  /**
   * Removes the given quest from the diary.
   * @param quest Quest to remove.
   */
  remove(quest: Quest): void {
    quest.isDeleted = true;
  }

  /**
   * Check if the player can start the given quest script.
   * @param questProperties Quest properties.
   * @returns True if the player can start the quest; false otherwise.
   */
  canStartQuest(questProperties: QuestProperties): boolean {
    if (!questProperties) {
      return false;
    }

    if (this.hasQuest(questProperties.id)) {
      return false;
    }

    // Check previous quest requirement
    if (questProperties.startRequirements.previousQuestId) {
      const previousQuestId = parseInt(questProperties.startRequirements.previousQuestId);
      if (!this.completedQuests.some(x => x.id === previousQuestId)) {
        return false;
      }
    }

    // Check level requirements
    if (this._player.level < questProperties.startRequirements.minLevel ||
        this._player.level > questProperties.startRequirements.maxLevel) {
      return false;
    }

    // Check job requirements
    if (questProperties.startRequirements.jobs &&
        questProperties.startRequirements.jobs.length > 0 &&
        !questProperties.startRequirements.jobs.includes(this._player.job.id)) {
      return false;
    }

    // TODO: Add more checks as needed

    return true;
  }

  /**
   * Updates the quest diary when a monster is killed.
   * @param killedMonster Killed monster.
   */
  onMonsterKilled(killedMonster: any): void {
    const killedMonsterId = killedMonster.properties.id;

    for (const quest of this.activeQuests) {
      let updateQuest = false;

      // Check if this monster is required for any quest
      if (quest.properties.questEndCondition.monsters) {
        const questMonster = quest.properties.questEndCondition.monsters.find(
          x => parseInt(x.id) === killedMonsterId
        );

        if (questMonster) {
          const currentCount = quest.monsters.get(killedMonsterId) || 0;
          if (currentCount < questMonster.amount) {
            quest.monsters.set(killedMonsterId, currentCount + 1);
            updateQuest = true;
          }
        }
      }

      // Handle quest item drops from monsters
      if (quest.properties.drops) {
        const questItemDrops = quest.properties.drops.filter(
          x => parseInt(x.monsterId) === killedMonsterId
        );

        if (questItemDrops.length > 0) {
          for (const questItem of questItemDrops) {
            // TODO: move this constant to configuration file
            const maxDropChance = 3000000000;
            const dropChance = Math.floor(Math.random() * maxDropChance);

            if (dropChance < questItem.probability * this._player.gameOptions.rates.drop) {
              const itemId = parseInt(questItem.itemId);
              const item = {
                ...this._player.gameResources.items.get(itemId),
                quantity: questItem.quantity,
                creatorId: this._player.id
              };

              const createdQuantity = this._player.inventory.createItem(item);

              if (createdQuantity > 0) {
                this._player.sendDefinedText("TID_EVE_REAPITEM", `"${item.name || '[undefined]'}"`);
              } else {
                const mapItem = {
                  ...item,
                  map: this._player.map,
                  mapLayer: this._player.mapLayer,
                  position: { ...this._player.position }
                };

                this._player.mapLayer.addItem(mapItem);
              }
            }
          }
        }
      }

      if (updateQuest) {
        this.sendSetQuestPacket(this._player, quest);
      }
    }
  }

  /**
   * Serializes the current diary into the given packet.
   * @param packet Packet to write to.
   */
  serialize(packet: any): void {
    // Serialize active quests
    packet.writeByte(this.activeQuests.length);
    for (const quest of this.activeQuests) {
      quest.serialize(packet);
    }

    // Serialize completed quest IDs
    packet.writeByte(this.completedQuests.length);
    for (const quest of this.completedQuests) {
      packet.writeInt16(quest.id);
    }

    // Serialize checked quest IDs
    packet.writeByte(this.checkedQuests.length);
    for (const quest of this.checkedQuests) {
      packet.writeInt16(quest.id);
    }
  }

  /**
   * Loads quests from serialized data.
   * @param questsData Array of quest data to load.
   */
  loadQuests(questsData: any[]): void {
    // TODO: Implement quest loading from database/serialized data
    this._quests.length = 0;

    for (const questData of questsData) {
      // Create Quest instances from saved data
      // Set appropriate state, progress, etc.
    }
  }

  /**
   * Sends a quest update packet to the player.
   * @param player Player to send packet to.
   * @param quest Quest to send.
   */
  private sendSetQuestPacket(player: any, quest: Quest): void {
    // TODO: Implement actual packet sending
    // using SetQuestSnapshot questSnapshot = new(player, quest);
    // player.send(questSnapshot);
  }
}