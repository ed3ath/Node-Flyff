import * as fs from 'fs';
import * as path from 'path';
import { PacketType } from '../protocol/packetType';
import { SnapshotType } from '../protocol/snapshotType';

export class WorldPacketLogger {
  private static logFilePath = path.join(process.cwd(), 'logs', 'world_packets.log');
  private static isInitialized = false;

  private static initialize(): void {
    if (this.isInitialized) return;

    // Ensure logs directory exists
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Clear the log file on startup
    fs.writeFileSync(this.logFilePath, '');

    // Add a separator when server starts
    const timestamp = this.formatTimestamp();
    fs.appendFileSync(this.logFilePath, `[${timestamp}] INFO | ====== WORLD SERVER STARTED ======\n`);

    this.isInitialized = true;
  }

  private static formatTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').slice(0, -5);
  }

  public static logPlayerCreation(characterData: any, healthData: any): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] PLAYER_CREATION | Character: ${JSON.stringify(characterData)} | Health: ${JSON.stringify(healthData)}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logAddObjectSnapshot(
    characterName: string,
    objectId: number,
    position: any,
    healthValues: any,
    isAlive: boolean,
    level: number
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] ADD_OBJECT_SNAPSHOT | Character: ${characterName} | ObjectId: ${objectId} | Position: ${JSON.stringify(position)} | Health: ${JSON.stringify(healthValues)} | IsAlive: ${isAlive} | Level: ${level}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logSnapshotHex(snapshotName: string, buffer: Buffer): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const hexData = buffer.toString('hex').toUpperCase();
    const logEntry = `[${timestamp}] SNAPSHOT_HEX | ${snapshotName} | Length: ${buffer.length} | Data: ${hexData}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logJoinGameSteps(step: string, data: any): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] JOIN_GAME_STEP | ${step} | Data: ${JSON.stringify(data)}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logHealthInitialization(characterName: string, healthValues: any): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] HEALTH_INIT | Character: ${characterName} | Health: ${JSON.stringify(healthValues)}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logRawJoinPacket(characterName: string, packetBuffer: Buffer, packetTypeValue: number, packetTypeConstant: number): void {
    this.initialize();

    const timestamp = this.formatTimestamp();

    const logContent = [
      ``,
      `================================================================================`,
      `[${timestamp}] RAW_JOIN_PACKET | === C++ CLIENT DEBUGGING DATA ===`,
      `Character: ${characterName}`,
      `Total Packet Length: ${packetBuffer.length} bytes`,
      ``,
      `=== FULL HEX DUMP ===`,
      packetBuffer.toString('hex').toUpperCase(),
      ``,
      `=== PACKET STRUCTURE BREAKDOWN ===`,
      `Header (0x5E): ${packetBuffer.subarray(0, 1).toString('hex').toUpperCase()}`,
      `Length Field: ${packetBuffer.subarray(1, 5).toString('hex').toUpperCase()} = ${packetBuffer.readUInt32LE(1)} bytes`,
      `Packet Type: ${packetBuffer.subarray(5, 9).toString('hex').toUpperCase()} = ${packetTypeValue} (PacketType.JOIN = ${packetTypeConstant})`,
      ``,
      `=== JOIN PACKET DATA ===`,
      packetBuffer.length >= 13 ? `Unused Field: ${packetBuffer.subarray(9, 13).toString('hex').toUpperCase()} = ${packetBuffer.readUInt32LE(9)}` : 'Packet too short',
      packetBuffer.length >= 15 ? `Snapshot Count: ${packetBuffer.subarray(13, 15).toString('hex').toUpperCase()} = ${packetBuffer.readUInt16LE(13)}` : 'No snapshot count',
      ``,
      `=== SNAPSHOT DATA (for C++ ar reading) ===`,
      packetBuffer.length > 15 ? packetBuffer.subarray(15).toString('hex').toUpperCase() : 'No snapshot data',
      ``,
      `=== INSTRUCTIONS FOR C++ DEBUGGING ===`,
      `1. Set breakpoint in CDPClient::OnJoin( CAr & ar ) starting line 887 of DPClient.cpp`,
      `2. The 'ar' parameter should contain the snapshot data portion above (starting from offset 15)`,
      `3. Compare what C++ ar.Read*() functions extract vs the hex data above`,
      `4. Player object creation should happen after reading this snapshot data`,
      ``,
      `=== EXPECTED C++ ar CONTENT ===`,
      packetBuffer.length > 15 ?
        `C++ ar should start with these bytes: ${packetBuffer.subarray(15, Math.min(47, packetBuffer.length)).toString('hex').toUpperCase()}`
        : 'No snapshot data to read',
      `================================================================================`,
      ``
    ].join('\n');

    fs.appendFileSync(this.logFilePath, logContent);
  }

  public static logAddObjHandler(
    playerName: string,
    objectId: number,
    objectName: string,
    position: any,
    distance: number
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] ADDOBJ_HANDLER | Player: ${playerName} | ObjectId: ${objectId} | ObjectName: ${objectName} | Position: ${JSON.stringify(position)} | Distance: ${distance.toFixed(2)}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logRemoveObjHandler(
    playerName: string,
    objectId: number
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] REMOVEOBJ_HANDLER | Player: ${playerName} | ObjectId: ${objectId}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logPlayerCorrectionForced(
    playerName: string,
    clientPosition: any,
    serverPosition: any,
    distance: number,
    reason: string
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] PLAYER_CORRECTION_FORCED | Player: ${playerName} | ClientPos: ${JSON.stringify(clientPosition)} | ServerPos: ${JSON.stringify(serverPosition)} | Distance: ${distance.toFixed(2)} | Reason: ${reason}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logPlayerCorrectionAccepted(
    playerName: string,
    clientPosition: any,
    distance: number
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] PLAYER_CORRECTION_ACCEPTED | Player: ${playerName} | ClientPos: ${JSON.stringify(clientPosition)} | Distance: ${distance.toFixed(2)}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logDamageHandler(
    attackerName: string,
    targetId: number,
    targetName: string,
    damage: number,
    damageType: number,
    remainingHp: number,
    isDead: boolean
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] DAMAGE_HANDLER | Attacker: ${attackerName} | TargetId: ${targetId} | TargetName: ${targetName} | Damage: ${damage} | DamageType: ${damageType} | RemainingHP: ${remainingHp} | IsDead: ${isDead}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logQueryPlayerData(
    playerName: string,
    targetPlayerId: number,
    targetPlayerName: string
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] QUERY_PLAYER_DATA | Player: ${playerName} | TargetId: ${targetPlayerId} | TargetName: ${targetPlayerName}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logRechargeIdStack(
    playerName: string,
    stackType: number,
    stackSize: number
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] RECHARGE_ID_STACK | Player: ${playerName} | StackType: ${stackType} | StackSize: ${stackSize}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logMyReg(
    playerName: string,
    playerId: number,
    registeredName: string,
    additionalData: number
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] MY_REG | Player: ${playerName} | PlayerId: ${playerId} | RegisteredName: ${registeredName} | AdditionalData: ${additionalData}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  // === EQUIPMENT DEBUG LOGGING ===

  public static logEquipmentDebug(characterName: string, message: string, data?: any): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    let logEntry = `[${timestamp}] EQUIPMENT_DEBUG | ${characterName} | ${message}`;

    if (data !== undefined) {
      logEntry += ` | Data: ${JSON.stringify(data, null, 2)}`;
    }

    logEntry += '\n';
    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logEquipmentLoading(characterName: string, equipmentCount: number, equipmentData: any[]): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] EQUIPMENT_LOADING | ${characterName} | Found ${equipmentCount} equipment items | Data: ${JSON.stringify(equipmentData, null, 2)}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logEquipmentItem(characterName: string, itemName: string, itemId: number, slot: number, inventorySlot: number): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] EQUIPMENT_ITEM | ${characterName} | ${itemName} (ID: ${itemId}) | Part Slot: ${slot} | Inventory Slot: ${inventorySlot}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logEquipmentSnapshot(characterName: string, equippedItemsCount: number, inventoryItemsMap: any, equipmentSlotData: any[]): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] EQUIPMENT_SNAPSHOT | ${characterName} | Equipped Items Count: ${equippedItemsCount} | Inventory Items Map: ${JSON.stringify(inventoryItemsMap)} | Equipment Slot Data (0-30): ${JSON.stringify(equipmentSlotData)}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }
}