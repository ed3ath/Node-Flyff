import { Vector3 } from '../../abstract/vector3';

export class MapObjectProperties {
  public readonly modelId: number;
  public readonly position: Vector3;
  public readonly angle: number;
  public readonly name: string;

  constructor(modelId: number, position: Vector3, angle: number, name: string) {
    this.modelId = modelId;
    this.position = position;
    this.angle = angle;
    this.name = name;
  }
}