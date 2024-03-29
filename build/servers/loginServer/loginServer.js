"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginServer = void 0;
const tcpServer_1 = require("../../libraries/tcpServer");
const serverType_1 = require("../../common/serverType");
// Main TCP Server class
class LoginServer extends tcpServer_1.TcpServer {
    // Constructor to initialize TcpServer instance
    constructor(options) {
        super(serverType_1.ServerType.LOGIN_SERVER, options);
    }
}
exports.LoginServer = LoginServer;
