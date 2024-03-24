import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";
import { FFRandom } from "../../../helpers/FFRandom";

@SetPacketType(PacketType.PRE_JOIN)
export default class Handler extends PacketHandler {
  username: string;
  characterId: number;
  characterName: string;
  bankPin: number;

  constructor(packet: FlyffPacket) {
    super();
    this.username = packet.readStringLE();
    this.characterId = packet.readInt32LE();
    this.characterName = packet.readStringLE();
    this.bankPin = packet.readInt32LE();
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
        ". Reason: Account", this.username, "not found."
      );
      return this.userConnection.disconnect();
    }

    const character = _.find(account.characters, (i) => i.name === this.characterName);

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

      if (
        this.server?.config?.settings["login-protect"] &&
        character.bankPin !== this.bankPin
      ) {
        return this.sendLoginProtect();
      }
      this.sendPreJoin();
    }
  }

  sendLoginProtect(): void {
    const packet = FlyffPacket.createWithHeader(PacketType.LOGIN_PROTECT_CERT);
    packet.writeInt32(0);
    packet.writeInt32(FFRandom.random(0, 1000));
    this.send(packet);
  }

  sendPreJoin(): void {
    const packet = FlyffPacket.createWithHeader(PacketType.PRE_JOIN);
    this.send(packet);
  }
}
