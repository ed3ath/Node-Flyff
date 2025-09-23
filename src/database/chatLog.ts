import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  Index,
} from "typeorm";
import CharacterEntity from "./character";

export enum ChatChannelType {
  NORMAL = 0,
  WHISPER = 1,
  PARTY = 2,
  GUILD = 3,
  NOTICE = 4,
  SYSTEM = 5,
  SHOUT = 6,
  GM = 7,
  DEATH = 8,
  COMMAND = 9,
  EMOTE = 10
}

@Entity("ChatLog")
@Index(["characterId", "timestamp"]) // Index for efficient queries by character and time
@Index(["channelType", "timestamp"]) // Index for efficient queries by channel and time
@Index(["timestamp"]) // Index for time-based queries
export default class ChatLogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CharacterEntity, { nullable: true, onDelete: 'SET NULL' })
  character: CharacterEntity | null;

  @Column({ nullable: true, type: "integer" })
  characterId: number | null;

  @Column({ nullable: false, type: "text" })
  characterName: string;

  @Column({ nullable: false, type: "text" })
  message: string;

  @Column({
    nullable: false,
    type: "integer",
    default: ChatChannelType.NORMAL
  })
  channelType: ChatChannelType;

  @Column({ nullable: true, type: "text" })
  targetCharacterName: string | null; // For whispers

  @Column({ nullable: true, type: "integer" })
  mapId: number | null;

  @Column({ nullable: true, type: "real" })
  positionX: number | null;

  @Column({ nullable: true, type: "real" })
  positionY: number | null;

  @Column({ nullable: true, type: "real" })
  positionZ: number | null;

  @Column({ nullable: true, type: "integer" })
  partyId: number | null;

  @Column({ nullable: true, type: "integer" })
  guildId: number | null;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ default: false, type: "boolean" })
  isCommand: boolean;

  @Column({ default: false, type: "boolean" })
  isEmote: boolean;

  @Column({ nullable: true, type: "text" })
  serverName: string | null;
}