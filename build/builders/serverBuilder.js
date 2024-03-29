"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBuilder = void 0;
const logger_1 = require("../helpers/logger");
const builderType_1 = require("../common/builderType");
class ServerBuilder {
    constructor() {
        this.handlers = new Map();
    }
    setServerType(type) {
        this.logger = new logger_1.Logger(builderType_1.BuilderType.SERVER_BUILDER);
        this.serverType = type;
    }
    addServer(server) {
        this.server = server;
    }
    addHandlers(handlers) {
        this.handlers = handlers;
    }
    addRedisClient(redisClient) {
        this.redisClient = redisClient;
    }
    setConfig(config) {
        this.config = config;
    }
    build() {
        if (!this.serverType)
            return null;
        this.server.addHandlers(this.handlers);
        this.server.addRedisClient(this.redisClient);
        this.server.setConfig(this.config);
        this.server.start();
        return this.server;
    }
}
exports.ServerBuilder = ServerBuilder;
