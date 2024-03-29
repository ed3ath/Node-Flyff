"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFRandom = void 0;
class FFRandom {
    /**
     * Do a random between integers
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @returns Random integer between min and max
     */
    static random(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }
    /**
     * Gets a random floating number.
     * @returns Random floating number between 0 and 1
     */
    static floatRandom() {
        return Math.random();
    }
    /**
     * Do a random between floats
     * @param f1 Minimum value
     * @param f2 Maximum value
     * @returns Random floating number between f1 and f2
     */
    static floatRandomBetween(f1, f2) {
        return (f2 - f1) * Math.random() + f1;
    }
    /**
     * Do a random between long values
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @returns Random long between min and max
     */
    static longRandom(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }
    /**
     * Generates a unique id.
     * @returns Unique id
     */
    static generateUniqueId() {
        if (!this._syncLock) {
            this._syncLock = {};
        }
        if (!this._id) {
            this._id = 0;
        }
        this._id++;
        return this._id;
    }
    static getHashCode(value) {
        if (typeof value === "number")
            value = value.toString();
        let hash = 0;
        let chr;
        if (this.length === 0)
            return hash;
        for (let i = 0; i < this.length; i++) {
            chr = value.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}
exports.FFRandom = FFRandom;
FFRandom._syncLock = {};
FFRandom._id = 0;
