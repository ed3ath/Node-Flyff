import { Socket } from "net";
import { Logger } from "../../helpers/logger";
import { FFUserConnection } from "../../libraries/ffUserConnection";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { LoginServer } from "./loginServer";

/**
 * LoginUser represents a user connection in the login server
 * Equivalent to C# LoginUser : FFUserConnection
 */
export class LoginUser extends FFUserConnection {
  private readonly _loginServer: LoginServer;

  constructor(socket: Socket, loginServer: LoginServer) {
    super(new Logger("LoginUser"), socket);
    this._loginServer = loginServer;
    this.initialize();
  }

  public async handleMessageAsync(packetBuffer: Buffer): Promise<void> {
    if (!this.socket) {
      this.logger.warn("Skip to handle login packet. Reason: client is not connected.");
      return;
    }

    try {
      const packet = new FlyffPacket(packetBuffer);

      // TODO: Implement PacketDispatcher.Execute equivalent
      // For now, we'll need to route packets manually or implement a dispatcher

    } catch (error) {
      this.logger.error(`An error occurred while handling a login packet: ${error}`);
    }
  }

  /**
   * Disconnects the user with an optional reason
   */
  public disconnect(reason?: string): void {
    this._loginServer.disconnectUser(this);

    if (reason && reason.trim()) {
      this.logger.info(`${this.username || 'Unknown user'} disconnected. Reason: ${reason}`);
    }

    super.disconnect();
  }

  /**
   * Called when the connection is disconnected
   */
  protected onDisconnected(): void {
    this.logger.info(`LoginUser ${this.sessionId} disconnected`);
    super.onDisconnected();
  }
}