import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";

@SetPacketType(PacketType.SEL_PLAYER)
export default class Handler extends PacketHandler {
  characterId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.characterId = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    this.logger.info(`SEL_PLAYER received for character ID: ${this.characterId}`);

    // Store the selected character ID in the connection
    this.userConnection.selectedCharacterId = this.characterId;

    // The actual character validation and PLAYER_ID sending happens in PRE_JOIN
    // This packet might just be an acknowledgment that the character is selected
    this.logger.info(`Character ${this.characterId} selected successfully`);
  }
}