import { WorldObject } from "../abstract/worldObject";
import { DefineItem } from "../common/defineItem";
import { Item } from "../common/item";
import { MapItemType } from "../common/mapItemType";
import { WorldObjectType } from "../common/worldObjectType";
import { FlyffPacket } from "../libraries/flyffPacket";
import { Mover } from "./mover";

export class MapItemObject extends WorldObject {
    private _nextRespawnTime: number;

    public get type(): WorldObjectType {
        return WorldObjectType.Item;
    }

    public readonly item: Item;
    public owner: Mover;
    public ownershipTime: number;
    public readonly itemType: MapItemType = MapItemType.DropItem;
    public readonly isGold: boolean;

    public respawnTime: number;

    constructor(item: Item) {
        super();
        if (!item) throw new Error("Cannot create a map object instance with an undefined item.");
        this.item = item;
        this.modelId = item.properties.id;
        this.isGold = item.id === DefineItem.II_GOLD_SEED1 ||
            item.id === DefineItem.II_GOLD_SEED2 ||
            item.id === DefineItem.II_GOLD_SEED3 ||
            item.id === DefineItem.II_GOLD_SEED4;
    }

    public update(): void {
        if (!this.isSpawned && this.canRespawn()) {
            this.respawn();
        }
    }

    public serialize(packet: FlyffPacket): void {
        packet.writeInt32(-1);
        this.item.serialize(packet);
    }

    public despawn(): void {
        this.isSpawned = false;
        this._nextRespawnTime = new Date().getTime() + this.respawnTime;
    }

    private canRespawn(): boolean {
        return this._nextRespawnTime < new Date().getTime();
    }

    private respawn(): void {
        this.isSpawned = true;
    }
}
