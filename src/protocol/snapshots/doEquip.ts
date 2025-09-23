import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";
import { Player } from "../../entities/player";
import { Item } from "../../game/mechanics/item";

export class DoEquipSnapshot extends FlyffSnapshot {
  constructor(player: Player, item: Item, slot: number, isEquipped: boolean) {
    super(SnapshotType.DO_EQUIP, player.objectId);

    this.writeInt32(slot);
    this.writeByte(isEquipped ? 1 : 0);
    item.Serialize(this);
  }
}