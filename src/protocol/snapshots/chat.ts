import { SnapshotType } from "../snapshotType";
import { FlyffSnapshot } from "../../libraries/snapshot";

/**
 * Chat types for different message channels
 */
export enum ChatType {
  NORMAL = 0,
  WHISPER = 1,
  PARTY = 2,
  GUILD = 3,
  NOTICE = 4,
  SYSTEM = 5,
  SHOUT = 6,
  GM = 7,
  DEATH = 8
}

/**
 * CHAT Snapshot (0x0001)
 * Purpose: Chat message display
 * C++ Reference: SNAPSHOTTYPE_CHAT
 *
 * C++ Format: ar << GETID(pCtrl) << SNAPSHOTTYPE_CHAT; ar.WriteString(szChat);
 * Client expects: Just the message string, nothing else!
 */
export class ChatSnapshot extends FlyffSnapshot {
  constructor(playerId: number, message: string, chatType: ChatType = ChatType.NORMAL) {
    super(SnapshotType.CHAT, playerId);

    // C++ client expects ONLY the message string - no extra data!
    this.writeString(message);

    // Debug: Log the actual packet structure breakdown
    console.log(`🔍 ChatSnapshot Debug Breakdown:`);
    console.log(`  Player ID: ${playerId}`);
    console.log(`  Message: "${message}"`);
    console.log(`  Snapshot Type: 0x${SnapshotType.CHAT.toString(16).padStart(4, '0')}`);
    console.log(`  Buffer length: ${this.buffer.length} bytes`);
    console.log(`  Buffer hex: ${this.buffer.toString('hex').toUpperCase()}`);

    // Breakdown the buffer structure
    console.log(`🔍 Buffer Structure Analysis:`);
    console.log(`  Bytes 0-3: PacketType (${this.buffer.readUInt32LE(0)})`);
    console.log(`  Bytes 4-7: Unknown/Reserved (${this.buffer.readUInt32LE(4)})`);
    console.log(`  Bytes 8-9: Count (${this.buffer.readUInt16LE(8)})`);
    console.log(`  Bytes 10-13: Object ID (${this.buffer.readUInt32LE(10)})`);
    console.log(`  Bytes 14-15: Snapshot Type (0x${this.buffer.readUInt16LE(14).toString(16).padStart(4, '0')})`);
    console.log(`  Bytes 16+: Message data`);
    if (this.buffer.length > 16) {
      const messageLength = this.buffer.readUInt32LE(16);
      console.log(`  Message length: ${messageLength}`);
      const actualMessage = this.buffer.subarray(20, 20 + messageLength).toString('utf8');
      console.log(`  Actual message: "${actualMessage}"`);
    }
  }
}