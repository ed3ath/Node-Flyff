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

  writeInt16(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(2),
      value,
      isLittleEndian ? "writeInt16LE" : "writeInt16BE"
    );
  }

  writeUInt16(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(2),
      value,
      isLittleEndian ? "writeUInt16LE" : "writeUInt16BE"
    );
  }

  writeInt32(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(4),
      value,
      isLittleEndian ? "writeInt32LE" : "writeInt32BE"
    );
  }

  writeUInt32(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(4),
      value,
      isLittleEndian ? "writeUInt32LE" : "writeUInt32BE"
    );
  }

  writeInt64(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(8),
      BigInt(value),
      isLittleEndian ? "writeBigInt64LE" : "writeBigInt64BE"
    );
  }

  writeUInt64(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(8),
      BigInt(value),
      isLittleEndian ? "writeBigUInt64LE" : "writeBigUInt64BE"
    );
  }

  writeSingle(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(4),
      value,
      isLittleEndian ? "writeFloatLE" : "writeFloatBE"
    );
  }

  writeDouble(value: number, isLittleEndian = true) {
    this.writeBuffer(
      Buffer.alloc(8),
      value,
      isLittleEndian ? "writeDoubleLE" : "writeDoubleBE"
    );
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

  readInt16(isLittleEndian = true) {
    return this.toInt(isLittleEndian ? this.readBuffer(2).reverse() : this.readBuffer(2));
  }

  readUInt16(isLittleEndian = true) {
    return this.toInt(isLittleEndian ? this.readBuffer(2).reverse() : this.readBuffer(2));
  }

  readInt32(isLittleEndian = true) {
    return this.toInt(isLittleEndian ? this.readBuffer(4).reverse() : this.readBuffer(4));
  }

  readUInt32(isLittleEndian = true) {
    return this.toInt(isLittleEndian ? this.readBuffer(4).reverse() : this.readBuffer(4));
  }

  readInt64(isLittleEndian = true) {
    return this.toInt(isLittleEndian ? this.readBuffer(8).reverse() : this.readBuffer(8));
  }

  readUInt64(isLittleEndian = true) {
    return this.toInt(isLittleEndian ? this.readBuffer(8).reverse() : this.readBuffer(8));
  }

  readSingle(isLittleEndian = true) {
    return this.toFloat(isLittleEndian ? this.readBuffer(4).reverse() : this.readBuffer(4));
  }

  readDouble(isLittleEndian = true) {
    return this.toFloat(isLittleEndian ? this.readBuffer(8).reverse() : this.readBuffer(8));
  }

  readString() {
    const length = this.readInt32(false);
    return BinaryStream.STRING_DECODER.decode(this.readBuffer(length));
  }

  readBytes(length: number, isLittleEndian = true) {
    const bytes = Buffer.alloc(length);
    const bytesRead = this.buffer.copy(
      bytes,
      0,
      this.position,
      this.position + length
    );
    this.position += bytesRead;
    return bytesRead < 0 ? Buffer.alloc(0) : (isLittleEndian ? bytes.reverse() : bytes);
  }

  readBuffer(length: number) {
    const buffer = this.buffer.subarray(this.position, this.position + length);
    this.position += length;
    return buffer;
  }

  toInt(buffer: Buffer) {
    return parseInt(buffer.toString("hex"), 16);
  }

  toFloat(buffer: Buffer, isLittleEndian = true) {
    if (buffer.length === 4) {
      return isLittleEndian ? buffer.readFloatLE() : buffer.readFloatBE();
    } else if (buffer.length === 8) {
      return isLittleEndian ? buffer.readDoubleLE() : buffer.readDoubleBE();
    }
    return parseFloat(buffer.toString("hex"));
  }

  merge(buffer: Buffer): void {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }
}
