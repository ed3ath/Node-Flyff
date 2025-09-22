import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { WorldUser } from "../worldUser";
import { WorldPacketLogger } from "../../../helpers/worldPacketLogger";

/**
 * MY_REG packet handler (0x00000001)
 * Purpose: Player registration/identification packet
 * Typically sent during world connection process to register player identity
 */
@SetPacketType(PacketType.MY_REG)
export default class MyRegHandler extends PacketHandler {
  playerId: number;
  additionalData: number;

  constructor(packet: FlyffPacket) {
    super();

    // MY_REG appears to be a simple acknowledgment packet with minimal data
    const remainingBytes = packet.buffer.length - packet.position;

    if (remainingBytes >= 4) {
      this.playerId = packet.readInt32();
    } else {
      this.playerId = 0;
    }

    if (remainingBytes >= 8) {
      this.additionalData = packet.readInt32();
    } else {
      this.additionalData = 0;
    }
  }

  async execute(): Promise<void> {
    const worldUser = this.userConnection as WorldUser;
    const player = worldUser.getPlayer();

    if (!player) {
      this.logger.warn("MY_REG: Player not found for user connection");
      return;
    }

    this.logger.info(`MY_REG request from ${player.name} - ID: ${this.playerId}, Data: ${this.additionalData}`);

    try {
      // MY_REG appears to be a simple acknowledgment/heartbeat packet
      // Just log and acknowledge without validation

      // Send simple acknowledgment back to client
      const response = new FlyffPacket(PacketType.MY_REG);
      response.writeInt32(player.objectId); // Send back actual player ID
      response.writeInt32(this.additionalData); // Echo back additional data

      this.userConnection.send(response);

      // Log the registration
      if (WorldPacketLogger.logMyReg) {
        WorldPacketLogger.logMyReg(
          player.name,
          this.playerId,
          player.name, // Use actual player name
          this.additionalData
        );
      }

      this.logger.info(`✓ MY_REG: Acknowledged registration for ${player.name} (sent ID: ${player.objectId})`);
    } catch (error) {
      this.logger.error(`MY_REG: Failed to process registration for ${player.name}: ${error}`);
    }
  }
}