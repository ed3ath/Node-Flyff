import cluster from "cluster";
import { ServerType } from "./common/serverType";
import _ from "lodash";
import loginServer from "./servers/loginServer/loginServer";

if (cluster.isPrimary) {
  cluster.fork({
    server: ServerType.LOGIN_SERVER,
  });
} else {
  if (_.get(process, "env.server") === ServerType.LOGIN_SERVER) {
    loginServer()
  }
}