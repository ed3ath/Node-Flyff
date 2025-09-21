import { PacketType } from "../../../protocol/packetType";
import { SnapshotType } from "../../../protocol/snapshotType";
import { FlyffPacket } from "../../../libraries/flyffPacket";
import { BinaryStream } from "../../../libraries/binaryStream";
import { PacketHandler } from "../../../libraries/packetHandler";
import { SetPacketType } from "../../../decorators/packetHandler";
import { Player } from "../../../entities/player";

interface SnapshotPacket {
  count: number;
  data: Buffer;
}

interface SetDestPositionPacket {
  x: number;
  y: number;
  z: number;
}

@SetPacketType(PacketType.SNAPSHOT)
export default class SnapshotHandler extends PacketHandler {
  private packet: SnapshotPacket;

  constructor(packet: FlyffPacket) {
    super();

    // Read snapshot count as BYTE (similar to C++ OnSnapshot)
    this.packet = {
      count: packet.readByte(),
      data: packet.buffer.subarray(packet.position)
    };
  }

  async execute(): Promise<void> {
    let snapshotCount = this.packet.count;
    let dataOffset = 0;

    // Debug: Log snapshot count and total data
    this.logger.debug(`Snapshot packet - Count: ${snapshotCount}, Total data length: ${this.packet.data.length}`);

    while (snapshotCount > 0) {
      try {
        // Create binary stream from remaining snapshot data (similar to C# FFPacket)
        const remainingData = this.packet.data.subarray(dataOffset);

        // Debug: Log raw buffer data to understand what we're parsing
        this.logger.debug(`Remaining data at offset ${dataOffset}: ${remainingData.toString('hex').toUpperCase()}`);

        if (remainingData.length < 2) {
          this.logger.warn(`Insufficient data for snapshot header at offset ${dataOffset}, remaining: ${remainingData.length} bytes`);
          break;
        }

        const snapshot = new BinaryStream(remainingData);

        // Read snapshot header as WORD (similar to C++ OnSnapshot)
        const snapshotHeaderNumber = snapshot.readInt16LE();

        // Debug logging to understand what we're reading
        this.logger.debug(`Snapshot header read: 0x${snapshotHeaderNumber.toString(16).toUpperCase().padStart(4, '0')} (${snapshotHeaderNumber})`);

        try {
          const snapshotHeader = snapshotHeaderNumber as SnapshotType;

          if (snapshotHeader === SnapshotType.DEST_POS) {
            await this.handleDestPosSnapshot(snapshot);
            // DEST_POS snapshot contains: int16 header + 3 floats (12 bytes) + 1 byte = 15 bytes total
            dataOffset += 2 + 12 + 1;
          } else if (snapshotHeader === SnapshotType.GUILD_BANK_WND) {
            await this.handleGuildBankWndSnapshot(snapshot);
            // GUILD_BANK_WND snapshot contains: int16 header + unknown data length
            // For now, try to advance by a safe amount or detect the actual length
            dataOffset += 2; // Just skip the header for now
          } else if (snapshotHeader === SnapshotType.SEALCHARGET_REQ) {
            await this.handleSealCharGetSnapshot(snapshot);
            // SEALCHARGET_REQ snapshot contains: int16 header only (according to C++ code)
            dataOffset += 2; // Just the header
          } else {
            throw new Error("Not implemented");
          }
        } catch (error) {
          if (error instanceof Error && error.message === "Not implemented") {
            // Check if the snapshot type is defined in our enum
            const snapshotTypeName = this.getSnapshotTypeName(snapshotHeaderNumber);
            if (snapshotTypeName) {
              this.logger.warn(
                `Received an unimplemented World snapshot ${snapshotTypeName} (0x${snapshotHeaderNumber.toString(16).toUpperCase().padStart(4, '0')}).`
              );
            } else {
              this.logger.warn(
                `[SECURITY] Received an unknown World snapshot 0x${snapshotHeaderNumber.toString(16).toUpperCase().padStart(4, '0')}.`
              );
            }
            // Skip unknown snapshot - advance by at least the header size
            // If we don't know the length, we might need to break or make a best guess
            dataOffset += 2;
          } else {
            this.logger.error(`An error occurred while handling a world snapshot: ${error}`);
            break;
          }
        }
      } catch (error) {
        this.logger.error(`Failed to process snapshot: ${error}`);
        break;
      } finally {
        snapshotCount--;
      }
    }
  }

  private async handleDestPosSnapshot(snapshot: BinaryStream): Promise<void> {
    try {
      // Read position data in little-endian format (FlyFF uses little-endian)
      const setDestPositionPacket: SetDestPositionPacket = {
        x: snapshot.readSingleLE(),
        y: snapshot.readSingleLE(),
        z: snapshot.readSingleLE()
      };

      // Get the player from user connection (similar to C# Player.Move())
      const player = this.userConnection.player as Player;
      if (player && typeof player.move === 'function') {
        player.move(setDestPositionPacket.x, setDestPositionPacket.y, setDestPositionPacket.z);
        this.logger.info(`Player ${player.name} moved to (${setDestPositionPacket.x}, ${setDestPositionPacket.y}, ${setDestPositionPacket.z})`);
      } else {
        this.logger.warn("Player not found or move method not available for DESTPOS snapshot");
      }
    } catch (error) {
      this.logger.error(`Error handling DESTPOS snapshot: ${error}`);
    }
  }

  private async handleGuildBankWndSnapshot(snapshot: BinaryStream): Promise<void> {
    try {
      // GUILD_BANK_WND snapshot is typically sent when player interacts with guild bank
      // For now, just log that we received it and handle basic case

      this.logger.info('Received GUILD_BANK_WND snapshot - player attempting to access guild bank');

      // TODO: Implement guild bank window logic
      // This would typically:
      // 1. Check if player has guild bank access permissions
      // 2. Open guild bank interface
      // 3. Send guild bank items to client
      // 4. Handle guild bank interactions

      // For now, just acknowledge receipt
      const player = this.userConnection.player as Player;
      if (player) {
        this.logger.info(`Player ${player.name} accessed guild bank window`);
      }

    } catch (error) {
      this.logger.error(`Error handling GUILD_BANK_WND snapshot: ${error}`);
    }
  }

  private async handleSealCharGetSnapshot(snapshot: BinaryStream): Promise<void> {
    try {
      // SEALCHARGET_REQ snapshot is sent by client when mouse movement occurs
      // According to C++ code, this is related to seal character system
      // This snapshot appears to have no data beyond the header

      this.logger.debug('Received SEALCHARGET_REQ snapshot - mouse interaction from client');

      // For now, just acknowledge and ignore this snapshot
      // The client sends this during mouse movement but it's not critical for basic gameplay
      const player = this.userConnection.player as Player;
      if (player) {
        this.logger.debug(`Player ${player.name} sent SEALCHARGET_REQ (mouse movement)`);
      }

    } catch (error) {
      this.logger.error(`Error handling SEALCHARGET_REQ snapshot: ${error}`);
    }
  }

  private getSnapshotTypeName(snapshotType: number): string | undefined {
    // Check if the snapshot type exists in our SnapshotType enum
    const snapshotTypeKeys = Object.keys(SnapshotType);
    for (const key of snapshotTypeKeys) {
      if (SnapshotType[key as keyof typeof SnapshotType] === snapshotType) {
        return key;
      }
    }
    return undefined;
  }
}