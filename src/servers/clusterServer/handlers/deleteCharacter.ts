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
    console.log({
      username: this.username,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      characterId: this.characterId,
      authKey: this.authKey,
    });
  }

  async execute(): Promise<void> {
    const accounts = this.server?.instance?.getEntity("Account");

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

    const character = _.find(account.characters, (i) => i.id === this.characterId) as Character;

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
      this.sendCharacterList(accounts);
    }
  }

  async sendCharacterList(accounts: Repository<ObjectLiteral> | undefined) {
    const account = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
      relations: [
        "characters",
        "characters.equipments",
        "characters.equipments.item",
      ],
    })) as Account;

    const packet = FlyffPacket.createWithHeader(PacketType.CHARACTER_LIST);
    const filteredCharacters = _.filter(account.characters, { deleted: false });

    packet.writeInt32LE(this.authKey);
    packet.writeInt32LE(filteredCharacters.length || 0);

    _.forEach(filteredCharacters, (character: Character) => {
      packet.writeInt32LE(character.slot);
      packet.writeInt32LE(1); // this number represents the selected character in the window
      packet.writeInt32LE(character.mapId);
      packet.writeInt32LE(0x0b + character.gender); // Model id
      packet.writeStringLE(character.name);
      packet.writeSingleLE(character.positionX);
      packet.writeSingleLE(character.positionY);
      packet.writeSingleLE(character.positionZ);
      packet.writeInt32LE(character.id);
      packet.writeInt32LE(0); // Party id
      packet.writeInt32LE(0); // Guild id
      packet.writeInt32LE(0); // War Id
      packet.writeInt32LE(character.skinSetId);
      packet.writeInt32LE(character.hairId);
      packet.writeInt32LE(character.hairColor);
      packet.writeInt32LE(character.faceId);
      packet.writeByte(character.gender);
      packet.writeInt32LE(character.jobId);
      packet.writeInt32LE(character.level);
      packet.writeInt32LE(0); // Job Level (Maybe master or hero ?)
      packet.writeInt32LE(character.strength);
      packet.writeInt32LE(character.stamina);
      packet.writeInt32LE(character.dexterity);
      packet.writeInt32LE(character.intelligence);
      packet.writeInt32LE(0); // Mode ??

      packet.writeInt32LE(character.equipments.length);

      _.forEach(character.equipments, (equipment: EquipmentItem) => {
        packet.writeInt32LE(equipment.item.itemId);
      });
    });

    packet.writeInt32LE(0); // Messenger?
    return this.send(packet);
  }
}
