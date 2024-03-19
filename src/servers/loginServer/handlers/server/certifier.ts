import { PacketType } from "../../../../common/packetType";
import {
  buildEncryptionKeyFromString,
  decryptByteArray,
} from "../../../../libraries/crypto";
import { FlyffPacket } from "../../../../libraries/flyffPacket";
import {
  PacketHandler,
  SetPacketType,
} from "../../../../libraries/packetHandler";

import { ErrorType } from "../../../../common/errorType";
import { IAccount } from "../../../../entities/account/accounts";

@SetPacketType(PacketType.CERTIFY)
export default class CertifierHandler extends PacketHandler {
  msgVersion: string;
  username: string;
  passwordByte: Buffer | null;

  constructor(packet: FlyffPacket) {
    super();
    this.msgVersion = packet.readString();
    this.username = packet.readString();
    this.passwordByte = packet.readBytes(16 * 42);
  }

  async execute(): Promise<void> {
    const key = buildEncryptionKeyFromString("dldhsvmflvm", 16);
    const password = decryptByteArray(this.passwordByte, key);
    const accounts =
      global.LoginServerInstance.getDatabase("account").getRepository(
        "Account"
      );

    const account = (await accounts?.findOne({
      where: {
        username: this.username,
      },
    })) as IAccount;

    const packet = FlyffPacket.createWithHeader(PacketType.ERROR);
    if (!account) {
      packet.writeUInt32LE(ErrorType.NO_ACCOUNT);
      console.log("1");
      return this.send(packet);
    } else if (account.password !== password) {
      packet.writeUInt32LE(ErrorType.INVALID_PASSWORD);
      return this.send(packet);
    } else if (!this.validateAccount(packet, account)) {
      return this.send(packet);
    } else {
      account.lastActivity = new Date().getTime();
      await account.save();
      this.userConnection.userId = account.id;
      this.userConnection.username = account.username;
      this.sendServerList();
    }
    // this.server.disconnectUser(this.userConnection);
  }

  validateAccount(packet: FlyffPacket, account: IAccount): boolean {
    if (account.deleted) {
      packet.writeUInt32LE(ErrorType.NO_ACCOUNT);
      console.log("1");
      return false;
    } else if (account.banned) {
      packet.writeUInt32LE(ErrorType.ACCOUNT_BANNED);
      console.log("2");
      return false;
    } else if (!account.verified) {
      packet.writeUInt32LE(ErrorType.VERIFICATION_REQUIRED);
      console.log("3");
      return false;
    }
    return true;
  }

  sendServerList() {
    const packet = FlyffPacket.createWithHeader(PacketType.SERVER_LIST)
    packet.writeInt32(0); // Authentication key
    packet.writeByte(1);
    packet.writeString(this.username);
    packet.writeInt32(0); // 0 servers for now

    // foreach (ClusterInfo cluster in clusters)
    // {
    //     WriteInt32(-1); // Parent server id
    //     WriteInt32(cluster.Id);
    //     WriteString(cluster.Name);
    //     WriteString(cluster.Ip);
    //     WriteInt32(0); // b18 ?
    //     WriteInt32(0); // Connected count
    //     WriteInt32(Convert.ToInt32(cluster.IsEnabled));
    //     WriteInt32(0); // Maximum users

    //     foreach (WorldChannelInfo world in cluster.Channels)
    //     {
    //         WriteInt32(cluster.Id);
    //         WriteInt32(world.Id);
    //         WriteString(world.Name);
    //         WriteString(world.Ip);
    //         WriteInt32(0); // b18 ?
    //         WriteInt32(world.ConnectedUsers);
    //         WriteInt32(Convert.ToInt32(world.IsEnabled));
    //         WriteInt32(world.MaximumUsers);
    //     }
    // }
    return this.send(packet);
  }
}
