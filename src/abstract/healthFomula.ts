import { DefineAttributes } from "../game/definitions/defineAttributes";
import type { Mover } from "../entities/mover";

export class HealthFormulas {
    static getOriginalPoints(mover: Mover, attribute: DefineAttributes): number {
        switch (attribute) {
            case DefineAttributes.DST_STR:
                return mover.statistics?.strength ?? 0;
            case DefineAttributes.DST_STA:
                return mover.statistics?.stamina ?? 0;
            case DefineAttributes.DST_DEX:
                return mover.statistics?.dexterity ?? 0;
            case DefineAttributes.DST_INT:
                return mover.statistics?.intelligence ?? 0;
            default:
                return 0;
        }
    }

    static getMaxParamPoints(originValue: number, additional: number, maxFactor: number): number {
        let maxValue = originValue + additional;
        const factor = 1 + maxFactor / 100;

        maxValue = Math.max(Math.round(maxValue * factor), 1);

        return maxValue;
    }

    static getStatisticPoints(mover: Mover, attribute: DefineAttributes): number {
        return this.getOriginalPoints(mover, attribute) + mover.attributes.get(attribute);
    }

    static reduceRecoveryPercent(recovery: number): number {
        return Math.round(recovery - recovery * 0.1);
    }

    static getHpRecovery(entity: Mover): number {
        const level = entity.level;
        const stamina = this.getStatisticPoints(entity, DefineAttributes.DST_STA);
        const maxHp = this.getMaxHp(entity);
        const hpRecoveryFactor = ('job' in entity && entity.job && typeof entity.job === 'object' && 'hpRecoveryFactor' in entity.job) ? (entity.job as any).hpRecoveryFactor : 1;

        const recoveredHp = Math.floor(level / 3 + maxHp / (500 * level) + stamina * hpRecoveryFactor);

        return this.reduceRecoveryPercent(recoveredHp);
    }

    static getMpRecovery(entity: Mover): number {
        const level = entity.level;
        const intelligence = this.getStatisticPoints(entity, DefineAttributes.DST_INT);
        const maxMp = this.getMaxMp(entity);
        const mpRecoveryFactor = ('job' in entity && entity.job && typeof entity.job === 'object' && 'mpRecoveryFactor' in entity.job) ? (entity.job as any).mpRecoveryFactor : 1;

        const recoveredMp = Math.floor(((level * 1.5) + (maxMp / (500 * level)) + (intelligence * mpRecoveryFactor)) * 0.2);

        return this.reduceRecoveryPercent(recoveredMp);
    }

    static getFpRecovery(entity: Mover): number {
        const level = entity.level;
        const stamina = this.getStatisticPoints(entity, DefineAttributes.DST_STA);
        const maxFp = this.getMaxFp(entity);
        const fpRecoveryFactor = ('job' in entity && entity.job && typeof entity.job === 'object' && 'fpRecoveryFactor' in entity.job) ? (entity.job as any).fpRecoveryFactor : 1;

        const recoveredFp = Math.floor(((level * 2) + (maxFp / (500 * level)) + (stamina * fpRecoveryFactor)) * 0.2);

        return this.reduceRecoveryPercent(recoveredFp);
    }

    static getMaxHp(entity: Mover): number {
        return this.getMaxParamPoints(
            this.getMaxOriginHp(entity),
            entity.attributes.get(DefineAttributes.DST_HP_MAX),
            entity.attributes.get(DefineAttributes.DST_HP_MAX_RATE)
        );
    }

    static getMaxMp(entity: Mover): number {
        return this.getMaxParamPoints(
            this.getMaxOriginMp(entity),
            entity.attributes.get(DefineAttributes.DST_MP_MAX),
            entity.attributes.get(DefineAttributes.DST_MP_MAX_RATE)
        );
    }

    static getMaxFp(entity: Mover): number {
        return this.getMaxParamPoints(
            this.getMaxOriginFp(entity),
            entity.attributes.get(DefineAttributes.DST_FP_MAX),
            entity.attributes.get(DefineAttributes.DST_FP_MAX_RATE)
        );
    }

    static getMaxOriginHp(entity: Mover): number {
        if ('job' in entity && entity.job && typeof entity.job === 'object' && 'maxHpFactor' in entity.job) {
            const maxHpFactor = (entity.job as any).maxHpFactor;
            const level = entity.level;
            const stamina = this.getStatisticPoints(entity, DefineAttributes.DST_STA);

            const a = (maxHpFactor * level) / 2;
            const b = a * ((level + 1) / 4) * (1 + stamina / 50) + stamina * 10;

            return Math.floor(b + 80);
        } else if ('properties' in entity && entity.properties && 'addHp' in entity.properties) {
            return entity.properties.addHp || 0;
        }

        return 0;
    }

    static getMaxOriginMp(entity: Mover): number {
        const level = entity.level;
        const intelligence = this.getStatisticPoints(entity, DefineAttributes.DST_INT);

        if ('job' in entity && entity.job && typeof entity.job === 'object' && 'maxMpFactor' in entity.job) {
            const maxMpFactor = (entity.job as any).maxMpFactor;

            return Math.floor((((level * 2) + (intelligence * 8)) * maxMpFactor) + 22 + (intelligence * maxMpFactor));
        }

        return (level * 2) + (intelligence * 8) + 22;
    }

    static getMaxOriginFp(entity: Mover): number {
        const level = entity.level;
        const stamina = this.getStatisticPoints(entity, DefineAttributes.DST_STA);
        const dexterity = this.getStatisticPoints(entity, DefineAttributes.DST_DEX);

        if ('job' in entity && entity.job && typeof entity.job === 'object' && 'maxFpFactor' in entity.job) {
            const maxFpFactor = (entity.job as any).maxFpFactor;

            return Math.floor((((level * 2) + (stamina * 6)) * maxFpFactor) + (stamina * maxFpFactor));
        }

        const strength = this.getStatisticPoints(entity, DefineAttributes.DST_STR);

        return ((level * 2) + (strength * 7) + (stamina * 2) + (dexterity * 4));
    }
}
