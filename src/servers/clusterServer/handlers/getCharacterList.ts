import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";
import EquipmentItem from "../../../database/equipmentItem";

@SetPacketType(PacketType.GET_CHARACTER_LIST)
export default class Handler extends PacketHandler {
  msgVer: string;
  authKey: number;
  username: string;
  password: string;
  channelId: number;

  constructor(packet: FlyffPacket) {
    super();
    this.msgVer = packet.readStringLE();
    this.authKey = packet.readInt32LE();
    this.username = packet.readStringLE();
    this.password = packet.readStringLE();
    this.channelId = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const channel = await this.server?.redisClient?.getChannelById(
      this.server?.config?.settings?.name,
      this.channelId
    );

    if (!channel) {
      this.logger.warn(
        "Unable to get character list for",
        this.username,
        ". Reason: Channel not found."
      );
      this.userConnection.disconnect();
    }

    const accounts = this.server?.instance?.getEntity("account");

    const account = (await accounts?.findOne({
      where: {
        username: this.username,
        password: this.password,
      },
    })) as Account;

    if (!account) {
      this.logger.warn(
        "Unable to get character list for",
        this.username,
        ". Reason: Incorrect credentials."
      );
      this.userConnection.disconnect();
    }

    this.userConnection.username = account.username;
    this.userConnection.userId = account.id;

    await this.sendCharacterList(account.characters)
    if (channel?.host) {
      this.sendChannelIp(channel.host)
    }
  }

  async sendCharacterList(userCharacters: Character[]) {
    const packet = FlyffPacket.createWithHeader(PacketType.PLAYER_LIST);  

    console.log(userCharacters)

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

    packet.writeInt32LE(0); // Messenger?
    return this.send(packet);
  }
  sendChannelIp(ip: string) {
    const packet = FlyffPacket.createWithHeader(PacketType.CACHE_ADDR);
    packet.writeStringLE(ip)
    return this.send(packet);
  }
}
