import crypto from "crypto";

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

export function encryptString(input: any, key: any) {
  return encryptByteArray(Buffer.from(input, "utf8"), key);
}

export function decryptString(input: any, key: any) {
  return decryptByteArray(input, key);
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

export function generateMD5(input: string, salt = '') {
  const hash = crypto.createHash('md5');
  hash.update(salt + input);
  return hash.digest('hex');
}
