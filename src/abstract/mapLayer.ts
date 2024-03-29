import { Player } from "../entities/player";
import { WorldMap } from "./worldMap";

export class MapLayer {
  private static readonly VisibilityRange: number = 75; // TODO: make a configuration for this

  private _players: Player[] = [];
  // private readonly _npcs: Npc[] = [];
  // private readonly _monsters: Monster[] = [];
  // private readonly _items: MapItemObject[] = [];

  public readonly id: number;

  public constructor(parentMap: WorldMap, layerId: number) {
    this.id = layerId;

    // const npcs: Npc[] = parentMap.properties.objects
    //     .map(x => {
    //         const properties = GameResources.Current.npcs.get(x.name);
    //         if (properties) {
    //             return new Npc(properties, {
    //                 map: parentMap,
    //                 mapLayer: this,
    //                 position: x.position.clone(),
    //                 rotationAngle: x.angle,
    //                 modelId: x.modelId,
    //                 isSpawned: true,
    //                 objectState: ObjectState.OBJSTA_STAND
    //             });
    //         }
    //         return null;
    //     })
    //     .filter(x => x !== null) as Npc[];

    // const monsters: Monster[] = parentMap.properties.regions
    //     .filter(x => x instanceof MapRespawnRegionProperties && x.objectType === WorldObjectType.Mover)
    //     .flatMap(x => {
    //         const region = new Rectangle(x.x, x.z, x.width, x.length);
    //         const moverProperties = GameResources.Current.movers.get(x.modelId);

    //         return Array.from({ length: x.count }, () => {
    //             const initialPosition = region.getRandomPosition(x.height);

    //             return new Monster(moverProperties, {
    //                 name: moverProperties.name,
    //                 level: moverProperties.level,
    //                 size: moverProperties.class === MoverClassType.RANK_BOSS ? 200 : 100,
    //                 modelId: moverProperties.id,
    //                 respawnTime: x.time,
    //                 region: region,
    //                 position: initialPosition.clone(),
    //                 beginPosition: initialPosition.clone(),
    //                 rotationAngle: FFRandom.floatRandom(0, 360),
    //                 isSpawned: true,
    //                 objectState: ObjectState.OBJSTA_STAND,
    //                 map: parentMap,
    //                 mapLayer: this
    //             });
    //         });
    //     });

    // this._npcs.push(...npcs);
    // this._monsters.push(...monsters);
  }

  // public addPlayer(player: Player): void {
  //     if (!player) {
  //         throw new Error('Cannot add an undefined player instance.');
  //     }

  //     if (!this._players.includes(player)) {
  //         this._players.push(player);
  //     }
  // }

  // public removePlayer(player: Player): void {
  //     if (!player) {
  //         throw new Error('Cannot remove an undefined player instance.');
  //     }

  //     const index = this._players.indexOf(player);
  //     if (index !== -1) {
  //         this._players.splice(index, 1);
  //     }
  // }

  // public addItem(mapItem: MapItemObject): void {
  //     if (!mapItem) {
  //         throw new Error('Cannot add an undefined map item object instance.');
  //     }

  //     if (!this._items.includes(mapItem)) {
  //         this._items.push(mapItem);
  //     }
  // }

  // public removeItem(mapItem: MapItemObject): void {
  //     if (!mapItem) {
  //         throw new Error('mapItem', 'Cannot remove an undefined map item object instance.');
  //     }

  //     const index = this._items.indexOf(mapItem);
  //     if (index !== -1) {
  //         this._items.splice(index, 1);
  //     }
  // }

  // public update(): void {
  //     for (const player of this._players) {
  //         player.update();
  //     }

  //     for (const monster of this._monsters) {
  //         monster.update();
  //     }
  // }

  // public updateSeconds(): void {
  //     for (const player of this._players) {
  //         player.buffs.update();
  //     }

  //     for (const monster of this._monsters) {
  //         monster.buffs.update();
  //     }

  //     for (const npc of this._npcs) {
  //         npc.update();
  //     }

  //     for (const mapItem of this._items) {
  //         mapItem.update();
  //     }
  // }

  // public dispose(): void {
  //     this._players.length = 0;
  // }

  // public getVisibleObjects(worldObject: WorldObject): WorldObject[] {
  //     const objects: WorldObject[] = [];

  //     objects.push(...this.getVisibleObjectsByType(this._players, worldObject));
  //     objects.push(...this.getVisibleObjectsByType(this._npcs, worldObject));
  //     objects.push(...this.getVisibleObjectsByType(this._monsters, worldObject));
  //     objects.push(...this.getVisibleObjectsByType(this._items, worldObject));

  //     return objects;
  // }

  // private getVisibleObjectsByType<T extends WorldObject>(objects: T[], worldObject: WorldObject): T[] {
  //     return objects.filter(x => x.objectId !== worldObject.objectId && x.isSpawned && x.isVisible && x.position.isInRange(worldObject.position, MapLayer.VisibilityRange));
  // }
}
