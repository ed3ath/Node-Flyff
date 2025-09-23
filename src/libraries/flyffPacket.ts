import { PacketType, ToStringHex } from "../protocol/packetType";
import { BinaryStream } from "./binaryStream";

export interface CompositePacket {
  packetType: PacketType;
  dataStartPosition: number;
  dataLength: number;
  data: Buffer;
}

export class FlyffPacket extends BinaryStream {
  static readonly FLYFF_HEADER_NUMBER = 0x5e;
  static readonly PACKET_DATA_START_OFFSET = 5;

  HeaderNumber!: number;
  DataLength!: number;
  PacketType!: PacketType;

  // For composite packets
  public compositePackets: CompositePacket[] = [];

  constructor(
    bufferOrHeader?: Buffer | PacketType,
    login = false,
    ignoreHeaders = false
  ) {
    super(bufferOrHeader instanceof Buffer ? bufferOrHeader : Buffer.alloc(0));
    if (bufferOrHeader instanceof Buffer) {
      if (!ignoreHeaders) {
        this.HeaderNumber = this.readByte();

        if (login) {
          // Form #1 - Login server packets:
          // [5E] [int] Length hash [int] Packet length [int] Data hash [int] Command
          this.position += 4; // Skip length hash
          this.DataLength = this.readUInt32(); // Read packet length
          this.position += 4; // Skip data hash
          this.PacketType = this.readUInt32(); // Read command
        } else {
          // Form #2 - Cluster/World server packets:
          // [5E] [int] Length hash [int] Packet length [int] Data hash [int] -1 (0xFFFFFFFF) [int] Command
          this.position += 4; // Skip length hash
          this.DataLength = this.readUInt32(); // Read packet length
          this.position += 4; // Skip data hash

          // Check for the -1 (0xFFFFFFFF) marker
          const marker = this.readUInt32();
          if (marker === 0xffffffff) {
            // This is a Form #2 packet, read the command
            this.PacketType = this.readUInt32();
          } else {
            // This might be a different packet format or the marker is the command
            // Step back and treat this value as the command
            this.position -= 4;
            this.PacketType = this.readUInt32();
          }
          // After parsing the first packet, check if there are more commands in the remaining data
          this.parseCompositePackets(login);
        }
      }
    } else if (typeof bufferOrHeader === "number") {
      this.PacketType = bufferOrHeader;
      this.writeByte(FlyffPacket.FLYFF_HEADER_NUMBER);
      this.writeUInt32(0);
      this.writeUInt32(bufferOrHeader);
    } else {
      this.writeByte(FlyffPacket.FLYFF_HEADER_NUMBER);
      this.writeUInt32(0);
    }
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
    const stringLength = this.readInt32();
    const stringBytes = this.readBytes(Number(stringLength));
    return BinaryStream.STRING_DECODER.decode(stringBytes);
  }

  writeString(value: string = "") {
    const stringBytes = BinaryStream.STRING_ENCODER.encode(value);
    this.writeInt32(stringBytes.length);
    this.writeBytes(stringBytes as Buffer);
  }

  toHex() {
    return this.buffer.toString("hex");
  }

  private isValidPacketType(value: number): boolean {
    // Check if the value matches any known packet type from our enum
    return Object.values(PacketType).includes(value as PacketType);
  }

  /**
   * Parse composite packets - multiple commands in a single packet message
   * These share the same 5E header but contain multiple command sequences
   */
  private parseCompositePackets(login: boolean): void {
    // Store the first packet info
    const firstPacketDataStart = login ? 17 : 21; // Position where data starts after headers

    // Add the first packet to composite packets
    this.compositePackets.push({
      packetType: this.PacketType,
      dataStartPosition: firstPacketDataStart,
      dataLength: 0, // Will calculate later
      data: Buffer.alloc(0), // Will extract later
    });

    // Continue parsing from current position for additional commands
    // Look for the next command that follows the documented pattern
    while (this.position < this.buffer.length - 20) {
      // Need at least 20 bytes for a valid command structure
      let foundCommand = false;

      // Look for the specific pattern: [FF FF FF FF] [Command] where Command is valid
      for (let i = this.position; i <= this.buffer.length - 8; i++) {
        // Check for the 0xFFFFFFFF marker followed by a valid packet type
        if (this.buffer.readUInt32LE(i) === 0xffffffff) {
          const potentialCommand = this.buffer.readUInt32LE(i + 4);

          if (
            this.isValidPacketType(potentialCommand) &&
            potentialCommand !== this.PacketType
          ) {
            // Found a valid composite command!
            this.position = i + 8; // Position after command
            const commandType = potentialCommand;

            console.log(
              `Found composite command: 0x${commandType
                .toString(16)
                .padStart(8, "0")} at position ${i + 4}`
            );

            // Add to composite packets
            this.compositePackets.push({
              packetType: commandType as PacketType,
              dataStartPosition: this.position, // Position after the command
              dataLength: 0, // Will calculate later
              data: Buffer.alloc(0), // Will extract later
            });

            foundCommand = true;
            break;
          }
        }
      }

      if (!foundCommand) {
        // No more commands found, break
        break;
      }
    }

    // Calculate data lengths and extract data for each composite packet
    for (let i = 0; i < this.compositePackets.length; i++) {
      const currentPacket = this.compositePackets[i];
      const nextPacket = this.compositePackets[i + 1];

      if (nextPacket) {
        // Data goes from current packet's data start to next packet's command position
        const dataLength =
          nextPacket.dataStartPosition - 4 - currentPacket.dataStartPosition;
        currentPacket.dataLength = Math.max(0, dataLength);
        currentPacket.data = this.buffer.subarray(
          currentPacket.dataStartPosition,
          currentPacket.dataStartPosition + currentPacket.dataLength
        );
      } else {
        // Last packet - data goes to end of buffer
        currentPacket.dataLength =
          this.buffer.length - currentPacket.dataStartPosition;
        currentPacket.data = this.buffer.subarray(
          currentPacket.dataStartPosition
        );
      }
    }

    console.log(
      `Found ${this.compositePackets.length} composite packets:`,
      this.compositePackets.map(
        (p) => `0x${p.packetType.toString(16).padStart(8, "0")}`
      )
    );
  }

  /**
   * Get all packet types found in this message
   */
  getAllPacketTypes(): PacketType[] {
    return this.compositePackets.map((p) => p.packetType);
  }

  /**
   * Get specific composite packet by type
   */
  getCompositePacket(packetType: PacketType): CompositePacket | undefined {
    return this.compositePackets.find((p) => p.packetType === packetType);
  }

  /**
   * Check if this is a composite packet (contains multiple commands)
   */
  isCompositePacket(): boolean {
    return this.compositePackets.length > 1;
  }
}

