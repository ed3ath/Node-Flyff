import { Socket } from "net";
import { IServerConfig, TcpServer } from "../../libraries/tcpServer";
import { ServerType } from "../../common/serverType";
import { IUserConnection } from "../../interfaces/connection";
import { LoginUser } from "./loginUser";

// Main TCP Server class
export class LoginServer extends TcpServer {
  // Constructor to initialize TcpServer instance
  constructor(options: IServerConfig) {
    super(ServerType.LOGIN_SERVER, options);
  }

  /**
   * Creates a LoginUser connection for the login server
   */
  protected createUserConnection(socket: Socket): IUserConnection {
    return new LoginUser(socket, this);
  }

  /**
   * Disconnects a user from the login server
   */
  public disconnectUser(userConnection: IUserConnection): void {
    if (this.connections.has(userConnection.sessionId)) {
      this.connections.delete(userConnection.sessionId);
      this.logger.info(`User ${userConnection.username || userConnection.sessionId} disconnected from login server`);
    }

    if (userConnection.socket && !userConnection.socket.destroyed) {
      userConnection.socket.destroy();
    }
  }
}
