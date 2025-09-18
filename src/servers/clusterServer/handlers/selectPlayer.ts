import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";

@SetPacketType(PacketType.SEL_PLAYER)
export default class Handler extends PacketHandler {
  characterId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.characterId = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    this.logger.info(`SEL_PLAYER received for characterId: ${this.characterId}`);

    // Validate that character exists for this user
    const accounts = this.server?.instance?.getEntity("Account");
    const characters = this.server?.instance?.getEntity("Character");

    const character = (await characters?.findOne({
      where: { id: this.characterId },
      relations: ["account"],
    })) as Character;

    if (!character) {
      this.logger.warn(`Character with ID ${this.characterId} not found`);
      return this.userConnection.disconnect();
    }

    this.logger.info(`Found character: ${character.name} (ID: ${character.id}) for account: ${character.account.username}`);

    // Store character selection for later PRE_JOIN processing
    this.userConnection.selectedCharacterId = character.id;
    this.userConnection.selectedCharacterName = character.name;
    this.userConnection.username = character.account.username;

    this.logger.info(`Stored character selection: ${character.name} (ID: ${character.id}) - waiting for PRE_JOIN with PIN`);

    // Send acknowledgment that character is selected (but don't send PLAYER_ID yet)
    // The client should now send PRE_JOIN with PIN verification
    // We can send an empty packet or a simple acknowledgment
    const packet = new FlyffPacket(PacketType.SEL_PLAYER);
    this.send(packet);

    this.logger.success(`Character ${character.name} selected - client should now send PRE_JOIN with PIN`);
  }
}