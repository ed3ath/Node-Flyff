"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buffs = void 0;
const buffResultType_1 = require("../common/buffResultType");
class Buffs {
    constructor(owner) {
        this.owner = owner;
        this.buffs = [];
    }
    add(buff) {
        if (buff.hasExpired) {
            return buffResultType_1.BuffResultType.None;
        }
        if (this.contains(buff) && 'skillId' in buff) {
            const existingBuff = this.buffs.find(b => 'skillId' in b && b.skillId === buff.skillId);
            if (existingBuff) {
                if (existingBuff.skillLevel === buff.SkillLevel) {
                    existingBuff.remainingTime = buff.RemainingTime;
                    return buffResultType_1.BuffResultType.Updated;
                }
                else if (existingBuff.skillLevel > buff.SkillLevel) {
                    return buffResultType_1.BuffResultType.None;
                }
                this.remove(existingBuff);
            }
        }
        this.buffs.push(buff);
        // for (const [key, value] of buff.Attributes) {
        //     this.owner.Attributes.Increase(key, value);
        // }
        return buffResultType_1.BuffResultType.Added;
    }
    remove(buff) {
        const index = this.buffs.indexOf(buff);
        if (index !== -1) {
            this.buffs.splice(index, 1);
            // for (const [key, value] of buff.attributes) {
            //     this.owner.attributes.Decrease(key, value);
            // }
            return true;
        }
        return false;
    }
    removeAll() {
        for (const buff of this.buffs.slice()) {
            this.remove(buff);
        }
    }
    contains(buff) {
        if (!buff) {
            return false;
        }
        if ('skillId' in buff) {
            return this.buffs.some(b => 'skillId' in b && b.skillId === buff.skillId);
        }
        return this.buffs.some(b => b.id === buff.id);
    }
    update() {
        for (const buff of this.buffs.slice()) {
            buff.decreaseTime();
            if (buff.hasExpired) {
                this.remove(buff);
            }
        }
    }
    serialize(packet) {
        const activeBuffs = this.buffs.filter(b => !b.hasExpired);
        packet.writeInt32(activeBuffs.length);
        for (const buff of activeBuffs) {
            buff.serialize(packet);
        }
    }
    [Symbol.iterator]() {
        return this.buffs[Symbol.iterator]();
    }
}
exports.Buffs = Buffs;
