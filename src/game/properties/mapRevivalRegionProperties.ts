import { Vector3 } from '../../abstract/vector3';
import { MapRegionProperties } from '../world/regionProperties';

export class MapRevivalRegion extends MapRegionProperties {
  public readonly mapId: number;
  public readonly key: string;
  public readonly isChaoRegion: boolean;
  public readonly targetRevivalKey: boolean;
  public readonly revivalPosition: Vector3;

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