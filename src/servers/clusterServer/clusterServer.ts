import {
  IServerConfig,
  TcpServer,
  UserConnection,
} from "../../libraries/tcpServer";
import { ServerType } from "../../common/serverType";
import { FlyffPacket } from "../../libraries/flyffPacket";
import { IUserConnection } from "../../interfaces/connection";
import { ToStringHex } from "../../common/packetType";

// Main TCP Server class
export class ClusterServer extends TcpServer {
  // Constructor to initialize TcpServer instance
  constructor(options: IServerConfig) {
    super(ServerType.CLUSTER_SERVER, options);
  }
}
