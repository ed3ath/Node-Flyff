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
}