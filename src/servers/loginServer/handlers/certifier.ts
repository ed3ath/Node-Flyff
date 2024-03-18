import { PacketType } from "../../../common/packetType";
import { buildEncryptionKeyFromString, decryptByteArray } from "../../../libraries/aes";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { IPacketHandler, PacketHandler } from "../../../libraries/packetHandler";

@PacketHandler(PacketType.CERTIFY)
export default class CertifierHandler implements IPacketHandler {  
  msgVersion: string;
  username: string
  passwordByte: Buffer | null;

  constructor(packet: FlyffPacket) {
    this.msgVersion = packet.readString();
    this.username = packet.readString();
    this.passwordByte = packet.readBytes(16 * 42);
  }

  execute(): void {
    const key = buildEncryptionKeyFromString('dldhsvmflvm', 16)
    const password = decryptByteArray(this.passwordByte, key);

    console.log({
      msgVersion: this.msgVersion,
      username: this.username,
      password
    })
  }
}