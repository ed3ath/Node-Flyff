import { WorldObjectType } from '../../types/worldObjectType';
import { MapRegionProperties } from './mapRegionProperties';

export class MapRespawnRegion extends MapRegionProperties {
  public readonly objectType: WorldObjectType;
  public readonly modelId: number;
  public readonly time: number;
  public readonly count: number;
  public readonly height: number;

  constructor(
    x: number,
    z: number,
    width: number,
    length: number,
    objectType: WorldObjectType,
    modelId: number,
    time: number,
    count: number,
    height: number
  ) {
    super(x, z, width, length);
    this.objectType = objectType;
    this.modelId = modelId;
    this.time = time;
    this.count = count;
    this.height = height;
  }
}