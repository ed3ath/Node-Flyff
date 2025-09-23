import { QuestProperties } from "../../resources/properties/quest/questProperties";
import { QuestState } from "./questState";

export class Quest {
  private _id: number;
  private _properties: QuestProperties;
  private _isFinished: boolean = false;
  private _isChecked: boolean = false;
  private _isDeleted: boolean = false;
  private _state: QuestState = QuestState.Unknown;
  private _startTime?: Date;
  private _endTime?: Date;
  private _monsters: Map<number, number> = new Map();

  constructor(properties: QuestProperties, playerId?: number) {
    this._properties = properties;
    this._id = properties.id;
    this._state = QuestState.Suggest;
  }

  get id(): number {
    return this._id;
  }

  get properties(): QuestProperties {
    return this._properties;
  }

  get isFinished(): boolean {
    return this._isFinished;
  }

  set isFinished(value: boolean) {
    this._isFinished = value;
  }

  get isChecked(): boolean {
    return this._isChecked;
  }

  set isChecked(value: boolean) {
    this._isChecked = value;
  }

  get isDeleted(): boolean {
    return this._isDeleted;
  }

  set isDeleted(value: boolean) {
    this._isDeleted = value;
  }

  get state(): QuestState {
    return this._state;
  }

  set state(value: QuestState) {
    this._state = value;
  }

  get startTime(): Date | undefined {
    return this._startTime;
  }

  set startTime(value: Date | undefined) {
    this._startTime = value;
  }

  get endTime(): Date | undefined {
    return this._endTime;
  }

  set endTime(value: Date | undefined) {
    this._endTime = value;
  }

  get monsters(): Map<number, number> {
    return this._monsters;
  }

  serialize(packet: any): void {
    // TODO: Implement quest serialization
    // This should match the C# Quest.Serialize method
    packet.writeInt16(this._id);
    packet.writeByte(this._state);
    packet.writeByte(this._isChecked ? 1 : 0);

    // Serialize monster progress
    if (this._properties.questEndCondition.monsters) {
      packet.writeByte(this._properties.questEndCondition.monsters.length);
      for (const monster of this._properties.questEndCondition.monsters) {
        const monsterId = parseInt(monster.id); // Convert string to number if needed
        const currentCount = this._monsters.get(monsterId) || 0;
        packet.writeInt32(monsterId);
        packet.writeInt32(currentCount);
        packet.writeInt32(monster.amount);
      }
    } else {
      packet.writeByte(0);
    }

    // Serialize item progress
    if (this._properties.questEndCondition.items) {
      packet.writeByte(this._properties.questEndCondition.items.length);
      for (const item of this._properties.questEndCondition.items) {
        packet.writeInt32(parseInt(item.id));
        packet.writeInt32(item.quantity);
      }
    } else {
      packet.writeByte(0);
    }

    // Serialize patrol progress
    if (this._properties.questEndCondition.patrols) {
      packet.writeByte(this._properties.questEndCondition.patrols.length);
      for (const patrol of this._properties.questEndCondition.patrols) {
        packet.writeInt32(parseInt(patrol.mapId));
        packet.writeInt32(patrol.left);
        packet.writeInt32(patrol.top);
        packet.writeInt32(patrol.right);
        packet.writeInt32(patrol.bottom);
      }
    } else {
      packet.writeByte(0);
    }
  }
}