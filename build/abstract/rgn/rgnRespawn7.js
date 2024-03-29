"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RgnRespawn7 = void 0;
const rgnElement_1 = require("./rgnElement");
const vector3_1 = require("../vector3");
class RgnRespawn7 extends rgnElement_1.RgnElement {
    constructor(respawnData) {
        super(parseInt(respawnData[1]), new vector3_1.Vector3(parseInt(respawnData[3]), parseInt(respawnData[4]), parseInt(respawnData[5])), parseInt(respawnData[9]), parseInt(respawnData[10]), parseInt(respawnData[11]), parseInt(respawnData[12]));
        this._model = parseInt(respawnData[2]);
        this._count = parseInt(respawnData[6]);
        this._time = parseInt(respawnData[7]);
        this._agroNumber = parseInt(respawnData[8]);
    }
    get model() {
        return this._model;
    }
    get count() {
        return this._count;
    }
    get time() {
        return this._time;
    }
    get agroNumber() {
        return this._agroNumber;
    }
}
exports.RgnRespawn7 = RgnRespawn7;
