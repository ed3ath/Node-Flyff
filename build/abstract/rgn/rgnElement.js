"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RgnElement = void 0;
class RgnElement {
    constructor(type, position, left, top, right, bottom) {
        this._type = type;
        this._position = position;
        this._left = left;
        this._top = top;
        this._right = right;
        this._bottom = bottom;
    }
    get type() {
        return this._type;
    }
    get position() {
        return this._position;
    }
    get left() {
        return this._left;
    }
    get top() {
        return this._top;
    }
    get right() {
        return this._right;
    }
    get bottom() {
        return this._bottom;
    }
    get width() {
        return this._right - this._left;
    }
    get length() {
        return this._bottom - this._top;
    }
}
exports.RgnElement = RgnElement;
