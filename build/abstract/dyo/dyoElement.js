"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DyoElement = void 0;
const vector3_1 = require("../vector3");
class DyoElement {
    constructor() {
        this.axis = new vector3_1.Vector3();
        this.position = new vector3_1.Vector3();
        this.scale = new vector3_1.Vector3();
    }
    read(streamReader) {
        this.angle = streamReader.readSingle();
        this.axis.x = streamReader.readSingle();
        this.axis.y = streamReader.readSingle();
        this.axis.z = streamReader.readSingle();
        this.position.x = streamReader.readSingle() * 4; // Adjust as needed
        this.position.y = streamReader.readSingle();
        this.position.z = streamReader.readSingle() * 4; // Adjust as needed
        this.scale.x = streamReader.readSingle();
        this.scale.y = streamReader.readSingle();
        this.scale.z = streamReader.readSingle();
        this.type = streamReader.readInt32LE();
        this.index = streamReader.readInt32LE();
        this.motion = streamReader.readInt32LE();
        this.iaInterface = streamReader.readInt32LE();
        this.ia2 = streamReader.readInt32LE();
    }
}
exports.DyoElement = DyoElement;
