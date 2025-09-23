import { BinaryStream } from "./binaryStream";
export class FlyffPacket extends BinaryStream {
    constructor(bufferOrHeader, login = false, ignoreHeaders = false) {
        super(bufferOrHeader instanceof Buffer ? bufferOrHeader : Buffer.alloc(0));
        if (bufferOrHeader instanceof Buffer) {
            if (!ignoreHeaders) {
                this.HeaderNumber = this.readByte();
                if (login) {
                    // Login server: fixed 12 byte skip after header
                    this.position += 12;
                    this.PacketType = this.readUInt32LE();
                }
                else {
                    // Cluster/Character server: complex hash structure
                    // Skip first hash section (4 bytes length + data)
                    const hash1Length = this.readUInt32LE();
                    this.position += hash1Length;
                    // Skip second hash section (4 bytes length + data)
                    const hash2Length = this.readUInt32LE();
                    this.position += hash2Length;
                    // Skip third hash section (4 bytes length + data)
                    const hash3Length = this.readUInt32LE();
                    this.position += hash3Length;
                    // Now read the packet type
                    this.PacketType = this.readUInt32LE();
                }
                console.log("----------", this.position);
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
        return BinaryStream.STRING_DECODER.decode(stringBytes);
    }
    writeString(value = "") {
        const stringBytes = BinaryStream.STRING_ENCODER.encode(value);
        this.writeInt32(stringBytes.length);
        this.writeBytes(stringBytes);
    }
    writeStringLE(value = "") {
        const stringBytes = BinaryStream.STRING_ENCODER.encode(value);
        this.writeInt32LE(stringBytes.length);
        this.writeBytes(stringBytes);
    }
    toHex() {
        return this.buffer.toString("hex");
    }
}
FlyffPacket.FLYFF_HEADER_NUMBER = 0x5e;
FlyffPacket.PACKET_DATA_START_OFFSET = 5;
