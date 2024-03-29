"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginServer_1 = __importDefault(require("./servers/loginServer/"));
const clusterServer_1 = __importDefault(require("./servers/clusterServer/"));
const worldServer_1 = __importDefault(require("./servers/worldServer"));
// Parse command-line arguments
const args = process.argv.slice(2); // Remove "node" and script filename from args
const serverType = args[0];
global.projectPath = __dirname;
switch (serverType) {
    case "login":
        (0, loginServer_1.default)();
        break;
    case "cluster":
        (0, clusterServer_1.default)();
        break;
    case "world":
        (0, worldServer_1.default)();
        break;
    default:
        console.error("Invalid server type:", serverType);
        process.exit(1);
}
