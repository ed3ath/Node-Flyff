"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptMessage = exports.verify = exports.signMessage = exports.generateKeyPair = exports.generateMD5 = exports.buildEncryptionKeyFromString = exports.isValidEncryptionString = exports.parseMessage = exports.decryptString = exports.encryptString = exports.decryptByteArray = exports.encryptByteArray = void 0;
const crypto_1 = __importDefault(require("crypto"));
const crypto_js_1 = __importDefault(require("crypto-js"));
function encryptByteArray(input, key) {
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto_1.default.createCipheriv("aes-128-cbc", key, iv);
    let encryptedChunks = Buffer.concat([cipher.update(input), cipher.final()]);
    let encryptedString = encryptedChunks.toString("hex");
    return encryptedString;
}
exports.encryptByteArray = encryptByteArray;
function decryptByteArray(input, key) {
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto_1.default.createDecipheriv("aes-128-cbc", key, iv);
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
exports.decryptByteArray = decryptByteArray;
function encryptString(input, key) {
    return crypto_js_1.default.AES.encrypt(input, key).toString();
}
exports.encryptString = encryptString;
function decryptString(input, key) {
    return crypto_js_1.default.AES.decrypt(input, key).toString(crypto_js_1.default.enc.Utf8);
}
exports.decryptString = decryptString;
function parseMessage(message) {
    try {
        // Remove all non-printable ASCII characters, control characters, and whitespace
        const cleanedMessage = message.trim();
        return JSON.parse(cleanedMessage);
    }
    catch (_a) {
        return null;
    }
}
exports.parseMessage = parseMessage;
function isValidEncryptionString(input, key) {
    try {
        return !!decryptString(input, key);
    }
    catch (_a) {
        return false;
    }
}
exports.isValidEncryptionString = isValidEncryptionString;
function buildEncryptionKeyFromString(encryptionKey, keySize = 16, encoding = "utf8") {
    if (keySize > 16) {
        keySize = 16;
    }
    const keyBytes = Buffer.from(encryptionKey, encoding);
    if (keyBytes.length < keySize) {
        return Buffer.concat([
            keyBytes,
            Buffer.alloc(keySize - keyBytes.length, 0),
        ]);
    }
    else {
        return keyBytes.subarray(0, keySize);
    }
}
exports.buildEncryptionKeyFromString = buildEncryptionKeyFromString;
function generateMD5(input, salt = "") {
    const hash = crypto_1.default.createHash("md5");
    hash.update(salt + input);
    return hash.digest("hex");
}
exports.generateMD5 = generateMD5;
function generateKeyPair() {
    const curve = crypto_1.default.createECDH("secp256k1");
    return curve.generateKeys("hex", "compressed");
}
exports.generateKeyPair = generateKeyPair;
function signMessage(message, key) {
    const hmac = crypto_1.default.createHmac("sha256", key);
    hmac.update(typeof message === "string" ? Buffer.from(message, "hex") : message);
    return hmac.digest("hex");
}
exports.signMessage = signMessage;
function verify(message, signature, key) {
    const calculatedSignature = signMessage(message, key);
    return signature === calculatedSignature;
}
exports.verify = verify;
function encryptMessage(message, key) {
    return encryptString(message, key);
}
exports.encryptMessage = encryptMessage;
