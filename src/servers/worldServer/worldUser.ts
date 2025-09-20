import { Socket } from "net";
import { Logger } from "../../helpers/logger";
import { Player } from "../../entities/player";
import { FFUserConnection } from "../../libraries/ffUserConnection";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { PacketLogger } from "../../helpers/packetLogger";

/**
 * WorldUser represents a user connection in the world server
 * Equivalent to C# WorldUser : FFUserConnection
 */
export class WorldUser extends FFUserConnection {
  public player: Player | null = null;

  constructor(socket: Socket) {
    super(new Logger("WorldUser"), socket);
    this.initialize();
  }

  public async handleMessageAsync(packetBuffer: Buffer): Promise<void> {
    if (!this.socket) {
      this.logger.warn("Skip to handle world packet. Reason: client is not connected.");
      return;
    }

    try {
      // We must skip the first 4 bytes because it represents the DPID which is always 0xFFFFFFFF (uint.MaxValue)
      const packetBufferArray = packetBuffer.slice(4);
      const packet = new FlyffPacket(packetBufferArray);

      // Log the incoming packet
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
      this.logger.error(`An error occurred while handling a world packet: ${error}`);
      PacketLogger.logPacketError(
        this.sessionId,
        `${this.socket.remoteAddress}:${this.socket.remotePort}`,
        `Error handling packet: ${error}`
      );
    }
  }

  /**
   * Called when the connection is disconnected
   * Overrides the base implementation to handle player cleanup
   */
  protected onDisconnected(): void {
    // TODO: save player to database
    // TODO: notify cluster and disconnect from messenger

    if (this.player) {
      // Dispose player resources
      this.player.dispose();
      this.player = null;
    }

    this.logger.info(`WorldUser ${this.sessionId} disconnected`);
    super.onDisconnected();
  }

  /**
   * Sets the player for this world user connection
   */
  public setPlayer(player: Player): void {
    this.player = player;
  }

  /**
   * Gets the player for this world user connection
   */
  public getPlayer(): Player | null {
    return this.player;
  }

  /**
   * Checks if this world user has a player assigned
   */
  public hasPlayer(): boolean {
    return this.player !== null;
  }
}