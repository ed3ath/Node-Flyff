import { FlyffPacket } from "../../libraries/flyffPacket";
import { ItemCreationActionType } from "../../types/itemCreationActionType";
import { Item } from "./item";

/// <summary>
/// Represents the result of an item creation operation.
/// </summary>
export class ItemCreationResult {
  /// <summary>
  /// Gets the action type of the creation result.
  /// </summary>
  public readonly action: ItemCreationActionType;

  /// <summary>
  /// Gets the item that was created or updated.
  /// </summary>
  public readonly item: Item;

  /// <summary>
  /// Gets the slot number where the item was placed.
  /// </summary>
  public readonly slot: number;

  /// <summary>
  /// Gets the slot index.
  /// </summary>
  public readonly index: number;

  public constructor(action: ItemCreationActionType, item: Item, slot: number, index: number) {
    this.action = action;
    this.item = item;
    this.slot = slot;
    this.index = index;
  }
}

/// <summary>
/// Describes an item slot of an item container.
/// </summary>
export class ItemContainerSlot {
  public static readonly Empty = new ItemContainerSlot(-1, -1, null);

  /// <summary>
  /// Gets or sets the slot index in the item container.
  /// </summary>
  public index: number;

  /// <summary>
  /// Gets or sets the slot number.
  /// </summary>
  public number: number;

  /// <summary>
  /// Gets or sets the item on the current slot.
  /// </summary>
  public item: Item | null;

  /// <summary>
  /// Gets a boolean value that indicates if the slot has an item.
  /// </summary>
  public get hasItem(): boolean {
    return this.item !== null;
  }

  public constructor(index: number = -1, number: number = -1, item: Item | null = null) {
    this.index = index;
    this.number = number;
    this.item = item;
  }

  public toString(): string {
    return `Slot = ${this.number} (Index = ${this.index}) | Item = ${this.hasItem ? this.item!.Name : "none"}`;
  }
}

export class ItemContainer {
  protected readonly _items: ItemContainerSlot[];
  protected readonly _slots: number[];

  /// <summary>
  /// Gets the number of items inside the container.
  /// </summary>
  public get count(): number {
    return this._items.filter(x => x.hasItem).length;
  }

  /// <summary>
  /// Gets the container capacity.
  /// </summary>
  public readonly capacity: number;

  /// <summary>
  /// Gets the container extra capacity.
  /// </summary>
  public readonly extraCapacity: number;

  /// <summary>
  /// Gets the container maximum capacity.
  /// </summary>
  public get maxCapacity(): number {
    return this.capacity + this.extraCapacity;
  }

  public constructor(capacity: number, extraCapacity: number = 0) {
    this.capacity = capacity;
    this.extraCapacity = extraCapacity;
    this._items = new Array<ItemContainerSlot>(this.maxCapacity);
    this._slots = new Array<number>(this.maxCapacity);

    for (let i = 0; i < this.maxCapacity; i++) {
      this._items[i] = new ItemContainerSlot(i, i < this.capacity ? i : -1, null);

      if (i < this.capacity) {
        this._items[i].number = i;
        this._slots[i] = i;
      } else {
        this._slots[i] = -1;
      }
    }
  }

  /// <summary>
  /// Initializes the container slots.
  /// </summary>
  /// <param name="items">Dictionary of items where key is the slot and value the item.</param>
  public initialize(items: Record<number, Item>): void {
    for (const [itemSlot, item] of Object.entries(items)) {
      const slot = parseInt(itemSlot);

      if (slot < this.maxCapacity) {
        this._items[slot].item = item;
        this._items[slot].number = slot;
        this._items[slot].index = slot;
        this._slots[slot] = slot;
      }
    }
  }

  /// <summary>
  /// Gets an item slot matching the given item index.
  /// </summary>
  /// <param name="index">Item index.</param>
  /// <returns>The item slot.</returns>
  public getAtIndex(index: number): ItemContainerSlot {
    if (index < 0 || index >= this.maxCapacity) {
      throw new Error(`Item index is out of range: '${index}'`);
    }

    return this._items[index];
  }

  /// <summary>
  /// Gets an item slot matching the given slot.
  /// </summary>
  /// <param name="slot">Item slot.</param>
  /// <returns>The item slot.</returns>
  public getAtSlot(slot: number): ItemContainerSlot {
    if (slot < 0 || slot >= this.maxCapacity) {
      throw new Error(`Item slot is out of range: '${slot}'`);
    }

    const itemIndex = this._slots[slot];

    if (itemIndex < 0 || itemIndex >= this.maxCapacity) {
      return ItemContainerSlot.Empty;
    }

    return this._items[itemIndex];
  }

  public findSlot(predicate: (slot: ItemContainerSlot) => boolean): ItemContainerSlot | undefined {
    return this._items.find(predicate);
  }

  /// <summary>
  /// Get a range of slots.
  /// </summary>
  /// <param name="start">Start slot</param>
  /// <param name="count">Number of slots to get.</param>
  /// <returns>A collection of slots.</returns>
  public getRange(start: number, count: number): ItemContainerSlot[] {
    const result: ItemContainerSlot[] = [];
    for (let i = start; i < start + count && i < this.capacity; i++) {
      const index = this._slots[i];
      if (index >= 0 && index < this.maxCapacity) {
        result.push(this._items[index]);
      } else {
        result.push(ItemContainerSlot.Empty);
      }
    }
    return result;
  }

  /// <summary>
  /// Gets the number of available slots in the storage container.
  /// </summary>
  /// <returns>Number of available slots.</returns>
  public getStorageCount(): number {
    return this.getRange(0, this.capacity).filter(x => !x.hasItem).length;
  }

  /// <summary>
  /// Checks if the given item can be stored in the container.
  /// </summary>
  /// <param name="itemToStore">Item to store.</param>
  /// <returns>True if the item can be stored; false otherwise.</returns>
  public canStoreItem(itemToStore: Item): boolean {
    if (!itemToStore) {
      return false;
    }

    let quantityToStore = itemToStore.Quantity;
    const itemToStoreMaxQuantity = itemToStore.Properties.packMax;

    for (let i = 0; i < this.capacity; i++) {
      const itemSlot = this.getAtSlot(i);

      if (!itemSlot.hasItem) {
        if (quantityToStore > itemToStoreMaxQuantity) {
          quantityToStore -= itemToStoreMaxQuantity;
        } else {
          return true;
        }
      } else if (itemSlot.item!.Id === itemToStore.Id) {
        if (itemSlot.item!.Quantity + quantityToStore > itemToStoreMaxQuantity) {
          quantityToStore -= itemToStoreMaxQuantity - itemSlot.item!.Quantity;
        } else {
          return true;
        }
      }
    }

    return false;
  }

  /// <summary>
  /// Creates an item inside the container.
  /// </summary>
  /// <param name="item">Item to create.</param>
  /// <returns>Collection of ItemCreationResult.</returns>
  public createItem(item: Item): ItemCreationResult[] {
    let quantity = item.Quantity;
    const result: ItemCreationResult[] = [];

    if (!this.canStoreItem(item)) {
      return result;
    }

    if (item.Properties.isStackable) {
      for (let i = 0; i < this.capacity; i++) {
        const index = this._slots[i];

        if (index < 0 || index >= this.maxCapacity) {
          continue;
        }

        const slot = this._items[index];

        if (slot.hasItem && slot.item!.Id === item.Id && item.Quantity < item.Properties.packMax) {
          if (slot.item!.Quantity + quantity > item.Properties.packMax) {
            quantity -= item.Properties.packMax - slot.item!.Quantity;
            slot.item!.Quantity = item.Properties.packMax;
          } else {
            slot.item!.Quantity += quantity;
            quantity = 0;
          }

          result.push(new ItemCreationResult(ItemCreationActionType.Update, slot.item!, slot.number, slot.index));

          if (quantity === 0) {
            break;
          }
        }
      }
    }

    if (quantity > 0) {
      for (let i = 0; i < this.capacity; i++) {
        const index = this._slots[i];

        if (index < 0 || index >= this.maxCapacity) {
          continue;
        }

        const slot = this._items[index];

        if (!slot.hasItem) {
          slot.index = index;
          slot.number = i;
          slot.item = new Item(item.Properties);
          slot.item.Refine = item.Refine;
          slot.item.Element = item.Element;
          slot.item.ElementRefine = item.ElementRefine;
          slot.item.CreatorId = item.CreatorId;

          if (quantity > slot.item.Properties.packMax) {
            slot.item.Quantity = slot.item.Properties.packMax;
            quantity -= slot.item.Quantity;
          } else {
            slot.item.Quantity = quantity;
            quantity = 0;
          }

          result.push(new ItemCreationResult(ItemCreationActionType.Add, slot.item, slot.number, slot.index));

          if (quantity === 0) {
            break;
          }
        }
      }
    }

    return result;
  }

  public remove(itemSlot: ItemContainerSlot): void {
    if (!itemSlot.hasItem || itemSlot.index >= this.maxCapacity || itemSlot.number >= this.maxCapacity) {
      return;
    }

    itemSlot.item = null;
    if (itemSlot.number >= this.capacity) {
      this._slots[itemSlot.number] = -1;
      itemSlot.number = -1;
    }
  }

  /// <summary>
  /// Swap two slots.
  /// </summary>
  /// <param name="sourceSlot">Source slot.</param>
  /// <param name="destinationSlot">Destination slot.</param>
  protected swapItem(sourceSlot: number, destinationSlot: number): void {
    [this._slots[sourceSlot], this._slots[destinationSlot]] = [this._slots[destinationSlot], this._slots[sourceSlot]];

    const sourceIndex = this._slots[sourceSlot];
    const destinationIndex = this._slots[destinationSlot];

    if (sourceIndex !== -1) {
      this._items[sourceIndex].number = sourceSlot;
    }

    if (destinationIndex !== -1) {
      this._items[destinationIndex].number = destinationSlot;
    }
  }

  /// <summary>
  /// Serializes the item container to the given packet stream.
  /// </summary>
  /// <param name="packet">Packet stream.</param>
  public serialize(packet: FlyffPacket): void {
    for (let i = 0; i < this.maxCapacity; i++) {
      packet.writeInt32(this._items[i].index);
    }

    packet.writeByte(this.count);

    for (let i = 0; i < this.maxCapacity; i++) {
      const itemSlot = this._items[i];

      if (itemSlot.hasItem) {
        packet.writeByte(i);
        packet.writeInt32(itemSlot.index);
        itemSlot.item!.Serialize(packet);
      }
    }

    for (let i = 0; i < this.maxCapacity; i++) {
      packet.writeInt32(this._items[i].number);
    }
  }
}