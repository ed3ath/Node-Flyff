import _ from 'lodash';

import { PacketType } from '../../../common/packetType';
import { FlyffPacket } from '../../../libraries/flyffPacket';
import { PacketHandler } from '../../../libraries/packetHandler';
import { SetPacketType } from '../../../decorators/packetHandler';
import Account from '../../../database/account';
import Character from '../../../database/character';

@SetPacketType(PacketType.SEL_PLAYER)
export default class Handler extends PacketHandler {
  characterId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.characterId = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    console.log(`SEL_PLAYER handler called for characterId: ${this.characterId}, username: ${this.userConnection.username}`);

    // Get the current user's account (should be set during authentication)
    if (!this.userConnection.username) {
      this.logger.warn('Unable to select player: No authenticated user');
      return this.userConnection.disconnect();
    }

    // Find the account with characters
    const accounts = this.server?.instance?.getEntity('Account');
    const account = (await accounts?.findOne({
      where: {
        username: this.userConnection.username,
      },
      relations: ['characters'],
    })) as Account;

    if (!account) {
      this.logger.warn(
        'Unable to select player: Account',
        this.userConnection.username,
        'not found.'
      );
      return this.userConnection.disconnect();
    }

    // Find the requested character
    const character = _.find(
      account.characters,
      (c) => c.id === this.characterId
    );

    if (!character) {
      this.logger.warn(
        'Unable to select player: Character ID',
        this.characterId,
        'not found for account',
        this.userConnection.username
      );
      return this.userConnection.disconnect();
    }

    if (character.deleted) {
      this.logger.warn(
        'Unable to select player: Character',
        character.name,
        'is deleted.'
      );
      return this.userConnection.disconnect();
    }

    // Generate auth key for world server session
    const authKey = Math.floor(Math.random() * 2147483647) + 1; // Random 32-bit positive integer

    // Store session in Redis for world server validation
    // Session expires in 60 seconds to prevent stale sessions
    console.log(`Creating session with authKey: ${authKey}, characterId: ${character.id}, username: ${account.username}`);
    await this.server?.redisClient?.setCharacterSession(
      authKey,
      character.id,
      account.username,
      account.password, // TODO: Consider if we need to store password hash
      60, // expire in 60 seconds
    );

    // Send PLAYER_ID packet with auth key
    this.sendPlayerId(authKey);

    this.logger.success(
      `Character ${character.name} (ID: ${character.id}) selected by ${account.username}. AuthKey: ${authKey}`
    );
  }

  sendPlayerId(authKey: number): void {
    const packet = new FlyffPacket(PacketType.PLAYER_ID);
    packet.writeInt32LE(authKey);
    this.send(packet);
  }
}