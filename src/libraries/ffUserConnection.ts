import { Socket } from "net";
import { Logger } from "../helpers/logger";
import { FlyffPacket } from "./flyffPacket";
import { PacketType } from "../protocol/packetType";
import { IUserConnection } from "../interfaces/connection";
import { ErrorType } from "../types/errorType";
import Character from "../database/character";
import EquipmentItem from "../database/equipmentItem";
import _ from "lodash";
import { PacketLogger } from "../helpers/packetLogger";

/**
 * Represents a FlyFF user connection.
 * Equivalent to C# FFUserConnection : LiteServerUser
 * This IS the IUserConnection implementation in this project
 */
export abstract class FFUserConnection implements IUserConnection {
  /**
   * Gets the user session id.
   */
  public readonly sessionId: number = Math.floor(Math.random() * Math.pow(2, 31));

  /**
   * Gets the connection logger.
   */
  protected logger: Logger;

  public userId: number | null = null;
  public username: string | null = null;
  public player: any = null; // Will be set to Player instance in world server
  public selectedCharacterId: number | null = null; // Track selected character
  public selectedCharacterName: string | null = null; // Track selected character name
  public authKey: number | null = null; // Track auth key for world server

  /**
   * Gets the socket connection
   */
  public readonly socket: Socket;

  protected constructor(logger: Logger, socket: Socket) {
    this.logger = logger;
    this.socket = socket;
  }

  /**
   * Disconnects the user connection
   */
  public disconnect(): void {
    if (this.socket && !this.socket.destroyed) {
      this.socket.destroy();
    }
  }

  /**
   * Sends a packet to the client
   */
  public send(packet: FlyffPacket): void {
    if (this.socket && !this.socket.destroyed) {
      const finalBuffer = FlyffPacket.appendHeader(packet.buffer);

      // Log outgoing packet
      PacketLogger.logOutgoingPacket(
        this.sessionId,
        `${this.socket.remoteAddress}:${this.socket.remotePort}`,
        packet.PacketType,
        finalBuffer
      );

      this.socket.write(finalBuffer);
    }
  }

  /**
   * Sends a raw buffer to the client (for ServerPacket format)
   */
  public sendBuffer(buffer: Buffer, packetType?: number): void {
    if (this.socket && !this.socket.destroyed) {
      // Log outgoing packet
      PacketLogger.logOutgoingPacket(
        this.sessionId,
        `${this.socket.remoteAddress}:${this.socket.remotePort}`,
        packetType || 0,
        buffer
      );

      this.socket.write(buffer);
    }
  }

  /**
   * Sends an error packet to the client
   */
  public sendError(errorType: ErrorType): void {
    const packet = new FlyffPacket(PacketType.ERROR);
    packet.writeUInt32LE(errorType);
    this.send(packet);
  }

  /**
   * Sends character list to the client
   */
  public sendCharacterList(characters: Character[], authKey: number): void {
    const packet = new FlyffPacket(PacketType.CHARACTER_LIST);
    const filteredCharacters = _.filter(characters, { deleted: false });

    packet.writeInt32LE(authKey);
    packet.writeInt32LE(filteredCharacters.length || 0);

    _.forEach(filteredCharacters, (character: Character) => {
      packet.writeInt32LE(character.slot);
      packet.writeInt32LE(character.id); // this number represents the selected character in the window
      packet.writeInt32LE(character.mapId);
      packet.writeInt32LE(0x0b + character.gender); // Model id
      packet.writeStringLE(character.name);
      packet.writeSingleLE(character.positionX);
      packet.writeSingleLE(character.positionY);
      packet.writeSingleLE(character.positionZ);
      packet.writeInt32LE(character.id);
      packet.writeInt32LE(0); // Party id
      packet.writeInt32LE(0); // Guild id
      packet.writeInt32LE(0); // War Id
      packet.writeInt32LE(character.skinSetId);
      packet.writeInt32LE(character.hairId);
      packet.writeUInt32(character.hairColor);
      packet.writeInt32LE(character.faceId);
      packet.writeByte(character.gender);
      packet.writeInt32LE(character.jobId);
      packet.writeInt32LE(character.level);
      packet.writeInt32LE(0); // Job Level (Maybe master or hero ?)
      packet.writeInt32LE(character.strength);
      packet.writeInt32LE(character.stamina);
      packet.writeInt32LE(character.dexterity);
      packet.writeInt32LE(character.intelligence);
      packet.writeInt32LE(0); // Mode ??

      packet.writeInt32LE(character.equipments.length);

      _.forEach(character.equipments, (equipment: EquipmentItem) => {
        packet.writeInt32LE(equipment.item.itemId);
      });
    });
    packet.writeInt32LE(0);
    this.send(packet);
  }

  /**
   * Logs a warning for unimplemented packet handlers
   */
  public packetHandlerNotImplemented(packetType: PacketType): void {
    this.logger.warn(
      `Received an unimplemented packet ${PacketType[packetType] || 'UNKNOWN'} (0x${packetType.toString(16).toUpperCase().padStart(8, '0')}) from ${this.socket.remoteAddress}:${this.socket.remotePort}.`
    );
  }

  /**
   * Logs a warning for unimplemented snapshot handlers
   */
  public snapshotNotImplemented(snapshotType: number): void {
    this.logger.warn(
      `Received an unimplemented snapshot ${snapshotType} (0x${snapshotType.toString(16).toUpperCase().padStart(8, '0')}) from ${this.socket.remoteAddress}:${this.socket.remotePort}.`
    );
  }

  /**
   * Called when the connection is established (equivalent to C# OnConnected)
   */
  protected onConnected(): void {
    this.logger.info(`New user connected (SessionId=${this.sessionId}|Address=${this.socket.remoteAddress}:${this.socket.remotePort})`);

    // Create WELCOME packet with proper structure
    const packet = new FlyffPacket(PacketType.WELCOME);
    packet.writeUInt32LE(this.sessionId);
    this.send(packet);

    this.logger.info(`Sent WELCOME packet with sessionId: ${this.sessionId}`);
  }

  /**
   * Called when the connection is disconnected (equivalent to C# OnDisconnected)
   */
  protected onDisconnected(): void {
    this.logger.info(`Client disconnected from ${this.socket?.remoteAddress}:${this.socket?.remotePort} (SessionId=${this.sessionId}).`);
  }

  /**
   * Called when an error occurs (equivalent to C# OnError)
   */
  protected onError(error: Error): void {
    this.logger.error(`An error occurred while processing a request for user (Session Id=${this.sessionId}): ${error.message}`);
  }

  /**
   * Initialize the connection and set up event listeners
   */
  public initialize(): void {
    // Call onConnected when connection is established
    this.onConnected();

    // Set up event listeners
    this.socket.on('close', () => {
      this.onDisconnected();
    });

    this.socket.on('error', (error: Error) => {
      this.onError(error);
    });
  }
}