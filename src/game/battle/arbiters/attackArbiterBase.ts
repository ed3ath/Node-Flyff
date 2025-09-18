import { DefineAttributes } from "../../../game/definitions/defineAttributes";
import { Item } from "../../../game/mechanics/item";
import { WeaponKindType, getWeaponKindType } from "../../../types/weaponKindType";
import { WeaponType } from "../../../types/weaponType";
import { Mover } from "../../../entities/mover";
import { Player } from "../../../entities/player";
import { RangeHelper } from "../../../abstract/range";
import { AttackResult } from "../attackResult";

export class AttackArbiterBase {
    constructor(public attacker: Mover, public defender: Mover) {}

    calculateDamages(): AttackResult {
        return AttackResult.miss();
    }

    getEscapeRating(entity: Mover): number {
        // if (entity instanceof Player) {
        //     const playerDexterity = entity.statistics.dexterity + entity.attributes.get(DefineAttributes.DST_DEX);
        //     return Math.round(playerDexterity * 0.5); // TODO: add DST_PARRY
        // } else if (entity instanceof Monster) {
        //     return entity.properties.escapeRating;
        // }
        return 0;
    }

    getWeaponAttackDamages(player: Player, weaponType: WeaponType): number {
        let attribute = 0;
        let levelFactor = 0;
        let jobFactor = 1;

        switch (weaponType) {
            case WeaponType.MELEE_SWD:
                attribute = player.statistics.strength + player.attributes.get(DefineAttributes.DST_STR) - 12;
                levelFactor = player.level * 1.1;
                jobFactor = player.job.meleeSword;
                break;
            case WeaponType.MELEE_AXE:
                attribute = player.statistics.strength + player.attributes.get(DefineAttributes.DST_STR) - 12;
                levelFactor = player.level * 1.2;
                jobFactor = player.job.meleeAxe;
                break;
            case WeaponType.MELEE_STAFF:
                attribute = player.statistics.strength + player.attributes.get(DefineAttributes.DST_STR) - 10;
                levelFactor = player.level * 1.1;
                jobFactor = player.job.meleeStaff;
                break;
            case WeaponType.MELEE_STICK:
                attribute = player.statistics.strength + player.attributes.get(DefineAttributes.DST_STR) - 10;
                levelFactor = player.level * 1.3;
                jobFactor = player.job.meleeStick;
                break;
            case WeaponType.MELEE_KNUCKLE:
                attribute = player.statistics.strength + player.attributes.get(DefineAttributes.DST_STR) - 10;
                levelFactor = player.level * 1.2;
                jobFactor = player.job.meleeKnuckle;
                break;
            case WeaponType.MAGIC_WAND:
                attribute = player.statistics.intelligence + player.attributes.get(DefineAttributes.DST_STR) - 10;
                levelFactor = player.level * 1.2;
                jobFactor = player.job.magicWand;
                break;
            case WeaponType.MELEE_YOYO:
                attribute = player.statistics.strength + player.attributes.get(DefineAttributes.DST_STR) - 10;
                levelFactor = player.level * 1.1;
                jobFactor = player.job.meleeYoyo;
                break;
            case WeaponType.RANGE_BOW:
                attribute = (player.statistics.dexterity + player.attributes.get(DefineAttributes.DST_DEX) - 14) * 4;
                levelFactor = player.level * 1.3;
                jobFactor = (player.statistics.strength + player.attributes.get(DefineAttributes.DST_STR)) * 0.2 * 0.7;
                break;
        }

        return Math.round(attribute * jobFactor + levelFactor);
    }

    getWeaponAttackPower(entity: Mover, weapon: Item): RangeHelper<number> {
        const multiplier = this.getWeaponItemMultiplier(weapon);
        const power = weapon?.refine > 0 ? Math.pow(weapon?.refine || 0, 1.5) : 0;

        return new RangeHelper<number>(
            Math.round((entity.attributes.get(DefineAttributes.DST_ABILITY_MIN) + weapon?.properties.dwAbilityMin) * multiplier) + power,
            Math.round((entity.attributes.get(DefineAttributes.DST_ABILITY_MAX) + weapon?.properties.dwAbilityMax) * multiplier) + power
        );
    }

    getWeaponItemMultiplier(weapon: Item): number {
        if (!weapon) {
            return 1;
        }

        // TODO: check if item has expired.
        let multiplier = 1.0;
        const refine = getWeaponKindType(weapon.properties.dwReferStat1) === WeaponKindType.Ultimate ? Item.WeaponArmorRefineMax : weapon.refine;

        if (refine > 0) {
            // TODO: get item exp up
            const itemExpUp = 0 + 100;
            multiplier *= itemExpUp / 100;
        }

        return multiplier;
    }

    getWeaponExtraDamages(entity: Mover, weapon: Item): number {
        if (!weapon) {
            return 0;
        }

        let extraDamages = 0;

        switch (weapon.properties.dwWeaponType) {
            case WeaponType.MELEE_SWD:
                extraDamages = entity.attributes.get(DefineAttributes.DST_SWD_DMG) + entity.attributes.get(DefineAttributes.DST_TWOHANDMASTER_DMG);
                break;
            case WeaponType.MELEE_AXE:
                extraDamages = entity.attributes.get(DefineAttributes.DST_AXE_DMG) + entity.attributes.get(DefineAttributes.DST_TWOHANDMASTER_DMG);
                break;
            case WeaponType.KNUCKLE:
                extraDamages = entity.attributes.get(DefineAttributes.DST_KNUCKLE_DMG) + entity.attributes.get(DefineAttributes.DST_KNUCKLEMASTER_DMG);
                break;
            case WeaponType.MELEE_YOYO:
                extraDamages = entity.attributes.get(DefineAttributes.DST_YOY_DMG) + entity.attributes.get(DefineAttributes.DST_YOYOMASTER_DMG);
                break;
            case WeaponType.RANGE_BOW:
                extraDamages = entity.attributes.get(DefineAttributes.DST_BOW_DMG) + entity.attributes.get(DefineAttributes.DST_BOWMASTER_DMG);
                break;
        }

        if (entity instanceof Player) {
            // TODO: check if player has dual weapons
            // TODO: if yes add "ONEHANDMASTER_DMG" to extra damages
        }

        return extraDamages;
    }

    getAttackMultiplier(): number {
        let multiplier = 1.0 + this.attacker.attributes.get(DefineAttributes.DST_ATKPOWER_RATE) / 100;

        if (this.attacker instanceof Player) {
            // TODO: check SM mode SM_ATTACK_UP or SM_ATTACK_UP1 => multiplier *= 1.2;

            const attribute = this.defender instanceof Player ? DefineAttributes.DST_PVP_DMG : DefineAttributes.DST_MONSTER_DMG;
            const damages = this.attacker.attributes.get(attribute);

            if (damages > 0) {
                multiplier += multiplier * damages / 100;
            }
        }

        return multiplier;
    }
}
