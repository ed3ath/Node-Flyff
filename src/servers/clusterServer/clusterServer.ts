import { TcpServer } from "../../libraries/tcpServer";
import { Logger } from "../../helpers/logger";
import { ServerTypes } from "../../common/serverTypes";
import { IWorldChannel } from "../worldServer/worldServer";

export interface ICluster {
    id: number;
    ip: string;
    port: string;
    name: string;
    enabled: boolean
    channels: Map<number, IWorldChannel>
}

export default class coreServer extends TcpServer {
  
  constructor() {
    super(__dirname, ServerTypes.CLUSTER_SERVER);
  }
}
