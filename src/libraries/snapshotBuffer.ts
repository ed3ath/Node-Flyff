import { SnapshotType } from "../protocol/snapshotType";

/**
 * Simple snapshot buffer class for creating raw snapshot data
 * Matches C++ format: ObjectID + SnapshotType + Data
 */
export class SnapshotBuffer {
  private buffer: Buffer;
  private position: number = 0;

  constructor(objectId: number, snapshotType: SnapshotType) {
    // Start with initial size, will grow as needed
    this.buffer = Buffer.allocUnsafe(1024);
    this.position = 0;

    // Write object ID (4 bytes, little-endian)
    this.buffer.writeUInt32LE(objectId, this.position);
    this.position += 4;

    // Write snapshot type (2 bytes, little-endian)
    this.buffer.writeUInt16LE(snapshotType, this.position);
    this.position += 2;
  }

  /**
   * Write a 32-bit integer in little-endian format
   */
  writeInt32LE(value: number): void {
    this.ensureCapacity(4);
    this.buffer.writeInt32LE(value, this.position);
    this.position += 4;
  }

  /**
   * Write a 32-bit unsigned integer in little-endian format
   */
  writeUInt32LE(value: number): void {
    this.ensureCapacity(4);
    this.buffer.writeUInt32LE(value, this.position);
    this.position += 4;
  }

  /**
   * Write a 16-bit integer in little-endian format
   */
  writeInt16LE(value: number): void {
    this.ensureCapacity(2);
    this.buffer.writeInt16LE(value, this.position);
    this.position += 2;
  }

  /**
   * Write a single byte
   */
  writeByte(value: number): void {
    this.ensureCapacity(1);
    this.buffer.writeUInt8(value, this.position);
    this.position += 1;
  }

  /**
   * Write a float in little-endian format
   */
  writeFloatLE(value: number): void {
    this.ensureCapacity(4);
    this.buffer.writeFloatLE(value, this.position);
    this.position += 4;
  }

  /**
   * Write a length-prefixed string (C++ WriteString format)
   * Format: 4 bytes length + string data
   */
  writeString(value: string): void {
    const stringBuffer = Buffer.from(value, 'utf8');
    this.ensureCapacity(4 + stringBuffer.length);

    // Write string length (4 bytes, little-endian)
    this.buffer.writeUInt32LE(stringBuffer.length, this.position);
    this.position += 4;

    // Write string data
    stringBuffer.copy(this.buffer, this.position);
    this.position += stringBuffer.length;
  }

  /**
   * Write raw buffer data
   */
  writeBuffer(data: Buffer): void {
    this.ensureCapacity(data.length);
    data.copy(this.buffer, this.position);
    this.position += data.length;
  }

  /**
   * Ensure buffer has enough capacity, grow if needed
   */
  private ensureCapacity(additionalBytes: number): void {
    const requiredSize = this.position + additionalBytes;
    if (requiredSize > this.buffer.length) {
      const newSize = Math.max(requiredSize, this.buffer.length * 2);
      const newBuffer = Buffer.allocUnsafe(newSize);
      this.buffer.copy(newBuffer);
      this.buffer = newBuffer;
    }
  }

  /**
   * Get the final buffer with exact size
   */
  getBuffer(): Buffer {
    return this.buffer.subarray(0, this.position);
  }

  /**
   * Get the current size of the snapshot data
   */
  getSize(): number {
    return this.position;
  }

  /**
   * Get hex representation for debugging
   */
  toHex(): string {
    return this.getBuffer().toString('hex').toUpperCase();
  }
}