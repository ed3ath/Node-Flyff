import { Socket } from "net";
import { Logger } from "../../helpers/logger";
import { FFUserConnection } from "../../libraries/ffUserConnection";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { PacketType } from "../../protocol/packetType";
import { ErrorType } from "../../types/errorType";
import { GenderType } from "../../types/genderType";
import CharacterEntity from "../../database/character";

/**
 * Describes a character on the character selection screen.
 */
export class SelectableCharacter {
  /// <summary>
  /// Gets the character id.
  /// </summary>
  public Id: number;

  /// <summary>
  /// Gets the character name.
  /// </summary>
  public Name: string;

  /// <summary>
  /// Gets the character gender.
  /// </summary>
  public Gender: GenderType;

  /// <summary>
  /// Gets the character level.
  /// </summary>
  public Level: number;

  /// <summary>
  /// Gets the character slot on character selection screen.
  /// </summary>
  public Slot: number;

  /// <summary>
  /// Gets the character map id.
  /// </summary>
  public MapId: number;

  /// <summary>
  /// Gets the character X position.
  /// </summary>
  public PositionX: number;

  /// <summary>
  /// Gets the character Y position.
  /// </summary>
  public PositionY: number;

  /// <summary>
  /// Gets the character Z position.
  /// </summary>
  public PositionZ: number;

  /// <summary>
  /// Gets the character skin set id.
  /// </summary>
  public SkinSetId: number;

  /// <summary>
  /// Gets the character hair mesh id.
  /// </summary>
  public HairId: number;

  /// <summary>
  /// Gets the character hair color.
  /// </summary>
  public HairColor: number;

  /// <summary>
  /// Gets the character face mesh id.
  /// </summary>
  public FaceId: number;

  /// <summary>
  /// Gets the character job id.
  /// </summary>
  public JobId: number;

  /// <summary>
  /// Gets the character strength.
  /// </summary>
  public Strength: number;

  /// <summary>
  /// Gets the character stamina.
  /// </summary>
  public Stamina: number;

  /// <summary>
  /// Gets the character intelligence.
  /// </summary>
  public Intelligence: number;

  /// <summary>
  /// Gets the character dexterity.
  /// </summary>
  public Dexterity: number;

  /// <summary>
  /// Gets the character equipped items ids.
  /// </summary>
  public EquippedItems: number[];

  constructor(
    id: number,
    name: string,
    gender: GenderType,
    level: number,
    slot: number,
    mapId: number,
    positionX: number,
    positionY: number,
    positionZ: number,
    skinSetId: number,
    hairId: number,
    hairColor: number,
    faceId: number,
    jobId: number,
    strength: number,
    stamina: number,
    intelligence: number,
    dexterity: number,
    equippedItems: number[]
  ) {
    this.Id = id;
    this.Name = name;
    this.Gender = gender;
    this.Level = level;
    this.Slot = slot;
    this.MapId = mapId;
    this.PositionX = positionX;
    this.PositionY = positionY;
    this.PositionZ = positionZ;
    this.SkinSetId = skinSetId;
    this.HairId = hairId;
    this.HairColor = hairColor;
    this.FaceId = faceId;
    this.JobId = jobId;
    this.Strength = strength;
    this.Stamina = stamina;
    this.Intelligence = intelligence;
    this.Dexterity = dexterity;
    this.EquippedItems = equippedItems;
  }
}

/**
 * ClusterUser represents a user connection in the cluster server
 * Equivalent to C# ClusterUser : FFUserConnection
 */
export class ClusterUser extends FFUserConnection {
  private _loginProtectValue: number = Math.floor(Math.random() * 100);

  public accountId: number = 0;

  constructor(socket: Socket) {
    super(new Logger("ClusterUser"), socket);
    this.initialize();
  }

  public async handleMessageAsync(packetBuffer: Buffer): Promise<void> {
    if (!this.socket) {
      this.logger.warn("Skip to handle cluster packet. Reason: client is not connected.");
      return;
    }

    try {
      // We must skip the first 4 bytes because it represents the DPID which is always 0xFFFFFFFF (uint.MaxValue)
      const packetBufferArray = packetBuffer.slice(4);
      const packet = new FlyffPacket(packetBufferArray);

      // Log the incoming packet
      const PacketLogger = require("../../helpers/packetLogger").PacketLogger;
      PacketLogger.logIncomingPacket(
        this.sessionId,
        `${this.socket.remoteAddress}:${this.socket.remotePort}`,
        packet.PacketType,
        packet.buffer,
        packetBuffer
      );

      // TODO: Implement PacketDispatcher.Execute equivalent
      // For now, we'll need to route packets manually or implement a dispatcher

    } catch (error) {
      this.logger.error(`An error occurred while handling a cluster packet: ${error}`);
      const PacketLogger = require("../../helpers/packetLogger").PacketLogger;
      PacketLogger.logPacketError(
        this.sessionId,
        `${this.socket.remoteAddress}:${this.socket.remotePort}`,
        `Error handling packet: ${error}`
      );
    }
  }

  /**
   * Sends the player list to the client
   */
  public sendPlayerList(): void {
    const authenticationKey = 0;
    const characters = this.getCharacterList();

    const packet = new FlyffPacket(PacketType.CHARACTER_LIST);
    packet.writeInt32(authenticationKey);
    packet.writeInt32(characters.length);

    for (const character of characters) {
      packet.writeInt32(character.Slot);
      packet.writeInt32(character.Id);
      packet.writeInt32(character.MapId);
      packet.writeInt32(0x0b + character.Gender); // Model id
      packet.writeString(character.Name);
      packet.writeSingle(character.PositionX);
      packet.writeSingle(character.PositionY);
      packet.writeSingle(character.PositionZ);
      packet.writeInt32(character.Id);
      packet.writeInt32(0); // Party id
      packet.writeInt32(0); // Guild id
      packet.writeInt32(0); // War Id
      packet.writeInt32(character.SkinSetId);
      packet.writeInt32(character.HairId);
      packet.writeUInt32(character.HairColor);
      packet.writeInt32(character.FaceId);
      packet.writeByte(character.Gender);
      packet.writeInt32(character.JobId);
      packet.writeInt32(character.Level);
      packet.writeInt32(0); // Job Level (Maybe master or hero ?)
      packet.writeInt32(character.Strength);
      packet.writeInt32(character.Stamina);
      packet.writeInt32(character.Dexterity);
      packet.writeInt32(character.Intelligence);
      packet.writeInt32(0); // Mode

      packet.writeInt32(character.EquippedItems.length);

      for (const itemId of character.EquippedItems) {
        packet.writeInt32(itemId);
      }
    }

    packet.writeInt32(0);
    this.send(packet);
  }

  /**
   * Sends channel IP address to the client
   */
  public sendChannelIpAddress(channelIp: string): void {
    const packet = new FlyffPacket(PacketType.CACHE_ADDR);
    packet.writeString(channelIp);
    this.send(packet);
  }

  /**
   * Sends login protect numpad to the client
   */
  public sendLoginProtect(): void {
    const packet = new FlyffPacket(PacketType.LOGIN_PROTECT_NUMPAD);
    packet.writeInt32(this._loginProtectValue);
    this.send(packet);
  }

  /**
   * Sends new numpad for login protection
   */
  public sendNewNumPad(): void {
    this._loginProtectValue = Math.floor(Math.random() * 1000);

    const packet = new FlyffPacket(PacketType.LOGIN_PROTECT_CERT);
    packet.writeInt32(this._loginProtectValue);
    this.send(packet);
  }

  /**
   * Sends pong response to client
   */
  public sendPong(time: number): void {
    const packet = new FlyffPacket(PacketType.PING);
    packet.writeInt32(time);
    this.send(packet);
  }

  /**
   * Sends query tick count response
   */
  public sendQueryTickCount(time: number): void {
    const packet = new FlyffPacket(PacketType.QUERY_TICK_COUNT);
    packet.writeUInt32(time);
    packet.writeUInt32(Date.now()); // Current elapsed time
    this.send(packet);
  }

  /**
   * Sends pre-join completion packet
   */
  public sendPreJoin(): void {
    const packet = new FlyffPacket(PacketType.PRE_JOIN);
    this.send(packet);
  }

  /**
   * Verifies if the second password is correct using numpad protection
   */
  public isSecondPasswordCorrect(userPassword: number, userInputPassword: number): boolean {
    // TODO: Implement LoginNumberPad.GetNumPadToPassword equivalent
    // For now, return a simple comparison
    return this.getNumPadToPassword(this._loginProtectValue, userInputPassword) === userPassword;
  }

  /**
   * Gets character list for the current account
   */
  private getCharacterList(): SelectableCharacter[] {
    // TODO: Implement proper database query with relations
    // This is a placeholder implementation
    return [];
  }

  /**
   * Converts numpad input to password using protection value
   * TODO: Implement proper numpad protection algorithm
   */
  private getNumPadToPassword(protectValue: number, inputPassword: number): number {
    // Placeholder implementation - should match the C# LoginNumberPad logic
    return inputPassword;
  }

}