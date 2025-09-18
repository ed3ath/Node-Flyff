import { DefineAttributes } from "../definitions/defineAttributes";
import { ItemKind2 } from "../../types/itemKind";
import { Item } from "./item";
import { Mover } from "../../entities/mover";
import { Player } from "../../entities/player";
import { Monster } from "../../entities/monster";
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
        if (this._mover instanceof Player) {
            let defenseMin = 0;
            let defenseMax = 0;
            const equippedItems: Item[] = this._mover.getEquippedItems();

            if (equippedItems.length > 0) {
                for (const equippedItem of equippedItems) {
                    if (!equippedItem || (equippedItem && equippedItem.id === -1)) {
                        continue;
                    }

                    if (
                        equippedItem.properties.itemKind2 === ItemKind2.ARMOR ||
                        equippedItem.properties.itemKind2 === ItemKind2.ARMORETC
                    ) {
                        const refineValue = equippedItem.refine > 0 ? Math.pow(equippedItem.refine, 1.5) : 0;
                        const itemMultiplier = 1; // TODO: implement GetItemMultiplier() on the Item class

                        defenseMin += Math.floor(equippedItem.properties.abilityMin * itemMultiplier) + refineValue;
                        defenseMax += Math.floor(equippedItem.properties.abilityMax * itemMultiplier) + refineValue;
                    }
                }
            }

            defenseMin += this._mover.attributes.get(DefineAttributes.DST_ABILITY_MIN);
            defenseMax += this._mover.attributes.get(DefineAttributes.DST_ABILITY_MAX);
            this.minimum = defenseMin;
            this.maximum = defenseMax;
        } else if (this._mover instanceof Monster) {
            this.minimum = this._mover.properties.naturalArmor;
            this.maximum = this._mover.properties.naturalArmor;
        }
    }
}
