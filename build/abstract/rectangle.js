"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const FFRandom_1 = require("../helpers/FFRandom");
const vector3_1 = require("./vector3");
class Rectangle {
    constructor(x, z, width, length) {
        this.x = x;
        this.z = z;
        this.width = width;
        this.length = length;
    }
    getRandomPosition(height = 0) {
        return new vector3_1.Vector3(FFRandom_1.FFRandom.floatRandomBetween(this.x, this.x + this.width), height, FFRandom_1.FFRandom.floatRandomBetween(this.z, this.z + this.length));
    }
    contains(arg1, y, z) {
        let x;
        if (arg1 instanceof vector3_1.Vector3) {
            x = arg1.x;
            y = arg1.y;
            z = arg1.z;
        }
        else {
            x = arg1;
        }
        if (z) {
            return (x >= this.x &&
                x <= this.x + this.width &&
                z >= this.z &&
                z <= this.z + this.length);
        }
        else {
            return x >= this.x && x <= this.x + this.width;
        }
    }
}
exports.Rectangle = Rectangle;
