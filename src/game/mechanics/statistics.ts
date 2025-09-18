import { Mover } from "../../entities/mover";

export class Statistics {
    private readonly _mover: Mover;

    /** Gets or sets the original strength points. */
    public strength: number;

    /** Gets or sets the original stamina points. */
    public stamina: number;

    /** Gets or sets the original dexterity points. */
    public dexterity: number;

    /** Gets or sets the original intelligence points. */
    public intelligence: number;

    constructor(owner: Mover) {
        if (!owner) {
            throw new Error("Cannot assign statistics to an unknown mover instance.");
        }
        this._mover = owner;
        // this.strength = owner.properties.strength;
        // this.stamina = owner.properties.stamina;
        // this.dexterity = owner.properties.dexterity;
        // this.intelligence = owner.properties.intelligence;
    }
}
