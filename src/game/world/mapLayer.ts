import { Vector3 } from "../../abstract/vector3";
import { Rectangle } from "../../abstract/rectangle";
import { WorldObject } from "./worldObject";
import { WorldMap } from "./worldMap";
import { Player } from "../../entities/player";
import { Npc } from "../../entities/npc";
import { Monster } from "../../entities/monster";
import { MapItemObject } from "../../entities/mapItemObject";
import { MoverProperties, NpcProperties } from "../../interfaces/resource";
import { WorldObjectType } from "../../types/worldObjectType";
import { ObjectState } from "../../types/objectState";
import { MoverClassType } from "../../types/moverClassType";
import { FFRandom } from "../../helpers/FFRandom";
import { MapRespawnRegionProperties } from "./regionRespawnProperties";

// Forward declaration to avoid circular dependency
interface GameResources {
    Current: {
        Npcs: {
            get(name: string): NpcProperties | null;
        };
        Movers: {
            get(modelId: number): MoverProperties | null;
        };
    };
}

// Mock GameResources for now - TODO: Replace with actual implementation
const GameResources: GameResources = {
    Current: {
        Npcs: {
            get: (name: string) => null
        },
        Movers: {
            get: (modelId: number) => null
        }
    }
};

export class MapLayer {
    private static readonly VISIBILITY_RANGE = 75;

    private readonly _parentMap: WorldMap;
    private readonly _players: Player[] = [];
    private readonly _npcs: Npc[] = [];
    private readonly _monsters: Monster[] = [];
    private readonly _items: MapItemObject[] = [];

    public readonly id: number;

    constructor(parentMap: WorldMap, layerId: number) {
        this._parentMap = parentMap;
        this.id = layerId;

        // Initialize NPCs
        const npcs = parentMap.properties.objects
            .map(obj => {
                const npcProperties = GameResources.Current.Npcs.get(obj.name);
                if (!npcProperties) return null;

                const npc = new Npc(npcProperties);
                npc.map = parentMap;
                npc.mapLayer = this;
                npc.position.copy(obj.position);
                npc.rotationAngle = obj.angle;
                npc.modelId = obj.modelId;
                npc.isSpawned = true;
                npc.objectState = ObjectState.OBJSTA_STAND;

                return npc;
            })
            .filter(npc => npc !== null) as Npc[];

        // Initialize Monsters
        const monsters = parentMap.properties.regions
            .filter((region): region is MapRespawnRegionProperties =>
                region instanceof MapRespawnRegionProperties &&
                region.objectType === WorldObjectType.Mover)
            .flatMap(respawnRegion => {
                const regionRect = new Rectangle(respawnRegion.x, respawnRegion.z, respawnRegion.width, respawnRegion.length);
                const moverProperties = GameResources.Current.Movers.get(respawnRegion.modelId);

                if (!moverProperties) return [];

                return Array.from({ length: respawnRegion.count }, () => {
                    const initialPosition = regionRect.getRandomPosition(respawnRegion.height);

                    const monster = new Monster(moverProperties as any, respawnRegion.time, regionRect);
                    monster.name = moverProperties.szName;
                    monster.level = moverProperties.dwLevel;
                    monster.size = moverProperties.dwClass === MoverClassType.RANK_BOSS ? 200 : 100;
                    monster.modelId = moverProperties.id;
                    monster.position.copy(initialPosition);
                    monster.rotationAngle = FFRandom.floatRandomBetween(0, 360);
                    monster.isSpawned = true;
                    monster.objectState = ObjectState.OBJSTA_STAND;
                    monster.map = parentMap;
                    monster.mapLayer = this;

                    return monster;
                });
            });

        this._npcs.push(...npcs);
        this._monsters.push(...monsters);
    }

    public addPlayer(player: Player): void {
        if (!player) {
            throw new Error("Cannot add a undefined player instance.");
        }

        // Use a simple check instead of lock since JavaScript is single-threaded
        if (!this._players.includes(player)) {
            this._players.push(player);
        }
    }

    public removePlayer(player: Player): void {
        if (!player) {
            throw new Error("Cannot remove a undefined player instance.");
        }

        const index = this._players.indexOf(player);
        if (index > -1) {
            this._players.splice(index, 1);
        }
    }

    public addItem(mapItem: MapItemObject): void {
        if (!mapItem) {
            throw new Error("Cannot add a undefined map item object instance.");
        }

        if (!this._items.includes(mapItem)) {
            this._items.push(mapItem);
        }
    }

    public removeItem(mapItem: MapItemObject): void {
        if (!mapItem) {
            throw new Error("Cannot remove a undefined map item object instance.");
        }

        const index = this._items.indexOf(mapItem);
        if (index > -1) {
            this._items.splice(index, 1);
        }
    }

    public update(): void {
        if (this._players.length === 0) {
            return;
        }

        for (const player of this._players) {
            player.update();
        }

        if (this._monsters.length > 0) {
            for (const monster of this._monsters) {
                monster.update();
            }
        }
    }

    public updateSeconds(): void {
        if (this._npcs.length > 0) {
            for (const npc of this._npcs) {
                npc.update();
            }
        }

        if (this._items.length > 0) {
            for (const mapItem of this._items) {
                mapItem.update();
            }
        }
    }

    public dispose(): void {
        this._players.length = 0;
    }

    public getVisibleObjects(worldObject: WorldObject): WorldObject[] {
        const objects: WorldObject[] = [];

        objects.push(...this.getVisibleObjectsOfType(worldObject, this._players));
        objects.push(...this.getVisibleObjectsOfType(worldObject, this._npcs));
        objects.push(...this.getVisibleObjectsOfType(worldObject, this._monsters));
        objects.push(...this.getVisibleObjectsOfType(worldObject, this._items));

        return objects;
    }

    private getVisibleObjectsOfType<T extends WorldObject>(worldObject: WorldObject, objects: T[]): T[] {
        return objects.filter(obj =>
            obj.objectId !== worldObject.objectId &&
            obj.isSpawned &&
            obj.isVisible &&
            obj.position.isInRange(worldObject.position, MapLayer.VISIBILITY_RANGE)
        );
    }

}
