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
exports.RedisClient = void 0;
const ioredis_1 = require("ioredis");
const lodash_1 = __importDefault(require("lodash"));
const logger_1 = require("../helpers/logger");
class RedisClient {
    constructor(options) {
        this.logger = new logger_1.Logger("Redis Client");
        this.client = new ioredis_1.Redis(options);
    }
    getAllClusters() {
        return __awaiter(this, void 0, void 0, function* () {
            const clusterKeys = yield this.client.keys("cluster:*");
            const clusters = [];
            if (clusterKeys) {
                for (const key of clusterKeys) {
                    const clusterData = yield this.getCluster(key);
                    if (clusterData) {
                        clusters.push(clusterData);
                    }
                }
            }
            return clusters;
        });
    }
    insertCluster(cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `cluster:${cluster.name}`;
            const clusterData = {
                name: cluster.name,
                host: cluster.host,
                port: cluster.port,
                lastPing: cluster.lastPing || 0,
                channels: JSON.stringify(cluster.channels),
                enabled: cluster.enabled ? "true" : "false",
            };
            yield this.client.hmset(key, clusterData);
        });
    }
    updateCluster(cluster) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `cluster:${cluster.name}`;
            const clusterData = {
                name: cluster.name,
                host: cluster.host,
                port: cluster.port,
                lastPing: cluster.lastPing || 0,
                channels: JSON.stringify(cluster.channels),
                enabled: cluster.enabled ? "true" : "false",
            };
            yield this.client.hmset(key, clusterData);
        });
    }
    deleteCluster(clusterName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(`cluster:${clusterName}`);
        });
    }
    getCluster(clusterName) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluster = yield this.client.hgetall((clusterName === null || clusterName === void 0 ? void 0 : clusterName.includes("cluster:")) ? clusterName : `cluster:${clusterName}`);
            let channels = [];
            if (cluster.channels) {
                const channelDataArray = JSON.parse(cluster.channels);
                channels = lodash_1.default.map(channelDataArray, (channelData) => ({
                    id: channelData.id,
                    name: channelData.name,
                    host: channelData.host,
                    port: channelData.port,
                    maxUsers: channelData.maxUsers,
                    currentUsers: channelData.currentUsers,
                    enabled: channelData.enabled,
                    pkEnabled: channelData.pkEnabled,
                }));
            }
            if (!lodash_1.default.isNil(cluster) && !lodash_1.default.isEmpty(cluster)) {
                return {
                    name: cluster.name,
                    host: cluster.host,
                    port: parseInt(cluster.port),
                    lastPing: parseInt(cluster.lastPing),
                    channels,
                    enabled: cluster.enabled === "true",
                };
            }
            return null;
        });
    }
    getAllChannels(clusterName) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluster = yield this.getCluster(clusterName);
            return (cluster === null || cluster === void 0 ? void 0 : cluster.channels) || [];
        });
    }
    insertChannel(clusterName, channel) {
        return __awaiter(this, void 0, void 0, function* () {
            const clusterData = yield this.getCluster(clusterName);
            const clusterKey = `cluster:${clusterName}`;
            if (clusterData) {
                if (lodash_1.default.some(clusterData.channels, (i) => i.name === channel.name))
                    return;
                const channelData = {
                    id: channel.id,
                    name: channel.name,
                    host: channel.host,
                    port: channel.port,
                    maxUsers: channel.maxUsers,
                    currentUsers: channel.currentUsers,
                    enabled: channel.enabled,
                    lastPing: channel.lastPing || 0,
                    pkEnabled: channel.pkEnabled,
                };
                clusterData.channels.push(channelData);
                yield this.client.hmset(clusterKey, Object.assign(Object.assign({}, clusterData), { channels: typeof clusterData.channels === "object"
                        ? JSON.stringify(clusterData.channels)
                        : clusterData.channels }));
            }
        });
    }
    updateChannel(clusterName, updatedChannel) {
        return __awaiter(this, void 0, void 0, function* () {
            const clusterData = yield this.getCluster(clusterName);
            const clusterKey = `cluster:${clusterName}`;
            if (clusterData) {
                const existIndex = lodash_1.default.findIndex(clusterData.channels, {
                    name: updatedChannel.name,
                });
                if (existIndex >= 0) {
                    clusterData.channels[existIndex] = Object.assign(Object.assign({}, clusterData.channels[existIndex]), updatedChannel);
                }
                else {
                    clusterData.channels.push(updatedChannel);
                }
                yield this.client.hmset(clusterKey, Object.assign(Object.assign({}, clusterData), { channels: typeof clusterData.channels === "object"
                        ? JSON.stringify(clusterData.channels)
                        : clusterData.channels }));
            }
        });
    }
    getChannel(clusterName, channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            const cluster = yield this.getCluster(clusterName);
            return lodash_1.default.find(cluster === null || cluster === void 0 ? void 0 : cluster.channels, { name: channelName }) || null;
        });
    }
    deleteChannel(clusterName, channelName) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `cluster:${clusterName}`;
            const clusterData = yield this.client.hgetall(key);
            if (clusterData) {
                let channels = [];
                try {
                    channels = JSON.parse(clusterData.channels);
                }
                catch (error) {
                    this.logger.error("Error parsing channels JSON:", error);
                }
                const updatedChannels = lodash_1.default.filter(channels, { name: channelName });
                clusterData.channels = JSON.stringify(updatedChannels);
                yield this.client.hmset(key, clusterData);
            }
            else {
                this.logger.error("Cluster not found:", clusterName);
            }
        });
    }
    getChannelById(clusterName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const channels = yield this.getAllChannels(clusterName);
            return lodash_1.default.find(channels, { id });
        });
    }
    getNumpadId(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `numpadId:${username}`;
            const numPadId = yield this.client.get(key);
            return numPadId !== null ? parseInt(numPadId) : null;
        });
    }
    setNumpadId(username, numPadId) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = `numpadId:${username}`;
            yield this.client.set(key, numPadId);
        });
    }
}
exports.RedisClient = RedisClient;
