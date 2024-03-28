export class Vector3 {
  constructor(
    public x: number = 0,
    public y: number = 0,
    public z: number = 0
  ) {}

  get Length(): number {
    return Math.sqrt(this.SquaredLength);
  }

  get SquaredLength(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }

  public static GetDistance2D(from: Vector3, to: Vector3): number {
    const x = from.x - to.x;
    const z = from.z - to.z;
    return Math.sqrt(x * x + z * z);
  }

  public static GetDistance3D(from: Vector3, to: Vector3): number {
    const x = from.x - to.x;
    const y = from.y - to.y;
    const z = from.z - to.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  public static Distance2D(from: Vector3, to: Vector3): number {
    return Vector3.GetDistance2D(from, to);
  }

  public static Distance3D(from: Vector3, to: Vector3): number {
    return Vector3.GetDistance3D(from, to);
  }

  public Equals(other: Vector3): boolean {
    return this.x === other.x && this.y === other.y && this.z === other.z;
  }

  public static Equals(a: Vector3, b: Vector3): boolean {
    return a.Equals(b);
  }

  public toString(): string {
    return `Vector3: ${this.x}:${this.y}:${this.z}`;
  }
}
