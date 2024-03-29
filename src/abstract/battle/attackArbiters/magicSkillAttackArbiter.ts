import { AttackFlags } from "../../../common/attackFlag";
import { DefineAttributes } from "../../../common/defineAttributes";
import { SpellType } from "../../../common/spellType";
import { Mover } from "../../../entities/mover";
import { Skill } from "../../skill";
import { AttackResult } from "../attackResult";
import { SkillAttackArbiterBase } from "./skillAttackArbiterBase";

export class MagicSkillAttackArbiter extends SkillAttackArbiterBase {
    constructor(attacker: Mover, defender: Mover, skill: Skill) {
        super(attacker, defender, skill);
    }

    public override calculateDamages(): AttackResult {
        let damages: number = this.getAttackerSkillPower();
        let skillMastryAttribute: DefineAttributes | undefined;

        switch (this.skill.properties.spellType) {
            case SpellType.Fire:
                skillMastryAttribute = DefineAttributes.DST_MASTRY_FIRE;
                break;
            case SpellType.Water:
                skillMastryAttribute = DefineAttributes.DST_MASTRY_WATER;
                break;
            case SpellType.Electricity:
                skillMastryAttribute = DefineAttributes.DST_MASTRY_ELECTRICITY;
                break;
            case SpellType.Wind:
                skillMastryAttribute = DefineAttributes.DST_MASTRY_WIND;
                break;
            case SpellType.Earth:
                skillMastryAttribute = DefineAttributes.DST_MASTRY_EARTH;
                break;
            default:
                break;
        }

        if (skillMastryAttribute !== undefined) {
            const ratio: number = Math.max(0, this.attacker.attributes.get(skillMastryAttribute) / 100);
            damages += damages * ratio;
        }

        damages *= this.getAttackMultiplier();
        damages += this.attacker.attributes.get(DefineAttributes.DST_ATKPOWER);

        return AttackResult.success(damages, AttackFlags.AF_MAGIC_SKILL);
    }
}
