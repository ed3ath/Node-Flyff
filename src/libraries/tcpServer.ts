import "reflect-metadata";
import { createServer, Server, Socket } from "net";
import _ from "lodash";

import { FlyffPacket } from "./flyffPacket";
import { HandlerConstructor } from "./packetHandler";
import { PacketType, ToStringHex } from "../protocol/packetType";
import { Logger } from "../helpers/logger";
import { ServerType } from "../types/serverType";
import { IUserConnection } from "../interfaces/connection";
import { IRedisClient } from "../interfaces/redis";
import { IConfig } from "../interfaces/config";
import { IInstance } from "../interfaces/instance";
import { ErrorType } from "../types/errorType";
import Character from "../database/character";
import EquipmentItem from "../database/equipmentItem";
import { FFUserConnection } from "./ffUserConnection";
import { PacketLogger } from "../helpers/packetLogger";

// Interface for server configuration
export interface IServerConfig {
  host: string;
  port: number;
}

// Main TCP Server class
export class TcpServer {
  private serverType: ServerType;
  private options: IServerConfig;
  time: number;
  server!: Server;
  handlers: Map<PacketType, HandlerConstructor> = new Map();
  connections: Map<number, IUserConnection> = new Map();
  instance!: IInstance;
  redisClient!: IRedisClient;
  logger: Logger;
  config: IConfig;

  // Constructor to initialize TcpServer instance
  constructor(serverType: ServerType, options: IServerConfig) {
    this.logger = new Logger(serverType);
    this.serverType = serverType;
    this.options = options;
  }

  /**
   * Factory method to create the appropriate user connection based on server type
   * Override this method in derived classes to return server-specific user connections
   */
  protected createUserConnection(socket: Socket): IUserConnection {
    // Default implementation returns the base UserConnection
    // This should be overridden in specific server implementations
    return new UserConnection(socket);
  }

  // Method to start the server
  start() {
    this.logger.main("Starting...");
    if (!this.handlers.size) {
      this.logger.warn("No packet handlers imported.");
    }
    this.server = createServer(this.onConnection.bind(this));
    this.server.listen(
      this.options.port,
      this.options.host,
      this.onServerStart.bind(this)
    );
  }

  setConfig(config: IConfig) {
    this.config = config;
  }

  addHandlers(handlers: Map<PacketType, HandlerConstructor>) {
    this.handlers = handlers;
  }

  addRedisClient(redisClient: IRedisClient) {
    this.redisClient = redisClient;
  }

  // Method called when server starts listening
  protected onServerStart(): void {
    this.logger.info(
      `Server listening on ${this.options.host}:${this.options.port}`
    );
    this.time = new Date().getTime();
  }

  // Method called when a new connection is established
  protected onConnection(socket: Socket): void {
    const userConnection = this.createUserConnection(socket);
    if (this.isUserConnected(userConnection)) return;
    this.connections.set(userConnection.sessionId, userConnection);
    this.logger.success(
      `New connection established with session ID: ${userConnection.sessionId} (${socket.remoteAddress}:${socket.remotePort})`
    );

    // For FFUserConnection instances, don't manually send welcome packet as it's handled in initialization
    // For legacy UserConnection instances, send welcome packet manually
    if (
      userConnection instanceof UserConnection &&
      !(userConnection instanceof FFUserConnection)
    ) {
      if (this.serverType !== ServerType.CORE_SERVER) {
        // Send welcome packet to the client
        const packet = new FlyffPacket();
        packet.writeUInt32(PacketType.WELCOME);
        packet.writeUInt32(userConnection.sessionId);
        userConnection.send(packet);
      }
    }

    // Attach event listeners for data, close, and error events
    socket.on("data", async (data) => {
      await this.onData(data, userConnection);
    });
    socket.on("close", () => this.onDisconnect(userConnection.sessionId));
    socket.on("error", (error) =>
      this.onError(error, userConnection.sessionId)
    );
  }

  // Method called when data is received from a client
  protected async onData(
    data: Buffer,
    userConnection: IUserConnection
  ): Promise<void> {
    // Log raw data BEFORE parsing
    const hexData = data.toString('hex').toUpperCase().match(/.{1,2}/g)?.join(' ') || '';
    this.logger.info(`RAW DATA RECEIVED (${data.length} bytes): ${hexData}`);
    PacketLogger.logRawData(
        userConnection.sessionId,
        `${userConnection.socket.remoteAddress}:${userConnection.socket.remotePort}`, data)

    try {
      const packet = new FlyffPacket(
        data,
        this.serverType === ServerType.LOGIN_SERVER
      );

      // Check if this is a composite packet (contains multiple commands)
      if (packet.isCompositePacket()) {
        this.logger.info(`Processing composite packet with ${packet.compositePackets.length} commands: ${packet.getAllPacketTypes().map(p => this.getPacketTypeId(p)).join(', ')}`);

        // Process each command in the composite packet
        for (const compositePacket of packet.compositePackets) {
          // Create a new FlyffPacket instance for each composite packet
          const commandPacket = new FlyffPacket(compositePacket.data, false, true); // ignoreHeaders = true
          commandPacket.PacketType = compositePacket.packetType;
          commandPacket.HeaderNumber = packet.HeaderNumber;
          commandPacket.DataLength = compositePacket.dataLength;
          commandPacket.position = 0; // Start reading from beginning of the data

          // Log incoming packet for this specific command
          PacketLogger.logIncomingPacket(
            userConnection.sessionId,
            `${userConnection.socket.remoteAddress}:${userConnection.socket.remotePort}`,
            compositePacket.packetType,
            compositePacket.data,
            data
          );

          console.log("Processing packet type:", compositePacket.packetType, this.getPacketTypeId(compositePacket.packetType));

          const HandlerClass = this.handlers.get(compositePacket.packetType);

          if (HandlerClass) {
            // Execute the corresponding packet handler
            const handlerInstance = new HandlerClass(commandPacket);
            console.log(this.getPacketTypeId(compositePacket.packetType));
            handlerInstance.userConnection = userConnection;
            handlerInstance.server = this;
            await handlerInstance.wrappedExecute();
          } else {
            // Log unimplemented packet type
            this.logger.warn(
              `Unimplemented packet ${this.getPacketTypeId(
                compositePacket.packetType
              )} (${ToStringHex(compositePacket.packetType)})`
            );
          }
        }
      } else {
        // Single packet processing (legacy behavior)
        // Log incoming packets for all server types
        PacketLogger.logIncomingPacket(
          userConnection.sessionId,
          `${userConnection.socket.remoteAddress}:${userConnection.socket.remotePort}`,
          packet.PacketType,
          packet.buffer,
          data
        );

        console.log("=========", packet.PacketType)

        const HandlerClass = this.handlers.get(packet.PacketType);

        if (HandlerClass) {
          // Execute the corresponding packet handler
          const handlerInstance = new HandlerClass(packet);
          console.log(this.getPacketTypeId(packet.PacketType));
          handlerInstance.userConnection = userConnection;
          handlerInstance.server = this;
          await handlerInstance.wrappedExecute();
        } else {
          // Log unimplemented packet type
          this.logger.warn(
            `Unimplemented packet ${this.getPacketTypeId(
              packet.PacketType
            )} (${ToStringHex(packet.PacketType)})`
          );
        }
      }
    } catch (error) {
      this.logger.error(`Error processing packet: ${error}`);
      this.logger.error(`Failed packet data: ${data.toString('hex')}`);
      // Don't disconnect on packet errors to maintain connection
    }
  }

  // Method called when a connection is closed
  protected onDisconnect(sessionId: number): void {
    if (this.connections.has(sessionId)) {
      this.connections.delete(sessionId);
      this.logger.warn(`Connection with session ID ${sessionId} closed`);
    }
  }

  // Method called when an error occurs
  protected onError(error: Error, sessionId: number | null = null): void {
    console.log(error);
    if (sessionId) {
      this.logger.error(`Error occurred for session ID ${sessionId}: ${error}`);
    } else {
      this.logger.error(error);
    }
  }

  // Utility method to get packet type ID as string
  getPacketTypeId(value: number): string | undefined {
    for (const key in PacketType) {
      if (PacketType[key as keyof typeof PacketType] === value) {
        return key;
      }
    }
    return undefined;
  }

  // Method to disconnect a user
  disconnectUser(userConnection: IUserConnection) {
    userConnection.disconnect();
  }

  disconnectByAccount(account: string) {
    const userConnection = this.getConnectionByAccount(account);

    if (userConnection) {
      userConnection.disconnect();
    }
  }

  // Method to check if a user is connected
  isUserConnected = (userConnection: IUserConnection) =>
    this.connections.has(userConnection.sessionId);

  isUserAccountConnected = (account: string) =>
    !_.isNil(this.getConnectionByAccount(account));

  getConnectionByAccount(account: string): IUserConnection | null {
    let userConnection: IUserConnection | null = null;
    this.connections.forEach((connection) => {
      if (connection.username === account) {
        userConnection = connection;
      }
    });
    return userConnection;
  }
}

export class UserConnection {
  public userId: number | null = null;
  public username: string | null = null;
  public player: any = null; // Will be set to Player instance in world server
  public selectedCharacterId: number | null = null; // Track selected character
  public selectedCharacterName: string | null = null; // Track selected character name
  public authKey: number | null = null; // Track auth key for world server
  public readonly sessionId: number;
  public readonly socket: Socket;

  // Constructor to initialize a user connection
  constructor(socket: Socket) {
    this.sessionId = Math.floor(Math.random() * Math.pow(2, 32));
    this.socket = socket;
  }

  // Method called when data is received (can be overridden)
  protected async onData(packet: FlyffPacket): Promise<void> {}

  // Method to send a packet to the client
  send(packet: FlyffPacket): void {
    this.socket.write(FlyffPacket.appendHeader(packet.buffer));
  }

  // Method to send a raw buffer to the client (for ServerPacket format)
  sendBuffer(buffer: Buffer, packetType?: number): void {
    this.socket.write(buffer);
  }

  // Method to send a snapshot to the client
  sendSnapshot(snapshot: any): void {
    if (snapshot && snapshot.buffer) {
      const finalBuffer = FlyffPacket.appendHeader(snapshot.buffer);
      this.socket.write(finalBuffer);
    }
  }

  sendError(errorType: ErrorType): void {
    const packet = new FlyffPacket(PacketType.ERROR);
    packet.writeUInt32(errorType);
    return this.send(packet);
  }

  sendCharacterList(characters: Character[], authKey: number): void {
    const packet = new FlyffPacket(PacketType.CHARACTER_LIST);
    const filteredCharacters = _.filter(characters, { deleted: false });

    packet.writeInt32(authKey);
    packet.writeInt32(filteredCharacters.length || 0);

    _.forEach(filteredCharacters, (character: Character) => {
      packet.writeInt32(character.slot);
      packet.writeInt32(character.id); // this number represents the selected character in the window
      packet.writeInt32(character.mapId);
      packet.writeInt32(0x0b + character.gender); // Model id
      packet.writeString(character.name);
      packet.writeSingle(character.positionX);
      packet.writeSingle(character.positionY);
      packet.writeSingle(character.positionZ);
      packet.writeInt32(character.id);
      packet.writeInt32(0); // Party id
      packet.writeInt32(0); // Guild id
      packet.writeInt32(0); // War Id
      packet.writeInt32(character.skinSetId);
      packet.writeInt32(character.hairId);
      packet.writeUInt32(character.hairColor);
      packet.writeInt32(character.faceId);
      packet.writeByte(character.gender);
      packet.writeInt32(character.jobId);
      packet.writeInt32(character.level);
      packet.writeInt32(0); // Job Level (Maybe master or hero ?)
      packet.writeInt32(character.strength);
      packet.writeInt32(character.stamina);
      packet.writeInt32(character.dexterity);
      packet.writeInt32(character.intelligence);
      packet.writeInt32(0); // Mode ??

      packet.writeInt32(character.equipments.length);

      _.forEach(character.equipments, (equipment: EquipmentItem) => {
        packet.writeInt32(equipment.item.itemId);
      });
    });
    packet.writeInt32(0);
    return this.send(packet);
  }

  disconnect(): void {
    this.socket.destroy();
  }
}
