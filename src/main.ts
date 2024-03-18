import { ServerTypes } from "./common/serverTypes";
import cluster from "cluster";

import LoginServer from "./servers/loginServer/loginServer";

if (cluster.isPrimary) {
  cluster.fork({
    server: ServerTypes.LOGIN_SERVER,
  });
} else {
  if (process.env.server === ServerTypes.LOGIN_SERVER) {
    const server = new LoginServer();
    server.start();
  }
}
