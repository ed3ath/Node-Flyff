import { Vector3 } from "../../abstract/vector3";

export interface MapRevivalRegionProperties {
  id: string;
  mapId: string;
  position: Vector3;
  radius: number;
}

export class MapRevivalRegion {
  public readonly properties: MapRevivalRegionProperties;

  constructor(properties: MapRevivalRegionProperties) {
    this.properties = properties;
  }

  public get id(): string {
    return this.properties.id;
  }

  public get mapId(): string {
    return this.properties.mapId;
  }

  public get position(): Vector3 {
    return this.properties.position;
  }

  public get radius(): number {
    return this.properties.radius;
  }
}