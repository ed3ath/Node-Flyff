import { ServerTypes } from "./common/serverTypes";
import cluster from "cluster";

import { connectToDatabase } from "./db/index";
import Entities from "./db/models/index";
import LoginServer from "./servers/loginServer/loginServer";

connectToDatabase()
  .then(async () => {
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
  })
  .catch((error) => console.log("Error: ", error));
