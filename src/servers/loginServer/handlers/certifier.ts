import _ from "lodash";

import { PacketType } from "../../../protocol/packetType";
import {
  buildEncryptionKeyFromString,
  decryptByteArray,
} from "../../../libraries/crypto";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { ErrorType } from "../../../types/errorType";
import { IChannel, ICluster } from "../../../interfaces/cluster";
import Account from "../../../database/account";

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
      this.server?.instance?.config?.login_server.security["build-version"] !==
      this.msgVersion
    ) {
      return this.userConnection.sendError(ErrorType.ILLEGAL_VER);
    }
    const key = buildEncryptionKeyFromString(
      this.server?.instance?.config?.login_server.security[
        "password-encryption-key"
      ],
      16
    );
    const password = decryptByteArray(this.passwordByte, key);
    const database = this.server?.instance?.getEntity("Account");

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

      // Store authentication state in Redis for cluster server validation
      const authKey = Math.floor(Math.random() * 0x7FFFFFFF) + 1;
      this.userConnection.authKey = authKey;

      await this.server.redisClient.setUserAuthState(account.username, {
        authenticated: true,
        authKey: authKey,
        timestamp: Date.now(),
        sessionId: this.userConnection.sessionId
      });

      this.logger.info(`Stored authentication state for user: ${account.username} with authKey: ${authKey}`);

      // Send server list after successful authentication
      await this.sendServerList();
    }
  }

  async sendServerList() {
    const packet = new FlyffPacket(PacketType.SERVER_LIST);
    const clusters = await this.server.redisClient.getAllClusters();

    this.logger.info(`Sending server list to ${this.username} with ${clusters.length} clusters`);

    packet.writeInt32(0); // Authentication key
    packet.writeByte(1);
    packet.writeString(this.username);
    packet.writeInt32(_.sumBy(clusters, "channels.length") + clusters.length);

    _.forEach(clusters, (cluster: ICluster, i: number) => {
      const clusterId = i + 1;
      packet.writeInt32(-1); // Parent server id
      packet.writeInt32(clusterId); // cluster id
      packet.writeString(cluster.name);
      // Send cluster server host - client will connect to cluster server for character management
      packet.writeString(cluster.host);
      packet.writeInt32(0); // b18 ?
      packet.writeInt32(0); // Connected count
      packet.writeInt32(cluster.enabled ? 1 : 0);
      packet.writeInt32(0); // Maximum users

      _.forEach(cluster.channels, (channel: IChannel, j) => {
        packet.writeInt32(clusterId); // cluster id
        packet.writeInt32(channel.id as number); // channel id
        packet.writeString(channel.name);
        packet.writeString(channel.host);
        packet.writeInt32(0); // b18 ?
        packet.writeInt32(channel.currentUsers);
        packet.writeInt32(channel.enabled ? 1 : 0);
        packet.writeInt32(channel.maxUsers);
      });
    });
    return this.send(packet);
  }

}
