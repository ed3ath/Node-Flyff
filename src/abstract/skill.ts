import { AttackFlags } from "../common/attackFlag";
import { BuffResultType } from "../common/buffResultType";
import { DefineAttributes } from "../common/defineAttributes";
import { DefineText } from "../common/defineText";
import { ItemKind3 } from "../common/itemKind";
import { ItemPartType } from "../common/itemPartyType";
import { ModeType } from "../common/modeType";
import { SkillExecuteTargetType } from "../common/skillExecuteTargetType";
import { SkillReferTargetType } from "../common/skillPreferTargetType";
import { SkillType } from "../common/skillType";
import { SkillUseType } from "../common/skillUsedType";
import { SpellRegionType } from "../common/spellRegionType";
import { Mover } from "../entities/mover";
import { Player } from "../entities/player";
import { getElapsedTime } from "../helpers/time";
import { FlyffPacket } from "../libraries/flyffPacket";
import { MagicSkillAttackArbiter } from "./battle/attackArbiters/magicSkillAttackArbiter";

export class Skill {
    private _level: number;
    private _nextSkillUsageTime: number;

    readonly Properties: SkillProperties;

    constructor(skillProperties: SkillProperties, owner: Mover, level: number) {
        if (!skillProperties) {
            throw new Error('Cannot create a skill instance with undefined skill properties.');
        }
        this.Properties = skillProperties;
        this.Owner = owner;
        this.Level = level;
    }

    get Id(): number {
        return this.Properties.Id;
    }

    get Name(): string {
        return this.Properties.Name;
    }

    get Type(): SkillType {
        return this.Properties.Type;
    }

    readonly Owner: Mover;

    get Level(): number {
        return this._level;
    }

    set Level(value: number) {
        this._level = Math.max(0, Math.min(value, this.Properties.MaxLevel));
    }

    GetCastingTime(): number {
        if (this.Properties.Type === SkillType.Skill) {
            return 1000;
        } else {
            let castingTime = Math.floor((this.Properties.CastingTime / 1000) * (60 / 4));
            castingTime -= castingTime * (this.Owner.attributes.get(DefineAttributes.DST_SPELL_RATE) / 100);
            return Math.max(castingTime, 0);
        }
    }

    SetCoolTime(coolTime: number): void {
        if (coolTime > 0) {
            this._nextSkillUsageTime = getElapsedTime(global.TimeStarted) + coolTime;
        }
    }

    IsCoolTimeElapsed(): boolean {
        return this._nextSkillUsageTime < getElapsedTime(global.TimeStarted);
    }

    Serialize(packet: FlyffPacket): void {
        packet.writeInt32(this.Id);
        packet.writeInt32(this.Level);
    }

    Equals(otherSkill: Skill): boolean {
        return this.Id === otherSkill?.Id && this.Owner.objectId === otherSkill?.Owner.objectId;
    }

    CanUse(target: Mover): boolean {
        if (this.Level <= 0 || this.Level > this.Properties.SkillLevels.length) {
            return false;
        }

        if (!this.IsCoolTimeElapsed()) {
            this.Owner.sendDefinedText(DefineText.TID_GAME_SKILLWAITTIME);
            return false;
        }

        if (this.LevelProperties.RequiredMP > 0 && this.Owner.health.mp < this.LevelProperties.RequiredMP) {
            this.Owner.sendDefinedText(DefineText.TID_GAME_REQMP);
            return false;
        }

        if (this.LevelProperties.RequiredFP > 0 && this.Owner.health.fp < this.LevelProperties.RequiredFP) {
            this.Owner.sendDefinedText(DefineText.TID_GAME_REQFP);
            return false;
        }

        if (this.Owner instanceof Player) {
            if (this.Properties.LinkKind) {
                const rightWeapon = this.Owner.Inventory.GetEquipedItem(ItemPartType.RightWeapon);
                const rightWeaponKind = rightWeapon.Properties.ItemKind3;
                let playerHasCorrectWeapon = false;
                switch (this.Properties.LinkKind) {
                    case ItemKind3.MAGICBOTH:
                        playerHasCorrectWeapon = rightWeaponKind === ItemKind3.WAND || rightWeaponKind === ItemKind3.STAFF;
                        break;
                    case ItemKind3.YOBO:
                        playerHasCorrectWeapon = rightWeaponKind === ItemKind3.YOYO || rightWeaponKind === ItemKind3.BOW;
                        break;
                    case ItemKind3.SHIELD:
                        playerHasCorrectWeapon = this.Owner.Inventory.GetEquipedItem(ItemPartType.LeftWeapon).Properties.ItemKind3 !== ItemKind3.SHIELD;
                        break;
                    default:
                        playerHasCorrectWeapon = this.Properties.LinkKind === rightWeaponKind;
                        break;
                }

                if (!playerHasCorrectWeapon) {
                    this.Owner.sendDefinedText(DefineText.TID_GAME_WRONGITEM);
                    return false;
                }
            }

            if (this.Properties.BulletLinkKind) {
                const bulletItem = this.Owner.Inventory.GetEquipedItem(ItemPartType.Bullet);

                if (bulletItem.Properties.ItemKind2 !== this.Properties.BulletLinkKind) {
                    const errorText = this.Properties.LinkKind === ItemKind3.BOW ?
                        DefineText.TID_TIP_NEEDSATTACKITEM :
                        DefineText.TID_TIP_NEEDSKILLITEM;

                    this.Owner.sendDefinedText(errorText);
                    return false;
                }
            }
        }

        if (this.Type === SkillType.Magic) {
            // TODO: check buffs for target
        }

        if (this.Properties.Handed) {
            // TODO: handle dual weapons and two handed weapons
        }

        return true;
    }

    Use(target: Mover, skillUseType: SkillUseType = SkillUseType.Normal): void {
        switch (this.Properties.ExecuteTarget) {
            case SkillExecuteTargetType.MeleeAttack:
                this.CastMeleeSkill(target, skillUseType);
                break;
            case SkillExecuteTargetType.MagicAttack:
                this.CastMagicSkill(target, skillUseType);
                break;
            case SkillExecuteTargetType.MagicAttackShot:
                this.CastMagicAttackShot(target, skillUseType);
                break;
            case SkillExecuteTargetType.AnotherWith:
                this.CastBuffSkill(target, skillUseType);
                break;
            default:
                throw new Error(`Unknown ${this.Properties.ExecuteTarget} for ${this.Name}`);
        }
    }

    private CastMeleeSkill(target: Mover, skillUseType: SkillUseType): void {
        const skillCastingTime = this.GetCastingTime();

        if (this.Properties.SpellRegionType === SpellRegionType.Around) {
            throw new Error('AoE skills');
        } else {
            this.CastSkill(target, this.GetCastingTime(), this.LevelProperties.ComboSkillTime, skillUseType, () => {
                this.Execute(target);
            });
        }
    }

    private CastMagicSkill(target: Mover, skillUseType: SkillUseType): void {
        const skillCastingTime = this.GetCastingTime();

        if (this.Properties.SpellRegionType === SpellRegionType.Around) {
            throw new Error('AoE skills');
        } else {
            this.CastSkill(target, skillCastingTime, this.LevelProperties.CastingTime, skillUseType, () => {
                this.Execute(target);
            });
        }
    }

    private CastMagicAttackShot(target: Mover, skillUseType: SkillUseType): void {
        const skillCastingTime = this.GetCastingTime();
        const projectile = new MagicSkillProjectile(this.Owner, target, this, () => {
            this.Execute(target, false);
        });
        this.Owner.Projectiles.Add(projectile);

        this.CastSkill(target, skillCastingTime, this.LevelProperties.CastingTime, skillUseType, () => {
            this.ReduceCasterPoints();
        });
    }

    private CastBuffSkill(target: Mover, skillUseType: SkillUseType): void {
        const skillCastingTime = this.GetCastingTime();

        if (!(target instanceof Player) && this.Owner instanceof Player) {
            this.Owner.CancelSkillUsage();
            return;
        }

        if (this.LevelProperties.DestParam1 === DefineAttributes.DST_HP) {
            if (this.LevelProperties.DestParam2 === DefineAttributes.DST_RECOVERY_EXP) {
                // TODO: resurrection
            } else {
                this.Owner.Delayer.DelayActionMilliseconds(skillCastingTime, () => {
                    this.ApplyHealSkill(target);
                });
            }
        }

        if (this.LevelProperties.DestParam2 === DefineAttributes.DST_HP) {
            this.Owner.Delayer.DelayActionMilliseconds(skillCastingTime, () => {
                this.ApplyHealSkill(target);
            });
        }

        const timeBonusValues = [
            this.Properties.ReferTarget1 === SkillReferTargetType.Time ? this.GetReferBonus(this.Properties.ReferStat1, this.Properties.ReferValue1, this.Level) : 0,
            this.Properties.ReferTarget2 === SkillReferTargetType.Time ? this.GetReferBonus(this.Properties.ReferStat2, this.Properties.ReferValue2, this.Level) : 0
        ];

        const buffTime = this.LevelProperties.SkillTime + timeBonusValues.reduce((sum, value) => sum + value, 0);

        if (buffTime > 0) {
            const attributes: Map<DefineAttributes, number> = new Map();

            if (this.LevelProperties.DestParam1 > 0) {
                attributes.set(this.LevelProperties.DestParam1, this.LevelProperties.DestParam1Value);
            }
            if (this.LevelProperties.DestParam2 > 0) {
                attributes.set(this.LevelProperties.DestParam2, this.LevelProperties.DestParam2Value);
            }

            this.Owner.Delayer.DelayActionMilliseconds(this.GetCastingTime(), () => {
                const buff = new BuffSkill(target, attributes, this.Properties, this.Level);
                buff.RemainingTime = buffTime;

                if (target.Buffs.Add(buff) !== BuffResultType.None) {
                    const snapshot = new SetSkillStateSnapshot(target, this.Id, this.Level, buffTime);
                    target.SendToVisible(snapshot, true);
                }
            });
        }

        this.SetCoolTime(this.LevelProperties.CooldownTime);
        this.SendSkillMotion(target, skillCastingTime, skillUseType);
    }

    private CastSkill(target: Mover, skillCastingTime: number, skillDelayTime: number, skillUseType: SkillUseType, skillActionCallback: () => void): void {
        if (!skillActionCallback) {
            throw new Error('skillActionCallback cannot be null');
        }

        this.SendSkillMotion(target, skillCastingTime, skillUseType);
        this.Owner.Delayer.DelayAction(skillDelayTime, () => {
            skillActionCallback();
        });
    }

    private Execute(target: Mover, reduceCasterPoints: boolean = true): void {
        if (!this.Owner.CanAttack(target)) {
            return;
        }

        const skillAttackType = this.Properties.Type.ToAttackType();

        if (!skillAttackType.IsSkillAttack()) {
            return;
        }

        let attackResult = null;

        if (this.Owner instanceof Player && this.Owner.Mode.HasFlag(ModeType.ONEKILL_MODE)) {
            attackResult = {
                Damages: target.Health.Hp,
                Flags: AttackFlags.AF_GENERIC
            };
        } else {
            if (skillAttackType.CausesMeleeSkill()) {
                attackResult = new MeleeSkillAttackArbiter(this.Owner, target, this).CalculateDamages();

                if (!(attackResult.Flags & AttackFlags.AF_MISS)) {
                    attackResult = new MeleeSkillAttackReducer(this.Owner, target, this).ReduceDamages(attackResult);
                }
            } else if (skillAttackType.CausesMagicSkill()) {
                attackResult = new MagicSkillAttackArbiter(this.Owner, target, this).CalculateDamages();

                if (!(attackResult.Flags & AttackFlags.AF_MISS)) {
                    attackResult = new MagicSkillAttackReducer(this.Owner, target, this).ReduceDamages(attackResult);
                }
            }
        }

        if (attackResult) {
            this.Owner.InflictDamages(target, attackResult, skillAttackType);
            this.SetCoolTime(this.LevelProperties.CooldownTime);

            if (reduceCasterPoints) {
                this.ReduceCasterPoints();
            }
        }
    }

    private ReduceCasterPoints(): void {
        const updatePointsSnapshot = new FFSnapshot();

        if (this.LevelProperties.RequiredFP > 0) {
            this.Owner.Health.Fp -= this.LevelProperties.RequiredFP;

            updatePointsSnapshot.Merge(new UpdateParamPointSnapshot(this.Owner, DefineAttributes.DST_FP, this.Owner.Health.Fp));
        }

        if (this.LevelProperties.RequiredMP > 0) {
            this.Owner.Health.Mp -= this.LevelProperties.RequiredMP;
            updatePointsSnapshot.Merge(new UpdateParamPointSnapshot(this.Owner, DefineAttributes.DST_MP, this.Owner.Health.Mp));
        }

        if (updatePointsSnapshot.Count > 0) {
            this.Owner.SendToVisible(updatePointsSnapshot, true);
        }
    }

    private SendSkillMotion(target: Mover, skillCastingTime: number, skillUseType: SkillUseType): void {
        const snapshot = new UseSkillSnapshot(this.Owner, target, this, skillCastingTime, skillUseType);

        this.Owner.SendToVisible(snapshot, true);
    }

    private GetReferBonus(attribute: DefineAttributes, value: number, skillLevel: number): number {
        let attributeValue = 1;
        switch (attribute) {
            case DefineAttributes.DST_STA:
                attributeValue = this.Owner.Statistics.Stamina + this.Owner.Attributes.get(DefineAttributes.DST_STA);
                break;
            case DefineAttributes.DST_DEX:
                attributeValue = this.Owner.Statistics.Dexterity + this.Owner.Attributes.get(DefineAttributes.DST_DEX);
                break;
            case DefineAttributes.DST_INT:
                attributeValue = this.Owner.Statistics.Intelligence + this.Owner.Attributes.get(DefineAttributes.DST_INT);
                break;
        }

        return Math.floor((value / 10) * attributeValue + skillLevel * (attributeValue / 50));
    }

    private ApplyHealSkill(target: Mover): void {
        if (this.Properties.ReferTarget1 === SkillReferTargetType.Heal || this.Properties.ReferTarget2 === SkillReferTargetType.Heal) {
            const hpValues = [
                this.Properties.ReferTarget1 === SkillReferTargetType.Heal ? this.GetReferBonus(this.Properties.ReferStat1, this.Properties.ReferValue1, this.Level) : 0,
                this.Properties.ReferTarget2 === SkillReferTargetType.Heal ? this.GetReferBonus(this.Properties.ReferStat2, this.Properties.ReferValue2, this.Level) : 0
            ];

            const recoveredHp = this.LevelProperties.DestParam1Value + hpValues.reduce((sum, value) => sum + value, 0);

            if (recoveredHp > 0) {
                target.Health.Hp += recoveredHp;
            }
        }
    }
}
