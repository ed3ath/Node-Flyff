import { Socket } from "net";
import {
  IServerConfig,
  TcpServer,
} from "../../libraries/tcpServer";
import { ServerType } from "../../common/serverType";
import { IUserConnection } from "../../interfaces/connection";
import { ClusterUser } from "./clusterUser";

// Main TCP Server class
export class ClusterServer extends TcpServer {
  // Constructor to initialize TcpServer instance
  constructor(options: IServerConfig) {
    super(ServerType.CLUSTER_SERVER, options);
  }

  /**
   * Creates a ClusterUser connection for the cluster server
   */
  protected createUserConnection(socket: Socket): IUserConnection {
    return new ClusterUser(socket);
  }
}
