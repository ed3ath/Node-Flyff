import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { SetPacketType } from "../../../decorators/packetHandler";
import { WorldPacketHandler } from "../worldPacketHandler";

@SetPacketType(PacketType.QUEST_CHECK)
export default class Handler extends WorldPacketHandler {
  questId: number;
  checked: boolean;

  constructor(packet: FlyffPacket) {
    super();

    // Read packet data matching C# QuestCheckPacket structure
    this.questId = packet.readInt32LE();
    this.checked = packet.readBoolean();
  }

  async execute(): Promise<void> {
    if (!this.player) {
      this.logger.warn(
        "QUEST_CHECK packet received but player is not available"
      );
      return;
    }

    try {
      // Validate quest id (like C# implementation)
      if (this.questId <= 0) {
        this.logger.error(
          `Invalid quest id: '${this.questId}'`
        );
        return;
      }

      // Find the quest in player's quest diary (like C# implementation)
      const quest = this.player.questDiary?.getActiveQuest?.(this.questId);

      if (!quest) {
        this.logger.error(
          `Failed to find quest with id: '${this.questId}' for player ${this.player.name}`
        );
        return;
      }

      // Toggle quest checked state (like C# implementation)
      quest.isChecked = !quest.isChecked;

      this.logger.info(
        `Player ${this.player.name} ${quest.isChecked ? 'checked' : 'unchecked'} quest ${this.questId}`
      );

      // Send quest checked snapshot to player (like C# implementation)
      // TODO: Implement QuestCheckedSnapshot
      // using QuestCheckedSnapshot questCheckedSnapshot = new(Player, Player.QuestDiary.CheckedQuests);
      // Player.Send(questCheckedSnapshot);

      if (this.player.questDiary?.getCheckedQuests) {
        const checkedQuests = this.player.questDiary.getCheckedQuests();
        this.logger.info(
          `Sending quest checked snapshot with ${checkedQuests.length} checked quests`
        );

        // TODO: Create and send QuestCheckedSnapshot
        // const questCheckedSnapshot = new QuestCheckedSnapshot(this.player, checkedQuests);
        // this.player.send(questCheckedSnapshot);
      }

    } catch (error) {
      this.logger.error(
        `Failed to process QUEST_CHECK for player ${this.player?.name}: ${error}`
      );
    }
  }
}