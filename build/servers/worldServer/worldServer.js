"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldServer = void 0;
const tcpServer_1 = require("../../libraries/tcpServer");
const serverType_1 = require("../../common/serverType");
// Main TCP Server class
class WorldServer extends tcpServer_1.TcpServer {
    // Constructor to initialize TcpServer instance
    constructor(options) {
        super(serverType_1.ServerType.WORLD_SERVER, options);
    }
}
exports.WorldServer = WorldServer;
