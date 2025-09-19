import { Rectangle } from '../../abstract/rectangle';
import { MapRegionProperties } from '../world/regionProperties';
import { MapObjectProperties } from '../world/mapObjectProperties';

export class MapProperties {
  public static readonly regionSize: number = 128;

  public readonly id: number;
  public readonly name: string;
  public readonly width: number;
  public readonly length: number;
  public readonly heights: number[];
  public readonly revivalMapId: number;
  public readonly mpu: number;
  public readonly bounds: Rectangle;
  public readonly regions: MapRegionProperties[];
  public readonly objects: MapObjectProperties[];

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