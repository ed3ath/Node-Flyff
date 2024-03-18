// import { DefineText } from './DefineText';
// import { DefineSpecialEffects } from './DefineSpecialEffects';
import { WorldObjectType } from '../common/worldObjectTypes';
import { ObjectState } from '../common/objectState';
import { StateFlags } from '../common/stateFlags';
import { StateMode } from '../common/stateMode';

import { FFRandom } from '../helpers/FFRandom';

export class WorldObject {
    private _objectId: number;
    private _modelId: number;
    private _size: number = 100;
    private _type: WorldObjectType = WorldObjectType.Object;
    // private _map: Map | null = null;
    // private _mapLayer: MapLayer | null = null;
    // private _position: Vector3;
    private _rotationAngle: number = 0;
    private _name: string = '';
    private _isSpawned: boolean = false;
    private _isVisible: boolean = true;
    private _objectState: ObjectState;
    private _objectStateFlags: StateFlags;
    private _stateMode: StateMode = StateMode.NONE;
    private _visibleObjects: WorldObject[] = [];

    constructor() {
        this._objectId = FFRandom.generateUniqueId();
        // this._position = new Vector3();
    }

    get objectId(): number {
        return this._objectId;
    }

    get modelId(): number {
        return this._modelId;
    }

    set modelId(modelId: number) {
        this._modelId = modelId;
    }

    get size(): number {
        return this._size;
    }

    set size(size: number) {
        this._size = size;
    }

    get type(): WorldObjectType {
        return this._type;
    }

    // get map(): Map | null {
    //     return this._map;
    // }

    // set map(map: Map | null) {
    //     this._map = map;
    // }

    // get mapLayer(): MapLayer | null {
    //     return this._mapLayer;
    // }

    // set mapLayer(mapLayer: MapLayer | null) {
    //     this._mapLayer = mapLayer;
    // }

    // get position(): Vector3 {
    //     return this._position;
    // }

    get rotationAngle(): number {
        return this._rotationAngle;
    }

    set rotationAngle(rotationAngle: number) {
        this._rotationAngle = rotationAngle;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get isSpawned(): boolean {
        return this._isSpawned;
    }

    set isSpawned(isSpawned: boolean) {
        this._isSpawned = isSpawned;
    }

    get isVisible(): boolean {
        return this._isVisible;
    }

    set isVisible(isVisible: boolean) {
        this._isVisible = isVisible;
    }

    get objectState(): ObjectState {
        return this._objectState;
    }

    set objectState(objectState: ObjectState) {
        this._objectState = objectState;
    }

    get objectStateFlags(): StateFlags {
        return this._objectStateFlags;
    }

    set objectStateFlags(objectStateFlags: StateFlags) {
        this._objectStateFlags = objectStateFlags;
    }

    get stateMode(): StateMode {
        return this._stateMode;
    }

    set stateMode(stateMode: StateMode) {
        this._stateMode = stateMode;
    }

    get visibleObjects(): WorldObject[] {
        return this._visibleObjects;
    }

    getVisibleObject<TEntity extends WorldObject>(objectId: number): TEntity | null {
        return this._visibleObjects.find(obj => obj.objectId === objectId) as TEntity | null;
    }

    // sendDefinedText(text: DefineText, ...parameters: any[]): void {
    //     const snapshot = new DefinedTextSnapshot(this, text, parameters);
    //     this.send(snapshot);
    // }

    // sendSpecialEffect(specialEffect: DefineSpecialEffects, followObject: boolean = true): void {
    //     const snapshot = new CreateSfxObjectSnapshot(this, specialEffect, followObject);
    //     this.sendToVisible(snapshot, true);
    // }

    // send(packet: FlyffPacket): void {
    //     // Implementation goes here
    // }

    // sendToVisible(packet: FlyffPacket, sendToSelf: boolean = false): void {
    //     this.visibleObjects.forEach(obj => obj.send(packet));
    //     if (sendToSelf) {
    //         this.send(packet);
    //     }
    // }

    dispose(): void {
        // Implementation goes here
    }
}
