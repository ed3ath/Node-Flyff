import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";
import { UpdateItemType } from "../../types/updateItemType";

/**
 * UPDATE_ITEM snapshot for updating item properties (quantity, etc.)
 * Based on Rhisis UpdateItemSnapshot
 */
export class UpdateItemSnapshot extends FlyffSnapshot {
  constructor(player: Player, updateType: UpdateItemType, slot: number, value: number) {
    super(SnapshotType.UPDATE_ITEM, player.objectId);

    // Write snapshot data like C# implementation
    this.writeByte(updateType); // Update type (UI_NUM for quantity, etc.)
    this.writeByte(slot);       // Slot index
    this.writeInt32(value);     // New value
  }
}