import { DefineAttributes } from "../definitions/defineAttributes";
import type { Mover } from "../../entities/mover";

export class Attributes {
    private _mover: Mover;
    private _attributes: Map<DefineAttributes, number> = new Map();

    constructor(mover: Mover) {
        this._mover = mover;
    }

    get(attribute: DefineAttributes, defaultValue = 0): number {
        return this._attributes.has(attribute) ? this._attributes.get(attribute)! : defaultValue;
    }

    set(attribute: DefineAttributes, value: number, sendToEntity = true): void {
        this._attributes.set(attribute, value);
        if (sendToEntity && 'mode' in this._mover) {
            this.sendAttributeValue(attribute, value);
        }
    }

    increase(attribute: DefineAttributes, value: number, sendToEntity = true): void {
        switch (attribute) {
            case DefineAttributes.DST_RESIST_ALL:
                this.increase(DefineAttributes.DST_RESIST_FIRE, value, sendToEntity);
                this.increase(DefineAttributes.DST_RESIST_ELECTRICITY, value, sendToEntity);
                this.increase(DefineAttributes.DST_RESIST_WATER, value, sendToEntity);
                this.increase(DefineAttributes.DST_RESIST_WIND, value, sendToEntity);
                this.increase(DefineAttributes.DST_RESIST_EARTH, value, sendToEntity);
                return;
            case DefineAttributes.DST_STAT_ALLUP:
                this.increase(DefineAttributes.DST_STR, value, sendToEntity);
                this.increase(DefineAttributes.DST_STA, value, sendToEntity);
                this.increase(DefineAttributes.DST_DEX, value, sendToEntity);
                this.increase(DefineAttributes.DST_INT, value, sendToEntity);
                return;
        }

        if (value !== 0) {
            const currentValue = this.get(attribute);
            const newValue = currentValue + value;
            this.set(attribute, newValue, sendToEntity);
        }
    }

    decrease(attribute: DefineAttributes, value: number, sendToEntity = true): void {
        switch (attribute) {
            case DefineAttributes.DST_RESIST_ALL:
                this.decrease(DefineAttributes.DST_RESIST_FIRE, value, sendToEntity);
                this.decrease(DefineAttributes.DST_RESIST_ELECTRICITY, value, sendToEntity);
                this.decrease(DefineAttributes.DST_RESIST_WATER, value, sendToEntity);
                this.decrease(DefineAttributes.DST_RESIST_WIND, value, sendToEntity);
                this.decrease(DefineAttributes.DST_RESIST_EARTH, value, sendToEntity);
                return;
            case DefineAttributes.DST_STAT_ALLUP:
                this.decrease(DefineAttributes.DST_STR, value, sendToEntity);
                this.decrease(DefineAttributes.DST_STA, value, sendToEntity);
                this.decrease(DefineAttributes.DST_DEX, value, sendToEntity);
                this.decrease(DefineAttributes.DST_INT, value, sendToEntity);
                return;
        }

        if (value !== 0) {
            const currentValue = this.get(attribute);
            const newValue = currentValue - value;
            this.set(attribute, newValue, sendToEntity);
        }
    }

    private sendAttributeValue(attribute: DefineAttributes, value: number): void {
        // const player = this._mover as Player;
        // const snapshot = new UpdateDestParamSnapshot(player, attribute, value);
        // player.send(snapshot);
    }
}
