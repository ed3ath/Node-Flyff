import { PacketType } from "../../../common/packetType";
import {
  buildEncryptionKeyFromString,
  decryptByteArray,
  encryptString,
} from "../../../libraries/crypto";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { PacketHandler, SetPacketType } from "../../../libraries/packetHandler";

import { ErrorType } from "../../../common/errorType";

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
    const accounts = this.server.database.getEntity("Accounts");
    const user = await accounts?.findOne({
      where: {
        username: this.username,
      },
    });

    const packet = FlyffPacket.createWithHeader(PacketType.ERROR);
    if (!user) {
      packet.writeUInt32LE(ErrorType.INVALID_USERNAME);
      this.send(packet);
    } else if (user.password !== password) {
      packet.writeUInt32LE(ErrorType.INVALID_PASSWORD);
      this.send(packet);
    }
    this.server.disconnectUser(this.userConnection);
  }
}
