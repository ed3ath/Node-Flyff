import { BuffResultType } from "../common/buffResultType";
import { Mover } from "../entities/mover";
import { FlyffPacket } from "../libraries/flyffPacket";
import { Buff } from "./buff";

export class Buffs implements Iterable<Buff> {
    private buffs: Buff[] = [];

    constructor(public owner: Mover) {}

    add(buff: Buff): BuffResultType {
        if (buff.hasExpired) {
            return BuffResultType.None;
        }

        if (this.contains(buff) && 'skillId' in buff) {
            const existingBuff = this.buffs.find(b => 'skillId' in b && b.skillId === (buff as any).skillId) as Buff & { skillLevel: number };

            if (existingBuff) {
                if (existingBuff.skillLevel === (buff as any).SkillLevel) {
                    existingBuff.remainingTime = (buff as any).RemainingTime;
                    return BuffResultType.Updated;
                } else if (existingBuff.skillLevel > (buff as any).SkillLevel) {
                    return BuffResultType.None;
                }

                this.remove(existingBuff);
            }
        }

        this.buffs.push(buff);

        // for (const [key, value] of buff.Attributes) {
        //     this.owner.Attributes.Increase(key, value);
        // }

        return BuffResultType.Added;
    }

    remove(buff: Buff): boolean {
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

    removeAll(): void {
        for (const buff of this.buffs.slice()) {
            this.remove(buff);
        }
    }

    contains(buff: Buff): boolean {
        if (!buff) {
            return false;
        }

        if ('skillId' in buff) {
            return this.buffs.some(b => 'skillId' in b && b.skillId === (buff as any).skillId);
        }

        return this.buffs.some(b => b.id === buff.id);
    }

    update(): void {
        for (const buff of this.buffs.slice()) {
            buff.decreaseTime();
            if (buff.hasExpired) {
                this.remove(buff);
            }
        }
    }

    serialize(packet: FlyffPacket): void {
        const activeBuffs = this.buffs.filter(b => !b.hasExpired);
        packet.writeInt32(activeBuffs.length);
        for (const buff of activeBuffs) {
            buff.serialize(packet);
        }
    }

    [Symbol.iterator](): Iterator<Buff> {
        return this.buffs[Symbol.iterator]();
    }
}
