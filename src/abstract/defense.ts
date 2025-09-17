import { DefineAttributes } from "../common/defineAttributes";
import { ItemKind2 } from "../common/itemKind";
import Item from "../database/item";
import { Mover } from "../entities/mover";
import { Player } from "../entities/player";
import { FFRandom } from "../helpers/FFRandom";

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
        // if (this._mover instanceof Player) {
        //     let defenseMin = 0;
        //     let defenseMax = 0;
        //     const equipedItems: Item[] = this._mover.getEquipedItems();

        //     if (equipedItems.length > 0) {
        //         for (const equipedItem of equipedItems) {
        //             if (!equipedItem || (equipedItem && equipedItem.id === -1)) {
        //                 continue;
        //             }

        //             if (
        //                 equipedItem.properties.itemKind2 === ItemKind2.ARMOR ||
        //                 equipedItem.properties.itemKind2 === ItemKind2.ARMORETC
        //             ) {
        //                 const refineValue = equipedItem.refine > 0 ? Math.pow(equipedItem.refine, 1.5) : 0;
        //                 const itemMultiplier = 1; // Implement GetItemMultiplier() on the Item class of the Rhisis Domain.

        //                 defenseMin += (equipedItem.properties.abilityMin * itemMultiplier) + refineValue;
        //                 defenseMax += (equipedItem.properties.abilityMax * itemMultiplier) + refineValue;
        //             }
        //         }
        //     }

        //     defenseMin += this._mover.attributes.get(DefineAttributes.DST_ABILITY_MIN);
        //     defenseMax += this._mover.attributes.get(DefineAttributes.DST_ABILITY_MAX);
        //     this.minimum = defenseMin;
        //     this.maximum = defenseMax;
        // } else if (this._mover instanceof Monster) {
        //     this.minimum = this._mover.properties.naturalArmor;
        //     this.minimum = this._mover.properties.naturalArmor;
        // }
    }
}
