import { Item } from "../../../game/mechanics/item";
import { ItemPartType } from "../../../types/itemPartyType";
import { SkillReferTargetType } from "../../../types/skillPreferTargetType";
import { Mover } from "../../../entities/mover";
import { Player } from "../../../entities/player";
import { FFRandom } from "../../../helpers/FFRandom";
import { RangeHelper } from "../../../abstract/range";
import { Skill } from "../../mechanics/skill";
import { AttackArbiterBase } from "./attackArbiterBase";


export class SkillAttackArbiterBase extends AttackArbiterBase {
    protected readonly skill: Skill;

    constructor(attacker: Mover, defender: Mover, skill: Skill) {
        super(attacker, defender);
        this.skill = skill;
    }

    protected getAttackerSkillPower(): number {
        let referStatistic1: number = this.attacker.attributes.get(parseInt(this.skill.properties.dwReferStat1));
        let referStatistic2: number = this.attacker.attributes.get(parseInt(this.skill.properties.dwReferStat2));

        if (parseInt(this.skill.properties.dwReferTarget1) === SkillReferTargetType.Attack && referStatistic1 !== 0) {
            referStatistic1 = (parseInt(this.skill.properties.dwReferValue1.toString()) / 10 * referStatistic1 + this.skill.level * (referStatistic1 / 50));
        }

        if (parseInt(this.skill.properties.dwReferTarget2) === SkillReferTargetType.Attack && referStatistic2 !== 0) {
            referStatistic2 = (parseInt(this.skill.properties.dwReferValue2.toString()) / 10 * referStatistic2 + this.skill.level * (referStatistic2 / 50));
        }

        const referStatistic: number = referStatistic1 + referStatistic2;
        const attack: RangeHelper<number> = this.attacker instanceof Player && this.defender instanceof Player
            ? new RangeHelper<number>(this.skill.levelProperties?.dwAbilityMinPVP || 0, this.skill.levelProperties?.dwAbilityMaxPVP || 0)
            : new RangeHelper<number>(this.skill.levelProperties?.dwAbilityMin || 0, this.skill.levelProperties?.dwAtkAbilityMax || 0);

        let weaponItem: Item | null = null;

        if (this.attacker instanceof Player) {
            weaponItem = this.attacker.inventory.getEquippedItem(ItemPartType.RightWeapon);
        }

        const weaponAttackPower: RangeHelper<number> = this.getWeaponAttackPower(this.attacker, weaponItem!);
        const weaponExtraDamages: number = this.getWeaponExtraDamages(this.attacker, weaponItem!);

        const attackMin = attack.minimum + (weaponItem?.properties.dwAddSkillMin ?? 0);
        const attackMax = attack.maximum + (weaponItem?.properties.dwAddSkillMax ?? 0);

        let powerMin: number = (weaponAttackPower.minimum + attackMin * 5 + referStatistic - 20) * (16 + this.skill.level) / 13;
        let powerMax: number = (weaponAttackPower.maximum + attackMax * 5 + referStatistic - 20) * (16 + this.skill.level) / 13;

        // TODO: check CHR_DMG
        powerMin += weaponExtraDamages;
        powerMax += weaponExtraDamages;

        const attackMinMax: number = Math.max(powerMax - powerMin + 1, 1);

        return Math.floor(powerMin + FFRandom.floatRandom() * attackMinMax);
    }
}
