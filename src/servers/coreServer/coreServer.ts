import { TcpServer } from "../../libraries/tcpServer";
import { Logger } from "../../helpers/logger";
import { ServerTypes } from "../../common/serverTypes";
import { ICluster } from "../clusterServer/clusterServer";

export default class coreServer extends TcpServer {
  clusterServers: Map<number, ICluster> = new Map()
  
  constructor() {
    super(__dirname, ServerTypes.CORE_SERVER);
  }
}
