import { Player } from "../entities/player";
import { WorldMap } from "./worldMap";

export class MapLayer {
  private static readonly VisibilityRange: number = 75; // TODO: make a configuration for this

  private _players: Player[] = [];
  private readonly _npcs: any[] = [];
  private readonly _monsters: any[] = [];
  private readonly _items: any[] = [];

  public readonly id: number;

  public constructor(parentMap: WorldMap, layerId: number) {
    this.id = layerId;
  }

  public addPlayer(player: Player): void {
    if (!player) {
      throw new Error('Cannot add an undefined player instance.');
    }

    if (!this._players.includes(player)) {
      this._players.push(player);
    }
  }

  public removePlayer(player: Player): void {
    if (!player) {
      throw new Error('Cannot remove an undefined player instance.');
    }

    const index = this._players.indexOf(player);
    if (index !== -1) {
      this._players.splice(index, 1);
    }
  }

  public addItem(mapItem: any): void {
    if (!mapItem) {
      throw new Error('Cannot add an undefined map item object instance.');
    }

    if (!this._items.includes(mapItem)) {
      this._items.push(mapItem);
    }
  }

  public removeItem(mapItem: any): void {
    if (!mapItem) {
      throw new Error('Cannot remove an undefined map item object instance.');
    }

    const index = this._items.indexOf(mapItem);
    if (index !== -1) {
      this._items.splice(index, 1);
    }
  }

  public update(): void {
    for (const player of this._players) {
      player.update();
    }

    for (const monster of this._monsters) {
      monster.update();
    }
  }

  public updateSeconds(): void {
    for (const player of this._players) {
      player.buffs.update();
    }

    for (const monster of this._monsters) {
      monster.buffs.update();
    }

    for (const npc of this._npcs) {
      npc.update();
    }

    for (const mapItem of this._items) {
      mapItem.update();
    }
  }

  public dispose(): void {
    this._players.length = 0;
  }

  public static getVisibleObjects(player: Player): any[] {
    // Stub implementation - return empty array or implement based on logic
    return [];
  }

  private getVisibleObjectsByType<T extends any>(objects: T[], worldObject: any): T[] {
    return objects.filter(x => true); // Stub filter
  }
}
