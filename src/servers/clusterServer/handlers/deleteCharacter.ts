import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";
import { FFRandom } from "../../../helpers/FFRandom";
import EquipmentItem from "../../../database/equipmentItem";
import { Repository, ObjectLiteral } from "typeorm";
import { ErrorType } from "../../../common/errorType";

@SetPacketType(PacketType.DELETE_CHARACTER)
export default class Handler extends PacketHandler {
  username: string;
  password: string;
  passwordConfirm: string;
  characterId: number;
  authKey: number;

  constructor(packet: FlyffPacket) {
    super();
    this.username = packet.readStringLE();
    this.password = packet.readStringLE();
    this.passwordConfirm = packet.readStringLE();
    this.characterId = packet.readInt32LE();
    this.authKey = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const accounts = this.server?.instance?.getEntity("Account");
    const characters = this.server?.instance?.getEntity("Character");

    const account = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
      relations: ["characters"],
    })) as Account;

    if (!account) {
      this.logger.warn(
        "Unable to delete character",
        this.characterId,
        ". Reason: Account",
        this.username,
        "not found."
      );
      return this.userConnection.sendError(ErrorType.NO_ACCOUNT);
    }

    const character = _.find(
      account.characters,
      (i) => i.id === this.characterId
    ) as Character;

    if (_.isNil(character) || _.isUndefined(character)) {
      this.logger.warn(
        "Unable to delete character",
        this.characterId,
        ". Reason: Character not found."
      );
      return this.userConnection.sendError(ErrorType.INVALID_SERVICE_PLAYER);
    }

    if (character) {
      if (character.deleted) {
        this.logger.warn(
          "Unable to delete character",
          this.characterId,
          ". Reason: Character is already deleted."
        );
        return this.userConnection.sendError(ErrorType.INVALID_SERVICE_PLAYER);
      }

      if (this.password !== this.passwordConfirm) {
        this.logger.warn(
          "Unable to delete character",
          this.characterId,
          ". Reason: Password is incorrect."
        );
        return this.userConnection.sendError(ErrorType.INVALID_PASSWORD);
      }

      character.deleted = true;
      await character.save();
      const userCharacters = (await characters?.find({
        where: {
          account: {
            username: this.username,
          },
        },
        relations: ["account", "equipments", "equipments.item"],
      })) as Character[];
      this.userConnection.sendCharacterList(userCharacters, this.authKey);
    }
  }
}
