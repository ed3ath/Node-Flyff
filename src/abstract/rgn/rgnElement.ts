import { Vector3 } from "../vector3";

export class RgnElement {
    protected _type: number;
    protected _position: Vector3;
    protected _left: number;
    protected _top: number;
    protected _right: number;
    protected _bottom: number;

    constructor(type: number, position: Vector3, left: number, top: number, right: number, bottom: number) {
        this._type = type;
        this._position = position;
        this._left = left;
        this._top = top;
        this._right = right;
        this._bottom = bottom;
    }

    get type(): number {
        return this._type;
    }

    get position(): Vector3 {
        return this._position;
    }

    get left(): number {
        return this._left;
    }

    get top(): number {
        return this._top;
    }

    get right(): number {
        return this._right;
    }

    get bottom(): number {
        return this._bottom;
    }

    get width(): number {
        return this._right - this._left;
    }

    get length(): number {
        return this._bottom - this._top;
    }
}