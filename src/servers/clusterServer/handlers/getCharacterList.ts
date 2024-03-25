import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import Account from "../../../database/account";
import Character from "../../../database/character";
import EquipmentItem from "../../../database/equipmentItem";
import { uNumPad } from "../../../helpers/numPad";

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
        "Unable to get character list for",
        this.username,
        ". Reason: Incorrect credentials."
      );
      this.userConnection.disconnect();
    }
    this.userConnection.username = account.username;
    this.userConnection.userId = account.id;

    this.userConnection.sendCharacterList(account.characters, this.authKey);
    if (channel?.host) {
      this.sendChannelIp(channel.host);
    }
    if (
      this.server?.config?.settings["login-protect"]
    ) {
      await this.sendNumPadId();
    }
  }

  sendChannelIp(ip: string) {
    const packet = FlyffPacket.createWithHeader(PacketType.CACHE_ADDR);
    packet.writeStringLE(ip);
    return this.send(packet);
  }

  async sendNumPadId() {
    const numpadId = Math.floor(Math.random() * uNumPad.length);
    await this.server.redisClient.setNumpadId(this.username, numpadId);
    const packet = FlyffPacket.createWithHeader(
      PacketType.LOGIN_PROTECT_NUMPAD
    );
    packet.writeUInt32LE(numpadId);
    this.send(packet);
  }
}
