import { Vector3 } from "../../abstract/vector3";
import { Rectangle } from "../../abstract/rectangle";
import { WorldObject } from "./worldObject";
import { WorldMap } from "./worldMap";
import { Player } from "../../entities/player";
import { Npc } from "../../entities/npc";
import { Monster } from "../../entities/monster";
import { MapItemObject } from "../../entities/mapItemObject";
import { MoverProperties, NpcProperties, GameResources } from "../../interfaces/resource";
import { WorldObjectType } from "../../types/worldObjectType";
import { ObjectState } from "../../types/objectState";
import { MoverClassType } from "../../types/moverClassType";
import { FFRandom } from "../../helpers/FFRandom";
import { MapRespawnRegionProperties } from "./regionRespawnProperties";

export class MapLayer {
    private static readonly VISIBILITY_RANGE = 75;

    private readonly _parentMap: WorldMap;
    private readonly _players: Player[] = [];
    private readonly _npcs: Npc[] = [];
    private readonly _monsters: Monster[] = [];
    private readonly _items: MapItemObject[] = [];
    private readonly _gameResources: GameResources | null;

    public readonly id: number;

    constructor(parentMap: WorldMap, layerId: number, gameResources?: GameResources) {
        this._parentMap = parentMap;
        this.id = layerId;
        this._gameResources = gameResources || null;

        // DISABLED: Initialize NPCs and monsters only if game resources are available
        // if (this._gameResources) {
        //     this.initializeMapObjects();
        // }
        console.log(`[MapLayer] NPC and monster spawning disabled for layer ${this.id}`);
    }

    /**
     * Initialize NPCs and monsters from map data using game resources
     */
    private async initializeMapObjects(): Promise<void> {
        if (!this._gameResources) {
            console.warn(`[MapLayer] No game resources available for layer ${this.id}`);
            return;
        }

        // Initialize NPCs from .dyo objects
        console.log(`[MapLayer] Loading NPCs for layer ${this.id}...`);
        const npcPromises = this._parentMap.properties.objects.map(async obj => {
            try {
                // Look up NPC by character key (obj.name contains the character identifier like "MaPu_Aibatt1")
                const npcProperties = await this._gameResources!.npcResources.get(obj.name);
                if (!npcProperties) {
                    console.warn(`[MapLayer] NPC properties not found for: ${obj.name}`);
                    return null;
                }

                console.log(`[MapLayer] Creating NPC: ${obj.name} at position (${obj.position.x}, ${obj.position.y}, ${obj.position.z})`);
                const npc = new Npc(npcProperties);
                npc.map = this._parentMap;
                npc.mapLayer = this;
                npc.position.copy(obj.position);
                npc.rotationAngle = obj.angle;
                npc.modelId = obj.modelId;
                npc.isSpawned = true;
                npc.objectState = ObjectState.OBJSTA_STAND;

                return npc;
            } catch (error) {
                console.error(`[MapLayer] Failed to create NPC ${obj.name}:`, error);
                return null;
            }
        });

        const npcs = (await Promise.all(npcPromises)).filter(npc => npc !== null) as Npc[];
        this._npcs.push(...npcs);
        console.log(`[MapLayer] Created ${npcs.length} NPCs for layer ${this.id}`);

        // Initialize Monsters from respawn regions
        console.log(`[MapLayer] Loading monsters for layer ${this.id}...`);
        const monsterPromises = this._parentMap.properties.regions
            .filter((region): region is MapRespawnRegionProperties =>
                region instanceof MapRespawnRegionProperties &&
                region.objectType === WorldObjectType.Mover)
            .flatMap(respawnRegion => {
                return Array.from({ length: respawnRegion.count }, async () => {
                    try {
                        const regionRect = new Rectangle(respawnRegion.x, respawnRegion.z, respawnRegion.width, respawnRegion.length);
                        const moverProperties = await this._gameResources!.monsterResources.get(respawnRegion.modelId);

                        if (!moverProperties) {
                            console.warn(`[MapLayer] Monster properties not found for model ID: ${respawnRegion.modelId}`);
                            return null;
                        }

                        const initialPosition = regionRect.getRandomPosition(respawnRegion.height);

                        console.log(`[MapLayer] Creating monster: ${moverProperties.szName} (${respawnRegion.modelId}) at (${initialPosition.x}, ${initialPosition.y}, ${initialPosition.z})`);
                        const monster = new Monster(moverProperties as any, respawnRegion.time, regionRect);
                        monster.name = moverProperties.szName || `Monster_${moverProperties.id}`;
                        monster.level = moverProperties.dwLevel || 1;
                        monster.size = moverProperties.dwClass === MoverClassType.RANK_BOSS ? 200 : 100;
                        monster.modelId = moverProperties.id;
                        monster.position.copy(initialPosition);
                        monster.rotationAngle = FFRandom.floatRandomBetween(0, 360);
                        monster.isSpawned = true;
                        monster.objectState = ObjectState.OBJSTA_STAND;
                        monster.map = this._parentMap;
                        monster.mapLayer = this;

                        return monster;
                    } catch (error) {
                        console.error(`[MapLayer] Failed to create monster with model ID ${respawnRegion.modelId}:`, error);
                        return null;
                    }
                });
            });

        const monsters = (await Promise.all(monsterPromises)).filter(monster => monster !== null) as Monster[];
        this._monsters.push(...monsters);
        console.log(`[MapLayer] Created ${monsters.length} monsters for layer ${this.id}`);
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

    /**
     * Get object by ID from all object collections
     */
    public getObjectById(objectId: number): WorldObject | undefined {
        // Check players
        let obj: WorldObject | undefined = this._players.find(p => p.objectId === objectId);
        if (obj) return obj;

        // Check NPCs
        obj = this._npcs.find(n => n.objectId === objectId);
        if (obj) return obj;

        // Check monsters
        obj = this._monsters.find(m => m.objectId === objectId);
        if (obj) return obj;

        // Check items
        obj = this._items.find(i => i.objectId === objectId);
        if (obj) return obj;

        return undefined;
    }

    /**
     * Get all players within a certain range of a position
     */
    public getPlayersInRange(position: Vector3, range: number): Player[] {
        return this._players.filter(player =>
            player.isSpawned &&
            player.position.distanceTo(position) <= range
        );
    }

    /**
     * Remove object from player's view list (for REMOVEOBJ handler)
     * This is a simplified implementation - in a full system, you'd track
     * which objects each player can see
     */
    public removeObjectFromPlayerView(playerId: number, objectId: number): void {
        // In a full implementation, you would maintain view lists per player
        // For now, this is a placeholder that acknowledges the object removal
        const player = this._players.find(p => p.objectId === playerId);
        if (player) {
            // TODO: Remove from player's visible object cache if implemented
        }
    }

}
