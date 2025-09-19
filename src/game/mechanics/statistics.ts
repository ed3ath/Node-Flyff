import { Mover } from "../../entities/mover";

/// <summary>
/// Represents the statistics of a mover.
/// </summary>
export class Statistics {
    private readonly _mover: Mover;

    /// <summary>
    /// Gets or sets the original strength points.
    /// </summary>
    public strength: number;

    /// <summary>
    /// Gets or sets the original stamina points.
    /// </summary>
    public stamina: number;

    /// <summary>
    /// Gets or sets the original dexterity points.
    /// </summary>
    public dexterity: number;

    /// <summary>
    /// Gets or sets the original intelligence points.
    /// </summary>
    public intelligence: number;

    public constructor(owner: Mover) {
        if (!owner) {
            throw new Error("Cannot assign statistics to an unknown mover instance.");
        }
        this._mover = owner;
        this.strength = owner.properties.strength || 0;
        this.stamina = owner.properties.stamina || 0;
        this.dexterity = owner.properties.dexterity || 0;
        this.intelligence = owner.properties.intelligence || 0;
    }
}
