import { PacketType } from "../../../common/packetType";
import {
  buildEncryptionKeyFromString,
  decryptByteArray,
} from "../../../libraries/crypto";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { ErrorType } from "../../../common/errorType";
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
    this.logger.info(`CERTIFY request from ${this.username} on cluster server`);

    if (
      this.server?.instance?.config?.cluster_server.security?.["build-version"] !==
      this.msgVersion
    ) {
      return this.userConnection.sendError(ErrorType.ILLEGAL_VER);
    }

    const key = buildEncryptionKeyFromString(
      this.server?.instance?.config?.cluster_server.security?.[
        "password-encryption-key"
      ],
      16
    );
    const password = decryptByteArray(this.passwordByte, key);
    const database = this.server?.instance?.getEntity("Account");

    if (!database) {
      this.logger.error("Failed to get Account repository");
      return this.userConnection.disconnect();
    }

    const account = (await database.findOne({
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
    } else {
      account.lastActivity = new Date().getTime();
      await account.save();
      this.userConnection.userId = account.id;
      this.userConnection.username = account.username;

      this.logger.success(`User ${this.username} authenticated on cluster server`);

      // Cluster server doesn't send server list - client will send GET_CHARACTER_LIST next
    }
  }
}