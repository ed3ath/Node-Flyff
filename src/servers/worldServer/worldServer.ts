import { Socket } from "net";
import { IServerConfig, TcpServer } from "../../libraries/tcpServer";
import { ServerType } from "../../common/serverType";
import { IUserConnection } from "../../interfaces/connection";
import { WorldUser } from "./worldUser";

// Main TCP Server class
export class WorldServer extends TcpServer {
  // Constructor to initialize TcpServer instance
  constructor(options: IServerConfig) {
    super(ServerType.WORLD_SERVER, options);
  }

  /**
   * Creates a WorldUser connection for the world server
   */
  protected createUserConnection(socket: Socket): IUserConnection {
    return new WorldUser(socket);
  }
}
