import { FFRandom } from "../helpers/FFRandom";
import { Vector3 } from "./vector3";

export class Rectangle {
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

  public GetRandomPosition(height: number = 0): Vector3 {
    return new Vector3(
      FFRandom.floatRandomBetween(this.x, this.x + this.width),
      height,
      FFRandom.floatRandomBetween(this.z, this.z + this.length)
    );
  }

  public Contains(position: Vector3): boolean;
  public Contains(x: number, y: number, z: number): boolean;
  public Contains(arg1: number | Vector3, y?: number, z?: number): boolean {
    let x: number;
    if (arg1 instanceof Vector3) {
      x = arg1.x;
      y = arg1.y;
      z = arg1.z;
    } else {
      x = arg1;
    }
    if (z) {
      return (
        x >= this.x &&
        x <= this.x + this.width &&
        z >= this.z &&
        z <= this.z + this.length
      );
    } else {
      return x >= this.x && x <= this.x + this.width;
    }
  }
}
