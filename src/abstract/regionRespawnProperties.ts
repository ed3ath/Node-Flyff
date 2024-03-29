import { WorldObjectType } from "../common/worldObjectType";
import { MapRegionProperties } from "./regionProperties";

export class MapRespawnRegionProperties extends MapRegionProperties {
    // Gets the respawn region object type.
    public objectType: WorldObjectType;

    // Gets the respawn model id.
    public modelId: number;

    // Gets the respawn time.
    public time: number;

    // Gets the number of objects in this region.
    public count: number;

    // Gets the region height.
    // Used for flying monsters.
    public height: number;

    constructor(
        x: number,
        z: number,
        width: number,
        length: number,
        objectType: WorldObjectType,
        modelId: number,
        time: number,
        count: number,
        height: number
    ) {
        super(x, z, width, length);
        this.objectType = objectType;
        this.modelId = modelId;
        this.time = time;
        this.count = count;
        this.height = height;
    }
}
