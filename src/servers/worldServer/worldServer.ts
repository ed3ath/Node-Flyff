import { IServerConfig, TcpServer } from "../../libraries/tcpServer";
import { ServerType } from "../../common/serverType";

// Main TCP Server class
export class WorldServer extends TcpServer {
  // Constructor to initialize TcpServer instance
  constructor(options: IServerConfig) {
    super(ServerType.WORLD_SERVER, options);
  }
}
