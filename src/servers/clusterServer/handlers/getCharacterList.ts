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
    this.logger.info(`GET_CHARACTER_LIST request from ${this.username} for channel ${this.channelId}`);

    if (!this.server?.redisClient) {
      this.logger.error("Redis client not available");
      this.userConnection.disconnect();
      return;
    }

    const clusterName = this.server?.config?.cluster_server?.settings?.name;
    this.logger.info(`Using cluster name: ${clusterName}`);

    const channel = await this.server.redisClient.getChannelById(
      clusterName,
      this.channelId
    );

    // Debug: Log all available channels
    this.logger.info(`About to call getAllChannels for cluster: ${clusterName}`);
    const allChannels = await this.server.redisClient.getAllChannels(
      clusterName
    );
    this.logger.info(`getAllChannels returned: ${JSON.stringify(allChannels)}`);

    // Also try to get the cluster directly to see raw data
    const clusterData = await this.server.redisClient.getCluster(
      clusterName
    );
    this.logger.info(`Raw cluster data: ${JSON.stringify(clusterData)}`);

    this.logger.info(`Requested channel ID: ${this.channelId}`);
    this.logger.info(`Channel lookup result: ${JSON.stringify(channel)}`)
    if (!channel) {
      this.logger.warn(
        "Unable to get character list for",
        this.username,
        ". Reason: Channel not found."
      );
      this.userConnection.disconnect();
      return;
    }
    const accounts = this.server?.instance?.getEntity("Account");
    if (!accounts) {
      this.logger.error("Failed to get Account repository");
      this.userConnection.disconnect();
      return;
    }

    this.logger.info(`Looking up account for username: ${this.username}`);

    const account = (await accounts.findOne({
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

    this.logger.info(`Account lookup result: ${account ? `Found account ID ${account.id} with ${account.characters?.length || 0} characters` : 'No account found'}`);
    if (!account) {
      this.logger.warn(
        "Unable to get character list for",
        this.username,
        ". Reason: Incorrect credentials."
      );
      this.userConnection.disconnect();
      return;
    }
    this.userConnection.username = account.username;
    this.userConnection.userId = account.id;

    this.logger.info(`Sending character list with ${account.characters?.length || 0} characters and authKey ${this.authKey}`);
    this.userConnection.sendCharacterList(account.characters, this.authKey);

    if (channel?.host) {
      this.logger.info(`Sending channel IP: ${channel.host}`);
      this.sendChannelIp(channel.host);
    }

    if (this.server?.config?.settings["login-protect"]) {
      this.logger.info("Sending numpad ID for login protection");
      await this.sendNumPadId();
    }

    this.logger.success(`Character list sent successfully to ${this.username}`);
  }

  sendChannelIp(ip: string) {
    const packet = new FlyffPacket(PacketType.CACHE_ADDR);
    packet.writeStringLE(ip);
    return this.send(packet);
  }

  async sendNumPadId() {
    if (!this.server?.redisClient) {
      this.logger.error("Redis client not available for numpad");
      return;
    }

    const numpadId = Math.floor(Math.random() * uNumPad.length);
    await this.server.redisClient.setNumpadId(this.username, numpadId);
    const packet = new FlyffPacket(
      PacketType.LOGIN_PROTECT_NUMPAD
    );
    packet.writeUInt32LE(numpadId);
    this.send(packet);
  }
}
