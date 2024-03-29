import { AttackType } from "../common/attackType";
import { ObjectMessageType } from "../common/objectMessageType";
import { SkillType } from "../common/skillType";

export function toObjectMessageType(attackType: AttackType): ObjectMessageType {
  switch (attackType) {
    case AttackType.MeleeAttack1:
      return ObjectMessageType.OBJMSG_ATK1;
    case AttackType.MeleeAttack2:
      return ObjectMessageType.OBJMSG_ATK2;
    case AttackType.MeleeAttack3:
      return ObjectMessageType.OBJMSG_ATK3;
    case AttackType.MeleeAttack4:
      return ObjectMessageType.OBJMSG_ATK4;
    case AttackType.RangeBowAttack:
      return ObjectMessageType.OBJMSG_ATK_RANGE1;
    case AttackType.RangeWandAttack:
      return ObjectMessageType.OBJMSG_ATK_MAGIC1;
    case AttackType.SkillMeleeAttack:
      return ObjectMessageType.OBJMSG_MELEESKILL;
    case AttackType.SkillMagicAttack:
      return ObjectMessageType.OBJMSG_MAGICSKILL;
    default:
      throw new Error(
        `The attack type ${attackType} does not have a matching ObjectMessageType.`
      );
  }
}

export function isMeleeAttack(attackType: AttackType): boolean {
  switch (attackType) {
    case AttackType.MeleeAttack1:
    case AttackType.MeleeAttack2:
    case AttackType.MeleeAttack3:
    case AttackType.MeleeAttack4:
      return true;
    default:
      return false;
  }
}

export function isRangeAttack(attackType: AttackType): boolean {
  switch (attackType) {
    case AttackType.RangeBowAttack:
    case AttackType.RangeWandAttack:
      return true;
    default:
      return false;
  }
}

export function isSkillAttack(attackType: AttackType): boolean {
  switch (attackType) {
    case AttackType.SkillMeleeAttack:
    case AttackType.SkillMagicAttack:
      return true;
    default:
      return false;
  }
}

export function causesArrowProjectile(attackType: AttackType): boolean {
  return attackType === AttackType.RangeBowAttack;
}

export function causesMagicProjectile(attackType: AttackType): boolean {
  return attackType === AttackType.RangeWandAttack;
}

export function causesMeleeSkill(attackType: AttackType): boolean {
  return attackType === AttackType.SkillMeleeAttack;
}

export function causesMagicSkill(attackType: AttackType): boolean {
  return attackType === AttackType.SkillMagicAttack;
}

export function toAttackType(skillType: SkillType): AttackType {
  switch (skillType) {
    case SkillType.Magic:
      return AttackType.SkillMagicAttack;
    case SkillType.Skill:
      return AttackType.SkillMeleeAttack;
    default:
      return AttackType.MeleeAttack1
  }
}
