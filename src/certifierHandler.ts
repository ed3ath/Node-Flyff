import { buildEncryptionKeyFromString, decryptByteArray } from './helpers/aes'
import FlyffPacket from './helpers/flyFlyffPacket'

export default (packet: FlyffPacket) => {
  const message = {
    msgVersion: packet.readStringLE(),
    username: packet.readStringLE(),
    passwordBytes: packet.readBytes(16 * 42)
  }

  const key = buildEncryptionKeyFromString('dldhsvmflvm', 16)
  const password = decryptByteArray(message.passwordBytes, key)
  console.log({ ...message, password })
}
