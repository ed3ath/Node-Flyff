import { MapRegionProperties } from "./regionProperties";
import { Vector3 } from "./vector3";

// mapRevivalRegionProperties.js
export class MapRevivalRegionProperties extends MapRegionProperties {
  public mapId: number;
  public key: string;
  public isChaoRegion: boolean;
  public targetRevivalKey: boolean;
  public revivalPosition: Vector3;

  constructor(
    x: number,
    z: number,
    width: number,
    length: number,
    mapId: number,
    key: string,
    isChaoRegion: boolean,
    targetRevivalKey: boolean,
    revivalPosition: Vector3
  ) {
    super(x, z, width, length);
    this.mapId = mapId;
    this.key = key;
    this.isChaoRegion = isChaoRegion;
    this.targetRevivalKey = targetRevivalKey;
    this.revivalPosition = revivalPosition;
  }
}
