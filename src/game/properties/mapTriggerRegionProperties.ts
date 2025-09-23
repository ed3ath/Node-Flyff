import { Vector3 } from '../../abstract/vector3';
import { MapRegionProperties } from './mapRegionProperties';

export class MapTriggerRegionProperties extends MapRegionProperties {
  public readonly destinationMapId: number;
  public readonly destinationMapPosition: Vector3;

  constructor(
    x: number,
    z: number,
    width: number,
    length: number,
    destinationMapId: number,
    destinationMapPosition: Vector3
  ) {
    super(x, z, width, length);
    this.destinationMapId = destinationMapId;
    this.destinationMapPosition = destinationMapPosition;
  }

  public get isWrapzone(): boolean {
    return this.destinationMapId > 0;
  }
}