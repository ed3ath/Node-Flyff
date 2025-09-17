import { AttackFlags } from "../common/attackFlag";
import { AttackType } from "../common/attackType";
import { DefineAttributes } from "../common/defineAttributes";
import { ObjectState } from "../common/objectState";
import { Mover } from "../entities/mover";
import { Player } from "../entities/player";
import { FlyffSnapshot } from "../libraries/snapshot";
import { HealthFormulas } from "./healthFomula";

export class Health {
    private _mover: Mover;
    private _hp: number;
    private _mp: number;
    private _fp: number;
    private _nextHealTime: number;

    public constructor(mover: Mover) {
        this._mover = mover;
        this._nextHealTime = Math.trunc(new Date().getTime() / 1000);
        // this._hp = mover.properties.addHp;
        // this._mp = mover.properties.addMp;
        this._fp = 0;
    }

    public get hp(): number {
        return this._hp;
    }

    public set hp(value: number) {
        if (this._hp === value) {
            return;
        }

        this._hp = Math.min(Math.max(value, 0), this.maxHp);

        // const healthSnapshot = new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_HP, this._hp);
        // this._mover.sendToVisible(healthSnapshot, true);
    }

    public get mp(): number {
        return this._mp;
    }

    public set mp(value: number) {
        if (this._mp === value) {
            return;
        }

        this._mp = Math.min(Math.max(value, 0), this.maxMp);

        // const healthSnapshot = new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_MP, this._mp);
        // this._mover.sendToVisible(healthSnapshot, true);
    }

    public get fp(): number {
        return this._fp;
    }

    public set fp(value: number) {
        if (this._fp === value) {
            return;
        }

        this._fp = Math.min(Math.max(value, 0), this.maxFp)

        // const healthSnapshot = new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_FP, this._fp);
        // this._mover.sendToVisible(healthSnapshot, true);
    }

    public get maxHp(): number {
        return HealthFormulas.getMaxHp(this._mover);
    }

    public get maxMp(): number {
        return HealthFormulas.getMaxMp(this._mover);
    }

    public get maxFp(): number {
        return HealthFormulas.getMaxFp(this._mover);
    }

    public regenerateAll(): void {
        this.hp = this.maxHp;
        this.mp = this.maxMp;
        this.fp = this.maxFp;

        // this.sendHealth();
    }

    public die(killer: Mover, attackType: AttackType, sendHitPoints: boolean = false): void {
        this.hp = 0;

        if (this._mover instanceof Player && killer instanceof Player) {
            // TODO: PVP & PK
        } else {
            // const moverDeathSnapshot = new FlyffSnapshot();
            // moverDeathSnapshot.merge(new MoverDeathSnapshot(this._mover, killer, attackType));

            // if (sendHitPoints) {
            //     moverDeathSnapshot.merge(new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_HP, this.hp));
            // }

            // this._mover.sendToVisible(moverDeathSnapshot, true);
        }

        // this._mover.onKilled(killer);
        // killer.onTargetKilled(this._mover);
    }

    sufferDamages(attacker: Mover, damages: number, attackType: AttackType, attackFlags: AttackFlags = AttackFlags.AF_GENERIC): void {
        // const damagesToInflict = Math.min(this.hp, damages);
        // const damageSnapshots = new FFSnapshot();

        // damageSnapshots.merge(new AddDamageSnapshot(this._mover, attacker, attackFlags, damagesToInflict));

        // if (damagesToInflict > 0) {
        //     this.hp -= damagesToInflict;
        //     damageSnapshots.merge(new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_HP, this.hp));
        // }

        // this._mover.sendToVisible(damageSnapshots, true);

        // if (this.hp <= 0) {
        //     this.die(attacker, attackType, true);
        // }
    }

    idleHeal(): void {
        // if (this.hp <= 0 || this._nextHealTime > Date.now()) {
        //     return;
        // }

        // const NextIdleHealSit = 2;
        // const NextIdleHealStand = 3;
        // this._nextHealTime = Date.now() + (this._mover.objectState === ObjectState.OBJSTA_SIT ? NextIdleHealSit : NextIdleHealStand);

        // this.hp += HealthFormulas.getHpRecovery(this._mover);
        // this.mp += HealthFormulas.getMpRecovery(this._mover);
        // this.fp += HealthFormulas.getFpRecovery(this._mover);

        // this.sendHealth();
    }

    applyDeathRecovery(sendToPlayer = true): void {
        // if (this.hp > 0 || !(this._mover instanceof Player)) {
        //     return;
        // }

        // const recoveryRate = GameResources.current.penalties.getRevivalPenalty(this._mover.level) / 100;

        // this.hp = Math.round(this.maxHp * recoveryRate);
        // this.mp = Math.round(this.maxMp * recoveryRate);
        // this.fp = Math.round(this.maxFp * recoveryRate);

        // if (sendToPlayer) {
        //     this.sendHealth();
        // }
    }

    getCurrent(attribute: DefineAttributes): number {
        switch (attribute) {
            case DefineAttributes.DST_HP:
                return this.hp;
            case DefineAttributes.DST_MP:
                return this.mp;
            case DefineAttributes.DST_FP:
                return this.fp;
            default:
                return -1;
        }
    }

    setCurrent(attribute: DefineAttributes, value: number, send = true): void {
        switch (attribute) {
            case DefineAttributes.DST_HP:
                this.hp = value;
                break;
            case DefineAttributes.DST_MP:
                this.mp = value;
                break;
            case DefineAttributes.DST_FP:
                this.fp = value;
                break;
        }

        // if (send) {
        //     const healthSnapshot = new UpdateParamPointSnapshot(this._mover, attribute, this.getCurrent(attribute));
        //     this._mover.sendToVisible(healthSnapshot, true);
        // }
    }

    getMaximum(attribute: DefineAttributes): number {
        switch (attribute) {
            case DefineAttributes.DST_HP:
                return this.maxHp;
            case DefineAttributes.DST_MP:
                return this.maxMp;
            case DefineAttributes.DST_FP:
                return this.maxFp;
            default:
                return -1;
        }
    }

    private sendHealth(): void {
        // const healthSnapshot = new FFSnapshot();
        // healthSnapshot.merge(new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_HP, this.hp));
        // healthSnapshot.merge(new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_MP, this.mp));
        // healthSnapshot.merge(new UpdateParamPointSnapshot(this._mover, DefineAttributes.DST_FP, this.fp));

        // this._mover.sendToVisible(healthSnapshot, true);
    }
}
