import crypto from "crypto";

export function encryptByteArray(input: any, key: any) {
  const iv = Buffer.alloc(16, 0);

  const cipher: any = crypto.createCipheriv("aes-128-cbc", key, iv);
  cipher.setAutoPadding(false);

  let encrypted = "";
  input.forEach((byte: any) => {
    encrypted += cipher.update(Buffer.from([byte]), "utf8", "hex");
  });
  encrypted += cipher.final("hex");

  return encrypted;
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
  keySize = 32,
  encoding: BufferEncoding = "utf8"
) {
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
