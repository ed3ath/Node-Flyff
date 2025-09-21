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
  public objectType: number;
  public modelId: number;

  constructor(worldObject: Mover, excludeItems: boolean = false) {
    const packet = new ServerPacket();

    // Store object type and model ID for use by ServerSnapshot
    this.objectType = worldObject instanceof Player ? 5 : 3;  // OT_MOVER = 5

    // Determine model ID based on object type and gender
    if (worldObject instanceof Player) {
      // Use correct FlyFF model IDs: MI_MALE = 11, MI_FEMALE = 12
      const gender = worldObject.appearance?.gender || 0;
      this.modelId = gender === 0 ? 11 : 12; // 0 = male, 1 = female
      console.log(`[DEBUG] Using model ID ${this.modelId} for player ${worldObject.name} (gender: ${gender})`);
    } else {
      // For non-players, use the properties ID or fallback
      this.modelId = worldObject.properties?.id || (worldObject as any).id || worldObject.objectId;
    }

    // === EXACT C++ SERIALIZATION STRUCTURE ===
    // Follow the exact C++ serialization chain: CObj::Serialize -> CCtrl::Serialize -> CMover::Serialize

    // *** CObj::Serialize (21 bytes) ***
    // 1. Type (1 byte) - DUPLICATE of header but required by C++ client
    packet.writeByte(this.objectType); // u_char m_dwType (DUPLICATE - C++ writes this again!)

    // 2. Index (4 bytes) - DUPLICATE of header but required by C++ client
    packet.writeUInt32LE(this.modelId); // u_int m_dwIndex (DUPLICATE - C++ writes this again!)

    // 3. Scale (2 bytes) - scale * 100.0f as u_short
    const scale = 100; // Default scale 1.0 * 100
    packet.writeUInt16LE(scale);

    // 4. Position (12 bytes) - D3DXVECTOR3 (3 x float)
    packet.writeSingleLE(worldObject.position.x);
    packet.writeSingleLE(worldObject.position.y);
    packet.writeSingleLE(worldObject.position.z);

    // 5. Angle (2 bytes) - angle * 10.0f as short
    const angle = (worldObject.rotationAngle || 0) * 10.0;
    packet.writeInt16LE(Math.round(angle));

    // *** CCtrl::Serialize (4 bytes) ***
    // 6. Object ID (4 bytes)
    packet.writeUInt32LE(worldObject.objectId);

    // Log the critical object creation values
    if (worldObject instanceof Player) {
      console.log(`[DEBUG] ===== FIXED C++ STRUCTURE SERIALIZATION =====`);
      console.log(`[DEBUG] CObj::Serialize (21 bytes):`);
      console.log(`[DEBUG]   - Type (DUPLICATE): ${this.objectType} (1 byte)`);
      console.log(`[DEBUG]   - Index (DUPLICATE): ${this.modelId} (4 bytes)`);
      console.log(`[DEBUG]   - Scale: ${scale} (2 bytes)`);
      console.log(`[DEBUG]   - Position: (${worldObject.position.x}, ${worldObject.position.y}, ${worldObject.position.z}) (12 bytes)`);
      console.log(`[DEBUG]   - Angle: ${Math.round(angle)} (2 bytes)`);
      console.log(`[DEBUG] CCtrl::Serialize (4 bytes):`);
      console.log(`[DEBUG]   - Object ID: ${worldObject.objectId} (4 bytes)`);
      console.log(`[DEBUG] Total CObj+CCtrl: 25 bytes`);
      console.log(`[DEBUG] This will call CreateObj(pd3dDevice, ${this.objectType}, ${this.modelId}, ${this.objectType !== 5 ? 1 : 0})`);
    }

    // === MINIMAL C++ PLAYER SERIALIZATION ===
    // Start with absolute basics to get the client working
    if (worldObject instanceof Player) {
      // Essential CMover fields
      packet.writeInt16LE(0); // Motion
      packet.writeByte(1); // m_bPlayer (1 = player, 0 = NPC)

      const hp = worldObject.health?.hp ?? 100;
      packet.writeInt32LE(hp); // Hit points
      console.log(`[DEBUG] Writing HP: ${hp}`);

      packet.writeInt32LE(0); // Object state
      packet.writeInt32LE(0); // Object state flags
      packet.writeByte(1); // Belligerence

      packet.writeInt32LE(-1); // Mover SFX ID

      // Player basic info
      const playerName = worldObject.name || "TestPlayer";
      packet.writeString(playerName);
      console.log(`[DEBUG] Writing player name: "${playerName}"`);

      const gender = worldObject.appearance?.gender || 0;
      packet.writeByte(gender);
      console.log(`[DEBUG] Writing gender: ${gender}`);

      packet.writeByte(worldObject.appearance?.skinSetId || 0);
      packet.writeByte(worldObject.appearance?.hairId || 0);
      packet.writeInt32LE(worldObject.appearance?.hairColor || 0);
      packet.writeByte(worldObject.appearance?.faceId || 0);

      packet.writeInt32LE(worldObject.id); // Player ID

      const jobId = worldObject.job?.id ?? 0;
      packet.writeByte(jobId);
      console.log(`[DEBUG] Writing job ID: ${jobId}`);

      // Stats
      packet.writeInt16LE(worldObject.statistics?.strength || 15);
      packet.writeInt16LE(worldObject.statistics?.stamina || 15);
      packet.writeInt16LE(worldObject.statistics?.dexterity || 15);
      packet.writeInt16LE(worldObject.statistics?.intelligence || 15);

      const level = worldObject.level || 1;
      packet.writeInt16LE(level);
      console.log(`[DEBUG] Writing level: ${level}`);

      // Minimal additional required fields
      packet.writeInt32LE(-1); // Fuel
      packet.writeInt32LE(0); // Fuel time
      packet.writeByte(0); // Guild
      packet.writeInt32LE(0); // Guild cloak
      packet.writeByte(0); // Party

      // Stop here for now - test minimal structure first

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