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
exports.InstanceBuilder = void 0;
const lodash_1 = __importDefault(require("lodash"));
const configBuilder_1 = require("./configBuilder");
const databaseBuilder_1 = require("./databaseBuilder");
const handlerBuilder_1 = require("./handlerBuilder");
const serverBuilder_1 = require("./serverBuilder");
const redisBuilder_1 = require("./redisBuilder");
const resourceBuilder_1 = require("./resourceBuilder");
class InstanceBuilder {
    constructor() { }
    buildConfig(_) {
        const builder = new configBuilder_1.ConfigBuilder();
        _(builder);
        this.config = builder.build();
    }
    buildDatabase(_) {
        const builder = new databaseBuilder_1.DatabaseBuilder();
        _(builder);
        this.databaseBuilder = builder;
    }
    buildHandlers(_) {
        const builder = new handlerBuilder_1.HandlerBuilder();
        _(builder);
        this.handlerBuilder = builder;
    }
    buildServer(_) {
        const builder = new serverBuilder_1.ServerBuilder();
        _(builder);
        this.serverBuilder = builder;
    }
    buildRedis(_) {
        const builder = new redisBuilder_1.RedisBuilder();
        _(builder);
        this.redisBuilder = builder;
    }
    buildResource(_) {
        const builder = new resourceBuilder_1.ResourceBuilder();
        _(builder);
        this.resourceBuilder = builder;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            // build config
            let server = null;
            let publisher = null;
            let subscriber = null;
            let client = null;
            let database = null;
            let handlers = new Map();
            let gameResources = null;
            // build database
            if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.database) {
                yield this.databaseBuilder.addConnection({
                    dataSource: {
                        type: lodash_1.default.get((_b = this.config) === null || _b === void 0 ? void 0 : _b.database, "provider"),
                        database: lodash_1.default.get((_c = this.config) === null || _c === void 0 ? void 0 : _c.database, "connection-string"),
                        url: lodash_1.default.get((_d = this.config) === null || _d === void 0 ? void 0 : _d.database, "url"),
                        host: lodash_1.default.get((_e = this.config) === null || _e === void 0 ? void 0 : _e.database, "host"),
                        port: lodash_1.default.get((_f = this.config) === null || _f === void 0 ? void 0 : _f.database, "port"),
                        username: lodash_1.default.get((_g = this.config) === null || _g === void 0 ? void 0 : _g.database, "username"),
                        password: lodash_1.default.get((_h = this.config) === null || _h === void 0 ? void 0 : _h.database, "password"),
                    },
                    entities: [],
                });
                database = yield this.databaseBuilder.build();
            }
            yield this.handlerBuilder.loadHandlers();
            handlers = this.handlerBuilder.build();
            if (this.redisBuilder) {
                const redis = this.redisBuilder.build();
                publisher = redis.publisher;
                subscriber = redis.subscriber;
                client = redis.client;
            }
            if (this.resourceBuilder) {
                gameResources = yield this.resourceBuilder.build();
            }
            if (this.serverBuilder && handlers) {
                this.serverBuilder.addHandlers(handlers);
                if (client) {
                    this.serverBuilder.addRedisClient(client);
                }
                this.serverBuilder.setConfig(this.config);
                server = this.serverBuilder.build();
            }
            const instance = {
                config: this.config,
                server,
                handlers,
                publisher,
                subscriber,
                client,
                database,
                gameResources,
                getEntity: (entityName) => {
                    return database === null || database === void 0 ? void 0 : database.getRepository(entityName);
                },
            };
            if (server) {
                server.instance = instance;
            }
            return instance;
        });
    }
}
exports.InstanceBuilder = InstanceBuilder;
