import { DefineAttributes } from "../definitions/defineAttributes";
import { ItemKind2 } from "../../types/itemKind";
import { Item } from "./item";
import type { Mover } from "../../entities/mover";
import { FFRandom } from "../../helpers/FFRandom";

export class Defense {
    private _mover: Mover;

    /** Gets the minimum defense. */
    public minimum: number;

    /** Gets the maximum defense. */
    public maximum: number;

    constructor(mover: Mover) {
        this._mover = mover;
    }

    /** Gets the defense. */
    public get(): number {
        if (this.minimum === this.maximum) {
            return this.maximum;
        }

        const defenseDelta = this.maximum - this.minimum;

        return this.minimum + (defenseDelta > 0 ? FFRandom.random(0, defenseDelta) : 0);
    }

    public update(): void {
        if ('getEquippedItems' in this._mover && typeof this._mover.getEquippedItems === 'function') {
            let defenseMin = 0;
            let defenseMax = 0;
            const equippedItems: Item[] = this._mover.getEquippedItems();

            if (equippedItems.length > 0) {
                for (const equippedItem of equippedItems) {
                    if (!equippedItem || (equippedItem && equippedItem.Id === -1)) {
                        continue;
                    }

                    if (
                        equippedItem.Properties.itemKind2 === ItemKind2.ARMOR ||
                        equippedItem.Properties.itemKind2 === ItemKind2.ARMORETC
                    ) {
                        const refineValue = equippedItem.Refine > 0 ? Math.pow(equippedItem.Refine, 1.5) : 0;
                        const itemMultiplier = 1; // TODO: implement GetItemMultiplier() on the Item class

                        defenseMin += Math.floor((equippedItem.Properties.abilityMin || 0) * itemMultiplier) + refineValue;
                        defenseMax += Math.floor((equippedItem.Properties.abilityMax || 0) * itemMultiplier) + refineValue;
                    }
                }
            }

            defenseMin += this._mover.attributes.get(DefineAttributes.DST_ABILITY_MIN);
            defenseMax += this._mover.attributes.get(DefineAttributes.DST_ABILITY_MAX);
            this.minimum = defenseMin;
            this.maximum = defenseMax;
        } else if (this._mover.properties && 'naturalArmor' in this._mover.properties) {
            this.minimum = this._mover.properties.naturalArmor || 0;
            this.maximum = this._mover.properties.naturalArmor || 0;
        }
    }
}
