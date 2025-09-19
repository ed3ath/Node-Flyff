import { FlyffPacket } from "../../libraries/flyffPacket";
import { Shortcut } from "./shortcut";

/// <summary>
/// Interface for packet serialization.
/// </summary>
export interface IPacketSerializer {
  serialize(packet: FlyffPacket): void;
}

/// <summary>
/// Represents a container for taskbar items.
/// </summary>
export class TaskbarContainer<T> {
  private items: Map<number, T> = new Map();
  public readonly capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  public get count(): number {
    return this.items.size;
  }

  public set(index: number, item: T): void {
    if (index >= 0 && index < this.capacity) {
      this.items.set(index, item);
    }
  }

  public get(index: number): T | undefined {
    return this.items.get(index);
  }

  public remove(index: number): void {
    this.items.delete(index);
  }

  public clear(): void {
    this.items.clear();
  }

  public serialize(packet: FlyffPacket): void {
    packet.writeInt32(this.count);
    for (const [index, item] of this.items) {
      packet.writeInt32(index);
      if ((item as any).serialize) {
        (item as any).serialize(packet);
      }
    }
  }

  public *[Symbol.iterator](): Iterator<T> {
    for (const item of this.items.values()) {
      yield item;
    }
  }
}

/// <summary>
/// Represents a multiple-level taskbar container.
/// </summary>
export class MultipleTaskbarContainer<T> {
  private containers: TaskbarContainer<T>[] = [];
  public readonly capacity: number;

  constructor(levelCount: number, itemsPerLevel: number) {
    this.capacity = levelCount;
    for (let i = 0; i < levelCount; i++) {
      this.containers.push(new TaskbarContainer<T>(itemsPerLevel));
    }
  }

  public get count(): number {
    return this.containers.reduce((total, container) => total + container.count, 0);
  }

  public getContainer(level: number): TaskbarContainer<T> | undefined {
    return this.containers[level];
  }

  public getContainerAtLevel(level: number): TaskbarContainer<T> | null {
    return this.containers[level] || null;
  }

  public set(level: number, index: number, item: T): void {
    const container = this.getContainer(level);
    if (container) {
      container.set(index, item);
    }
  }

  public get(level: number, index: number): T | undefined {
    const container = this.getContainer(level);
    return container?.get(index);
  }

  public setItem(level: number, index: number, item: T): void {
    this.set(level, index, item);
  }

  public getItem(level: number, index: number): T | undefined {
    return this.get(level, index);
  }

  public removeItem(level: number, index: number): void {
    const container = this.getContainer(level);
    if (container) {
      container.remove(index);
    }
  }

  public serialize(packet: FlyffPacket): void {
    packet.writeInt32(this.capacity);
    for (const container of this.containers) {
      container.serialize(packet);
    }
  }

  public Serialize(packet: FlyffPacket): void {
    this.serialize(packet);
  }
}

/// <summary>
/// Represents the main taskbar system for a player.
/// </summary>
export class Taskbar implements IPacketSerializer {
    private readonly _multipleContainer: MultipleTaskbarContainer<Shortcut>;

    /// <summary>
    /// Gets the number of taskbar levels.
    /// </summary>
    public get LevelCount(): number {
        return this._multipleContainer.capacity;
    }

    /// <summary>
    /// Gets the total number of shortcuts in all levels.
    /// </summary>
    public get Count(): number {
        return this._multipleContainer.count;
    }

    /// <summary>
    /// Creates a new Taskbar instance.
    /// </summary>
    public constructor() {
        this._multipleContainer = new MultipleTaskbarContainer<Shortcut>(4, 12); // 4 levels, 12 slots each
    }

    /// <summary>
    /// Gets the taskbar container at the specified level.
    /// </summary>
    /// <param name="level">The level to get the container for.</param>
    /// <returns>The taskbar container if found; null otherwise.</returns>
    public GetContainerAtLevel(level: number): TaskbarContainer<Shortcut> | null {
        return this._multipleContainer.getContainerAtLevel(level);
    }

    /// <summary>
    /// Adds a shortcut to the taskbar at the specified level and slot.
    /// </summary>
    /// <param name="level">The level to add the shortcut to.</param>
    /// <param name="slot">The slot to add the shortcut to.</param>
    /// <param name="shortcut">The shortcut to add.</param>
    /// <returns>True if the shortcut was added successfully; false otherwise.</returns>
    public AddShortcut(level: number, slot: number, shortcut: Shortcut): boolean {
        this._multipleContainer.setItem(level, slot, shortcut);
        return true;
    }

    /// <summary>
    /// Removes a shortcut from the taskbar at the specified level and slot.
    /// </summary>
    /// <param name="level">The level to remove the shortcut from.</param>
    /// <param name="slot">The slot to remove the shortcut from.</param>
    /// <returns>True if the shortcut was removed successfully; false otherwise.</returns>
    public RemoveShortcut(level: number, slot: number): boolean {
        this._multipleContainer.removeItem(level, slot);
        return true;
    }

    /// <summary>
    /// Gets a shortcut from the taskbar at the specified level and slot.
    /// </summary>
    /// <param name="level">The level to get the shortcut from.</param>
    /// <param name="slot">The slot to get the shortcut from.</param>
    /// <returns>The shortcut if found; null otherwise.</returns>
    public GetShortcut(level: number, slot: number): Shortcut | null {
        return this._multipleContainer.getItem(level, slot) || null;
    }

    /// <summary>
    /// Serializes the taskbar into the given packet stream.
    /// </summary>
    /// <param name="packet">Packet stream.</param>
    public serialize(packet: FlyffPacket): void {
        this._multipleContainer.serialize(packet);
    }

    /// <summary>
    /// Gets an enumerator for all shortcuts in the taskbar.
    /// </summary>
    /// <returns>An enumerator for all shortcuts.</returns>
    public *[Symbol.iterator](): IterableIterator<Shortcut> {
        for (let level = 0; level < this.LevelCount; level++) {
            const container = this.GetContainerAtLevel(level);
            if (container) {
                for (const shortcut of container) {
                    if (shortcut) {
                        yield shortcut;
                    }
                }
            }
        }
    }
}