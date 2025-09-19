import { FFRandom } from "../helpers/FFRandom";
import { Vector3 } from "./vector3";

/// <summary>
/// This class describes the behavior of a Rectangle in a 3D environment.
/// </summary>
/// <remarks>
/// This Rectangle implementation doesn't have a Y property because in a 3D world, Y coordinate represents the heights.
/// </remarks>
export class Rectangle {
  /// <summary>
  /// Gets the X position of the rectangle.
  /// </summary>
  public X: number;

  /// <summary>
  /// Gets the Z position of the rectangle.
  /// </summary>
  public Z: number;

  /// <summary>
  /// Gets the width of the rectangle.
  /// </summary>
  public Width: number;

  /// <summary>
  /// Gets the length of the rectangle.
  /// </summary>
  public Length: number;

  /// <summary>
  /// Creates a new Rectangle.
  /// </summary>
  /// <param name="x">X coordinate (X Top Left corner)</param>
  /// <param name="z">Z coordinate (Z top left corner)</param>
  /// <param name="width">Width of the region</param>
  /// <param name="length">Length of the region</param>
  constructor(x: number, z: number, width: number, length: number) {
    this.X = x;
    this.Z = z;
    this.Width = width;
    this.Length = length;
  }

  /// <summary>
  /// Generates a random position inside the rectangle.
  /// </summary>
  /// <param name="height">Optional height.</param>
  /// <returns>A new Vector3</returns>
  public GetRandomPosition(height: number = 0): Vector3 {
    return new Vector3(
      FFRandom.floatRandomBetween(this.X, this.X + this.Width),
      height,
      FFRandom.floatRandomBetween(this.Z, this.Z + this.Length)
    );
  }

  /// <summary>
  /// Check if the position passed as parameter is inside the rectangle.
  /// </summary>
  /// <param name="position"></param>
  /// <returns></returns>
  public Contains(position: Vector3): boolean;

  /// <summary>
  /// Check if the position passed as parameter is inside the rectangle.
  /// </summary>
  /// <param name="x">X coordinate.</param>
  /// <param name="y">Y coordinate.</param>
  /// <param name="z">Z coordinate.</param>
  /// <returns></returns>
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

    return x >= this.X && x <= this.X + this.Width && z! >= this.Z && z! <= this.Z + this.Length;
  }

  // Backward compatibility methods
  public get x(): number { return this.X; }
  public get z(): number { return this.Z; }
  public get width(): number { return this.Width; }
  public get length(): number { return this.Length; }

  public getRandomPosition(height: number = 0): Vector3 {
    return this.GetRandomPosition(height);
  }

  public contains(position: Vector3): boolean;
  public contains(x: number, y: number, z: number): boolean;
  public contains(arg1: number | Vector3, y?: number, z?: number): boolean {
    if (arg1 instanceof Vector3) {
      return this.Contains(arg1);
    } else if (y !== undefined && z !== undefined) {
      return this.Contains(arg1, y, z);
    } else {
      return false;
    }
  }
}
