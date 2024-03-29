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
const path_1 = __importDefault(require("path"));
const node_cron_1 = __importDefault(require("node-cron"));
const instanceBuilder_1 = require("../../builders/instanceBuilder");
const serverType_1 = require("../../common/serverType");
const worldServer_1 = require("./worldServer");
const redisTypes_1 = require("../../common/redisTypes");
const crypto_1 = require("../../libraries/crypto");
const FFRandom_1 = require("../../helpers/FFRandom");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const instanceBuilder = new instanceBuilder_1.InstanceBuilder();
    instanceBuilder.buildConfig((builder) => {
        builder.setBasePath(path_1.default.join(__dirname, "../../configs"));
    });
    instanceBuilder.buildDatabase((builder) => {
        builder.setEntitiesPath(path_1.default.join(__dirname, "../../database"));
    });
    instanceBuilder.buildHandlers((builder) => {
        builder.setBasePath(__dirname);
    });
    instanceBuilder.buildRedis((builder) => {
        var _a;
        builder.setRedisOptions((_a = instanceBuilder === null || instanceBuilder === void 0 ? void 0 : instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.world_server.redis);
    });
    instanceBuilder.buildServer((builder) => {
        var _a;
        builder.setServerType(serverType_1.ServerType.WORLD_SERVER);
        builder.addServer(new worldServer_1.WorldServer((_a = instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.world_server.server));
    });
    instanceBuilder.buildResource((builder) => {
        var _a;
        builder.setRedisOptions((_a = instanceBuilder === null || instanceBuilder === void 0 ? void 0 : instanceBuilder.config) === null || _a === void 0 ? void 0 : _a.world_server.redis);
    });
    const instance = yield instanceBuilder.build();
    worldIntercom(instance);
    global.GameConfig = instanceBuilder.config;
});
function worldIntercom(instance) {
    const { config, server, publisher, subscriber } = instance;
    const logger = server === null || server === void 0 ? void 0 : server.logger;
    const master = (0, crypto_1.buildEncryptionKeyFromString)(config === null || config === void 0 ? void 0 : config.world_server.security["master-password"]).toString("hex");
    let scheduler;
    const channel = {
        id: randomId(),
        name: config === null || config === void 0 ? void 0 : config.world_server.settings.name,
        host: config === null || config === void 0 ? void 0 : config.world_server.server.host,
        port: config === null || config === void 0 ? void 0 : config.world_server.server.port,
        enabled: true,
        currentUsers: 0,
        maxUsers: config === null || config === void 0 ? void 0 : config.world_server.settings["maximum-users"],
        pkEnabled: config === null || config === void 0 ? void 0 : config.world_server.settings["pk-enabled"],
    };
    subscriber === null || subscriber === void 0 ? void 0 : subscriber.subscribe(redisTypes_1.RedisChannel.CLUSTER_CHANNEL, (err) => {
        if (!err) {
            setTimeout(() => {
                sendMessage(redisTypes_1.MessageCommand.ADD_CHANNEL, channel);
            }, 500); // for dev: temp delay for 500ms
        }
        else {
            logger === null || logger === void 0 ? void 0 : logger.error(err);
        }
    });
    subscriber === null || subscriber === void 0 ? void 0 : subscriber.on("message", processChannelMessage.bind(this));
    function randomId() {
        return FFRandom_1.FFRandom.random(0, Math.pow(2, 32) / 2 - 1);
    }
    function processChannelMessage(redisChannel, message) {
        if (redisChannel !== redisTypes_1.RedisChannel.CLUSTER_CHANNEL)
            return;
        if (!(0, crypto_1.isValidEncryptionString)(message, master))
            return; // reject invalid messages
        const decrypted = (0, crypto_1.parseMessage)((0, crypto_1.decryptString)(message, master));
        if (decrypted) {
            if (decrypted.sender === serverType_1.ServerType.WORLD_SERVER)
                return;
            // console.log(decrypted);
            switch (decrypted.command) {
                case redisTypes_1.MessageCommand.CLUSTER_ONLINE: {
                    sendMessage(redisTypes_1.MessageCommand.ADD_CHANNEL, channel);
                    break;
                }
                case redisTypes_1.MessageCommand.CHANNEL_ADDED: {
                    // console.log(decrypted.data.name, channel.name);
                    if (decrypted.data.name === channel.name) {
                        schedulePing();
                    }
                    break;
                }
                case redisTypes_1.MessageCommand.CHANNEL_EXIST: {
                    if (decrypted.data.name === channel.name) {
                        schedulePing();
                    }
                    break;
                }
                case redisTypes_1.MessageCommand.CHANNEL_ID_EXIST: {
                    if (decrypted.data.name === channel.name) {
                        channel.id = randomId();
                        sendMessage(redisTypes_1.MessageCommand.ADD_CHANNEL, channel);
                    }
                    break;
                }
            }
        }
    }
    function schedulePing() {
        if (scheduler) {
            scheduler.stop();
        }
        scheduler = node_cron_1.default.schedule("*/15 * * * * *", () => {
            sendMessage(redisTypes_1.MessageCommand.PING, channel);
        });
    }
    function sendMessage(command, message = null) {
        publisher === null || publisher === void 0 ? void 0 : publisher.publish(redisTypes_1.RedisChannel.CLUSTER_CHANNEL, (0, crypto_1.encryptMessage)(typeof message === "object"
            ? JSON.stringify({
                sender: serverType_1.ServerType.WORLD_SERVER,
                command,
                data: message,
            })
            : message, master));
    }
}
