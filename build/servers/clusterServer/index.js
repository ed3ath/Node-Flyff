"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const node_cron_1 = __importDefault(require("node-cron"));
const instanceBuilder_1 = require("../../builders/instanceBuilder");
const serverType_1 = require("../../common/serverType");
const clusterServer_1 = require("./clusterServer");
const redisTypes_1 = require("../../common/redisTypes");
const crypto_1 = require("../../libraries/crypto");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const instanceBuilder = new instanceBuilder_1.InstanceBuilder();
    instanceBuilder.buildConfig((builder) => {
        builder.setBasePath((0, path_1.join)(__dirname, "../../configs"));
    });
    instanceBuilder.buildDatabase((builder) => __awaiter(void 0, void 0, void 0, function* () {
        builder.setEntitiesPath((0, path_1.join)(__dirname, "../../database"));
    }));
    instanceBuilder.buildHandlers((builder) => __awaiter(void 0, void 0, void 0, function* () {
        builder.setBasePath(__dirname);
    }));
    instanceBuilder.buildRedis((builder) => {
        var _a;
        builder.setRedisOptions((_a = instanceBuilder === null || instanceBuilder === void 0 ? void 0 : instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.cluster_server.redis);
    });
    instanceBuilder.buildServer((builder) => {
        var _a;
        builder.setServerType(serverType_1.ServerType.CLUSTER_SERVER);
        builder.addServer(new clusterServer_1.ClusterServer((_a = instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.cluster_server.server));
    });
    instanceBuilder.buildResource((builder) => {
        var _a;
        builder.setRedisOptions((_a = instanceBuilder === null || instanceBuilder === void 0 ? void 0 : instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.cluster_server.redis);
        builder.load = false;
    });
    const instance = yield instanceBuilder.build();
    clusterIntercom(instance);
});
function clusterIntercom(instance) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config, server, publisher, subscriber, client } = instance;
        const logger = server === null || server === void 0 ? void 0 : server.logger;
        const master = (0, crypto_1.buildEncryptionKeyFromString)(config === null || config === void 0 ? void 0 : config.cluster_server.security["master-password"]).toString("hex");
        const redisChannels = [
            redisTypes_1.RedisChannel.CORE_CHANNEL,
            redisTypes_1.RedisChannel.CLUSTER_CHANNEL,
        ];
        const initCluster = {
            name: config === null || config === void 0 ? void 0 : config.cluster_server.settings.name,
            host: config === null || config === void 0 ? void 0 : config.cluster_server.server.host,
            port: config === null || config === void 0 ? void 0 : config.cluster_server.server.port,
            enabled: true,
            channels: [],
        };
        // const clusterKey = `cluster:${initCluster.name}`;
        ////// MAIN //////////
        subscriber === null || subscriber === void 0 ? void 0 : subscriber.subscribe(...redisChannels, (err) => {
            if (!err) {
                sendMessage(redisTypes_1.RedisChannel.CORE_CHANNEL, redisTypes_1.MessageCommand.ADD_CLUSTER, initCluster);
                sendMessage(redisTypes_1.RedisChannel.CLUSTER_CHANNEL, redisTypes_1.MessageCommand.CLUSTER_ONLINE);
            }
            else {
                logger === null || logger === void 0 ? void 0 : logger.error(err);
            }
        });
        subscriber === null || subscriber === void 0 ? void 0 : subscriber.on("message", processChannelMessage.bind(this));
        node_cron_1.default.schedule("*/30 * * * * *", () => __awaiter(this, void 0, void 0, function* () {
            const channels = yield (client === null || client === void 0 ? void 0 : client.getAllChannels(initCluster.name));
            channels === null || channels === void 0 ? void 0 : channels.forEach((channel) => __awaiter(this, void 0, void 0, function* () {
                if (channel.lastPing &&
                    new Date().getTime() > channel.lastPing + 60 * 1000) {
                    yield (client === null || client === void 0 ? void 0 : client.deleteChannel(initCluster.name, channel.name));
                    sendMessage(redisTypes_1.RedisChannel.CLUSTER_CHANNEL, redisTypes_1.MessageCommand.CLUSTER_REMOVED, channel);
                    logger === null || logger === void 0 ? void 0 : logger.info("World Channel", channel.name, "has been removed. Reason: Timeout");
                }
            }));
        }));
        // ////// MAIN //////////
        function processChannelMessage(redisChannel, message) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (!redisChannels.includes(redisChannel))
                    return;
                if (!(0, crypto_1.isValidEncryptionString)(message, master))
                    return; // reject invalid messages
                const decrypted = (0, crypto_1.parseMessage)((0, crypto_1.decryptString)(message, master));
                if (decrypted) {
                    if (decrypted.sender === serverType_1.ServerType.CLUSTER_SERVER)
                        return;
                    // console.log(decrypted);
                    if (redisChannel === redisTypes_1.RedisChannel.CORE_CHANNEL) {
                        switch (decrypted.command) {
                            case redisTypes_1.MessageCommand.CORE_ONLINE:
                                sendMessage(redisTypes_1.RedisChannel.CORE_CHANNEL, redisTypes_1.MessageCommand.ADD_CLUSTER, initCluster);
                                break;
                            case redisTypes_1.MessageCommand.CLUSTER_ADDED:
                                if (((_a = decrypted.data) === null || _a === void 0 ? void 0 : _a.name) === initCluster.name) {
                                    node_cron_1.default.schedule("*/15 * * * * *", () => {
                                        sendMessage(redisTypes_1.RedisChannel.CORE_CHANNEL, redisTypes_1.MessageCommand.PING, {
                                            name: initCluster.name,
                                        });
                                    });
                                }
                                break;
                            case redisTypes_1.MessageCommand.CHANNEL_REMOVED:
                                if (((_b = decrypted.data) === null || _b === void 0 ? void 0 : _b.name) === initCluster.name) {
                                    sendMessage(redisTypes_1.RedisChannel.CORE_CHANNEL, redisTypes_1.MessageCommand.ADD_CLUSTER, initCluster);
                                }
                                break;
                        }
                    }
                    if (redisChannel === redisTypes_1.RedisChannel.CLUSTER_CHANNEL) {
                        switch (decrypted.command) {
                            case redisTypes_1.MessageCommand.ADD_CHANNEL: {
                                if (yield (client === null || client === void 0 ? void 0 : client.getChannelById(initCluster.name, decrypted.data.id))) {
                                    logger === null || logger === void 0 ? void 0 : logger.warn("A channel with id", decrypted.data.id, "already exist.");
                                    sendMessage(redisTypes_1.RedisChannel.CLUSTER_CHANNEL, redisTypes_1.MessageCommand.CHANNEL_ID_EXIST, decrypted.data);
                                }
                                else if (yield (client === null || client === void 0 ? void 0 : client.getChannel(initCluster.name, decrypted.data.name))) {
                                    logger === null || logger === void 0 ? void 0 : logger.warn("Channel", decrypted.data.name, "already exist.");
                                    sendMessage(redisTypes_1.RedisChannel.CLUSTER_CHANNEL, redisTypes_1.MessageCommand.CHANNEL_EXIST, decrypted.data);
                                }
                                else {
                                    const channel = Object.assign(Object.assign({}, decrypted.data), { lastPing: new Date().getTime() });
                                    yield (client === null || client === void 0 ? void 0 : client.insertChannel(initCluster.name, channel));
                                    sendMessage(redisTypes_1.RedisChannel.CLUSTER_CHANNEL, redisTypes_1.MessageCommand.CHANNEL_ADDED, channel);
                                    logger === null || logger === void 0 ? void 0 : logger.info("Channel", decrypted.data.name, "has been added");
                                }
                                break;
                            }
                            case redisTypes_1.MessageCommand.PING: {
                                const channel = yield (client === null || client === void 0 ? void 0 : client.getChannel(initCluster.name, decrypted.data.name));
                                if (channel) {
                                    const updated = Object.assign(Object.assign({}, channel), { lastPing: new Date().getTime() });
                                    yield (client === null || client === void 0 ? void 0 : client.updateChannel(initCluster.name, updated));
                                }
                                break;
                            }
                        }
                    }
                }
            });
        }
        function sendMessage(channel, command, message = null) {
            publisher === null || publisher === void 0 ? void 0 : publisher.publish(channel, (0, crypto_1.encryptMessage)(typeof message === "object"
                ? JSON.stringify({
                    sender: serverType_1.ServerType.CLUSTER_SERVER,
                    command,
                    data: message,
                })
                : message, master));
        }
    });
}
