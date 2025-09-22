import { TextDecoder, TextEncoder } from "util";

export class BinaryStream {
  static STRING_DECODER = new TextDecoder("windows-1252");
  static STRING_ENCODER = new TextEncoder();

  buffer: Buffer;
  position: number;

  /**
   * Controls whether bytes should be reversed when the system is little-endian
   * Override this in subclasses to change the default behavior
   */
  protected get reverseIfLittleEndian(): boolean {
    return false;
  }

  constructor(buffer: Buffer) {
    this.buffer = Buffer.from(buffer);
    this.position = 0;
  }

  writeSByte(value: number) {
    this.writeByte(value);
  }

  writeBoolean(value: boolean) {
    this.internalWriteBytes(Buffer.from([value ? 1 : 0]));
  }

  writeChar(value: string) {
    this.writeString(value);
  }

  writeInt16(value: number) {
    this.internalWriteBytes(this.getBytesForValue(value, 2, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeUInt16(value: number) {
    this.internalWriteBytes(this.getBytesForValue(value, 2, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeInt32(value: number) {
    this.internalWriteBytes(this.getBytesForValue(value, 4, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeUInt32(value: number) {
    this.internalWriteBytes(this.getBytesForValue(value, 4, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeInt64(value: number | BigInt) {
    this.internalWriteBytes(this.getBytesForValue(value, 8, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeUInt64(value: number | BigInt) {
    this.internalWriteBytes(this.getBytesForValue(value, 8, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeSingle(value: number) {
    this.internalWriteBytes(this.getBytesForValue(value, 4, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeDouble(value: number) {
    this.internalWriteBytes(this.getBytesForValue(value, 8, BinaryStream.detectEndianness(this.buffer).endianness === "little"));
  }

  writeString(value: string) {
    const stringValue = value ?? "";
    const buffer = Buffer.from(stringValue, "utf8");
    this.writeInt32(buffer.length);
    this.internalWriteBytes(buffer);
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

  /**
   * Internal method to write bytes with endianness handling
   */
  private internalWriteBytes(bytes: Buffer): void {
    let finalBytes = bytes;

    // Apply endianness reversal if needed
    if (this.reverseIfLittleEndian && this.isSystemLittleEndian()) {
      finalBytes = Buffer.from(bytes);
      finalBytes.reverse();
    }

    this.writeBytes(finalBytes);
  }

  /**
   * Get bytes for a value in the specified endianness
   */
  private getBytesForValue(
    value: number | BigInt,
    byteLength: number,
    littleEndian: boolean
  ): Buffer {
    const buffer = Buffer.alloc(byteLength);

    if (typeof value === "bigint") {
      // Handle BigInt values
      switch (byteLength) {
        case 8:
          if (littleEndian) {
            buffer.writeBigInt64LE(value);
          } else {
            buffer.writeBigInt64BE(value);
          }
          break;
        default:
          throw new Error(`Unsupported BigInt byte length: ${byteLength}`);
      }
    } else {
      // Handle number values
      switch (byteLength) {
        case 2:
          if (littleEndian) {
            buffer.writeInt16LE(value as number);
          } else {
            buffer.writeInt16BE(value as number);
          }
          break;
        case 4:
          if (littleEndian) {
            buffer.writeFloatLE(value as number);
          } else {
            buffer.writeFloatBE(value as number);
          }
          break;
        case 8:
          if (littleEndian) {
            buffer.writeDoubleLE(value as number);
          } else {
            buffer.writeDoubleBE(value as number);
          }
          break;
        default:
          throw new Error(`Unsupported byte length: ${byteLength}`);
      }
    }

    return buffer;
  }

  /**
   * Check if the system is little-endian
   */
  private isSystemLittleEndian(): boolean {
    const buffer = Buffer.alloc(2);
    buffer.writeInt16LE(1);
    return buffer[0] === 1;
  }

  /**
   * Internal method to read numeric values with endianness handling
   */
  private internalReadNumber(byteLength: number): number {
    let buffer = this.readBuffer(byteLength);

    // Apply endianness reversal if needed
    if (this.reverseIfLittleEndian && this.isSystemLittleEndian()) {
      buffer = Buffer.from(buffer);
      buffer.reverse();
    }

    // Detect endianness and convert buffer to number
    if (typeof buffer === "object" && buffer.length === 0) {
      return 0;
    }

    const detectedEndianness = BinaryStream.detectEndianness(this.buffer).endianness;
    const littleEndian = detectedEndianness === "little";

    switch (byteLength) {
      case 2:
        if (littleEndian) {
          return buffer.readInt16LE();
        } else {
          return buffer.readInt16BE();
        }
      case 4:
        if (littleEndian) {
          return buffer.readFloatLE();
        } else {
          return buffer.readFloatBE();
        }
      case 8:
        if (littleEndian) {
          return buffer.readDoubleLE();
        } else {
          return buffer.readDoubleBE();
        }
      default:
        return this.toInt(buffer);
    }
  }

  /**
   * Internal method to read BigInt values with endianness handling
   */
  private internalReadBigInt(byteLength: number): BigInt {
    let buffer = this.readBuffer(byteLength);

    // Apply endianness reversal if needed
    if (this.reverseIfLittleEndian && this.isSystemLittleEndian()) {
      buffer = Buffer.from(buffer);
      buffer.reverse();
    }

    // Detect endianness and convert buffer to BigInt
    if (typeof buffer === "object" && buffer.length === 0) {
      return BigInt(0);
    }

    const detectedEndianness = BinaryStream.detectEndianness(this.buffer).endianness;
    const littleEndian = detectedEndianness === "little";

    if (byteLength === 8) {
      if (littleEndian) {
        return buffer.readBigInt64LE();
      } else {
        return buffer.readBigInt64BE();
      }
    }

    throw new Error(`Unsupported BigInt byte length: ${byteLength}`);
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
    return this.internalReadNumber(2);
  }

  readUInt16() {
    return this.internalReadNumber(2);
  }

  readInt32() {
    return this.internalReadNumber(4);
  }

  readUInt32() {
    return this.internalReadNumber(4);
  }

  readInt64() {
    return this.internalReadBigInt(8);
  }

  readUInt64() {
    return this.internalReadBigInt(8);
  }

  readSingle() {
    return this.internalReadNumber(4);
  }

  readDouble() {
    return this.internalReadNumber(8);
  }

  readString() {
    const length = this.readInt32();
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

  readBuffer(length: number) {
    if (this.position + length > this.buffer.length) {
      // Return a zero-filled buffer if we don't have enough data
      const availableBytes = Math.max(0, this.buffer.length - this.position);
      const buffer = Buffer.alloc(length);
      if (availableBytes > 0) {
        this.buffer.copy(
          buffer,
          0,
          this.position,
          this.position + availableBytes
        );
      }
      this.position = this.buffer.length;
      return buffer;
    }
    const buffer = this.buffer.subarray(this.position, this.position + length);
    this.position += length;
    return buffer;
  }

  toInt(buffer: Buffer) {
    if (buffer.length === 0) {
      return 0;
    }
    const hex = buffer.toString("hex");
    const result = parseInt(hex, 16);
    return isNaN(result) ? 0 : result;
  }

  toFloat(buffer: Buffer, le = false) {
    if (buffer.length === 4) {
      return le ? buffer.readFloatLE() : buffer.readFloatBE();
    } else if (buffer.length === 8) {
      return le ? buffer.readDoubleLE() : buffer.readDoubleBE();
    }
    return parseFloat(buffer.toString("hex"));
  }

  merge(buffer: Buffer): void {
    this.buffer = Buffer.concat([this.buffer, buffer]);
  }

  /**
   * Automatically detect the endianness of a buffer
   * @param buffer The buffer to analyze
   * @returns Object with detected endianness and confidence score
   */
  static detectEndianness(buffer: Buffer): {
    endianness: "little" | "big" | "unknown";
    confidence: number;
    reason: string;
  } {
    if (buffer.length < 4) {
      return {
        endianness: "unknown",
        confidence: 0,
        reason: "Buffer too small for reliable detection",
      };
    }

    let littleScore = 0;
    let bigScore = 0;
    const reasons: string[] = [];

    // Method 1: String Detection (most reliable)
    const stringDetection = this.detectStrings(buffer);
    if (stringDetection.little > stringDetection.big) {
      littleScore += stringDetection.little * 3; // Weight string detection heavily
      reasons.push(
        `String detection favors little-endian (${stringDetection.little} vs ${stringDetection.big})`
      );
    } else if (stringDetection.big > stringDetection.little) {
      bigScore += stringDetection.big * 3;
      reasons.push(
        `String detection favors big-endian (${stringDetection.big} vs ${stringDetection.little})`
      );
    }

    // Method 2: Magic Number Detection
    const magicDetection = this.detectMagicNumbers(buffer);
    littleScore += magicDetection.little;
    bigScore += magicDetection.big;
    if (magicDetection.little > 0) {
      reasons.push(
        `Magic number detection: ${magicDetection.little} little-endian patterns found`
      );
    }
    if (magicDetection.big > 0) {
      reasons.push(
        `Magic number detection: ${magicDetection.big} big-endian patterns found`
      );
    }

    // Method 3: Statistical Analysis
    const stats = this.analyzeBytePatterns(buffer);
    if (stats.prefersLittle) {
      littleScore += 2;
      reasons.push("Statistical analysis favors little-endian");
    } else if (stats.prefersBig) {
      bigScore += 2;
      reasons.push("Statistical analysis favors big-endian");
    }

    // Method 4: Multi-byte Value Analysis
    const valueAnalysis = this.analyzeMultiByteValues(buffer);
    littleScore += valueAnalysis.little;
    bigScore += valueAnalysis.big;

    // Calculate confidence
    const totalScore = littleScore + bigScore;
    let confidence = 0;
    let endianness: "little" | "big" | "unknown" = "unknown";

    if (totalScore > 0) {
      confidence = Math.max(littleScore, bigScore) / totalScore;
      endianness = littleScore > bigScore ? "little" : "big";
    }

    // Adjust confidence based on score difference
    const scoreDifference = Math.abs(littleScore - bigScore);
    if (scoreDifference < 2) {
      confidence *= 0.5; // Low confidence when scores are close
      reasons.push("Scores are close - low confidence");
    }

    return {
      endianness,
      confidence: Math.min(confidence, 1),
      reason: reasons.join("; "),
    };
  }

  /**
   * Detect readable strings in both endianness interpretations
   */
  private static detectStrings(buffer: Buffer): {
    little: number;
    big: number;
  } {
    let littleScore = 0;
    let bigScore = 0;

    // Look for ASCII strings in the buffer
    for (let i = 0; i < buffer.length - 4; i++) {
      // Try to read as little-endian string length + string
      if (i + 4 <= buffer.length) {
        const lengthLE = buffer.readUInt32LE(i);
        if (
          lengthLE > 0 &&
          lengthLE < 1000 &&
          i + 4 + lengthLE <= buffer.length
        ) {
          const stringBytes = buffer.subarray(i + 4, i + 4 + lengthLE);
          const str = stringBytes.toString("ascii");
          if (this.isReadableString(str)) {
            littleScore += str.length;
          }
        }
      }

      // Try to read as big-endian string length + string
      if (i + 4 <= buffer.length) {
        const lengthBE = buffer.readUInt32BE(i);
        if (
          lengthBE > 0 &&
          lengthBE < 1000 &&
          i + 4 + lengthBE <= buffer.length
        ) {
          const stringBytes = buffer.subarray(i + 4, i + 4 + lengthBE);
          const str = stringBytes.toString("ascii");
          if (this.isReadableString(str)) {
            bigScore += str.length;
          }
        }
      }
    }

    return { little: littleScore, big: bigScore };
  }

  /**
   * Check if a string contains readable ASCII characters
   */
  private static isReadableString(str: string): boolean {
    if (str.length < 3) return false;

    let printableCount = 0;
    for (const char of str) {
      const code = char.charCodeAt(0);
      if (
        (code >= 32 && code <= 126) ||
        code === 9 ||
        code === 10 ||
        code === 13
      ) {
        printableCount++;
      }
    }

    // Must have at least 70% printable characters
    return printableCount / str.length >= 0.7;
  }

  /**
   * Detect common magic numbers in both endianness formats
   */
  private static detectMagicNumbers(buffer: Buffer): {
    little: number;
    big: number;
  } {
    const magicNumbers = {
      // Common file format magic numbers
      little: new Set([
        0x04034b50, // ZIP (PK)
        0x464c457f, // ELF
        0x7f454c46, // ELF (big-endian)
        0x89504e47, // PNG
        0x47494638, // GIF87a
        0x49492a00, // TIFF (little-endian)
        0x4d4d002a, // TIFF (big-endian)
        0x52494646, // RIFF (WAV)
        0x664c6143, // FLAC
        0x4f676753, // OGG
        0x000001ba, // MPEG-PS
        0x000001b3, // MPEG-PS
      ]),
      big: new Set([
        0x504b0304, // ZIP (PK)
        0x7f454c46, // ELF
        0x464c457f, // ELF (big-endian)
        0x89504e47, // PNG
        0x38464947, // GIF87a
        0x002a4949, // TIFF (little-endian)
        0x2a004d4d, // TIFF (big-endian)
        0x46464952, // RIFF (WAV)
        0x43614c66, // FLAC
        0x5367674f, // OGG
        0xba010000, // MPEG-PS
        0xb3010000, // MPEG-PS
      ]),
    };

    let littleScore = 0;
    let bigScore = 0;

    for (let i = 0; i < buffer.length - 4; i++) {
      const valueLE = buffer.readUInt32LE(i);
      const valueBE = buffer.readUInt32BE(i);

      if (magicNumbers.little.has(valueLE)) {
        littleScore++;
      }
      if (magicNumbers.big.has(valueBE)) {
        bigScore++;
      }
    }

    return { little: littleScore, big: bigScore };
  }

  /**
   * Analyze byte patterns to determine endianness preference
   */
  private static analyzeBytePatterns(buffer: Buffer): {
    prefersLittle: boolean;
    prefersBig: boolean;
  } {
    let littlePatternScore = 0;
    let bigPatternScore = 0;

    // Analyze 4-byte sequences
    for (let i = 0; i < buffer.length - 4; i += 4) {
      const bytes = buffer.subarray(i, i + 4);
      const valueLE = bytes.readUInt32LE(0);
      const valueBE = bytes.readUInt32BE(0);

      // Little-endian often has more even distribution of bytes
      // Big-endian often has higher bytes set in higher positions
      const leByteDistribution = this.calculateByteDistribution(bytes);
      const beByteDistribution = this.calculateByteDistribution(
        bytes.reverse()
      );

      // Prefer format with more even byte distribution
      if (leByteDistribution > beByteDistribution) {
        littlePatternScore++;
      } else if (beByteDistribution > leByteDistribution) {
        bigPatternScore++;
      }
    }

    return {
      prefersLittle: littlePatternScore > bigPatternScore,
      prefersBig: bigPatternScore > littlePatternScore,
    };
  }

  /**
   * Calculate byte distribution entropy (higher = more even distribution)
   */
  private static calculateByteDistribution(bytes: Buffer): number {
    const byteCounts = new Array(256).fill(0);

    for (const byte of bytes) {
      byteCounts[byte]++;
    }

    let entropy = 0;
    const length = bytes.length;

    for (const count of byteCounts) {
      if (count > 0) {
        const probability = count / length;
        entropy -= probability * Math.log2(probability);
      }
    }

    return entropy;
  }

  /**
   * Analyze multi-byte values for reasonableness
   */
  private static analyzeMultiByteValues(buffer: Buffer): {
    little: number;
    big: number;
  } {
    let littleScore = 0;
    let bigScore = 0;

    // Look for reasonable 16-bit and 32-bit values
    for (let i = 0; i < buffer.length - 2; i += 2) {
      const value16LE = buffer.readUInt16LE(i);
      const value16BE = buffer.readUInt16BE(i);

      // Score based on whether values fall in reasonable ranges
      if (this.isReasonableValue(value16LE, 2)) littleScore++;
      if (this.isReasonableValue(value16BE, 2)) bigScore++;
    }

    for (let i = 0; i < buffer.length - 4; i += 4) {
      const value32LE = buffer.readUInt32LE(i);
      const value32BE = buffer.readUInt32BE(i);

      if (this.isReasonableValue(value32LE, 4)) littleScore++;
      if (this.isReasonableValue(value32BE, 4)) bigScore++;
    }

    return { little: littleScore, big: bigScore };
  }

  /**
   * Check if a numeric value is reasonable for its size
   */
  private static isReasonableValue(value: number, byteLength: number): boolean {
    if (value === 0) return false; // Zero is not informative

    const maxValue = Math.pow(256, byteLength);

    // Value should be within reasonable bounds
    if (value > maxValue * 0.9) return false; // Too close to max
    if (value < maxValue * 0.001) return false; // Too close to zero

    // For 2-byte values, prefer values that look like they could be text codes
    if (byteLength === 2) {
      return (
        (value >= 32 && value <= 126) || // Printable ASCII
        (value >= 0xc0 && value <= 0xff) || // Extended ASCII
        (value >= 0x0100 && value <= 0xffff)
      ); // Unicode range
    }

    // For 4-byte values, prefer values that look like they could be addresses or sizes
    if (byteLength === 4) {
      return value >= 256 && value <= 0xffffff; // Reasonable address/size range
    }

    return true;
  }

  /**
   * Create a subclass that reverses bytes when system is little-endian
   * This is useful for protocols that expect big-endian format on little-endian systems
   */
  static createBigEndianStream(buffer?: Buffer): BinaryStream {
    return new (class extends BinaryStream {
      protected get reverseIfLittleEndian(): boolean {
        return true;
      }
    })(buffer || Buffer.alloc(0));
  }

  /**
   * Create a subclass that handles FlyFF-specific endianness requirements
   * FlyFF typically uses little-endian format
   */
  static createFlyFFStream(buffer?: Buffer): BinaryStream {
    return new (class extends BinaryStream {
      protected get reverseIfLittleEndian(): boolean {
        return false; // FlyFF uses little-endian
      }
    })(buffer || Buffer.alloc(0));
  }
}
