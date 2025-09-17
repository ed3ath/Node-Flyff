import { WorldObject } from "../abstract/worldObject";
import { WorldObjectType } from "../common/worldObjectType";
import { DialogOptions } from "../common/dialogOptions";
import { QuestState } from "../common/questState";
import { Item } from "../common/item";
import { NpcProperties, DialogProperties, DialogLink, ShopProperties, ShopItemProperties } from "../interfaces/resource";
import { FFRandom } from "../helpers/FFRandom";
import { timeInSeconds } from "../helpers/time";
import { FlyffPacket } from "../libraries/flyffPacket";

// Forward declarations to avoid circular dependencies
interface Player extends WorldObject {
  questDiary: QuestDiary;
  send(packet: FlyffPacket): void;
}

interface Quest {
  id: number;
  properties: QuestProperties;
  canFinish(): boolean;
}

interface QuestDiary {
  activeQuests: Quest[];
  canStartQuest(quest: QuestProperties): boolean;
  hasActiveQuest(questId: number): boolean;
}

interface QuestProperties {
  id: number;
  title: string;
  startCharacter: string;
  endCharacter: string;
  beginDialogs: string[];
  completedDialogs: string[];
}

// Item container for shop system
class ItemContainer {
  private items: Map<number, Item> = new Map();
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  public initialize(items: Record<number, Item>): void {
    this.items.clear();
    for (const [slot, item] of Object.entries(items)) {
      this.items.set(parseInt(slot), item);
    }
  }

  public getItem(slot: number): Item | null {
    return this.items.get(slot) || null;
  }

  public setItem(slot: number, item: Item): boolean {
    if (slot < 0 || slot >= this.maxSize) {
      return false;
    }
    this.items.set(slot, item);
    return true;
  }

  public get size(): number {
    return this.maxSize;
  }

  public get itemCount(): number {
    return this.items.size;
  }
}

// Dialog constants for quest system
const DialogConstants = {
  QuestAcceptDeclineButtons: [
    { id: QuestState.BeginYes, title: "Accept", questId: 0, texts: new Set<string>() },
    { id: QuestState.BeginNo, title: "Decline", questId: 0, texts: new Set<string>() }
  ],
  QuestFinishButtons: [
    { id: QuestState.EndCompleted, title: "Complete", questId: 0, texts: new Set<string>() }
  ]
};

// Mock GameResources for now - TODO: Replace with actual implementation
const GameResources = {
  Current: {
    Items: {
      get: (id: number) => ({
        id,
        name: `Item_${id}`,
        packMax: 999
      })
    },
    Quests: [] as QuestProperties[],
    getText: (textId: string) => textId
  }
};

export class Npc extends WorldObject {
  private static readonly ORAL_TEXT_RADIUS = 50;
  private _lastSpeakTime: number = 0;

  public readonly properties: NpcProperties;
  public readonly shop: ItemContainer[] | null = null;
  public readonly quests: QuestProperties[] = [];

  public get type(): WorldObjectType {
    return WorldObjectType.Mover;
  }

  public get hasShop(): boolean {
    return this.shop !== null;
  }

  public get hasDialog(): boolean {
    return this.properties.hasDialog;
  }

  public get hasQuests(): boolean {
    return this.quests.length > 0;
  }

  constructor(properties: NpcProperties) {
    super();

    this.properties = properties;
    this.name = properties.id;
    this.modelId = properties.modelId || 0;

    // Initialize shop if NPC has one
    if (properties.hasShop && properties.shop) {
      this.initializeShop(properties.shop);
    }

    // Load quests for this NPC
    this.loadQuests();
  }

  private initializeShop(shopProperties: ShopProperties): void {
    if (!shopProperties.items || shopProperties.items.length === 0) {
      return;
    }

    // Create shop containers - assuming shop can have multiple tabs
    const shopTabs = this.groupShopItemsByTab(shopProperties.items);
    (this as any).shop = shopTabs.map(tabItems => {
      const container = new ItemContainer(100);
      const items: Record<number, Item> = {};

      tabItems.forEach((shopItem, index) => {
        const itemProperties = GameResources.Current.Items.get(shopItem.id);
        items[index] = new Item(
          shopItem.id,
          itemProperties.name,
          itemProperties.packMax,
          shopItem.refine,
          shopItem.element,
          shopItem.elementRefine
        );
      });

      container.initialize(items);
      return container;
    });
  }

  private groupShopItemsByTab(items: ShopItemProperties[]): ShopItemProperties[][] {
    // For now, put all items in one tab
    // TODO: Implement proper tab grouping logic
    return [items];
  }

  private loadQuests(): void {
    // Load quests that start with this NPC
    const npcQuests = GameResources.Current.Quests.filter(quest =>
      quest.startCharacter &&
      quest.startCharacter.toLowerCase() === this.name.toLowerCase()
    );

    (this as any).quests = npcQuests;
  }

  public update(): void {
    if (!this.isSpawned) {
      return;
    }

    this.speak();
  }

  public openShop(target: Player): void {
    if (!this.hasShop) {
      return;
    }

    // TODO: Implement OpenNpcShopWindowSnapshot when available
    // const packet = new OpenNpcShopWindowSnapshot(this, this.shop);
    // target.send(packet);

    console.log(`Opening shop for player at NPC ${this.name}`);
  }

  public speak(text: string, player: Player): void;
  public speak(): void;
  public speak(text?: string, player?: Player): void {
    if (text && player) {
      // Send specific text to specific player
      // TODO: Implement ChatSnapshot when available
      // const packet = new ChatSnapshot(this, text);
      // player.send(packet);
      console.log(`${this.name} says to player: ${text}`);
    } else {
      // Automatic speaking behavior
      this.performAutomaticSpeaking();
    }
  }

  public showDialog(
    targetPlayer: Player,
    texts?: string[],
    links?: DialogLink[],
    buttons?: DialogLink[],
    questId: number = 0
  ): void {
    // TODO: Implement proper snapshot system
    // For now, just log the dialog interaction
    console.log(`${this.name} showing dialog to player`);

    if (texts && texts.length > 0) {
      console.log(`Dialog texts: ${texts.join(', ')}`);
    }

    if (links && links.length > 0) {
      console.log(`Dialog links: ${links.map(l => l.title).join(', ')}`);
    }

    if (buttons && buttons.length > 0) {
      console.log(`Dialog buttons: ${buttons.map(b => b.title).join(', ')}`);
    }

    // Add quest-related dialog options
    if (this.hasQuests) {
      this.addQuestDialogOptions(targetPlayer, questId);
    }
  }

  public showQuestDialog(
    player: Player,
    texts: string[],
    buttons: DialogLink[],
    questId: number
  ): void {
    const questDialogs = texts.map(text => GameResources.Current.getText(text));
    this.showDialog(player, questDialogs, this.properties.dialog?.links ? Array.from(this.properties.dialog.links) : undefined, buttons, questId);
  }

  public closeDialog(player: Player): void {
    // TODO: Implement DialogOptionSnapshot when available
    // const snapshot = new DialogOptionSnapshot(player, DialogOptions.FUNCTYPE_EXIT);
    // player.send(snapshot);

    console.log(`Closing dialog for player at NPC ${this.name}`);
  }

  public suggestAvailableQuest(player: Player): boolean {
    const availableQuests = this.quests.filter(quest =>
      player.questDiary.canStartQuest(quest)
    );

    if (availableQuests.length > 0) {
      const quest = availableQuests[0];
      this.showQuestDialog(player, quest.beginDialogs, DialogConstants.QuestAcceptDeclineButtons, quest.id);
      return true;
    }

    return false;
  }

  public suggestFinalizeQuest(player: Player): boolean {
    const playerQuestsToFinalize = player.questDiary.activeQuests.filter(quest =>
      quest.canFinish() &&
      quest.properties.endCharacter.toLowerCase() === this.name.toLowerCase()
    );

    if (playerQuestsToFinalize.length > 0) {
      const quest = playerQuestsToFinalize[0];
      this.showQuestDialog(player, quest.properties.completedDialogs, DialogConstants.QuestFinishButtons, quest.id);
      return true;
    }

    return false;
  }

  private performAutomaticSpeaking(): void {
    if (this.properties.dialog && this.properties.dialog.shoutText) {
      if (this._lastSpeakTime <= timeInSeconds()) {
        const playersAround = this.visibleObjects
          .filter(obj => obj instanceof Object && obj.constructor.name === 'Player') // Type check for Player
          .filter(obj => this.position.isInCircle(obj.position, Npc.ORAL_TEXT_RADIUS));

        if (playersAround.length > 0) {
          playersAround.forEach(player => {
            this.speak(this.properties.dialog!.shoutText, player as Player);
          });
        }

        this._lastSpeakTime = timeInSeconds() + FFRandom.random(10, 15);
      }
    }
  }

  private addQuestDialogOptions(targetPlayer: Player, questId: number): void {
    // Add new quest options
    const newQuestLinks = this.quests
      .filter(quest => targetPlayer.questDiary.canStartQuest(quest))
      .map(quest => ({
        id: QuestState.Suggest,
        title: GameResources.Current.getText(quest.title),
        questId: quest.id,
        texts: new Set<string>()
      }));

    // Add quest in progress options
    const questsInProgressLinks = this.quests
      .filter(quest => targetPlayer.questDiary.hasActiveQuest(quest.id))
      .map(quest => ({
        id: QuestState.End,
        title: GameResources.Current.getText(quest.title),
        questId: quest.id,
        texts: new Set<string>()
      }));

    // TODO: Add these to the dialog snapshot when implemented
    console.log(`New quests available: ${newQuestLinks.length}`);
    console.log(`Quests in progress: ${questsInProgressLinks.length}`);
  }

  public dispose(): void {
    // Clean up NPC resources
    super.dispose();
  }
}