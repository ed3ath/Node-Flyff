import { DataSource } from "typeorm";
import { Logger } from "../helpers/logger";

/**
 * Helper service to ensure ChatLog table exists and has the correct structure
 */
export class ChatLogMigration {
  private static logger = new Logger("ChatLogMigration");

  public static async ensureChatLogTable(dataSource: DataSource): Promise<void> {
    try {
      const queryRunner = dataSource.createQueryRunner();

      // Check if ChatLog table exists
      const tableExists = await queryRunner.hasTable("ChatLog");

      if (!tableExists) {
        this.logger.info("Creating ChatLog table...");

        await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS "ChatLog" (
            "id" INTEGER PRIMARY KEY AUTOINCREMENT,
            "characterId" INTEGER,
            "characterName" TEXT NOT NULL,
            "message" TEXT NOT NULL,
            "channelType" INTEGER NOT NULL DEFAULT 0,
            "targetCharacterName" TEXT,
            "mapId" INTEGER,
            "positionX" REAL,
            "positionY" REAL,
            "positionZ" REAL,
            "partyId" INTEGER,
            "guildId" INTEGER,
            "timestamp" DATETIME DEFAULT CURRENT_TIMESTAMP,
            "isCommand" BOOLEAN DEFAULT 0,
            "isEmote" BOOLEAN DEFAULT 0,
            "serverName" TEXT
          )
        `);

        // Create indexes for better query performance
        await queryRunner.query(`
          CREATE INDEX IF NOT EXISTS "IDX_chatlog_character_timestamp"
          ON "ChatLog" ("characterId", "timestamp")
        `);

        await queryRunner.query(`
          CREATE INDEX IF NOT EXISTS "IDX_chatlog_channel_timestamp"
          ON "ChatLog" ("channelType", "timestamp")
        `);

        await queryRunner.query(`
          CREATE INDEX IF NOT EXISTS "IDX_chatlog_timestamp"
          ON "ChatLog" ("timestamp")
        `);

        this.logger.success("ChatLog table and indexes created successfully");
      } else {
        this.logger.info("ChatLog table already exists");
      }

      await queryRunner.release();
    } catch (error) {
      this.logger.error(`Failed to ensure ChatLog table: ${error}`);
      throw error;
    }
  }
}