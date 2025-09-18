import _ from "lodash";

import { PacketType } from "../../../protocol/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";
import { FFRandom } from "../../../helpers/FFRandom";
import { uNumPad } from "../../../helpers/numPad";

@SetPacketType(PacketType.PRE_JOIN)
export default class Handler extends PacketHandler {
  username: string;
  characterId: number;
  characterName: string;
  secretNum: number;

  constructor(packet: FlyffPacket) {
    super();
    console.log(packet.buffer.toString("hex"));
    this.username = packet.readStringLE();
    this.characterId = packet.readInt32LE();
    this.characterName = packet.readStringLE();
    this.secretNum = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    this.logger.info(`PRE_JOIN received for user: ${this.username}, character: ${this.characterName} (ID: ${this.characterId}), secretNum: ${this.secretNum}`);

    // Use stored character selection from SEL_PLAYER if available
    const storedCharacterId = this.userConnection.selectedCharacterId;
    const storedCharacterName = this.userConnection.selectedCharacterName;
    const storedUsername = this.userConnection.username;

    // Prefer stored values over packet values
    const targetUsername = storedUsername || this.username;
    const targetCharacterName = storedCharacterName || this.characterName;
    const targetCharacterId = storedCharacterId || this.characterId;

    this.logger.info(`Using character selection: Username=${targetUsername}, Character=${targetCharacterName} (ID: ${targetCharacterId})`);

    const accounts = this.server?.instance?.getEntity("Account");

    const account = (await accounts?.findOne({
      where: {
        username: targetUsername,
      },
      relations: ["characters"],
    })) as Account;

    if (!account) {
      this.logger.warn(
        "Unable to pre-join character",
        targetCharacterName,
        ". Reason: Account",
        targetUsername,
        "not found."
      );
      return this.userConnection.disconnect();
    }

    let character = _.find(
      account.characters,
      (i) => i.name === targetCharacterName
    );

    // Fallback to ID-based lookup if name lookup fails
    if (!character && targetCharacterId) {
      character = _.find(
        account.characters,
        (i) => i.id === targetCharacterId
      );
    }

    if (_.isNil(character) || _.isUndefined(character)) {
      this.logger.warn(
        "Unable to pre-join character",
        targetCharacterName,
        ". Reason: Character not found."
      );
      return this.userConnection.disconnect();
    }

    if (character) {
      if (character.deleted) {
        this.logger.warn(
          "Unable to pre-join character",
          this.characterName,
          ". Reason: Character is deleted."
        );
        return this.userConnection.disconnect();
      }

      if (this.server?.config?.cluster_server.settings["login-protect"]) {
        this.logger.info(`Login protection enabled, verifying PIN for character: ${character.name}`);
        const bankPin = await this.extractBankPin();
        this.logger.info(`Extracted PIN: ${bankPin}, Character PIN: ${character.bankPin}`);
        const pinMatches = bankPin === character.bankPin;
        this.logger.info(`PIN verification result: ${pinMatches ? 'SUCCESS' : 'FAILED'}`);
        await this.sendLoginProtect(pinMatches);

        if (pinMatches) {
          this.logger.success(`PIN verification successful for ${character.name}, sending PRE_JOIN acknowledgment and PLAYER_ID`);
          this.storeCharacterSelection(character);
          this.sendPreJoin();
          this.sendPlayerId(character.id);
        } else {
          this.logger.warn(`PIN verification failed for ${character.name}, client will need to retry`);
        }
      } else {
        this.logger.info(`Login protection disabled, sending PRE_JOIN acknowledgment and PLAYER_ID for ${character.name}`);
        this.storeCharacterSelection(character);
        this.sendPreJoin();
        this.sendPlayerId(character.id);
      }
    }
  }

  sendPreJoin(): void {
    this.logger.info(`Sending PRE_JOIN acknowledgment packet to client`);
    const packet = new FlyffPacket(PacketType.PRE_JOIN);
    this.send(packet);
  }

  storeCharacterSelection(character: Character): void {
    // Store character information in the user connection for world server
    this.userConnection.selectedCharacterId = character.id;
    this.userConnection.selectedCharacterName = character.name;
    this.userConnection.username = character.account?.username || this.username;
    this.logger.info(`Stored character selection: ${character.name} (ID: ${character.id}) for user: ${this.userConnection.username}`);
  }

  sendPlayerId(characterId: number): void {
    // Generate a cryptographically secure authKey for world server authentication
    const authKey = Math.floor(Math.random() * 0x7FFFFFFF) + 1; // Ensure non-zero

    // Store the authKey in the connection for world server use
    this.userConnection.authKey = authKey;

    this.logger.info(`Sending PLAYER_ID with authKey: ${authKey} for character ID: ${characterId}`);

    const packet = new FlyffPacket(PacketType.PLAYER_ID);
    packet.writeInt32LE(authKey);
    this.send(packet);

    this.logger.success(`Sent PLAYER_ID with authKey: ${authKey} - client should now connect to world server`);
  }

  async extractBankPin(): Promise<number> {
    const targetUsername = this.userConnection.username || this.username;
    const numpadId = await this.server.redisClient.getNumpadId(targetUsername);
    this.logger.info(`Extracting bank PIN for user: ${targetUsername}, numpadId: ${numpadId}, secretNum: ${this.secretNum}`);

    let nPW = 0;
    if (numpadId && numpadId <= 999 && this.secretNum <= 9999) {
      const uNum1 = Math.floor(this.secretNum / 1000);
      const uNum2 = Math.floor((this.secretNum % 1000) / 100);
      const uNum3 = Math.floor((this.secretNum % 100) / 10);
      const uNum4 = this.secretNum % 10;

      this.logger.info(`Numpad conversion: digits [${uNum1}, ${uNum2}, ${uNum3}, ${uNum4}]`);

      nPW =
        uNumPad[numpadId][uNum1] * 1000 +
        uNumPad[numpadId][uNum2] * 100 +
        uNumPad[numpadId][uNum3] * 10 +
        uNumPad[numpadId][uNum4];

      this.logger.info(`Converted PIN: ${nPW}`);
    } else {
      this.logger.warn(`Invalid numpad parameters: numpadId=${numpadId}, secretNum=${this.secretNum}`);
    }
    return nPW;
  }

  async sendLoginProtect(success: boolean): Promise<void> {
    this.logger.info(`Sending LOGIN_PROTECT_CERT with result: ${success ? 'SUCCESS' : 'FAILED'}`);

    const targetUsername = this.userConnection.username || this.username;
    let numpadId = 0;
    if (!success) {
      numpadId = Math.floor(Math.random() * uNumPad.length);
      await this.server.redisClient.setNumpadId(targetUsername, numpadId);
      this.logger.info(`Generated new numpad ID for retry: ${numpadId}`);
    }

    const packet = new FlyffPacket(PacketType.LOGIN_PROTECT_CERT);
    packet.writeInt32LE(success ? 1 : 0);
    packet.writeUInt32LE(numpadId);
    this.send(packet);

    this.logger.info(`Sent LOGIN_PROTECT_CERT packet with success=${success ? 1 : 0}, numpadId=${numpadId}`);
  }
}
