"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterServer = void 0;
const tcpServer_1 = require("../../libraries/tcpServer");
const serverType_1 = require("../../common/serverType");
// Main TCP Server class
class ClusterServer extends tcpServer_1.TcpServer {
    // Constructor to initialize TcpServer instance
    constructor(options) {
        super(serverType_1.ServerType.CLUSTER_SERVER, options);
    }
}
exports.ClusterServer = ClusterServer;
