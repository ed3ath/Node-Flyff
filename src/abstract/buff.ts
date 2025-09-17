import { BuffType } from "../common/buffType";
import { DefineAttributes } from "../common/defineAttributes";
import { Mover } from "../entities/mover";
import { FlyffPacket } from "../libraries/flyffPacket";

export class Buff {
  private static uniqueIdCounter: number = 0;

  id: number;
  type: BuffType;
  owner: Mover;
  attributes: ReadonlyMap<DefineAttributes, number>;
  remainingTime: number;

  constructor(owner: Mover, attributes: ReadonlyMap<DefineAttributes, number>) {
    this.id = Buff.uniqueIdCounter++;
    this.owner = owner;
    this.attributes = new Map(attributes);
    this.remainingTime = 0; // Initialize remaining time as needed
  }

  get hasExpired(): boolean {
    return this.remainingTime <= 0;
  }

  decreaseTime(time: number = 1): void {
    this.remainingTime -= time * 1000; // Assuming time is provided in seconds, convert to milliseconds
  }

  equals(other: Buff | null): boolean {
    return other instanceof Buff && this.id === other.id;
  }

  serialize(packet: FlyffPacket): void {
    // Nothing to do
  }
}
