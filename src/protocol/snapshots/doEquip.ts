import { Player } from "../../entities/player";
import { Item } from "../../game/mechanics/item";
import { ServerSnapshot } from "../../libraries/serverSnapshot";
import { SnapshotType } from "../snapshotType";
import { ServerPacket } from "../../libraries/serverPacket";

/**
 * DoEquip snapshot - sends equipment changes to client
 * This tells the client to actually render the equipment on the character
 */
export class DoEquipSnapshot extends ServerSnapshot {
  constructor(player: Player, item: Item, itemIndex: number, wasEquipped: boolean) {
    super();

    // Build the snapshot data
    const snapshotData = this.buildSnapshotData(item, itemIndex, wasEquipped);

    // Add the snapshot using the ServerSnapshot method
    this.addSnapshot(SnapshotType.DO_EQUIP, player.objectId, 5, player.objectId, snapshotData);
  }

  private buildSnapshotData(item: Item, itemIndex: number, wasEquipped: boolean): Buffer {
    const packet = new ServerPacket();

    // CRITICAL FIX: Use itemIndex as both slot AND part type since they should match
    packet.writeByte(itemIndex);                    // Equipment slot (ItemPartType 0-30)
    packet.writeInt32LE(0);                         // Guild id
    packet.writeByte(wasEquipped ? 1 : 0);          // Equipped state (1 = equipped, 0 = unequipped)
    packet.writeInt32LE(item.Properties?.id || item.Id);  // Item ID
    packet.writeInt32LE(item.Refine || 0);          // Refine level
    packet.writeInt32LE(0);                         // Item flags
    packet.writeInt32LE(itemIndex);                 // Part type (same as equipment slot)

    console.log(`[DoEquip FIXED] Item ${item.Properties?.name || item.Id} - Slot: ${itemIndex}, PartType: ${itemIndex}, ItemID: ${item.Properties?.id || item.Id}`);

    // Return the data without packet headers
    return packet.getBuffer().subarray(5); // Skip header and length
  }

  private getItemParts(item: Item): number {
    // NOTE: This method is deprecated - we now use itemIndex directly as part type
    // Keeping for potential future use if needed for validation

    if (item.Properties?.parts !== undefined) {
      return item.Properties.parts;
    }

    // Fallback: try to infer from item name
    if (item.Properties?.name) {
      const itemName = item.Properties.name.toLowerCase();
      if (itemName.includes('weapon') || itemName.includes('sword')) return 10;
      if (itemName.includes('suit') || itemName.includes('armor')) return 2;
      if (itemName.includes('glove') || itemName.includes('gauntlet')) return 4;
      if (itemName.includes('boot') || itemName.includes('shoe')) return 5;
    }

    return 0; // Default to head if completely unknown
  }
}