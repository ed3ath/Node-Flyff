import { TcpServer, IUserConnection } from "../../libraries/tcpServer";
import { Logger } from "../../helpers/logger";
import { ServerTypes } from "../../common/serverTypes";

export interface IWorldChannel {
    id: number;
    ip: string;
    port: string;
    name: string;
    enabled: boolean;
    maxConnection: number
    connections: Map<number, IUserConnection>
}

export default class worldServer extends TcpServer {
  
  constructor() {
    super(__dirname, ServerTypes.WORLD_SERVER);
  }
}
