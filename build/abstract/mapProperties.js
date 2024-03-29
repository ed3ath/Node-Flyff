"use strict";
// mapProperties.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapProperties = void 0;
class MapProperties {
    constructor(id, name, width, length, heights, revivalMapId, mpu, bounds, regions, objects) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.length = length;
        this.heights = heights;
        this.revivalMapId = revivalMapId;
        this.mpu = mpu;
        this.bounds = bounds;
        this.regions = regions;
        this.objects = objects;
    }
}
exports.MapProperties = MapProperties;
MapProperties.regionSize = 128;
