import { Mover } from "../../entities/mover";
import { UpdateParamPointSnapshot } from "../../protocol/snapshots/updateParamPoint";
import { DefineAttributes } from "../definitions/defineAttributes";

/// <summary>
/// Represents the statistics of a mover.
/// </summary>
export class Statistics {
    private readonly _mover: Mover;

    private _strength: number;
    private _stamina: number;
    private _dexterity: number;
    private _intelligence: number;

    /// <summary>
    /// Gets or sets the original strength points.
    /// </summary>
    public get strength(): number {
        return this._strength;
    }

    public set strength(value: number) {
        if (this._strength !== value) {
            this._strength = value;
            this.sendStatUpdate(DefineAttributes.DST_STR, value);
        }
    }

    /// <summary>
    /// Gets or sets the original stamina points.
    /// </summary>
    public get stamina(): number {
        return this._stamina;
    }

    public set stamina(value: number) {
        if (this._stamina !== value) {
            this._stamina = value;
            this.sendStatUpdate(DefineAttributes.DST_STA, value);
        }
    }

    /// <summary>
    /// Gets or sets the original dexterity points.
    /// </summary>
    public get dexterity(): number {
        return this._dexterity;
    }

    public set dexterity(value: number) {
        if (this._dexterity !== value) {
            this._dexterity = value;
            this.sendStatUpdate(DefineAttributes.DST_DEX, value);
        }
    }

    /// <summary>
    /// Gets or sets the original intelligence points.
    /// </summary>
    public get intelligence(): number {
        return this._intelligence;
    }

    public set intelligence(value: number) {
        if (this._intelligence !== value) {
            this._intelligence = value;
            this.sendStatUpdate(DefineAttributes.DST_INT, value);
        }
    }

    public constructor(owner: Mover) {
        if (!owner) {
            throw new Error("Cannot assign statistics to an unknown mover instance.");
        }
        this._mover = owner;
        // Initialize without triggering snapshots
        this._strength = owner.properties.strength || 0;
        this._stamina = owner.properties.stamina || 0;
        this._dexterity = owner.properties.dexterity || 0;
        this._intelligence = owner.properties.intelligence || 0;
    }

    /**
     * Updates a single statistic and sends snapshot to player
     * @param attribute The stat attribute to update
     * @param value The new value
     */
    private sendStatUpdate(attribute: DefineAttributes, value: number): void {
        // Send stat update snapshot to player (like C# implementation)
        const statSnapshot = new UpdateParamPointSnapshot(this._mover, attribute, value);
        this._mover.sendToVisible(statSnapshot, true);
    }

    /**
     * Updates all statistics without sending individual snapshots
     * Useful for bulk updates
     */
    public updateAll(str: number, sta: number, dex: number, int: number): void {
        this._strength = str;
        this._stamina = sta;
        this._dexterity = dex;
        this._intelligence = int;

        // Send all stat updates
        this.sendStatUpdate(DefineAttributes.DST_STR, this._strength);
        this.sendStatUpdate(DefineAttributes.DST_STA, this._stamina);
        this.sendStatUpdate(DefineAttributes.DST_DEX, this._dexterity);
        this.sendStatUpdate(DefineAttributes.DST_INT, this._intelligence);
    }
}
