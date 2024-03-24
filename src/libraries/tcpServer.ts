import "reflect-metadata";
import { createServer, Server, Socket } from "net";
import _ from "lodash";

import { FlyffPacket } from "./flyffPacket";
import { HandlerConstructor } from "./packetHandler";
import { PacketType, ToStringHex } from "../common/packetType";
import { Logger } from "../helpers/logger";
import { ServerType } from "../common/serverType";
import { IUserConnection } from "../interfaces/connection";
import { IRedisClient } from "../interfaces/redis";
import { IConfig } from "../interfaces/config";
import { IInstance } from "../interfaces/instance";
import { ErrorType } from "../common/errorType";
import Character from "../database/character";
import EquipmentItem from "../database/equipmentItem";

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
    const userConnection = new UserConnection(socket);
    if (this.isUserConnected(userConnection)) return;
    this.connections.set(userConnection.sessionId, userConnection);
    this.logger.success(
      `New connection established with session ID: ${userConnection.sessionId} (${socket.remoteAddress}:${socket.remotePort})`
    );

    if (this.serverType !== ServerType.CORE_SERVER) {
      // Send welcome packet to the client
      const packet = FlyffPacket.createEmpty();
      packet.writeUInt32LE(PacketType.WELCOME);
      packet.writeUInt32LE(userConnection.sessionId);
      userConnection.send(packet);
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
    const packet = new FlyffPacket(
      data,
      this.serverType === ServerType.LOGIN_SERVER
    );

    const HandlerClass = this.handlers.get(packet.PacketType);
    if (HandlerClass) {
      // Execute the corresponding packet handler
      const handlerInstance = new HandlerClass(packet);
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

  getConnectionByAccount(account: string): UserConnection | null {
    let userConnection: UserConnection | null = null;
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

  sendError(errorType: ErrorType): void {
    const packet = FlyffPacket.createWithHeader(PacketType.ERROR);
    packet.writeUInt32LE(errorType);
    return this.send(packet);
  }

  sendCharacterList(characters: Character[], authKey: number): void {
    const packet = FlyffPacket.createWithHeader(PacketType.CHARACTER_LIST);
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
    return this.send(packet);
  }

  disconnect(): void {
    this.socket.destroy();
  }
}
