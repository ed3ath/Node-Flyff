import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";

@SetPacketType(PacketType.JOIN_GAME)
export default class Handler extends PacketHandler {
  channelId: number;
  characterId: number;
  authKey: number;
  partyId: number;
  guildId: number;
  guildWarId: number;
  idOfMulti: number;
  slot: number;
  characterName: string;
  username: string;
  password: string;
  messengerState: number;
  messengerCount: number;

  constructor(packet: FlyffPacket) {
    super();
    this.channelId = packet.readInt32LE();
    this.characterId = packet.readInt32LE();
    this.authKey = packet.readInt32LE();
    this.partyId = packet.readInt32LE();
    this.guildId = packet.readInt32LE();
    this.guildWarId = packet.readInt32LE();
    this.idOfMulti = packet.readInt32LE(); // what is this?
    this.slot = packet.readByte();
    this.characterName = packet.readString();
    this.username = packet.readString();
    this.password = packet.readString();
    this.messengerState = packet.readInt32LE();
    this.messengerCount = packet.readInt32LE();
  }

  async execute(): Promise<void> {
    const channel = await this.server?.redisClient?.getChannelById(
      this.server?.config?.settings?.name,
      this.channelId
    );
    if (!channel) {
      this.logger.warn(
        "Unable to join game for user",
        this.characterName,
        ". Reason: Channel not found."
      );
      this.userConnection.disconnect();
    }
    const accounts = this.server?.instance?.getEntity("Account");
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
    if (!account) {
      this.logger.warn(
        "Unable to join game for user",
        this.characterName,
        ". Reason: Incorrect credentials."
      );
      this.userConnection.disconnect();
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
    }

    const modelId = character.gender === 0 ? 11 : 12;
    // const Map
    // TODO map
  }
}
