import { SnapshotType } from "../../protocol/snapshotType";
import { Player } from "../../entities/player";
import { Mover } from "../../entities/mover";
import { ServerPacket } from "../../libraries/serverPacket";
import { WorldPacketLogger } from "../../helpers/worldPacketLogger";

/**
 * Server-side AddObject snapshot using correct FlyFF packet structure
 * This creates the snapshot data that will be embedded in a ServerSnapshot
 */
export class AddObjectServerSnapshot {
  private data: Buffer;

  constructor(worldObject: Mover, excludeItems: boolean = false) {
    const packet = new ServerPacket();

    // === CObj::Serialize data (21 bytes) ===
    // Write object type as BYTE (5 = OT_MOVER for player)
    const objectType = worldObject instanceof Player ? 5 : 3;  // OT_MOVER = 5
    packet.writeByte(objectType);

    // Write mover/model ID as DWORD - try different common FlyFF model IDs
    let modelId = worldObject.properties?.id || (worldObject as any).id || worldObject.objectId;
    if (worldObject instanceof Player) {
      // Try common FlyFF player model IDs in sequence
      const testModelIds = [11, 12, 1, 2, 10, 15, 20, 100, 101, 102, 200, 300];
      // Use objectId to cycle through different model IDs for testing
      const testIndex = worldObject.objectId % testModelIds.length;
      modelId = testModelIds[testIndex];
      console.log(`[DEBUG] Testing model ID ${modelId} (index ${testIndex}) for player ${worldObject.name} (gender: ${worldObject.appearance?.gender})`);
    }
    packet.writeUInt32LE(modelId);

    // Write scale (u_short: scale.x * 100.0f)
    packet.writeUInt16LE(100); // Default scale 1.0 * 100

    // Write position (D3DXVECTOR3: x, y, z as floats)
    packet.writeSingleLE(worldObject.position.x);
    packet.writeSingleLE(worldObject.position.y);
    packet.writeSingleLE(worldObject.position.z);

    // Write angle (short: angle * 10.0f)
    const angle = (worldObject.rotationAngle || 0) * 10.0;
    packet.writeInt16LE(Math.round(angle));

    // === CCtrl::Serialize data (4 bytes) ===
    // Write object ID (DWORD)
    packet.writeUInt32LE(worldObject.objectId);

    // Log the critical object creation values
    if (worldObject instanceof Player) {
      console.log(`[DEBUG] AddObject: ObjectType=${objectType}, ModelId=${modelId}, Gender=${worldObject.appearance?.gender}, ObjectId=${worldObject.objectId}`);
      console.log(`[DEBUG] Position: x=${worldObject.position.x}, y=${worldObject.position.y}, z=${worldObject.position.z}`);
      console.log(`[DEBUG] This will call CreateObj(pd3dDevice, ${objectType}, ${modelId}, ${objectType !== 5 ? 1 : 0})`);
    }

    // === CMover::Serialize data ===
    if (worldObject instanceof Player) {
      // Write motion (u_short)
      packet.writeUInt16LE(0); // Standing motion

      // Write player flag (u_char) - 1 for player, 0 for NPC
      packet.writeByte(1);

      // Write hit points (int)
      const hp = worldObject.health?.hp ?? 100;
      packet.writeInt32LE(hp);

      // Write actor state (DWORD)
      packet.writeUInt32LE(0); // No special state

      // Write actor state flags (DWORD)
      packet.writeUInt32LE(0); // No state flags

      // Write belligerence (u_char)
      packet.writeByte(0); // Peaceful

      // Write mover SFX ID (DWORD) - for version 15+
      packet.writeUInt32LE(0); // No SFX

      // === Player-specific data following C++ CMover::Serialize ===

      // Write player name (string)
      packet.writeString(worldObject.name);

      // Write gender (DWORD) - GetSex()
      packet.writeUInt32LE(worldObject.appearance?.gender || 0);

      // Write skin set (u_char)
      packet.writeByte(worldObject.appearance?.skinSetId || 0);

      // Write hair mesh (u_char)
      packet.writeByte(worldObject.appearance?.hairId || 0);

      // Write hair color (DWORD)
      packet.writeUInt32LE(worldObject.appearance?.hairColor || 0);

      // Write head mesh (u_char)
      packet.writeByte(worldObject.appearance?.faceId || 0);

      // Write player ID (DWORD)
      packet.writeUInt32LE(worldObject.id);

      // Write job (u_char)
      packet.writeByte(worldObject.job?.id || 0);

      // Write stats (all u_short)
      packet.writeUInt16LE(worldObject.statistics?.strength || 15);
      packet.writeUInt16LE(worldObject.statistics?.stamina || 15);
      packet.writeUInt16LE(worldObject.statistics?.dexterity || 15);
      packet.writeUInt16LE(worldObject.statistics?.intelligence || 15);

      // Write level (u_short)
      packet.writeUInt16LE(worldObject.level || 1);

      // Write fuel (int)
      packet.writeInt32LE(0); // No fuel

      // Write fuel time (DWORD)
      packet.writeUInt32LE(0); // No fuel time

      // Write guild info
      packet.writeByte(0); // No guild

      // Write guild cloak ID (DWORD)
      packet.writeUInt32LE(0);

      // Write party info
      packet.writeByte(0); // No party

      // === Minimal equipment data to complete CMover serialization ===
      // For now, write no equipment to keep packet simple
      packet.writeByte(0); // No equipped items

      // Continue with CMover serialization - this is a minimal version
      // The key is to provide enough data so GetProp() works correctly

    } else {
      // For non-player objects, write minimal NPC data
      packet.writeUInt16LE(0); // Motion
      packet.writeByte(0); // Not a player
      packet.writeInt32LE(100); // Hit points
      packet.writeUInt32LE(0); // State
      packet.writeUInt32LE(0); // State flags
      packet.writeByte(0); // Belligerence
      packet.writeUInt32LE(0); // SFX ID
    }

    // Get the raw data (without the server packet headers)
    this.data = packet.getBuffer().subarray(5); // Skip header and length

    // Log AddObjectSnapshot details for debugging
    if (worldObject instanceof Player) {
      const healthValues = {
        hp: worldObject.health?.hp ?? 100,
        maxHp: worldObject.health?.maxHp ?? 100,
        mp: worldObject.health?.mp ?? 100,
        maxMp: worldObject.health?.maxMp ?? 100,
        fp: worldObject.health?.fp ?? 100,
        maxFp: worldObject.health?.maxFp ?? 100
      };

      WorldPacketLogger.logAddObjectSnapshot(
        worldObject.name,
        worldObject.objectId,
        worldObject.position,
        healthValues,
        !worldObject.isDead,
        worldObject.level
      );

      // Log the raw snapshot hex data
      WorldPacketLogger.logSnapshotHex('AddObjectServerSnapshot', this.data);
    }
  }

  /**
   * Get the snapshot data
   */
  getData(): Buffer {
    return this.data;
  }
}