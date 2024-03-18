import { TcpServer } from "../../libraries/tcpServer";
import { SetLogger } from "../../helpers/logger";
import { ServerTypes } from "../../common/serverTypes";

@SetLogger(ServerTypes.LOGIN_SERVER)
export default class LoginServer extends TcpServer {
  // logger: Logger;
  constructor() {
    super(__dirname);
  }
}
