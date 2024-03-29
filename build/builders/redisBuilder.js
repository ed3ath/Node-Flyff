"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisBuilder = void 0;
;
const logger_1 = require("../helpers/logger");
const builderType_1 = require("../common/builderType");
const ioredis_1 = require("ioredis");
const redis_1 = require("../libraries/redis");
class RedisBuilder {
    constructor() {
        this.logger = new logger_1.Logger(builderType_1.BuilderType.REDIS_BUILDER);
    }
    setRedisOptions(options) {
        this.options = options;
    }
    build() {
        if (!this.options) {
            return {
                subscriber: null,
                publisher: null,
                client: null,
            };
        }
        this.logger.success("Redis successfully loaded");
        return {
            subscriber: new ioredis_1.Redis(this.options),
            publisher: new ioredis_1.Redis(this.options),
            client: new redis_1.RedisClient(this.options),
        };
    }
}
exports.RedisBuilder = RedisBuilder;
