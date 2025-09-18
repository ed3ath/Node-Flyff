import { AttackFlags } from "../../types/attackFlag";
import { Mover } from "../../entities/mover";

export class Projectile {
    /** Gets the projectile owner. */
    public owner: Mover;

    /** Gets the projectile target. */
    public target: Mover;

    /** Gets the action to execute when the projectile has arrived at its target. */
    public onArrived: () => void;

    /** Gets the projectile attack type. */
    public get type(): AttackFlags {
        return AttackFlags.AF_GENERIC;
    }

    /**
     * Creates a new Projectile instance.
     * @param owner Projectile owner.
     * @param target Projectile target.
     * @param onArrived Projectile action to execute when arrived at its target.
     */
    constructor(owner: Mover, target: Mover, onArrived: () => void) {
        this.owner = owner;
        this.target = target;
        this.onArrived = onArrived;
    }
}