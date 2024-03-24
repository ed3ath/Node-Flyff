import _ from "lodash";

import { ErrorType } from "../../../common/errorType";
import { DefineJob } from "../../../common/defineJob";
import { PacketType } from "../../../common/packetType";
import { IConfig } from "../../../interfaces/config";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Character from "../../../database/character";
import Account from "../../../database/account";
import EquipmentItem from "../../../database/equipmentItem";
import Item from "../../../database/item";
import { GenderType } from "../../../common/genderType";
import { ItemPartType } from "../../../common/itemPartyType";
import { Repository, ObjectLiteral } from "typeorm";

@SetPacketType(PacketType.CREATE_CHARACTER)
export default class Handler extends PacketHandler {
  username: string;
  password: string;
  slot: number;
  characterName: string;
  faceId: number;
  costumeId: number;
  skinSet: number;
  hairMeshId: number;
  hairColor: number;
  gender: number;
  job: DefineJob;
  headMesh: number;
  bankPin: number;
  authKey: number;

  constructor(packet: FlyffPacket) {
    super();
    this.username = packet.readString();
    this.password = packet.readString();
    this.slot = packet.readByte();
    this.characterName = packet.readString();
    this.faceId = packet.readByte();
    this.costumeId = packet.readByte();
    this.skinSet = packet.readByte();
    this.hairMeshId = packet.readByte();
    this.hairColor = packet.readUInt32();
    this.gender = packet.readByte();
    this.job = packet.readByte();
    this.headMesh = packet.readByte();
    this.bankPin = packet.readInt32LE();
    this.authKey = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const accounts = this.server?.instance?.getEntity("Account");
    const characters = this.server?.instance?.getEntity("Character");

    let account = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
      relations: ["characters", "characters.equipments"],
    })) as Account;

    if (!account) {
      this.logger.warn(
        "Unable to create character for",
        this.username,
        ". Reason: Incorrect credentials."
      );
      this.userConnection.disconnect();
    }

    const usernameTaken = await characters?.existsBy({
      name: this.characterName,
    });

    if (usernameTaken) {
      this.logger.warn(
        "Unable to create character for",
        this.username,
        ". Reason: Character name",
        this.characterName,
        "already taken"
      );
      return this.userConnection.sendError(ErrorType.USER_EXISTS);
    }

    if (_.some(account.characters, { deleted: false, slot: this.slot })) {
      return this.userConnection.sendError(ErrorType.DUPLICATE_SLOT);
    }

    const defaultCharacter: IConfig = _.get(
      this.server.instance.config?.settings,
      "default-character"
    );

    //console.log(this.server.instance.gameResources);

    console.log({
      username: this.username,
      password: this.password,
      slot: this.slot,
      characterName: this.characterName,
      faceId: this.faceId,
      costumeId: this.costumeId,
      skinSet: this.skinSet,
      hairMeshId: this.hairMeshId,
      hairColor: this.hairColor,
      gender: this.gender,
      job: this.job,
      headMesh: this.headMesh,
      bankPin: this.bankPin,
      authKey: this.authKey,
    });

    const newCharacter = new Character();
    newCharacter.account = account;
    newCharacter.name = this.characterName;
    newCharacter.gender = this.gender;
    newCharacter.level = defaultCharacter.level;
    newCharacter.slot = this.slot;
    newCharacter.bankPin = this.bankPin;
    newCharacter.mapId = defaultCharacter.map;
    newCharacter.positionX = defaultCharacter["pos-x"];
    newCharacter.positionY = defaultCharacter["pos-y"];
    newCharacter.positionZ = defaultCharacter["pos-z"];
    newCharacter.skinSetId = this.skinSet;
    newCharacter.hairId = this.hairMeshId;
    newCharacter.hairColor = this.hairColor;
    newCharacter.faceId = this.headMesh;
    newCharacter.jobId = DefineJob.JOB_VAGRANT;
    newCharacter.strength = defaultCharacter.strength;
    newCharacter.stamina = defaultCharacter.stamina;
    newCharacter.intelligence = defaultCharacter.intelligence;
    newCharacter.dexterity = defaultCharacter.dexterity;
    newCharacter.gold = defaultCharacter.gold;
    newCharacter.equipments = [];
    await newCharacter.save();

    const gender = this.gender === GenderType.Male ? "male" : "female";
    await this.createPlayerItem(
      newCharacter,
      defaultCharacter.equipped[gender].hat,
      ItemPartType.Hat
    );
    await this.createPlayerItem(
      newCharacter,
      defaultCharacter.equipped[gender].body,
      ItemPartType.UpperBody
    );
    await this.createPlayerItem(
      newCharacter,
      defaultCharacter.equipped[gender].hand,
      ItemPartType.Hand
    );
    await this.createPlayerItem(
      newCharacter,
      defaultCharacter.equipped[gender]["right-weapon"],
      ItemPartType.RightWeapon
    );
    await this.createPlayerItem(
      newCharacter,
      defaultCharacter.equipped[gender]["left-weapon"],
      ItemPartType.LeftWeapon
    );
    await this.createPlayerItem(
      newCharacter,
      defaultCharacter.equipped[gender].boots,
      ItemPartType.Foot
    );
    await newCharacter.save();

    account = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
    })) as Account;
    console.log(account);
    return this.sendCharacterList(accounts);
  }

  async createPlayerItem(
    character: Character,
    itemIdentifier: string | number,
    slot: number,
    quantity: number = 1,
    refinement: number = 0,
    element: number = 0,
    elementRefinement: number = 0
  ) {
    const item = await this.server.instance.gameResources?.itemResources?.get(
      itemIdentifier
    );
    if (!_.isNil(item) && !_.isUndefined(item) && !_.isNaN(item.id)) {
      const itemEntity = new Item();
      itemEntity.itemId = item.id;
      itemEntity.refinement = refinement;
      itemEntity.element = element;
      itemEntity.elementRefinement = elementRefinement;
      await itemEntity.save();

      const equipmentItem = new EquipmentItem();
      equipmentItem.character = character;
      equipmentItem.item = itemEntity;
      equipmentItem.quantity = quantity;
      equipmentItem.slot = slot;
      await equipmentItem.save();

      character.equipments.push(equipmentItem);
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
