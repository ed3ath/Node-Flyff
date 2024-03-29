import { DefineSpecialEffects } from '../common/defineSpecialEffects';
import { WorldObjectType } from '../common/worldObjectType';
import { ObjectState } from '../common/objectState';
import { StateMode } from '../common/stateMode';
import { FFRandom } from '../helpers/FFRandom';
import { StateFlags } from '../common/stateFlags';
import { MapLayer } from './mapLayer';
import { Vector3 } from './vector3';
import { WorldMap } from './worldMap';
import { FlyffPacket } from '../libraries/flyffPacket';
import { CreateSfxObjectSnapshot } from '../protocol/snapshots/createSfxObject';
import { DefineText } from '../common/defineText';
import { DefinedTextSnapshot } from '../protocol/snapshots/definedText';

export class WorldObject {
    public objectId: number;
    public modelId: number;
    public size: number = 100;
    public type: WorldObjectType = WorldObjectType.Object;
    public map: WorldMap | null = null;
    public mapLayer: MapLayer | null = null;
    public position: Vector3;
    public rotationAngle: number = 0;
    public name: string = '';
    public isSpawned: boolean = false;
    public isVisible: boolean = true;
    public objectState: ObjectState;
    public objectStateFlags: StateFlags;
    public stateMode: StateMode = StateMode.NONE;
    public visibleObjects: WorldObject[] = [];

    constructor() {
        this.objectId = FFRandom.generateUniqueId();
        this.position = new Vector3();
    }

    public getVisibleObject<TEntity extends WorldObject>(objectId: number): TEntity | null {
        return this.visibleObjects.find(obj => obj.objectId === objectId) as TEntity | null;
    }

    public sendDefinedText(text: DefineText, ...parameters: any[]): void {
        const snapshot = new DefinedTextSnapshot(this, text, parameters);
        this.send(snapshot);
    }

    public sendSpecialEffect(specialEffect: DefineSpecialEffects, followObject: boolean = true): void {
        const snapshot = new CreateSfxObjectSnapshot(this, specialEffect, followObject);
        this.sendToVisible(snapshot, true);
    }

    public send(packet: FlyffPacket): void {
       
    }

    public sendToVisible(packet: FlyffPacket, sendToSelf: boolean = false): void {
        this.visibleObjects.forEach(obj => obj.send(packet));
        if (sendToSelf) {
            this.send(packet);
        }
    }
}
