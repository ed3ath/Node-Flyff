import { IServerConfig, TcpServer } from "../../libraries/tcpServer";
import { ServerType } from "../../common/serverType";

// Main TCP Server class
export class ClusterServer extends TcpServer {
  // Constructor to initialize TcpServer instance
  constructor(options: IServerConfig) {
    super(ServerType.LOGIN_SERVER, options);
  }
}
