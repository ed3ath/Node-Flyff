import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";

/**
 * MOVE_ITEM snapshot for moving items between inventory slots
 * Based on Rhisis MoveItemSnapshot
 */
export class MoveItemSnapshot extends FlyffSnapshot {
  constructor(player: Player, sourceSlot: number, destinationSlot: number) {
    super(SnapshotType.MOVE_ITEM, player.objectId);

    // Write snapshot data like C# implementation
    this.writeByte(sourceSlot);      // Source slot
    this.writeByte(destinationSlot); // Destination slot
  }
}