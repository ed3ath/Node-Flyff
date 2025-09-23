export class MapRegionProperties {
  public readonly x: number;
  public readonly z: number;
  public readonly width: number;
  public readonly length: number;

  constructor(x: number, z: number, width: number, length: number) {
    this.x = x;
    this.z = z;
    this.width = width;
    this.length = length;
  }
}