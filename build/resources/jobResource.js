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
exports.JobResources = void 0;
const defineJob_1 = require("./../common/defineJob");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const ioredis_1 = __importDefault(require("ioredis"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const logger_1 = require("../helpers/logger");
const resourcePaths_1 = require("../resources/resourcePaths");
const defineJob_2 = require("../common/defineJob");
const parsing_1 = require("../helpers/parsing");
class JobResources {
    constructor(options) {
        this.logger = new logger_1.Logger("Job Resources");
        this.redisClient = new ioredis_1.default(options);
    }
    get(jobIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobId = typeof jobIdentifier === "number"
                ? jobIdentifier
                : yield this.redisClient.hget("jobDefines", jobIdentifier);
            if (!lodash_1.default.isUndefined(jobId)) {
                return new Promise((resolve, reject) => {
                    this.redisClient.hgetall(`job:${jobId}`, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(data ? this.parseJobProperties(data) : null);
                        }
                    });
                });
            }
            return null;
        });
    }
    where(predicate) {
        const jobs = [];
        this.redisClient.keys("job:*", (err, keys) => {
            if (err) {
                this.logger.error("Error retrieving keys from Redis:", err);
            }
            else {
                if (!lodash_1.default.isUndefined(keys)) {
                    lodash_1.default.forEach(keys, (key) => {
                        this.redisClient.hgetall(key, (err, data) => {
                            if (err) {
                                this.logger.error("Error retrieving job data from Redis:", err);
                            }
                            else {
                                if (data) {
                                    const job = this.parseJobProperties(data);
                                    if (predicate(job)) {
                                        jobs.push(job);
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });
        return jobs;
    }
    loadDefines() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.defineJob);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load jobs. Reason: cannot find '${absolutePath}' file.`);
            }
            const data = fs_extra_1.default.readFileSync(absolutePath, "utf8");
            const lines = data.split("\n");
            lodash_1.default.forEach(lines, (line) => __awaiter(this, void 0, void 0, function* () {
                if (lodash_1.default.trim(line).startsWith("#define")) {
                    const parts = lodash_1.default.trim(line).split(/\s+/);
                    const id = (0, parsing_1.tryParseInt)(parts[2]);
                    const name = parts[1];
                    if (!lodash_1.default.isNaN(id) && name !== "") {
                        yield this.redisClient.hset("jobDefines", name, id);
                    }
                }
            }));
        });
    }
    loadJobsProp() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.job);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load jobs. Reason: cannot find '${absolutePath}' file.`);
            }
            if (!(yield this.redisClient.exists("itemDefines"))) {
                this.logger.warn(`Unable to load jobs. Reason: job defines is empty`);
            }
            yield this.cleanCache(); // clean cache
            const text = fs_extra_1.default.readFileSync(absolutePath, "utf-8");
            const data = js_yaml_1.default.load(text);
            lodash_1.default.forEach(data, (job) => __awaiter(this, void 0, void 0, function* () {
                const formattedJob = Object.assign(Object.assign({}, job), { id: defineJob_2.DefineJob[job.id], identifier: job.id });
                if (formattedJob.id) {
                    this.redisClient.hmset(`job:${formattedJob.id}`, formattedJob);
                }
            }));
            this.logger.main(`${data.length} jobs loaded.`);
        });
    }
    parseJobProperties(data) {
        return {
            id: (0, parsing_1.tryParseInt)(data.id),
            identifier: data.identifier,
            attackSpeed: (0, parsing_1.tryParseFloat)(data.attackSpeed),
            maxHpFactor: (0, parsing_1.tryParseFloat)(data.maxHpFactor),
            maxMpFactor: (0, parsing_1.tryParseFloat)(data.maxMpFactor),
            maxFpFactor: (0, parsing_1.tryParseFloat)(data.maxFpFactor),
            defenseFactor: (0, parsing_1.tryParseFloat)(data.defenseFactor),
            hpRecoveryFactor: (0, parsing_1.tryParseFloat)(data.hpRecoveryFactor),
            mpRecoveryFactor: (0, parsing_1.tryParseFloat)(data.mpRecoveryFactor),
            fpRecoveryFactor: (0, parsing_1.tryParseFloat)(data.fpRecoveryFactor),
            meleeSword: (0, parsing_1.tryParseFloat)(data.meleeSword),
            meleeAxe: (0, parsing_1.tryParseFloat)(data.meleeAxe),
            meleeStaff: (0, parsing_1.tryParseFloat)(data.meleeStaff),
            meleeStick: (0, parsing_1.tryParseFloat)(data.meleeStick),
            meleeKnuckle: (0, parsing_1.tryParseFloat)(data.meleeKnuckle),
            magicWand: (0, parsing_1.tryParseFloat)(data.magicWand),
            blocking: (0, parsing_1.tryParseFloat)(data.blocking),
            meleeYoyo: (0, parsing_1.tryParseFloat)(data.meleeYoyo),
            critical: (0, parsing_1.tryParseFloat)(data.critical),
            type: defineJob_1.JobType[data.type],
            parent: (0, parsing_1.tryParseInt)(data.parent),
            minLevel: (0, parsing_1.tryParseInt)(data.minLevel),
            maxLevel: (0, parsing_1.tryParseInt)(data.maxLevel),
        };
    }
    cleanCache() {
        return new Promise((resolve, reject) => {
            this.redisClient.keys("job:*", (err, keys) => {
                if (err) {
                    reject(err);
                }
                else {
                    if (keys) {
                        if (keys.length === 0) {
                            resolve();
                        }
                        else {
                            this.redisClient.del(...keys, (delErr, reply) => {
                                if (delErr) {
                                    reject(delErr);
                                }
                                else {
                                    resolve();
                                }
                            });
                        }
                    }
                }
            });
        });
    }
}
exports.JobResources = JobResources;
