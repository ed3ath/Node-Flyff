import { AttackFlags } from "../../../types/attackFlag";
import { DefineAttributes } from "../../../game/definitions/defineAttributes";
import { Item } from "../../../game/mechanics/item";
import { ItemPartType } from "../../../types/itemPartyType";
import { WeaponType } from "../../../types/weaponType";
import { Mover } from "../../../entities/mover";
import { Player } from "../../../entities/player";
import { FFRandom } from "../../../helpers/FFRandom";
import { RangeHelper } from "../../../abstract/range";
import { AttackResult } from "../attackResult";
import { AttackArbiterBase } from "./attackArbiterBase";


export class MagicAttackArbiter extends AttackArbiterBase {
    private readonly  _wandAttackMultiplier: Map<number, number> = new Map([
        [0, 0.6],
        [1, 0.8],
        [2, 1.05],
        [3, 1.1],
        [4, 1.3]
    ]);

    private readonly _magicPower: number;

    constructor(attacker: Mover, defender: Mover, magicPower: number) {
        super(attacker, defender);
        this._magicPower = magicPower;
    }

    public override calculateDamages(): AttackResult {
        let damages: number = 0;

        if (this.attacker instanceof Player) {
            const player: Player = this.attacker as Player;
            // const wandWeapon: Item = player.inventory.getEquipedItem(ItemPartType.RightWeapon);
            // const weaponAttackResult: RangeHelper<number> = this.getWeaponAttackPower(player, wandWeapon);
            // const weaponAttackDamages: number = this.getWeaponAttackDamages(player, WeaponType.MAGIC_WAND);
            // const attack: RangeHelper<number> = new RangeHelper<number>(
            //     weaponAttackResult.minimum + weaponAttackDamages,
            //     weaponAttackResult.maximum + weaponAttackDamages
            // );

            // damages = FFRandom.random(attack.minimum, weaponAttackResult.maximum);
            // damages += Math.max(0, this.attacker.attributes.get(DefineAttributes.DST_CHR_DMG));
            // damages *= this._wandAttackMultiplier.get(this._magicPower) ?? 1.0;
        }

        return AttackResult.success(damages, AttackFlags.AF_MAGIC);
    }
}
