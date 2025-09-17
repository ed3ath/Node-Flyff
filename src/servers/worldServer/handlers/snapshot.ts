import { PacketType } from "../../../common/packetType";
import { SnapshotType } from "../../../common/snapshotType";
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

    // Read snapshot count (similar to C# SnapshotPacket.Count)
    this.packet = {
      count: packet.readInt16(),
      data: packet.buffer.subarray(packet.position)
    };
  }

  async execute(): Promise<void> {
    let snapshotCount = this.packet.count;
    let dataOffset = 0;

    while (snapshotCount > 0) {
      try {
        // Create binary stream from remaining snapshot data (similar to C# FFPacket)
        const remainingData = this.packet.data.subarray(dataOffset);
        const snapshot = new BinaryStream(remainingData);

        // Read snapshot header (similar to C# snapshot.ReadInt16())
        const snapshotHeaderNumber = snapshot.readInt16();

        try {
          const snapshotHeader = snapshotHeaderNumber as SnapshotType;

          if (snapshotHeader === SnapshotType.DEST_POS) {
            await this.handleDestPosSnapshot(snapshot);
            // DEST_POS snapshot contains: int16 header + 3 floats (12 bytes) + 1 byte = 15 bytes total
            dataOffset += 2 + 12 + 1;
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
      // Read position data (similar to C# SetDestPositionPacket)
      const setDestPositionPacket: SetDestPositionPacket = {
        x: snapshot.readSingle(),
        y: snapshot.readSingle(),
        z: snapshot.readSingle()
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