import crypto from "crypto";
import CryptoJS from "crypto-js";

export function encryptByteArray(input: Buffer, key: Buffer): string {
  const iv = Buffer.alloc(16, 0);

  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encryptedChunks = Buffer.concat([cipher.update(input), cipher.final()]);

  let encryptedString = encryptedChunks.toString("hex");

  return encryptedString;
}

export function decryptByteArray(input: any, key: any) {
  const iv = Buffer.alloc(16, 0);

  const decipher: any = crypto.createDecipheriv("aes-128-cbc", key, iv);
  decipher.setAutoPadding(false);

  let decrypted = "";
  const buffer = Buffer.from(input, "hex");
  for (let i = 0; i < buffer.length; i += 16) {
    const chunk = buffer.subarray(i, i + 16);
    decrypted += decipher.update(chunk, "binary", "utf8");
  }
  decrypted += decipher.final("utf8");
  return decrypted.replace(/\0+$/, "");
}

export function encryptString(input: string, key: string) {
  return CryptoJS.AES.encrypt(input, key).toString();
}

export function decryptString(input: string, key: string) {
  return CryptoJS.AES.decrypt(input, key).toString(CryptoJS.enc.Utf8);
}

export function parseMessage(message: string) {
  try {
    // Remove all non-printable ASCII characters, control characters, and whitespace
    const cleanedMessage = message.trim();
    return JSON.parse(cleanedMessage);
  } catch {
    return null;
  }
}

export function isValidEncryptionString(input: any, key: any) {
  try {
    return !!decryptString(input, key);
  } catch {
    return false;
  }
}

export function buildEncryptionKeyFromString(
  encryptionKey: string,
  keySize = 16,
  encoding: BufferEncoding = "utf8"
) {
  if (keySize > 16) {
    keySize = 16;
  }
  const keyBytes = Buffer.from(encryptionKey, encoding);
  if (keyBytes.length < keySize) {
    return Buffer.concat([
      keyBytes,
      Buffer.alloc(keySize - keyBytes.length, 0),
    ]);
  } else {
    return keyBytes.subarray(0, keySize);
  }
}

export function generateMD5(input: string, salt = "") {
  const hash = crypto.createHash("md5");
  hash.update(salt + input);
  return hash.digest("hex");
}

export function generateKeyPair() {
  const curve = crypto.createECDH("secp256k1");
  return curve.generateKeys("hex", "compressed");
}

export function signMessage(message: string | Buffer, key: Buffer) {
  const hmac = crypto.createHmac("sha256", key);
  hmac.update(
    typeof message === "string" ? Buffer.from(message, "hex") : message
  );
  return hmac.digest("hex");
}

export function verify(
  message: string | Buffer,
  signature: string,
  key: Buffer
) {
  const calculatedSignature = signMessage(message, key);
  return signature === calculatedSignature;
}
