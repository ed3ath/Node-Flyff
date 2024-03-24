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
}
