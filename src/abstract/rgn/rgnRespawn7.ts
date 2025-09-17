import { RgnElement } from "./rgnElement";
import { Vector3 } from "../vector3";

export class RgnRespawn7 extends RgnElement {
    private _model: number;
    private _count: number;
    private _time: number;
    private _agroNumber: number;

    constructor(respawnData: string[]) {
        super(
            parseInt(respawnData[1]),
            new Vector3(
                parseInt(respawnData[3]),
                parseInt(respawnData[4]),
                parseInt(respawnData[5])
            ),
            parseInt(respawnData[9]),
            parseInt(respawnData[10]),
            parseInt(respawnData[11]),
            parseInt(respawnData[12])
        );

        this._model = parseInt(respawnData[2]);
        this._count = parseInt(respawnData[6]);
        this._time = parseInt(respawnData[7]);
        this._agroNumber = parseInt(respawnData[8]);
    }

    get model(): number {
        return this._model;
    }

    get count(): number {
        return this._count;
    }

    get time(): number {
        return this._time;
    }

    get agroNumber(): number {
        return this._agroNumber;
    }
}