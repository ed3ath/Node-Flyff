import { Vector3 } from "./vector3";

export class MapObjectProperties {
  public modelId: number;
  public position: Vector3;
  public angle: number;
  public name: string;

  constructor(modelId: number, position: Vector3, angle: number, name: string) {
    this.modelId = modelId;
    this.position = position;
    this.angle = angle;
    this.name = name;
  }
}
