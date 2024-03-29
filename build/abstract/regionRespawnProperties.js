"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRespawnRegionProperties = void 0;
const regionProperties_1 = require("./regionProperties");
class MapRespawnRegionProperties extends regionProperties_1.MapRegionProperties {
    constructor(x, z, width, length, objectType, modelId, time, count, height) {
        super(x, z, width, length);
        this.objectType = objectType;
        this.modelId = modelId;
        this.time = time;
        this.count = count;
        this.height = height;
    }
}
exports.MapRespawnRegionProperties = MapRespawnRegionProperties;
