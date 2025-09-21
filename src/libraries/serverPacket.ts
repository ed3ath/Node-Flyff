import { PacketType } from "../protocol/packetType";
import { BinaryStream } from "./binaryStream";

/**
 * Server-to-client packet implementation following FlyFF Form #3:
 * 5E [int] Length [rest of data]
 *
 * The length field equals the total packet length minus 5 bytes (header + length field)
 */
export class ServerPacket extends BinaryStream {
  static readonly FLYFF_HEADER_NUMBER = 0x5e;
  static readonly HEADER_SIZE = 5; // 1 byte header + 4 bytes length

  constructor() {
    super(Buffer.alloc(0));
    this.writeByte(ServerPacket.FLYFF_HEADER_NUMBER); // 0x5E header
    this.writeUInt32LE(0); // Placeholder for length - will be updated when packet is finalized
  }

  /**
   * Finalizes the packet by updating the length field
   * Length = total packet size - 5 bytes (header + length field)
   */
  finalize(): Buffer {
    const totalLength = this.buffer.length;
    const dataLength = totalLength - ServerPacket.HEADER_SIZE;

    // Update the length field at position 1
    this.buffer.writeUInt32LE(dataLength, 1);

    return this.buffer;
  }

  /**
   * Write a 32-bit float in little-endian format
   */
  writeSingleLE(value: number): void {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeFloatLE(value, 0);
    this.writeBytes(buffer);
  }

  /**
   * Write a string with length prefix (FlyFF format)
   */
  writeString(value: string = ""): void {
    const stringBytes = Buffer.from(value, 'ascii');
    this.writeInt32LE(stringBytes.length);
    this.writeBytes(stringBytes);
  }

  /**
   * Write a 32-bit integer in little-endian format
   */
  writeInt32LE(value: number): void {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeInt32LE(value, 0);
    this.writeBytes(buffer);
  }

  /**
   * Write a 32-bit unsigned integer in little-endian format
   */
  writeUInt32LE(value: number): void {
    const buffer = Buffer.allocUnsafe(4);
    buffer.writeUInt32LE(value, 0);
    this.writeBytes(buffer);
  }

  /**
   * Write a 16-bit integer in little-endian format
   */
  writeInt16LE(value: number): void {
    const buffer = Buffer.allocUnsafe(2);
    buffer.writeInt16LE(value, 0);
    this.writeBytes(buffer);
  }

  /**
   * Write a 16-bit unsigned integer in little-endian format
   */
  writeUInt16LE(value: number): void {
    const buffer = Buffer.allocUnsafe(2);
    buffer.writeUInt16LE(value, 0);
    this.writeBytes(buffer);
  }

  /**
   * Write a single byte
   */
  writeByte(value: number): void {
    const buffer = Buffer.allocUnsafe(1);
    buffer.writeUInt8(value, 0);
    this.writeBytes(buffer);
  }

  /**
   * Get the current buffer (without finalizing)
   */
  getBuffer(): Buffer {
    return this.buffer;
  }

  /**
   * Get hex representation for debugging
   */
  toHexString(): string {
    return this.buffer.toString('hex').toUpperCase();
  }
}