"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlyffPacket = void 0;
const binaryStream_1 = require("./binaryStream");
class FlyffPacket extends binaryStream_1.BinaryStream {
    constructor(bufferOrHeader, login = false, ignoreHeaders = false) {
        super(bufferOrHeader instanceof Buffer ? bufferOrHeader : Buffer.alloc(0));
        if (bufferOrHeader instanceof Buffer) {
            if (!ignoreHeaders) {
                this.HeaderNumber = this.readByte();
                this.position += login ? 12 : 16;
                this.PacketType = this.readUInt32LE();
            }
        }
        else if (typeof bufferOrHeader === "number") {
            this.PacketType = bufferOrHeader;
            this.writeByte(FlyffPacket.FLYFF_HEADER_NUMBER);
            this.writeUInt32(0);
            this.writeUInt32LE(bufferOrHeader);
        }
        else {
            this.writeByte(FlyffPacket.FLYFF_HEADER_NUMBER);
            this.writeUInt32(0);
        }
    }
    static getMessageLength(buffer, littleMedia = false) {
        const packetDataLengthBuffer = buffer.subarray(1, 5);
        return littleMedia
            ? packetDataLengthBuffer.readInt32LE()
            : packetDataLengthBuffer.readInt32BE();
    }
    static getHeader(buffer) {
        return buffer.readUInt32LE(1);
    }
    static appendHeader(buffer) {
        const contentLength = buffer.length - FlyffPacket.PACKET_DATA_START_OFFSET;
        const contentLengthBuffer = Buffer.alloc(4);
        contentLengthBuffer.writeUInt32LE(contentLength, 0);
        contentLengthBuffer.copy(buffer, 1, 0);
        return buffer;
    }
    readString() {
        const stringLength = this.readInt32LE();
        const stringBytes = this.readBytes(Number(stringLength));
        return binaryStream_1.BinaryStream.STRING_DECODER.decode(stringBytes);
    }
    writeString(value = "") {
        const stringBytes = binaryStream_1.BinaryStream.STRING_ENCODER.encode(value);
        this.writeInt32(stringBytes.length);
        this.writeBytes(stringBytes);
    }
    writeStringLE(value = "") {
        const stringBytes = binaryStream_1.BinaryStream.STRING_ENCODER.encode(value);
        this.writeInt32LE(stringBytes.length);
        this.writeBytes(stringBytes);
    }
    toHex() {
        return this.buffer.toString("hex");
    }
}
exports.FlyffPacket = FlyffPacket;
FlyffPacket.FLYFF_HEADER_NUMBER = 0x5e;
FlyffPacket.PACKET_DATA_START_OFFSET = 5;
