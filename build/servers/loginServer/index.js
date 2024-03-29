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
const loginServer_1 = require("./loginServer");
const redisTypes_1 = require("../../common/redisTypes");
const crypto_1 = require("../../libraries/crypto");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const instanceBuilder = new instanceBuilder_1.InstanceBuilder();
    instanceBuilder.buildConfig((builder) => {
        builder.setBasePath((0, path_1.join)(__dirname, "../../configs"));
    });
    instanceBuilder.buildDatabase((builder) => {
        builder.setEntitiesPath((0, path_1.join)(__dirname, "../../database"));
    });
    instanceBuilder.buildHandlers((builder) => {
        builder.setBasePath(__dirname);
    });
    instanceBuilder.buildRedis((builder) => {
        var _a;
        builder.setRedisOptions((_a = instanceBuilder === null || instanceBuilder === void 0 ? void 0 : instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.login_server.redis);
    });
    instanceBuilder.buildServer((builder) => {
        var _a;
        builder.setServerType(serverType_1.ServerType.LOGIN_SERVER);
        builder.addServer(new loginServer_1.LoginServer((_a = instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.login_server.server));
    });
    const instance = yield instanceBuilder.build();
    yield coreIntercom(instance);
});
function coreIntercom(instance) {
    return __awaiter(this, void 0, void 0, function* () {
        const { config, server, publisher, subscriber, client } = instance;
        const logger = server === null || server === void 0 ? void 0 : server.logger;
        const master = (0, crypto_1.buildEncryptionKeyFromString)(config === null || config === void 0 ? void 0 : config.login_server.security["master-password"]).toString("hex");
        /////////// MAIN //////////
        subscriber === null || subscriber === void 0 ? void 0 : subscriber.subscribe(redisTypes_1.RedisChannel.CORE_CHANNEL, (err) => {
            if (!err) {
                sendMessage(redisTypes_1.MessageCommand.CORE_ONLINE);
            }
            else {
                logger === null || logger === void 0 ? void 0 : logger.error(err);
            }
        });
        subscriber === null || subscriber === void 0 ? void 0 : subscriber.on("message", processChannelMessage.bind(this));
        node_cron_1.default.schedule("*/10 * * * * *", () => __awaiter(this, void 0, void 0, function* () {
            const clusters = yield (client === null || client === void 0 ? void 0 : client.getAllClusters());
            clusters === null || clusters === void 0 ? void 0 : clusters.forEach((cluster) => __awaiter(this, void 0, void 0, function* () {
                // console.log(cluster.lastPing, new Date().getTime());
                if (cluster.lastPing &&
                    new Date().getTime() > cluster.lastPing + 30 * 1000) {
                    yield (client === null || client === void 0 ? void 0 : client.deleteCluster(cluster.name));
                    sendMessage(redisTypes_1.MessageCommand.CLUSTER_REMOVED, cluster);
                    logger === null || logger === void 0 ? void 0 : logger.warn("Cluster", cluster.name, "has been removed. Reason: Timeout");
                }
            }));
        }));
        ////// MAIN //////////
        function processChannelMessage(channel, message) {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                if (channel !== redisTypes_1.RedisChannel.CORE_CHANNEL)
                    return;
                if (!(0, crypto_1.isValidEncryptionString)(message, master))
                    return; // reject invalid messages
                const decrypted = (0, crypto_1.parseMessage)((0, crypto_1.decryptString)(message, master));
                if (decrypted) {
                    if (decrypted.sender === serverType_1.ServerType.LOGIN_SERVER)
                        return;
                    // console.log(decrypted);
                    switch (decrypted.command) {
                        case redisTypes_1.MessageCommand.PING: {
                            const cluster = (_b = (yield (client === null || client === void 0 ? void 0 : client.getCluster((_a = decrypted.data) === null || _a === void 0 ? void 0 : _a.name)))) !== null && _b !== void 0 ? _b : null;
                            if (cluster) {
                                cluster.lastPing = new Date().getTime();
                                yield (client === null || client === void 0 ? void 0 : client.updateCluster(cluster));
                            }
                            break;
                        }
                        case redisTypes_1.MessageCommand.GET_CLUSTER_LIST: {
                            sendMessage(redisTypes_1.MessageCommand.CLUSTER_LIST, yield (client === null || client === void 0 ? void 0 : client.getAllClusters()));
                            break;
                        }
                        case redisTypes_1.MessageCommand.ADD_CLUSTER: {
                            const cluster = (_c = (yield (client === null || client === void 0 ? void 0 : client.getCluster(decrypted.data.name)))) !== null && _c !== void 0 ? _c : null;
                            if (!cluster) {
                                const newCluster = Object.assign(Object.assign({}, decrypted.data), { lastPing: new Date().getTime() });
                                yield (client === null || client === void 0 ? void 0 : client.insertCluster(newCluster));
                                logger === null || logger === void 0 ? void 0 : logger.info("Cluster", newCluster.name, "has been added.");
                            }
                            else {
                                yield (client === null || client === void 0 ? void 0 : client.updateCluster(Object.assign(Object.assign({}, decrypted.data), { lastPing: new Date().getTime() })));
                                logger === null || logger === void 0 ? void 0 : logger.info("Cluster", decrypted.data.name, "has been updated.");
                            }
                            sendMessage(redisTypes_1.MessageCommand.CLUSTER_ADDED, decrypted.data);
                            break;
                        }
                        case redisTypes_1.MessageCommand.CLUSTER_UPDATED: {
                            const cluster = (_d = (yield (client === null || client === void 0 ? void 0 : client.getCluster(decrypted.data.name)))) !== null && _d !== void 0 ? _d : null;
                            if (cluster) {
                                const newCluster = Object.assign(Object.assign({}, decrypted.data), { lastPing: new Date().getTime() });
                                yield (client === null || client === void 0 ? void 0 : client.updateCluster(newCluster));
                            }
                            break;
                        }
                    }
                }
            });
        }
        function sendMessage(command, message = null) {
            publisher === null || publisher === void 0 ? void 0 : publisher.publish(redisTypes_1.RedisChannel.CORE_CHANNEL, (0, crypto_1.encryptMessage)(typeof message === "object"
                ? JSON.stringify({
                    sender: serverType_1.ServerType.LOGIN_SERVER,
                    command,
                    data: message,
                })
                : message, master));
        }
    });
}
