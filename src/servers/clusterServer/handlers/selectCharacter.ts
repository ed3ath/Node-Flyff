import _ from 'lodash'

import { PacketType } from '../../../common/packetType'
import { FlyffPacket } from '../../../libraries/flyffPacket'
import { PacketHandler } from '../../../libraries/packetHandler'
import { SetPacketType } from '../../../decorators/packetHandler'
import Account from '../../../database/account'
import Character from '../../../database/character'

@SetPacketType(PacketType.SEL_PLAYER)
export default class Handler extends PacketHandler {
  characterId: number

  constructor (packet: FlyffPacket) {
    super()
    this.characterId = packet.readInt32LE()
  }

  async execute(): Promise<void> {
    // Get character information
    const characters = this.server?.instance?.getEntity("Character");
    const character = (await characters?.findOne({
      where: {
        id: this.characterId,
      },
      relations: ["account"],
    })) as Character;

    if (!character || !character.account) {
      this.logger.warn(
        "Unable to select character with ID",
        this.characterId,
        ". Reason: Character or account not found."
      );
      return this.userConnection.disconnect();
    }

    if (character.deleted) {
      this.logger.warn(
        "Unable to select character",
        character.name,
        ". Reason: Character is deleted."
      );
      return this.userConnection.disconnect();
    }

    // Generate session key for world server authentication
    const sessionKey = Math.floor(Math.random() * Math.pow(2, 32));

    // Store session info in Redis for world server to validate
    await this.server.redisClient.setCharacterSession(
      sessionKey,
      character.id,
      character.account.username,
      character.account.password,
      300 // 5 minutes expiry
    );

    // Send world server connection info to client
    this.sendWorldServerInfo(sessionKey, character);

    this.logger.info(
      `Character ${character.name} (ID: ${character.id}) selected by user ${character.account.username}. Redirecting to world server.`
    );
  }

  sendWorldServerInfo(sessionKey: number, character: Character): void {
    const packet = new FlyffPacket(PacketType.JOIN_GAME);

    // Channel ID (from config)
    packet.writeInt32LE(1); // Channel 1

    // Character info
    packet.writeInt32LE(character.id);
    packet.writeInt32LE(sessionKey); // Auth key/session key
    packet.writeInt32LE(0); // Party ID
    packet.writeInt32LE(0); // Guild ID
    packet.writeInt32LE(0); // Guild War ID
    packet.writeInt32LE(0); // ID of Multi
    packet.writeByte(character.slot);
    packet.writeStringLE(character.name);
    packet.writeStringLE(character.account.username);
    packet.writeStringLE(character.account.password);
    packet.writeInt32LE(0); // Messenger state
    packet.writeInt32LE(0); // Messenger count

    // World server connection info
    const worldServerHost = this.server.config.settings["world-server"].host;
    const worldServerPort = this.server.config.settings["world-server"].port;

    packet.writeInt32LE(1); // World server count
    packet.writeStringLE(worldServerHost); // World server IP
    packet.writeInt32LE(worldServerPort); // World server port
    packet.writeInt32LE(1); // Channel ID
    packet.writeStringLE("Channel 1"); // Channel name

    this.send(packet);
  }
}