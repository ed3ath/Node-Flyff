import { MapRegionProperties } from "./regionProperties";
import { Vector3 } from "./vector3";

export class MapTriggerRegionProperties extends MapRegionProperties {
  public destinationMapId: number;
  public destinationMapPosition: Vector3;

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
