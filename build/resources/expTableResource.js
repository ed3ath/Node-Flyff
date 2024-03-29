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
exports.ExpTableResources = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const ioredis_1 = __importDefault(require("ioredis"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const logger_1 = require("../helpers/logger");
const resourcePaths_1 = require("../resources/resourcePaths");
const parsing_1 = require("../helpers/parsing");
class ExpTableResources {
    constructor(options) {
        this.logger = new logger_1.Logger("ExpTable Resources");
        this.redisClient = new ioredis_1.default(options);
    }
    getExpCharacter(level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hgetall(`expCharacter:${level}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data
                            ? {
                                level: (0, parsing_1.tryParseInt)(data.level),
                                exp: (0, parsing_1.tryParseFloat)(data.level),
                                pxp: (0, parsing_1.tryParseFloat)(data.level),
                                gp: (0, parsing_1.tryParseFloat)(data.level),
                                limitExp: (0, parsing_1.tryParseFloat)(data.level),
                            }
                            : null);
                    }
                });
            });
        });
    }
    getDropLuck(level) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hgetall(`expDropLuck:${level}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data
                            ? {
                                level: parseInt(data.level),
                                chance: JSON.parse(data.chance),
                            }
                            : null);
                    }
                });
            });
        });
    }
    loadExpCharacter() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.expCharacter);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load exp character. Reason: cannot find '${absolutePath}' file.`);
            }
            const text = fs_extra_1.default.readFileSync(absolutePath, "utf-8");
            const data = js_yaml_1.default.load(text);
            lodash_1.default.forEach(data, (exp) => __awaiter(this, void 0, void 0, function* () {
                this.redisClient.hmset(`expCharacter:${exp.level}`, exp);
            }));
            this.logger.main(`${data.length} exp character loaded.`);
        });
    }
    loadExpDropLuck() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.expDropLuck);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load exp drop luck. Reason: cannot find '${absolutePath}' file.`);
            }
            const text = fs_extra_1.default.readFileSync(absolutePath, "utf-8");
            const data = js_yaml_1.default.load(text);
            lodash_1.default.forEach(data, (dropLuck) => __awaiter(this, void 0, void 0, function* () {
                this.redisClient.hmset(`expDropLuck:${dropLuck.level}`, {
                    level: dropLuck.level,
                    chance: JSON.stringify(dropLuck.chance),
                });
            }));
            this.logger.main(`${data.length} exp drop luck loaded.`);
        });
    }
}
exports.ExpTableResources = ExpTableResources;
