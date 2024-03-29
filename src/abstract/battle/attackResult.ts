import { AttackFlags } from "../../common/attackFlag";

export class AttackResult {
    damages: number;
    flags: AttackFlags;

    static miss(): AttackResult {
        return {
            damages: 0,
            flags: AttackFlags.AF_MISS
        };
    }

    static success(damages: number, attackFlags: AttackFlags): AttackResult {
        return {
            damages: damages,
            flags: attackFlags
        };
    }
}
