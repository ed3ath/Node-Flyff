import _ from "lodash";

import { PacketType } from "../../../common/packetType";
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
    const accounts = this.server?.instance?.getEntity("Account");

    const account = (await accounts?.findOne({
      where: {
        username: this.username,
      },
      relations: ["characters"],
    })) as Account;

    if (!account) {
      this.logger.warn(
        "Unable to pre-join character",
        this.characterName,
        ". Reason: Account",
        this.username,
        "not found."
      );
      return this.userConnection.disconnect();
    }

    const character = _.find(
      account.characters,
      (i) => i.name === this.characterName
    );

    if (_.isNil(character) || _.isUndefined(character)) {
      this.logger.warn(
        "Unable to pre-join character",
        this.characterName,
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

      if (this.server?.config?.settings["login-protect"]) {
        const bankPin = await this.extractBankPin();
        await this.sendLoginProtect(bankPin === character.bankPin);
      }
      this.sendPreJoin();
    }
  }

  sendPreJoin(): void {
    const packet = FlyffPacket.createWithHeader(PacketType.PRE_JOIN);
    this.send(packet);
  }

  async extractBankPin(): Promise<number> {
    const numpadId = await this.server.redisClient.getNumpadId(this.username);
    let nPW = 0;
    if (numpadId && numpadId <= 999 && this.secretNum <= 9999) {
      const uNum1 = Math.floor(this.secretNum / 1000);
      const uNum2 = Math.floor((this.secretNum % 1000) / 100);
      const uNum3 = Math.floor((this.secretNum % 100) / 10);
      const uNum4 = this.secretNum % 10;
      nPW =
        uNumPad[numpadId][uNum1] * 1000 +
        uNumPad[numpadId][uNum2] * 100 +
        uNumPad[numpadId][uNum3] * 10 +
        uNumPad[numpadId][uNum4];
    }
    return nPW;
  }

  async sendLoginProtect(success: boolean): Promise<void> {
    let numpadId = 0;
    if (!success) {
      numpadId = Math.floor(Math.random() * uNumPad.length);
      await this.server.redisClient.setNumpadId(this.username, numpadId);
    }
    const packet = FlyffPacket.createWithHeader(PacketType.LOGIN_PROTECT_CERT);
    packet.writeInt32LE(success ? 1 : 0);
    packet.writeUInt32LE(numpadId);
    this.send(packet);
  }
}
