"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector3 = void 0;
const FFRandom_1 = require("../helpers/FFRandom");
class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    get length() {
        return Math.sqrt(this.squaredLength);
    }
    get squaredLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    getDistance2D(otherPosition) {
        return Math.sqrt(Math.pow(otherPosition.x - this.x, 2) + Math.pow(otherPosition.z - this.z, 2));
    }
    getDistance3D(otherPosition) {
        return Math.sqrt(Math.pow(otherPosition.x - this.x, 2) + Math.pow(otherPosition.y - this.y, 2) + Math.pow(otherPosition.z - this.z, 2));
    }
    isInCircle(otherPosition, circleRadius) {
        return Math.pow(otherPosition.x - this.x, 2) + Math.pow(otherPosition.z - this.z, 2) < Math.pow(circleRadius, 2);
    }
    isInRange(otherPosition, range) {
        const distance = this.clone().subtract(otherPosition).setY(0);
        if (distance.squaredLength > range * range) {
            return false;
        }
        return true;
    }
    intersects(rectangle, radius) {
        const deltaX = this.x - Math.max(rectangle.x, Math.min(this.x, rectangle.x + rectangle.width));
        const deltaY = this.z - Math.max(rectangle.z, Math.min(this.z, rectangle.z + rectangle.length));
        return deltaX * deltaX + deltaY * deltaY < radius * radius;
    }
    normalize() {
        const sqLength = this.squaredLength;
        if (sqLength <= 0) {
            throw new Error("Cannot normalize a vector of zero length.");
        }
        return this.divide(Math.sqrt(sqLength));
    }
    clone() {
        return new Vector3(this.x, this.y, this.z);
    }
    reset() {
        this.x = this.y = this.z = 0;
    }
    copy(otherVector) {
        this.x = otherVector.x;
        this.y = otherVector.y;
        this.z = otherVector.z;
    }
    isZero() {
        return this.squaredLength <= 0;
    }
    toString() {
        return `Vector3: ${this.x}:${this.y}:${this.z}`;
    }
    hashCode() {
        return FFRandom_1.FFRandom.getHashCode(this.x) ^ FFRandom_1.FFRandom.getHashCode(this.y) ^ FFRandom_1.FFRandom.getHashCode(this.z);
    }
    equals(other) {
        return this == other;
    }
    static dotProduct(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    static crossProduct(a, b) {
        return new Vector3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
    }
    static angleBetween(a, b) {
        const dist = b.subtract(a);
        let angle = Math.atan2(dist.x, -dist.z);
        angle = this.toDegree(angle);
        if (angle < 0) {
            angle += 360;
        }
        else if (angle >= 360) {
            angle -= 360;
        }
        return angle;
    }
    static getRandomPositionInCircle(center, radius) {
        const newVector = center.clone();
        const angle = FFRandom_1.FFRandom.floatRandomBetween(0, 360) * Math.PI / 180;
        const power = FFRandom_1.FFRandom.floatRandomBetween(0, radius);
        newVector.x += Math.sin(angle) * power;
        newVector.z += Math.cos(angle) * power;
        return newVector;
    }
    static distance2D(from, to) {
        const x = from.x - to.x;
        const z = from.z - to.z;
        return Math.sqrt(x * x + z * z);
    }
    static distance3D(from, to) {
        const x = from.x - to.x;
        const y = from.y - to.y;
        const z = from.z - to.z;
        return Math.sqrt(x * x + y * y + z * z);
    }
    static toDegree(radian) {
        return radian * (180 / Math.PI);
    }
    static toRadian(degree) {
        return degree * (Math.PI / 180);
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        this.z += other.z;
        return this;
    }
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        this.z -= other.z;
        return this;
    }
    multiply(value) {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        return this;
    }
    divide(value) {
        this.x /= value;
        this.y /= value;
        this.z /= value;
        return this;
    }
    setX(x) {
        this.x = x;
        return this;
    }
    setY(y) {
        this.y = y;
        return this;
    }
    setZ(z) {
        this.z = z;
        return this;
    }
    static equals(a, b) {
        return a == b;
    }
}
exports.Vector3 = Vector3;
