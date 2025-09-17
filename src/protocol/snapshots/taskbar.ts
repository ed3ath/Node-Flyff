import { SnapshotType } from "../../common/snapshotType";
import { Player } from "../../entities/player";
import { FlyffSnapshot } from "../../libraries/snapshot";

export class TaskbarSnapshot extends FlyffSnapshot {
  constructor(player: Player) {
    super(SnapshotType.TASKBAR, player.objectId);

    // Write taskbar data - simplified implementation
    // TODO: Implement proper taskbar serialization from player.taskbar
    const taskbarSize = 12; // Standard taskbar size
    this.writeByte(taskbarSize);

    // Write empty taskbar slots for now
    for (let i = 0; i < taskbarSize; i++) {
      this.writeInt32(0); // Slot type (0 = empty)
      this.writeInt32(0); // Item/skill ID
      this.writeInt32(0); // Additional data
    }
  }
}