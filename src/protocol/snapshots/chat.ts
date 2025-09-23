import { FlyffSnapshot } from "../../libraries/snapshot";
import { SnapshotType } from "../snapshotType";

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
 * Based on Rhisis.Game.Protocol.Packets.World.Server.Snapshots.ChatSnapshot
 *
 * C# Reference:
 * public class ChatSnapshot : FFSnapshot
 * {
 *     public ChatSnapshot(WorldObject worldObject, string text)
 *         : base(SnapshotType.CHAT, worldObject.ObjectId)
 *     {
 *         WriteString(text);
 *     }
 * }
 */
export class ChatSnapshot extends FlyffSnapshot {
  /**
   * Creates a new ChatSnapshot
   * @param objectId Object ID of the speaker (equivalent to worldObject.ObjectId)
   * @param message The chat message text
   * @param chatType The type of chat (default: NORMAL)
   */
  constructor(objectId: number, message: string, chatType: ChatType = ChatType.NORMAL) {
    // Call parent constructor first
    super(SnapshotType.CHAT, objectId);

    // Store message and chat type after calling super
    this.writeString(message);

    // Debug logging
    console.log(`🔍 ChatSnapshot Created:`);
    console.log(`  Object ID: ${objectId}`);
    console.log(`  Message: "${message}"`);
    console.log(`  Chat Type: ${ChatType[chatType]} (${chatType})`);
    console.log(`  Snapshot Type: CHAT (0x${SnapshotType.CHAT.toString(16).padStart(4, '0')})`);
    console.log(`  Packet size: ${this.buffer.length} bytes`);
    console.log(`  Packet hex: ${this.buffer.toString('hex').toUpperCase()}`);
  }
}