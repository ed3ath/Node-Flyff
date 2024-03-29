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
exports.DeathPenaltyResources = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const ioredis_1 = __importDefault(require("ioredis"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const logger_1 = require("../helpers/logger");
const resourcePaths_1 = require("../resources/resourcePaths");
const parsing_1 = require("../helpers/parsing");
class DeathPenaltyResources {
    constructor(options) {
        this.logger = new logger_1.Logger("Death Penalty Resources");
        this.redisClient = new ioredis_1.default(options);
    }
    getRevivalPenalty(level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hgetall(`revivalPenalty:${level}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data
                            ? {
                                level: (0, parsing_1.tryParseInt)(data.level),
                                value: (0, parsing_1.tryParseInt)(data.value),
                            }
                            : null);
                    }
                });
            });
        });
    }
    getDecreaseExpPenalty(level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hgetall(`decreaseExpPenalty:${level}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data
                            ? {
                                level: (0, parsing_1.tryParseInt)(data.level),
                                value: (0, parsing_1.tryParseInt)(data.value),
                            }
                            : null);
                    }
                });
            });
        });
    }
    getLevelDownPenalty(level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hgetall(`levelDownPenalty:${level}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data
                            ? {
                                level: (0, parsing_1.tryParseInt)(data.level),
                                value: (0, parsing_1.tryParseInt)(data.value),
                            }
                            : null);
                    }
                });
            });
        });
    }
    loadDeathPenalty() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.deathPenalty);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load exp character. Reason: cannot find '${absolutePath}' file.`);
            }
            const text = fs_extra_1.default.readFileSync(absolutePath, "utf-8");
            const data = js_yaml_1.default.load(text);
            lodash_1.default.forEach(data.revivalPenalty, (penalty) => __awaiter(this, void 0, void 0, function* () {
                this.redisClient.hmset(`revivalPenalty:${penalty.level}`, penalty);
            }));
            lodash_1.default.forEach(data.decreaseExpPenalty, (penalty) => __awaiter(this, void 0, void 0, function* () {
                this.redisClient.hmset(`decreaseExpPenalty:${penalty.level}`, penalty);
            }));
            lodash_1.default.forEach(data.levelDownPenalty, (penalty) => __awaiter(this, void 0, void 0, function* () {
                this.redisClient.hmset(`levelDownPenalty:${penalty.level}`, penalty);
            }));
            this.logger.main("Death penalty loaded.");
        });
    }
}
exports.DeathPenaltyResources = DeathPenaltyResources;
