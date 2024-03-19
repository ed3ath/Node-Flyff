import { TcpServer } from "../../libraries/tcpServer";
import { Logger } from "../../helpers/logger";
import { ServerTypes } from "../../common/serverTypes";

export default class LoginServer extends TcpServer {
  constructor() {
    super(__dirname, ServerTypes.LOGIN_SERVER);
  }
}
