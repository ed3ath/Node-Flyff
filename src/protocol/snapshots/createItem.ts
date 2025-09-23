import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";
import { Item } from "../../game/mechanics/item";

/**
 * CREATE_ITEM snapshot for creating items in player inventory
 * Based on Rhisis CreateItemSnapshot
 */
export class CreateItemSnapshot extends FlyffSnapshot {
  constructor(player: Player, item: Item, slot: number) {
    super(SnapshotType.CREATE_ITEM, player.objectId);

    // Write snapshot data like C# implementation
    this.writeByte(slot); // Slot index
    item.Serialize(this); // Serialize the item data
  }
}