import { Player } from "../../entities/player";
import { ItemPartType } from "../../types/itemPartyType";
import { Item } from "./item";
import { ItemContainer, ItemContainerSlot, ItemCreationResult } from "./itemContainer";
import { ItemCreationActionType } from "../../types/itemCreationActionType";
import { UpdateItemType } from "../../types/updateItemType";
import { DefineText } from "../definitions/defineText";
import { CreateItemSnapshot } from "../../protocol/snapshots/createItem";
import { UpdateItemSnapshot } from "../../protocol/snapshots/updateItem";
import { MoveItemSnapshot } from "../../protocol/snapshots/moveItem";
import { DoEquipSnapshot } from "../../protocol/snapshots/doEquip";
import { UpdateParamPointSnapshot } from "../../protocol/snapshots/updateParamPoint";
import { DefineAttributes } from "../definitions/defineAttributes";

/**
 * Provides a mechanism to manage a player's inventory.
 * Based on Rhisis.Game.Inventory
 */
export class Inventory extends ItemContainer {
  public static readonly InventorySize = 42;
  public static readonly InventoryEquipParts = 31;
  public static readonly EquipOffset = Inventory.InventorySize;

  // TODO: Initialize Hand item properly when GameResources are available
  private static readonly Hand: Item | null = null;

  private readonly _owner: Player;
  private readonly _itemsCoolTimes: Map<CoolTimeType, number> = new Map([
    [CoolTimeType.None, 0],
    [CoolTimeType.Food, 0],
    [CoolTimeType.Pills, 0],
    [CoolTimeType.Skill, 0]
  ]);

  /**
   * Creates a new Inventory instance.
   */
  constructor(owner: Player) {
    super(Inventory.InventorySize, Inventory.InventoryEquipParts);
    this._owner = owner;
  }

  /**
   * Moves an item within the player's inventory.
   */
  public moveItem(sourceSlot: number, destinationSlot: number): void {
    if (sourceSlot < 0 || sourceSlot >= this.maxCapacity) {
      throw new Error("Source slot is out of inventory range.");
    }

    if (destinationSlot < 0 || destinationSlot >= this.maxCapacity) {
      throw new Error("Destination slot is out of inventory range.");
    }

    if (sourceSlot === destinationSlot) {
      return;
    }

    const source = this.getAtSlot(sourceSlot);
    if (!source) {
      throw new Error("Source slot not found.");
    }

    const destination = this.getAtSlot(destinationSlot);

    if (source.hasItem && destination.hasItem &&
        source.item!.Id === destination.item!.Id &&
        source.item!.Properties.isStackable) {

      const newQuantity = source.item!.Quantity + destination.item!.Quantity;

      if (newQuantity > destination.item!.Properties.packMax) {
        destination.item!.Quantity = destination.item!.Properties.packMax;
        source.item!.Quantity = newQuantity - source.item!.Properties.packMax;

        const sourceSnapshot = new UpdateItemSnapshot(this._owner, UpdateItemType.UI_NUM, source.index, source.item!.Quantity);
        const destSnapshot = new UpdateItemSnapshot(this._owner, UpdateItemType.UI_NUM, destination.index, destination.item!.Quantity);

        this._owner.send(sourceSnapshot);
        this._owner.send(destSnapshot);
      } else {
        destination.item!.Quantity = newQuantity;
        this.deleteItem(source, source.item!.Quantity);
        const destSnapshot = new UpdateItemSnapshot(this._owner, UpdateItemType.UI_NUM, destination.index, destination.item!.Quantity);
        this._owner.send(destSnapshot);
      }
    } else {
      this.swapItem(sourceSlot, destinationSlot);
      const moveItemSnapshot = new MoveItemSnapshot(this._owner, sourceSlot, destinationSlot);
      this._owner.send(moveItemSnapshot);
    }
  }

  /**
   * Creates the given item into the inventory with player notification.
   */
  public createItemWithNotification(item: Item, sendToPlayer: boolean = true): number {
    const creationResult = super.createItem(item);

    if (creationResult.length > 0) {
      if (sendToPlayer) {
        for (const itemResult of creationResult) {
          if (itemResult.action === ItemCreationActionType.Add) {
            const createSnapshot = new CreateItemSnapshot(this._owner, itemResult.item, itemResult.index);
            this._owner.send(createSnapshot);
          } else if (itemResult.action === ItemCreationActionType.Update) {
            const updateSnapshot = new UpdateItemSnapshot(this._owner, UpdateItemType.UI_NUM, itemResult.index, itemResult.item.Quantity);
            this._owner.send(updateSnapshot);
          }
        }
      }
    } else {
      this._owner.sendDefinedText(DefineText.TID_GAME_LACKSPACE, "");
    }

    return creationResult.reduce((sum, x) => sum + x.item.Quantity, 0);
  }

  /**
   * Deletes a given quantity from an item container slot.
   */
  public deleteItem(itemSlot: ItemContainerSlot, quantity: number, updateType: UpdateItemType = UpdateItemType.UI_NUM, sendToPlayer: boolean = true): number {
    const quantityToDelete = Math.min(itemSlot.item!.Quantity, quantity);

    itemSlot.item!.Quantity -= quantityToDelete;

    if (sendToPlayer) {
      const updateSnapshot = new UpdateItemSnapshot(this._owner, updateType, itemSlot.index, itemSlot.item!.Quantity);
      this._owner.send(updateSnapshot);
    }

    if (itemSlot.item!.Quantity <= 0) {
      if (itemSlot.number > Inventory.EquipOffset) {
        this.unequipInternal(itemSlot);
      }

      this.remove(itemSlot);
    }

    return quantityToDelete;
  }

  /**
   * Gets the equipped item from the given item part.
   */
  public getEquippedItem(equipedItemPart: ItemPartType): Item | null {
    const equipedItemSlot = this.getEquippedItemSlot(equipedItemPart);
    return equipedItemSlot.hasItem ? equipedItemSlot.item! : Inventory.Hand;
  }

  /**
   * Gets the equipped items.
   */
  public getEquippedItems(): Item[] {
    return this.getRange(Inventory.InventorySize, Inventory.InventoryEquipParts)
      .map(x => x.item)
      .filter(item => item !== null) as Item[];
  }

  /**
   * Finds the item matching the given predicate.
   */
  public findItem(predicate: (item: Item) => boolean): Item | null {
    const slots = this._items.filter(x => x.hasItem);
    for (const slot of slots) {
      if (predicate(slot.item!)) {
        return slot.item!;
      }
    }
    return null;
  }

  /**
   * Gets the equipped item slot from the given item part.
   */
  private getEquippedItemSlot(equipedItemPart: ItemPartType): ItemContainerSlot {
    const equipedItemSlot = Inventory.EquipOffset + equipedItemPart;

    if (equipedItemSlot > this.maxCapacity || equipedItemSlot < Inventory.EquipOffset) {
      return ItemContainerSlot.Empty;
    }

    return this.getAtSlot(equipedItemSlot);
  }

  /**
   * Equip an item.
   */
  public equip(slot: ItemContainerSlot): boolean {
    if (!slot.hasItem) {
      return false;
    }

    if (!this.isItemEquipable(slot.item!)) {
      return false;
    }

    if (this.equipInternal(slot)) {
      const equipSnapshot = new DoEquipSnapshot(this._owner, slot.item!, slot.index, true);
      this._owner.send(equipSnapshot);
      return true;
    }

    return false;
  }

  private equipInternal(slot: ItemContainerSlot): boolean {
    const equipedItem = this.getEquippedItemSlot(slot.item!.Properties.parts);

    if (equipedItem && equipedItem.hasItem) {
      this.unequipInternal(equipedItem);
    }

    const sourceSlot = slot.number;
    const destinationSlot = this.capacity + slot.item!.Properties.parts;

    if (slot.number === destinationSlot || slot.number >= this.maxCapacity || destinationSlot >= this.maxCapacity) {
      return false;
    }

    for (let i = 0; i < this.maxCapacity; i++) {
      if (!this._items[i].hasItem && this._items[i].number === -1) {
        this._slots[destinationSlot] = this._slots[sourceSlot];
        this._slots[sourceSlot] = i;

        this._items[this._slots[sourceSlot]].number = sourceSlot;
        this._items[this._slots[destinationSlot]].number = destinationSlot;

        return true;
      }
    }

    return false;
  }

  /**
   * Unequip an item.
   */
  public unequip(slot: ItemContainerSlot): boolean {
    if (!slot.hasItem) {
      return false;
    }

    if (this.unequipInternal(slot)) {
      const equipSnapshot = new DoEquipSnapshot(this._owner, slot.item!, slot.index, false);
      this._owner.send(equipSnapshot);
      return true;
    }

    return false;
  }

  private unequipInternal(slot: ItemContainerSlot): boolean {
    if (slot.number >= this.maxCapacity) {
      return false;
    }

    const itemIndex = this._slots[slot.number];

    if (itemIndex >= this.maxCapacity) {
      return false;
    }

    for (let i = 0; i < this.capacity; i++) {
      // Find empty slot
      const emptyItemIndex = this._slots[i];

      if (emptyItemIndex < 0 || emptyItemIndex >= this.maxCapacity) {
        return false;
      }

      if (!this._items[emptyItemIndex].hasItem) {
        this._items[emptyItemIndex].number = -1;
        this._slots[slot.number] = -1;

        this._items[itemIndex].number = i;
        this._slots[i] = itemIndex;

        return true;
      }
    }

    return false;
  }

  /**
   * Checks if the given item can be equipped based on the player's information.
   */
  public isItemEquipable(item: Item): boolean {
    if (item.Properties.itemSex !== Number.MAX_VALUE && item.Properties.itemSex !== this._owner.appearence.gender) {
      this._owner.sendDefinedText(DefineText.TID_GAME_WRONGSEX, item.Name);
      return false;
    }

    if (this._owner.level < item.Properties.limitLevel) {
      this._owner.sendDefinedText(DefineText.TID_GAME_REQLEVEL, item.Properties.limitLevel.toString());
      return false;
    }

    // TODO: Implement job checking
    // if (!this._owner.job.isAnteriorJob(item.Properties.itemJob)) {
    //   this._owner.sendDefinedText(DefineText.TID_GAME_WRONGJOB, "");
    //   return false;
    // }

    const equipedItem = this.getEquippedItem(ItemPartType.RightWeapon);

    // TODO: Implement ItemKind3 checking
    // if (item.Properties.itemKind3 === ItemKind3.ARROW &&
    //     (equipedItem === null || equipedItem.Properties.itemKind3 !== ItemKind3.BOW)) {
    //   return false;
    // }

    return true;
  }

  /**
   * Use an item.
   */
  public useItem(item: Item): void {
    const itemSlot = this._items.find(x => x.hasItem && x.item!.Id === item.Id && x.item!.SerialNumber === item.SerialNumber);

    if (!itemSlot) {
      throw new Error("Failed to find item in inventory.");
    }

    if (item.Properties.isUseable && item.Quantity > 0) {
      if (this.itemHasCoolTime(item) && !this.canUseItemWithCoolTime(item)) {
        return;
      }

      // TODO: implement custom item usage
      // TODO: check for custom items usages

      switch (item.Properties.itemKind2) {
        // TODO: Implement item usage cases
        // case ItemKind2.POTION:
        // case ItemKind2.REFRESHER:
        // case ItemKind2.FOOD:
        //   break;
        // case ItemKind2.BLINKWING:
        //   break;
        // case ItemKind2.MAGIC:
        //   break;
        default:
          throw new Error(`Item usage ${item.Properties.itemKind2} is not implemented.`);
      }
    }
  }

  /**
   * Checks if the item can be used.
   */
  public canUseItemWithCoolTime(item: Item): boolean {
    const group = this.getItemCoolTimeGroup(item);
    return group !== CoolTimeType.None && (this._itemsCoolTimes.get(group) || 0) < Date.now();
  }

  /**
   * Sets a cool time for the given item.
   */
  public setCoolTime(item: Item, cooltime: number): void {
    const group = this.getItemCoolTimeGroup(item);

    if (group !== CoolTimeType.None) {
      this._itemsCoolTimes.set(group, Date.now() + cooltime);
    }
  }

  /**
   * Check if the item has a cool down.
   */
  private itemHasCoolTime(item: Item): boolean {
    return this.getItemCoolTimeGroup(item) !== CoolTimeType.None;
  }

  /**
   * Gets the item cool time group.
   */
  private getItemCoolTimeGroup(item: Item): CoolTimeType {
    if (item.Properties.coolTime <= 0) {
      return CoolTimeType.None;
    }

    // TODO: Implement proper ItemKind2 enum mapping
    // switch (item.Properties.itemKind2) {
    //   case ItemKind2.FOOD:
    //     return item.Properties.itemKind3 === ItemKind3.PILL ? CoolTimeType.Pills : CoolTimeType.Food;
    //   case ItemKind2.SKILL:
    //     return CoolTimeType.Skill;
    //   default:
    //     return CoolTimeType.None;
    // }

    return CoolTimeType.None;
  }
}

// Helper enums that need to be defined
enum CoolTimeType {
  None = 0,
  Food = 1,
  Pills = 2,
  Skill = 3
}