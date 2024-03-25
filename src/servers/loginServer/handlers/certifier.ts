import _ from "lodash";

import { PacketType } from "../../../common/packetType";
import {
  buildEncryptionKeyFromString,
  decryptByteArray,
} from "../../../libraries/crypto";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { ErrorType } from "../../../common/errorType";
import { IChannel, ICluster } from "../../../interfaces/cluster";
import Account from "../../../database/account";
import { uNumPad } from "../../../helpers/numPad";

@SetPacketType(PacketType.CERTIFY)
export default class Handler extends PacketHandler {
  msgVersion: string;
  username: string;
  passwordByte: Buffer;

  constructor(packet: FlyffPacket) {
    super();
    this.msgVersion = packet.readString();
    this.username = packet.readString();
    this.passwordByte = packet.readBytes(16 * 42);
  }

  async execute(): Promise<void> {
    if (
      this.server?.instance?.config?.security["build-version"] !==
      this.msgVersion
    ) {
      return this.userConnection.sendError(ErrorType.ILLEGAL_VER);
    }
    const key = buildEncryptionKeyFromString("dldhsvmflvm", 16);
    const password = decryptByteArray(this.passwordByte, key);
    const database = this.server?.instance?.getEntity("account");

    const account = (await database?.findOne({
      where: {
        username: this.username,
      },
    })) as Account;

    if (!account) {
      return this.userConnection.sendError(ErrorType.NO_ACCOUNT);
    } else if (account.password !== password) {
      return this.userConnection.sendError(ErrorType.INVALID_PASSWORD);
    } else if (account.deleted) {
      return this.userConnection.sendError(ErrorType.NO_ACCOUNT);
    } else if (account.banned) {
      return this.userConnection.sendError(ErrorType.ACCOUNT_BANNED);
    } else if (!account.verified) {
      return this.userConnection.sendError(ErrorType.VERIFICATION_REQUIRED);
    } else if (this.server.isUserAccountConnected(account.username)) {
      return this.userConnection.sendError(ErrorType.ALREADY_CONNECTED);
    } else {
      account.lastActivity = new Date().getTime();
      await account.save();
      this.userConnection.userId = account.id;
      this.userConnection.username = account.username;
      await this.sendServerList();
    }
  }

  async sendServerList() {
    const packet = FlyffPacket.createWithHeader(PacketType.SERVER_LIST);
    const clusters = await this.server.redisClient.getAllClusters();

    packet.writeInt32LE(0); // Authentication key
    packet.writeByte(1);
    packet.writeStringLE(this.username);
    packet.writeInt32LE(_.sumBy(clusters, "channels.length") + clusters.length);

    _.forEach(clusters, (cluster: ICluster, i: number) => {
      // cluster.channels = []
      const clusterId = i + 1;
      packet.writeInt32LE(-1); // Parent server id
      packet.writeInt32LE(clusterId); // cluster id
      packet.writeStringLE(cluster.name);
      packet.writeStringLE(cluster.host);
      packet.writeInt32LE(0); // b18 ?
      packet.writeInt32LE(0); // Connected count
      packet.writeInt32LE(cluster.enabled ? 1 : 0);
      packet.writeInt32LE(0); // Maximum users

      _.forEach(cluster.channels, (channel: IChannel, j) => {
        packet.writeInt32LE(clusterId); // cluster id
        packet.writeInt32LE(channel.id as number); // channel id
        packet.writeStringLE(channel.name);
        packet.writeStringLE(channel.host);
        packet.writeInt32LE(0); // b18 ?
        packet.writeInt32LE(channel.currentUsers);
        packet.writeInt32LE(channel.enabled ? 1 : 0);
        packet.writeInt32LE(channel.maxUsers);
      });
    });
    return this.send(packet);
  }
}
