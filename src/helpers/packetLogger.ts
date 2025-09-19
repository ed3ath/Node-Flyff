import * as fs from 'fs';
import * as path from 'path';
import { PacketType } from '../protocol/packetType';
import { SnapshotType } from '../protocol/snapshotType';

export class PacketLogger {
  private static logFilePath = path.join(process.cwd(), 'logs', 'packets.log');
  private static isInitialized = false;

  private static initialize(): void {
    if (this.isInitialized) return;

    // Ensure logs directory exists
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Clear existing log file
    fs.writeFileSync(this.logFilePath, '');
    this.isInitialized = true;
  }

  private static formatTimestamp(): string {
    const now = new Date();
    return now.toISOString().replace('T', ' ').slice(0, -5);
  }

  private static getPacketTypeName(packetType: number): string {
    return PacketType[packetType] || `UNKNOWN_PACKET_${packetType.toString(16).toUpperCase()}`;
  }

  private static getSnapshotTypeName(snapshotType: number): string {
    return SnapshotType[snapshotType] || `UNKNOWN_SNAPSHOT_${snapshotType.toString(16).toUpperCase()}`;
  }

  private static bufferToHexString(buffer: Buffer, maxLength: number = 64): string {
    const truncated = buffer.length > maxLength ? buffer.slice(0, maxLength) : buffer;
    const hex = truncated.toString('hex').toUpperCase();
    const formatted = hex.match(/.{1,2}/g)?.join(' ') || '';
    return buffer.length > maxLength ? `${formatted}... (${buffer.length} bytes total)` : `${formatted} (${buffer.length} bytes)`;
  }

  public static logIncomingPacket(
    sessionId: number,
    clientAddress: string,
    packetType: number,
    buffer: Buffer,
    rawBuffer?: Buffer
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const packetTypeName = this.getPacketTypeName(packetType);
    const hexData = this.bufferToHexString(buffer);
    const rawHexData = rawBuffer ? this.bufferToHexString(rawBuffer) : 'N/A';

    const logEntry = `[${timestamp}] INCOMING | Session: ${sessionId} | Client: ${clientAddress} | Type: ${packetTypeName} (0x${packetType.toString(16).toUpperCase().padStart(8, '0')}) | Data: ${hexData} | Raw: ${rawHexData}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logOutgoingPacket(
    sessionId: number,
    clientAddress: string,
    packetType: number,
    buffer: Buffer,
    isSnapshot: boolean = false,
    snapshotType?: number
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const packetTypeName = this.getPacketTypeName(packetType);
    const hexData = this.bufferToHexString(buffer);

    let typeInfo = `${packetTypeName} (0x${packetType.toString(16).toUpperCase().padStart(8, '0')})`;
    if (isSnapshot && snapshotType !== undefined) {
      const snapshotTypeName = this.getSnapshotTypeName(snapshotType);
      typeInfo += ` | Snapshot: ${snapshotTypeName} (0x${snapshotType.toString(16).toUpperCase().padStart(8, '0')})`;
    }

    const logEntry = `[${timestamp}] OUTGOING | Session: ${sessionId} | Client: ${clientAddress} | Type: ${typeInfo} | Data: ${hexData}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logSnapshotDetails(
    sessionId: number,
    clientAddress: string,
    dpidUser: number,
    objId: number,
    snapshotCount: number,
    snapshots: Array<{ type: number, data: Buffer }>
  ): void {
    this.initialize();

    const timestamp = this.formatTimestamp();

    let logEntry = `[${timestamp}] SNAPSHOT_DETAIL | Session: ${sessionId} | Client: ${clientAddress} | DPID: ${dpidUser} | ObjId: ${objId} | Count: ${snapshotCount}\n`;

    snapshots.forEach((snapshot, index) => {
      const snapshotTypeName = this.getSnapshotTypeName(snapshot.type);
      const hexData = this.bufferToHexString(snapshot.data);
      logEntry += `  └─ [${index + 1}/${snapshotCount}] ${snapshotTypeName} (0x${snapshot.type.toString(16).toUpperCase().padStart(8, '0')}) | Data: ${hexData}\n`;
    });

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logPacketError(sessionId: number, clientAddress: string, error: string): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] ERROR | Session: ${sessionId} | Client: ${clientAddress} | Error: ${error}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }

  public static logCustomMessage(message: string): void {
    this.initialize();

    const timestamp = this.formatTimestamp();
    const logEntry = `[${timestamp}] INFO | ${message}\n`;

    fs.appendFileSync(this.logFilePath, logEntry);
  }
}