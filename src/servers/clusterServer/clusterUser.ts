import { Socket } from "net";
import { Logger } from "../../helpers/logger";
import { FFUserConnection } from "../../libraries/ffUserConnection";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { PacketType } from "../../protocol/packetType";
import { ErrorType } from "../../types/errorType";
import { GenderType } from "../../types/genderType";
import CharacterEntity from "../../database/character";

/**
 * Interface for selectable character data sent to client
 */
interface SelectableCharacter {
  id: number;
  name: string;
  gender: GenderType;
  level: number;
  slot: number;
  mapId: number;
  positionX: number;
  positionY: number;
  positionZ: number;
  skinSetId: number;
  hairId: number;
  hairColor: number;
  faceId: number;
  jobId: number;
  strength: number;
  stamina: number;
  intelligence: number;
  dexterity: number;
  equippedItems: number[];
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

      // TODO: Implement PacketDispatcher.Execute equivalent
      // For now, we'll need to route packets manually or implement a dispatcher

    } catch (error) {
      this.logger.error(`An error occurred while handling a cluster packet: ${error}`);
    }
  }

  /**
   * Sends the player list to the client
   */
  public sendPlayerList(): void {
    const authenticationKey = 0;
    const characters = this.getCharacterList();

    const packet = new FlyffPacket(PacketType.CHARACTER_LIST);
    packet.writeInt32LE(authenticationKey);
    packet.writeInt32LE(characters.length);

    for (const character of characters) {
      packet.writeInt32LE(character.slot);
      packet.writeInt32LE(character.id);
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
      packet.writeInt32LE(0); // Mode

      packet.writeInt32LE(character.equippedItems.length);

      for (const itemId of character.equippedItems) {
        packet.writeInt32LE(itemId);
      }
    }

    packet.writeInt32LE(0);
    this.send(packet);
  }

  /**
   * Sends channel IP address to the client
   */
  public sendChannelIpAddress(channelIp: string): void {
    const packet = new FlyffPacket(PacketType.CACHE_ADDR);
    packet.writeStringLE(channelIp);
    this.send(packet);
  }

  /**
   * Sends login protect numpad to the client
   */
  public sendLoginProtect(): void {
    const packet = new FlyffPacket(PacketType.LOGIN_PROTECT_NUMPAD);
    packet.writeInt32LE(this._loginProtectValue);
    this.send(packet);
  }

  /**
   * Sends new numpad for login protection
   */
  public sendNewNumPad(): void {
    this._loginProtectValue = Math.floor(Math.random() * 1000);

    const packet = new FlyffPacket(PacketType.LOGIN_PROTECT_CERT);
    packet.writeInt32LE(this._loginProtectValue);
    this.send(packet);
  }

  /**
   * Sends pong response to client
   */
  public sendPong(time: number): void {
    const packet = new FlyffPacket(PacketType.PING);
    packet.writeInt32LE(time);
    this.send(packet);
  }

  /**
   * Sends query tick count response
   */
  public sendQueryTickCount(time: number): void {
    const packet = new FlyffPacket(PacketType.QUERY_TICK_COUNT);
    packet.writeUInt32LE(time);
    packet.writeUInt32LE(Date.now()); // Current elapsed time
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