import crypto from 'crypto'

import { PacketType } from "../../../common/packetType";
import {
  buildEncryptionKeyFromString,
  decryptByteArray,
} from "../../../libraries/crypto";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler, SetPacketType } from "../../../libraries/packetHandler";

import { ErrorType } from "../../../common/errorType";
import { IAccount } from "../../../entities/account/accounts";
import { LoginServer } from "../loginServer";
import { IChannel, ICluster } from "../../../interfaces/cluster";
import _ from "lodash";

@SetPacketType(PacketType.CERTIFY)
export default class CertifierHandler extends PacketHandler {
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
    const errorPacket = FlyffPacket.createWithHeader(PacketType.ERROR);
    if (
      this.server?.instance?.config?.security["build-version"] !==
      this.msgVersion
    ) {
      errorPacket.writeUInt32LE(ErrorType.ILLEGAL_VER);
      return this.send(errorPacket);
    }
    const key = buildEncryptionKeyFromString("dldhsvmflvm", 16);
    const password = decryptByteArray(this.passwordByte, key);
    const accounts = this.server?.instance
      ?.getDatabase("account")
      .getRepository("Account");

    const account = (await accounts?.findOne({
      where: {
        username: this.username,
      },
    })) as IAccount;

    if (!account) {
      errorPacket.writeUInt32LE(ErrorType.NO_ACCOUNT);
      return this.send(errorPacket);
    } else if (account.password !== password) {
      errorPacket.writeUInt32LE(ErrorType.INVALID_PASSWORD);
      return this.send(errorPacket);
    } else if (!this.validateAccount(errorPacket, account)) {
      return this.send(errorPacket);
    } else {
      account.lastActivity = new Date().getTime();
      await account.save();
      this.userConnection.userId = account.id;
      this.userConnection.username = account.username;
      await this.sendServerList();
    }
  }

  validateAccount(packet: FlyffPacket, account: IAccount): boolean {
    if (account.deleted) {
      packet.writeUInt32LE(ErrorType.NO_ACCOUNT);
      return false;
    } else if (account.banned) {
      packet.writeUInt32LE(ErrorType.ACCOUNT_BANNED);
      return false;
    } else if (!account.verified) {
      packet.writeUInt32LE(ErrorType.VERIFICATION_REQUIRED);
      return false;
    }
    return true;
  }

  getRandomInt(min, max) {
    // Calculate the range of possible values
    const range = max - min + 1;
  
    // Generate random bytes
    const randomBytes = crypto.randomBytes(4); // 4 bytes for 32-bit integer
  
    // Convert bytes to an unsigned integer (32-bit)
    const randomNumber = randomBytes.readUInt32BE();
  
    // Map the random number to the desired range
    return min + Math.floor(randomNumber / (0xffffffff / range));
  }
  

  async sendServerList() {
    const packet = FlyffPacket.createWithHeader(PacketType.SERVER_LIST);
    const clusters = await this.server.redisClient.getAllClusters();
    console.log(clusters)

    packet.writeInt32LE(0); // Authentication key
    packet.writeByte(1);
    packet.writeStringLE(this.username);
    packet.writeInt32LE(_.sumBy(clusters, 'channels.length') + clusters.length);

    console.log("count", _.sumBy(clusters, 'channels.length') + clusters.length)

    clusters.forEach((cluster: ICluster, i: number) => {
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

      cluster.channels.forEach((channel: IChannel, j) => {
        const channelId = j + 1;
        packet.writeInt32LE(clusterId); // cluster id
        packet.writeInt32LE(this.getRandomInt(1000, 6566545)); // channel id
        packet.writeStringLE(channel.name);
        packet.writeStringLE(channel.host);
        packet.writeInt32LE(0); // b18 ?
        packet.writeInt32LE(channel.currentUsers);
        packet.writeInt32LE(channel.enabled ? 1 : 0);
        packet.writeInt32LE(channel.maxUsers);
      });
    });
    console.log(packet.buffer.toString('hex'));
    return this.send(packet);
  }
}
