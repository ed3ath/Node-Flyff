import { PacketType, ToStringHex } from "../common/packetType";
import { BinaryStream } from "./binaryStream";

export interface IFlyffPacket {
  FLYFF_HEADER_NUMBER: number;
  PACKET_DATA_START_OFFSET: number;
  HeaderNumber: number;
  Header: Buffer;

  createEmpty(): IFlyffPacket;
  createWithHeader(packetHeader: Buffer): IFlyffPacket;
  getMessageLength(buffer: Buffer, littleMedia: boolean): number;
  getHeader(buffer: Buffer): number;
  appendHeader(buffer: Buffer): Buffer;
  readString(): string;
  writeString(): void;
}

export class FlyffPacket extends BinaryStream {
  static FLYFF_HEADER_NUMBER = 0x5e;
  static CORE_HEADER_NUMBER = 0x4d;
  static PACKET_DATA_START_OFFSET = 5;

  HeaderNumber!: number;
  DataLength!: number;
  PacketType!: PacketType;

  constructor(packetBuffer: Buffer = Buffer.alloc(0), login = false, ignoreHeaders = false) {
    super(packetBuffer);

    if (packetBuffer.length > 0 && !ignoreHeaders) {
      this.HeaderNumber = this.readByte();
      this.position += login ? 12 : 16;
      this.PacketType = this.readUInt32LE();
    }
  }

  static createEmpty() {
    const packet = new FlyffPacket();
    packet.writeByte(FlyffPacket.FLYFF_HEADER_NUMBER);
    packet.writeUInt32(0);
    return packet;
  }

  static createEmptyCore() {
    const packet = new FlyffPacket();
    packet.writeByte(FlyffPacket.CORE_HEADER_NUMBER);
    packet.writeUInt32(0);
    return packet;
  }

  static createWithHeader(packetHeader: PacketType) {
    const packet = FlyffPacket.createEmpty();
    packet.writeUInt32LE(parseInt(ToStringHex(packetHeader), 16)); // Update content length after header
    return packet;
  }

  static createCoreHeader(packetHeader: PacketType) {
    const packet = FlyffPacket.createEmptyCore();
    packet.writeUInt32(parseInt(ToStringHex(packetHeader), 16)); // Update content length after header
    return packet;
  }

  static getMessageLength(buffer: Buffer, littleMedia = false) {
    const packetDataLengthBuffer = buffer.subarray(1, 5);
    return littleMedia
      ? packetDataLengthBuffer.readInt32LE()
      : packetDataLengthBuffer.readInt32BE();
  }

  static getHeader(buffer: Buffer) {
    return buffer.readUInt32LE(1);
  }

  static appendHeader(buffer: Buffer) {
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

  writeString(value: string = "") {
    const stringBytes = BinaryStream.STRING_ENCODER.encode(value);
    this.writeInt32(stringBytes.length);
    this.writeBytes(stringBytes as Buffer);
  }

  writeStringLE(value: string = "") {
    const stringBytes = BinaryStream.STRING_ENCODER.encode(value);
    this.writeInt32LE(stringBytes.length);
    this.writeBytes(stringBytes as Buffer);
  }
}
