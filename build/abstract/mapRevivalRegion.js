"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapRevivalRegionProperties = void 0;
const regionProperties_1 = require("./regionProperties");
// mapRevivalRegionProperties.js
class MapRevivalRegionProperties extends regionProperties_1.MapRegionProperties {
    constructor(x, z, width, length, mapId, key, isChaoRegion, targetRevivalKey, revivalPosition) {
        super(x, z, width, length);
        this.mapId = mapId;
        this.key = key;
        this.isChaoRegion = isChaoRegion;
        this.targetRevivalKey = targetRevivalKey;
        this.revivalPosition = revivalPosition;
    }
}
exports.MapRevivalRegionProperties = MapRevivalRegionProperties;
