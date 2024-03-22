import loginServer from "./servers/loginServer/";
import clusterServer from "./servers/clusterServer/";
import worldServer from "./servers/worldServer";

// Parse command-line arguments
const args = process.argv.slice(2); // Remove "node" and script filename from args
const serverType = args[0];

global.projectPath = __dirname;

switch (serverType) {
  case "login":
    loginServer();
    break;
  case "cluster":
    clusterServer();
    break;
  case "world":
    worldServer();
    break;
  default:
    console.error("Invalid server type:", serverType);
    process.exit(1);
}
