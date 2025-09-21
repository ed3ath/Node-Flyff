import { DataSource } from "typeorm";
import CharacterEntity from "../database/character";
import ChatLogEntity, { ChatChannelType } from "../database/chatLog";
import { Player } from "../entities/player";
import { Logger } from "../helpers/logger";

/**
 * Service for handling player data operations including position saving and chat logging
 */
export class PlayerDataService {
  private static instance: PlayerDataService;
  private logger: Logger;
  private dataSource: DataSource | null = null;

  private constructor() {
    this.logger = new Logger("PlayerDataService");
  }

  public static getInstance(): PlayerDataService {
    if (!PlayerDataService.instance) {
      PlayerDataService.instance = new PlayerDataService();
    }
    return PlayerDataService.instance;
  }

  public setDataSource(dataSource: DataSource): void {
    this.dataSource = dataSource;
  }

  /**
   * Save player position to database
   */
  public async savePlayerPosition(player: Player): Promise<void> {
    if (!this.dataSource) {
      this.logger.error("DataSource not available for saving player position");
      return;
    }

    try {
      const characterRepository = this.dataSource.getRepository(CharacterEntity);

      await characterRepository.update(player.id, {
        positionX: player.position.x,
        positionY: player.position.y,
        positionZ: player.position.z,
        mapId: (player as any).mapId || 1
      });

      this.logger.debug(`Saved position for player ${player.name} (${player.id}): ${player.position.x}, ${player.position.y}, ${player.position.z}`);
    } catch (error) {
      this.logger.error(`Failed to save player position for ${player.name}: ${error}`);
    }
  }

  /**
   * Save complete player data including stats, gold, experience, etc.
   */
  public async savePlayerData(player: Player): Promise<void> {
    if (!this.dataSource) {
      this.logger.error("DataSource not available for saving player data");
      return;
    }

    try {
      const characterRepository = this.dataSource.getRepository(CharacterEntity);

      const updateData: Partial<CharacterEntity> = {
        positionX: player.position.x,
        positionY: player.position.y,
        positionZ: player.position.z,
        mapId: (player as any).mapId || 1,
        level: player.level || 1,
        gold: (player.gold as any)?.amount || 0,
        experience: (player.experience as any)?.currentExp || 0,
        statPoints: player.availablePoints || 0,
        skillPoints: player.skillPoints || 0
      };

      if (player.statistics) {
        updateData.strength = player.statistics.strength || 0;
        updateData.stamina = player.statistics.stamina || 0;
        updateData.dexterity = player.statistics.dexterity || 0;
        updateData.intelligence = player.statistics.intelligence || 0;
      }

      await characterRepository.update(player.id, updateData);

      this.logger.info(`Saved complete player data for ${player.name} (${player.id})`);
    } catch (error) {
      this.logger.error(`Failed to save player data for ${player.name}: ${error}`);
    }
  }

  /**
   * Log chat message to database
   */
  public async logChatMessage(
    player: Player,
    message: string,
    channelType: ChatChannelType = ChatChannelType.NORMAL,
    targetCharacterName?: string,
    isCommand: boolean = false,
    isEmote: boolean = false
  ): Promise<void> {
    if (!this.dataSource) {
      this.logger.error("DataSource not available for logging chat");
      return;
    }

    try {
      const chatLogRepository = this.dataSource.getRepository(ChatLogEntity);

      const chatLog = new ChatLogEntity();
      chatLog.characterId = player.id;
      chatLog.characterName = player.name;
      chatLog.message = message;
      chatLog.channelType = channelType;
      chatLog.targetCharacterName = targetCharacterName || null;
      chatLog.mapId = (player as any).mapId || null;
      chatLog.positionX = player.position.x;
      chatLog.positionY = player.position.y;
      chatLog.positionZ = player.position.z;
      chatLog.partyId = null; // TODO: Implement party system
      chatLog.guildId = null; // TODO: Implement guild system
      chatLog.isCommand = isCommand;
      chatLog.isEmote = isEmote;
      chatLog.serverName = "WorldServer"; // TODO: Get from config

      await chatLogRepository.save(chatLog);

      this.logger.debug(`Logged chat message from ${player.name}: "${message}" (${ChatChannelType[channelType]})`);
    } catch (error) {
      this.logger.error(`Failed to log chat message from ${player.name}: ${error}`);
    }
  }

  /**
   * Log system message to database (no player associated)
   */
  public async logSystemMessage(
    message: string,
    channelType: ChatChannelType = ChatChannelType.SYSTEM
  ): Promise<void> {
    if (!this.dataSource) {
      this.logger.error("DataSource not available for logging system message");
      return;
    }

    try {
      const chatLogRepository = this.dataSource.getRepository(ChatLogEntity);

      const chatLog = new ChatLogEntity();
      chatLog.characterId = null;
      chatLog.characterName = "SYSTEM";
      chatLog.message = message;
      chatLog.channelType = channelType;
      chatLog.targetCharacterName = null;
      chatLog.mapId = null;
      chatLog.positionX = null;
      chatLog.positionY = null;
      chatLog.positionZ = null;
      chatLog.partyId = null;
      chatLog.guildId = null;
      chatLog.isCommand = false;
      chatLog.isEmote = false;
      chatLog.serverName = "WorldServer";

      await chatLogRepository.save(chatLog);

      this.logger.debug(`Logged system message: "${message}"`);
    } catch (error) {
      this.logger.error(`Failed to log system message: ${error}`);
    }
  }

  /**
   * Get recent chat messages for a character or channel
   */
  public async getRecentChatMessages(
    characterId?: number,
    channelType?: ChatChannelType,
    limit: number = 50
  ): Promise<ChatLogEntity[]> {
    if (!this.dataSource) {
      this.logger.error("DataSource not available for fetching chat messages");
      return [];
    }

    try {
      const chatLogRepository = this.dataSource.getRepository(ChatLogEntity);
      const queryBuilder = chatLogRepository.createQueryBuilder("chat")
        .orderBy("chat.timestamp", "DESC")
        .limit(limit);

      if (characterId) {
        queryBuilder.andWhere("chat.characterId = :characterId", { characterId });
      }

      if (channelType !== undefined) {
        queryBuilder.andWhere("chat.channelType = :channelType", { channelType });
      }

      const messages = await queryBuilder.getMany();
      return messages.reverse(); // Return in chronological order
    } catch (error) {
      this.logger.error(`Failed to fetch recent chat messages: ${error}`);
      return [];
    }
  }
}