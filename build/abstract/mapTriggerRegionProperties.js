"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapTriggerRegionProperties = void 0;
const regionProperties_1 = require("./regionProperties");
class MapTriggerRegionProperties extends regionProperties_1.MapRegionProperties {
    constructor(x, z, width, length, destinationMapId, destinationMapPosition) {
        super(x, z, width, length);
        this.destinationMapId = destinationMapId;
        this.destinationMapPosition = destinationMapPosition;
    }
    get isWrapzone() {
        return this.destinationMapId > 0;
    }
}
exports.MapTriggerRegionProperties = MapTriggerRegionProperties;
