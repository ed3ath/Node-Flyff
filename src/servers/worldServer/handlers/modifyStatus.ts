import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { WorldUser } from "../worldUser";

@SetPacketType(PacketType.MODIFY_STATUS)
export default class Handler extends PacketHandler {
  strength: number;
  stamina: number;
  dexterity: number;
  intelligence: number;

  constructor(packet: FlyffPacket) {
    super();
    // Read as Int32 but cast to ushort (0-65535) like C# implementation
    this.strength = packet.readInt32LE();
    this.stamina = packet.readInt32LE();
    this.dexterity = packet.readInt32LE();
    this.intelligence = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn(
        "MODIFY_STATUS packet received but player is not available"
      );
      return;
    }

    try {
      // Call the existing updateStatistics method which includes validation
      player.updateStatistics(
        this.strength,
        this.stamina,
        this.dexterity,
        this.intelligence
      );

      this.logger.info(
        `Player ${player.name} updated statistics: STR+${this.strength}, STA+${this.stamina}, DEX+${this.dexterity}, INT+${this.intelligence}`
      );
    } catch (error) {
      this.logger.error(
        `Failed to update statistics for player ${player.name}: ${error}`
      );
      // TODO: Send error response to client if needed
    }
  }
}
