// mapProperties.ts

import { MapObjectProperties } from './mapObjectProperties';
import { MapRegionProperties } from './regionProperties';
import { Rectangle } from './rectangle';

export class MapProperties {
    public static readonly regionSize: number = 128;

    public id: number;
    public name: string;
    public width: number;
    public length: number;
    public heights: number[];
    public revivalMapId: number;
    public mpu: number;
    public bounds: Rectangle;
    public regions: MapRegionProperties[];
    public objects: MapObjectProperties[];

    constructor(
        id: number,
        name: string,
        width: number,
        length: number,
        heights: number[],
        revivalMapId: number,
        mpu: number,
        bounds: Rectangle,
        regions: MapRegionProperties[],
        objects: MapObjectProperties[]
    ) {
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
