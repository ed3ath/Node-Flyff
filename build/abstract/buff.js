"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buff = void 0;
class Buff {
    constructor(owner, attributes) {
        this.id = Buff.uniqueIdCounter++;
        this.owner = owner;
        this.attributes = new Map(attributes);
        this.remainingTime = 0; // Initialize remaining time as needed
    }
    get hasExpired() {
        return this.remainingTime <= 0;
    }
    decreaseTime(time = 1) {
        this.remainingTime -= time * 1000; // Assuming time is provided in seconds, convert to milliseconds
    }
    equals(other) {
        return other instanceof Buff && this.id === other.id;
    }
    serialize(packet) {
        // Nothing to do
    }
}
exports.Buff = Buff;
Buff.uniqueIdCounter = 0;
