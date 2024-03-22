import _ from "lodash";

import { ErrorType } from "../../../common/errorType";
import { DefineJob } from "../../../common/defineJob";
import { PacketType } from "../../../common/packetType";
import { IConfig } from "../../../interfaces/config";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { GenderType } from "../../../common/genderType";
import { SaveOptions, RemoveOptions } from "typeorm";
import Character from "../../../database/character";
import Account from "../../../database/account";
import EquipmentItem from "../../../database/equipmentItem";

@SetPacketType(PacketType.CREATE_PLAYER)
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
    this.bankPin = packet.readInt32();
    this.authKey = packet.readInt32();
  }

  async execute(): Promise<void> {
    const accounts = this.server?.instance?.getEntity("account");
    const characters = this.server?.instance?.getEntity("character");

    const account = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
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

    const defaultCharacter: IConfig = _.get(
      this.server.instance.config?.settings,
      "default-character"
    );

    console.log(this.server.instance.gameResources);

    // const newCharacter = new Character();
    // newCharacter.account = account;
    // newCharacter.name = this.characterName;
    // newCharacter.gender = this.gender;
    // newCharacter.level = defaultCharacter.level;
    // newCharacter.slot = this.slot;
    // newCharacter.bankPin = this.bankPin;
    // newCharacter.mapId = defaultCharacter.map;
    // newCharacter.positionX = defaultCharacter["pos-x"];
    // newCharacter.positionY = defaultCharacter["pos-y"];
    // newCharacter.positionZ = defaultCharacter["pos-z"];
    // newCharacter.hairId = this.hairMeshId;
    // newCharacter.hairColor = this.hairColor;
    // newCharacter.faceId = this.faceId;
    // newCharacter.jobId = DefineJob.JOB_VAGRANT;
    // newCharacter.strength = defaultCharacter.strength;
    // newCharacter.stamina = defaultCharacter.stamina;
    // newCharacter.intelligence = defaultCharacter.intelligence;
    // newCharacter.dexterity = defaultCharacter.dexterity;
    // newCharacter.gold = defaultCharacter.gold;
    // newCharacter.save();

    return this.userConnection.sendError(ErrorType.USER_EXISTS);
  }

  async createPlayerItem(
    character: Character,
    itemId: number,
    slot: number,
    quantity: number = 1,
    refinement: number = 0,
    element: number = 0,
    elementRefinement: number = 0
  ) {
    // int itemId = GameResources.Current.Items.Get(itemIdentifier)?.Id ?? -1;
    // if (itemId > 0)
    // {
    //     player.Items.Add(new PlayerItemEntity
    //     {
    //         StorageType = PlayerItemStorageType.Inventory,
    //         Slot = slot,
    //         Quantity = quantity,
    //         Item = new ItemEntity
    //         {
    //             Id = itemId,
    //             Refine = refine,
    //             Element = element,
    //             ElementRefine = elementRefine
    //         }
    //     });
    // }
  }

  async sendCharacterList(userCharacters: Character[]) {
    const packet = FlyffPacket.createWithHeader(PacketType.PLAYER_LIST);

    console.log(userCharacters);

    packet.writeInt32LE(this.authKey);
    packet.writeInt32LE(userCharacters?.length || 0);

    _.forEach(userCharacters, (character: Character) => {
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
      packet.writeUInt32(character.hairColor);
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
  }
}
