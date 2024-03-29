import { Item } from "../../../common/item";
import { ItemPartType } from "../../../common/itemPartyType";
import { SkillReferTargetType } from "../../../common/skillPreferTargetType";
import { Mover } from "../../../entities/mover";
import { Player } from "../../../entities/player";
import { FFRandom } from "../../../helpers/FFRandom";
import { RangeHelper } from "../../range";
import { Skill } from "../../skill";
import { AttackArbiterBase } from "./attackArbiterBase";


export class SkillAttackArbiterBase extends AttackArbiterBase {
    protected readonly skill: Skill;

    constructor(attacker: Mover, defender: Mover, skill: Skill) {
        super(attacker, defender);
        this.skill = skill;
    }

    protected getAttackerSkillPower(): number {
        let referStatistic1: number = this.attacker.attributes.get(this.skill.Properties.referStat1);
        let referStatistic2: number = this.attacker.attributes.get(this.skill.Properties.referStat2);

        if (this.skill.Properties.referTarget1 === SkillReferTargetType.Attack && referStatistic1 !== 0) {
            referStatistic1 = (this.skill.Properties.referValue1 / 10 * referStatistic1 + this.skill.Level * (referStatistic1 / 50));
        }

        if (this.skill.Properties.referTarget2 === SkillReferTargetType.Attack && referStatistic2 !== 0) {
            referStatistic2 = (this.skill.Properties.referValue2 / 10 * referStatistic2 + this.skill.Level * (referStatistic2 / 50));
        }

        const referStatistic: number = referStatistic1 + referStatistic2;
        const attack: RangeHelper<number> = this.attacker instanceof Player && this.defender instanceof Player
            ? new RangeHelper<number>(this.skill.levelProperties.abilityMinPVP, this.skill.levelProperties.abilityMaxPVP)
            : new RangeHelper<number>(this.skill.levelProperties.abilityMin, this.skill.levelProperties.abilityMax);

        let weaponItem: Item | null = null;

        if (this.attacker instanceof Player) {
            weaponItem = this.attacker.inventory.getEquipedItem(ItemPartType.RightWeapon);
        }

        const weaponAttackPower: RangeHelper<number> = this.getWeaponAttackPower(this.attacker, weaponItem);
        const weaponExtraDamages: number = this.getWeaponExtraDamages(this.attacker, weaponItem);

        attack.minimum += weaponItem?.Properties.attackSkillMin ?? 0;
        attack.maximum += weaponItem?.Properties.attackSkillMax ?? 0;

        let powerMin: number = (weaponAttackPower.minimum + attack.minimum * 5 + referStatistic - 20) * (16 + this.skill.level) / 13;
        let powerMax: number = (weaponAttackPower.maximum + attack.maximum * 5 + referStatistic - 20) * (16 + this.skill.level) / 13;

        // TODO: check CHR_DMG
        powerMin += weaponExtraDamages;
        powerMax += weaponExtraDamages;

        const attackMinMax: number = Math.max(powerMax - powerMin + 1, 1);

        return Math.floor(powerMin + FFRandom.floatRandom(1, attackMinMax));
    }
}
