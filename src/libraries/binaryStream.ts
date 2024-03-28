import { TextDecoder, TextEncoder } from "util";

export class BinaryStream {
  static STRING_DECODER = new TextDecoder("windows-1252");
  static STRING_ENCODER = new TextEncoder();

  buffer: Buffer;
  position: number;

  constructor(buffer: Buffer) {
    this.buffer = Buffer.from(buffer);
    this.position = 0;
  }

  writeSByte(value: number) {
    this.writeByte(value);
  }

  writeBoolean(value: boolean) {
    this.writeByte(value ? 1 : 0);
  }

  writeChar(value: string) {
    this.writeString(value);
  }

  writeInt16(value: number) {
    this.writeBuffer(Buffer.alloc(2), value, "writeInt16BE");
  }

  writeInt16LE(value: number) {
    this.writeBuffer(Buffer.alloc(2), value, "writeInt16LE");
  }

  writeUInt16(value: number) {
    this.writeBuffer(Buffer.alloc(2), value, "writeUInt16BE");
  }

  writeUInt16LE(value: number) {
    this.writeBuffer(Buffer.alloc(2), value, "writeUInt16LE");
  }

  writeInt32(value: number) {
    this.writeBuffer(Buffer.alloc(4), value, "writeInt32BE");
  }

  writeInt32LE(value: number) {
    this.writeBuffer(Buffer.alloc(4), value, "writeInt32LE");
  }

  writeUInt32(value: number) {
    this.writeBuffer(Buffer.alloc(4), value, "writeUInt32BE");
  }

  writeUInt32LE(value: number) {
    this.writeBuffer(Buffer.alloc(4), value, "writeUInt32LE");
  }

  writeInt64(value: number) {
    this.writeBuffer(Buffer.alloc(8), BigInt(value), "writeBigInt64BE");
  }

  writeInt64LE(value: number) {
    this.writeBuffer(Buffer.alloc(8), BigInt(value), "writeBigInt64LE");
  }

  writeUInt64(value: number) {
    this.writeBuffer(Buffer.alloc(8), BigInt(value), "writeBigUInt64BE");
  }

  writeUInt64LE(value: number) {
    this.writeBuffer(Buffer.alloc(8), BigInt(value), "writeBigUInt64LE");
  }

  writeSingle(value: number) {
    this.writeBuffer(Buffer.alloc(4), value, "writeFloatBE");
  }

  writeSingleLE(value: number) {
    this.writeBuffer(Buffer.alloc(4), value, "writeFloatLE");
  }

  writeDouble(value: number) {
    this.writeBuffer(Buffer.alloc(8), value, "writeDoubleBE");
  }

  writeDoubleLE(value: number) {
    this.writeBuffer(Buffer.alloc(8), value, "writeDoubleLE");
  }

  writeString(value: string) {
    const stringValue = value ?? "";
    const buffer = Buffer.from(stringValue, "utf8");
    this.writeInt32(buffer.length);
    this.writeBuffer(buffer);
  }

  writeByte(value: number) {
    if (this.position >= this.buffer.length) {
      this.buffer = Buffer.concat([this.buffer, Buffer.alloc(1)]);
    }
    this.buffer.writeUInt8(value, this.position);
    this.position += 1;
  }

  writeBuffer(
    buffer: any,
    value: BigInt | number | undefined = undefined,
    method: string = ""
  ) {
    if (value && method) {
      buffer[method](value, 0);
    }
    this.writeBytes(buffer);
  }

  writeBytes(buffer: Buffer) {
    this.buffer = Buffer.concat([
      this.buffer.subarray(0, this.position),
      buffer,
      this.buffer.subarray(this.position),
    ]);
    this.position += buffer.length;
  }

  readByte() {
    const value = this.buffer.readUInt8(this.position);
    this.position += 1;
    return value;
  }

  readSByte() {
    return this.readByte();
  }

  readBoolean() {
    return this.readByte() !== 0;
  }

  readChar() {
    return this.readString().charAt(0);
  }

  readInt16() {
    return this.toInt(this.readBuffer(2));
  }

  readInt16LE() {
    return this.toInt(this.readBuffer(2).reverse());
  }

  readUInt16() {
    return this.toInt(this.readBuffer(2));
  }

  readUInt16LE() {
    return this.toInt(this.readBuffer(2).reverse());
  }

  readInt32() {
    return this.toInt(this.readBuffer(4));
  }

  readInt32LE() {
    return this.toInt(this.readBuffer(4).reverse());
  }

  readUInt32() {
    return this.toInt(this.readBuffer(4));
  }

  readUInt32LE() {
    return this.toInt(this.readBuffer(4).reverse());
  }

  readInt64() {
    return this.toInt(this.readBuffer(8));
  }

  readInt64LE() {
    return this.toInt(this.readBuffer(8).reverse());
  }

  readUInt64() {
    return this.toInt(this.readBuffer(8));
  }

  readUInt64LE() {
    return this.toInt(this.readBuffer(8).reverse());
  }

  readSingle() {
    return this.toFloat(this.readBuffer(4), true);
  }

  readSingleLE() {
    return this.toFloat(this.readBuffer(4).reverse());
  }

  readDouble() {
    return this.toFloat(this.readBuffer(8), true);
  }

  readDoubleLE() {
    return this.toFloat(this.readBuffer(8).reverse());
  }

  readString() {
    const length = this.readInt32();
    return BinaryStream.STRING_DECODER.decode(this.readBuffer(length));
  }

  readStringLE() {
    const length = this.readInt32LE();
    return BinaryStream.STRING_DECODER.decode(this.readBuffer(length));
  }

  readBytes(length: number) {
    const bytes = Buffer.alloc(length);
    const bytesRead = this.buffer.copy(
      bytes,
      0,
      this.position,
      this.position + length
    );
    this.position += bytesRead;
    return bytesRead < 0 ? Buffer.alloc(0) : bytes;
  }

  readBytesLE(length: number) {
    const bytes = Buffer.alloc(length);
    const bytesRead = this.buffer.copy(
      bytes,
      0,
      this.position,
      this.position + length
    );
    this.position += bytesRead;
    return bytesRead < 0 ? Buffer.alloc(0) : bytes.reverse();
  }

  readBuffer(length: number) {
    const buffer = this.buffer.subarray(this.position, this.position + length);
    this.position += length;
    return buffer;
  }

  toInt(buffer: Buffer) {
    return parseInt(buffer.toString("hex"), 16);
  }

  toFloat(buffer: Buffer, le = false) {
    if (buffer.length === 4) {
      return le ? buffer.readFloatLE() : buffer.readFloatBE();
    } else if (buffer.length === 8) {
      return le ? buffer.readDoubleLE() : buffer.readDoubleBE();
    }
    return parseFloat(buffer.toString("hex"));
  }
}
