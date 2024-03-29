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
exports.ItemResources = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const ioredis_1 = __importDefault(require("ioredis"));
const logger_1 = require("../helpers/logger");
const resourcePaths_1 = require("../resources/resourcePaths");
const parsing_1 = require("../helpers/parsing");
class ItemResources {
    constructor(options) {
        this.logger = new logger_1.Logger("Item Resources");
        this.redisClient = new ioredis_1.default(options);
    }
    get(itemIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemId = typeof itemIdentifier === "number"
                ? itemIdentifier
                : yield this.redisClient.hget("itemDefines", itemIdentifier);
            if (!lodash_1.default.isUndefined(itemId)) {
                return new Promise((resolve, reject) => {
                    this.redisClient.hgetall(`item:${itemId}`, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(data ? this.parseItemProperties(data) : null);
                        }
                    });
                });
            }
            return null;
        });
    }
    where(predicate) {
        const items = [];
        this.redisClient.keys("item:*", (err, keys) => {
            if (err) {
                this.logger.error("Error retrieving keys from Redis:", err);
            }
            else {
                if (!lodash_1.default.isUndefined(keys)) {
                    lodash_1.default.forEach(keys, (key) => {
                        this.redisClient.hgetall(key, (err, data) => {
                            if (err) {
                                this.logger.error("Error retrieving item data from Redis:", err);
                            }
                            else {
                                if (data) {
                                    const item = this.parseItemProperties(data);
                                    if (predicate(item)) {
                                        items.push(item);
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });
        return items;
    }
    loadDefines() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.defineItem);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load items. Reason: cannot find '${absolutePath}' file.`);
            }
            const data = fs_extra_1.default.readFileSync(absolutePath, "utf8");
            const lines = data.split("\n");
            lodash_1.default.forEach(lines, (line) => __awaiter(this, void 0, void 0, function* () {
                if (lodash_1.default.trim(line).startsWith("#define")) {
                    const parts = lodash_1.default.trim(line).split(/\s+/);
                    const id = (0, parsing_1.tryParseInt)(parts[2]);
                    const name = parts[1];
                    if (!lodash_1.default.isNaN(id) && name !== "") {
                        yield this.redisClient.hset("itemDefines", name, id);
                    }
                }
            }));
        });
    }
    loadItemsPropStrings() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.itemsText);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load items. Reason: cannot find '${absolutePath}' file.`);
            }
            if (!(yield this.redisClient.exists("itemDefines"))) {
                this.logger.warn(`Unable to load items. Reason: item defines is empty`);
            }
            try {
                const data = fs_extra_1.default.readFileSync(absolutePath, "utf16le");
                const lines = data.split("\n").map((i) => i.toString().trim());
                const pairs = lodash_1.default.chunk(lines, 2);
                lodash_1.default.forEach(pairs, (pair, i) => __awaiter(this, void 0, void 0, function* () {
                    const [idName, name] = pair[0].split("\t");
                    const [idDesc, desc] = pair[1].split("\t");
                    yield this.redisClient.hset("itemNames", idName, name);
                    yield this.redisClient.hset("itemDescriptions", idDesc, desc);
                }));
            }
            catch (err) {
                this.logger.error("Error parsing item file:", err);
            }
        });
    }
    loadItemsProp() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.itemsProp);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load items. Reason: cannot find '${absolutePath}' file.`);
            }
            if (!(yield this.redisClient.exists("itemDefines"))) {
                this.logger.warn(`Unable to load items. Reason: item defines is empty`);
            }
            yield this.cleanCache(); // clean cache
            const data = fs_extra_1.default.readFileSync(absolutePath, "utf8");
            const lines = data.split("\n");
            lodash_1.default.forEach(lines, (line) => __awaiter(this, void 0, void 0, function* () {
                const items = line.trim().split("\t");
                const id = yield this.redisClient.hget("itemDefines", items[1]);
                if (!lodash_1.default.isNil(id)) {
                    const szName = (yield this.redisClient.hget("itemNames", (0, parsing_1.cleanString)(items[2]))) || "";
                    const szComment = (yield this.redisClient.hget("itemDescriptions", (0, parsing_1.cleanString)(items[60]))) || "";
                    const item = {
                        id: (0, parsing_1.tryParseInt)(id),
                        ver6: (0, parsing_1.tryParseInt)(items[0]),
                        dwID: items[1],
                        szName,
                        szNameId: (0, parsing_1.cleanString)(items[2]),
                        dwPackMax: (0, parsing_1.tryParseInt)(items[4]),
                        dwItemKind1: (0, parsing_1.cleanString)(items[5]),
                        dwItemKind2: (0, parsing_1.cleanString)(items[6]),
                        dwItemKind3: (0, parsing_1.cleanString)(items[7]),
                        dwItemJob: (0, parsing_1.cleanString)(items[8]),
                        bPermanence: items[9] === "TRUE",
                        dwUseable: items[10] === "TRUE",
                        dwItemSex: (0, parsing_1.tryParseInt)(items[11]),
                        dwCost: (0, parsing_1.tryParseInt)(items[12]),
                        dwLimitLevel1: (0, parsing_1.tryParseInt)(items[14]),
                        dwParts: (0, parsing_1.cleanString)(items[15]),
                        dwAbilityMin: (0, parsing_1.tryParseInt)(items[16]),
                        dwAbilityMax: (0, parsing_1.tryParseInt)(items[17]),
                        eItemType: (0, parsing_1.cleanString)(items[18]),
                        dwItemLV: (0, parsing_1.tryParseInt)(items[19]),
                        dwItemRare: (0, parsing_1.tryParseInt)(items[20]),
                        dwAttackSpeed: (0, parsing_1.tryParseFloat)(items[21]),
                        dwDestParam1: (0, parsing_1.tryParseInt)(items[22]),
                        dwDestParam2: (0, parsing_1.tryParseInt)(items[23]),
                        dwDestParam3: (0, parsing_1.tryParseInt)(items[24]),
                        nAdjParamVal1: (0, parsing_1.tryParseInt)(items[25]),
                        nAdjParamVal2: (0, parsing_1.tryParseInt)(items[26]),
                        nAdjParamVal3: (0, parsing_1.tryParseInt)(items[27]),
                        dwCircleTime: (0, parsing_1.tryParseInt)(items[28]),
                        dwSfxObj: (0, parsing_1.tryParseInt)(items[29]),
                        dwSfxObj2: (0, parsing_1.tryParseInt)(items[30]),
                        dwSfxObj3: (0, parsing_1.tryParseInt)(items[31]),
                        dwSfxObj4: (0, parsing_1.tryParseInt)(items[32]),
                        dwSfxObj5: (0, parsing_1.tryParseInt)(items[33]),
                        dwSkillReady: (0, parsing_1.tryParseInt)(items[34]),
                        dwWeaponType: (0, parsing_1.tryParseInt)(items[35]),
                        dwItemAtkOrder1: (0, parsing_1.tryParseInt)(items[36]),
                        dwItemAtkOrder2: (0, parsing_1.tryParseInt)(items[37]),
                        dwItemAtkOrder3: (0, parsing_1.tryParseInt)(items[38]),
                        dwItemAtkOrder4: (0, parsing_1.tryParseInt)(items[39]),
                        dwSkillReadyType: (0, parsing_1.tryParseInt)(items[40]),
                        dwReferStat1: (0, parsing_1.cleanString)(items[41]),
                        dwAddSkillMin: (0, parsing_1.tryParseInt)(items[42]),
                        dwAddSkillMax: (0, parsing_1.tryParseInt)(items[43]),
                        dwReqMp: (0, parsing_1.tryParseInt)(items[44]),
                        dwReqFp: (0, parsing_1.tryParseInt)(items[45]),
                        bCharged: items[46] === "TRUE",
                        dwReferStat2: (0, parsing_1.tryParseInt)(items[47]),
                        dwReferTarget1: (0, parsing_1.tryParseInt)(items[48]),
                        dwReferTarget2: (0, parsing_1.tryParseInt)(items[49]),
                        dwReferValue1: (0, parsing_1.tryParseInt)(items[50]),
                        dwReferValue2: (0, parsing_1.tryParseInt)(items[51]),
                        dwFlightLimit: (0, parsing_1.tryParseInt)(items[52]),
                        dwFFuelReMax: (0, parsing_1.tryParseInt)(items[53]),
                        dwAFuelReMax: (0, parsing_1.tryParseInt)(items[54]),
                        dwLimitLevel: (0, parsing_1.tryParseInt)(items[55]),
                        dwReflect: (0, parsing_1.tryParseInt)(items[56]),
                        szIcon: (0, parsing_1.cleanString)(items[57]),
                        dwQuestID: (0, parsing_1.tryParseInt)(items[58]),
                        szTextFile: (0, parsing_1.cleanString)(items[59]),
                        szComment,
                    };
                    if (item.id) {
                        this.redisClient.hmset(`item:${item.id}`, item);
                    }
                }
            }));
            this.logger.main(`${lines.length} items loaded.`);
        });
    }
    parseItemProperties(data) {
        return {
            id: parseInt(data["id"]),
            ver6: parseInt(data["ver6"]),
            dwID: data["dwID"],
            szName: data["szName"],
            szNameId: data["szNameId"],
            dwPackMax: parseInt(data["dwPackMax"]),
            dwItemKind1: data["dwItemKind1"],
            dwItemKind2: data["dwItemKind2"],
            dwItemKind3: data["dwItemKind3"],
            dwItemJob: data["dwItemJob"],
            bPermanence: data["bPermanence"] === "true",
            dwUseable: data["dwUseable"] === "true",
            dwItemSex: parseInt(data["dwItemSex"]),
            dwCost: parseInt(data["dwCost"]),
            dwLimitLevel1: parseInt(data["dwLimitLevel1"]),
            dwParts: data["dwParts"],
            dwAbilityMin: parseInt(data["dwAbilityMin"]),
            dwAbilityMax: parseInt(data["dwAbilityMax"]),
            eItemType: data["eItemType"],
            dwItemLV: parseInt(data["dwItemLV"]),
            dwItemRare: parseInt(data["dwItemRare"]),
            dwAttackSpeed: parseFloat(data["dwAttackSpeed"]),
            dwDestParam1: parseInt(data["dwDestParam1"]),
            dwDestParam2: parseInt(data["dwDestParam2"]),
            dwDestParam3: parseInt(data["dwDestParam3"]),
            nAdjParamVal1: parseInt(data["nAdjParamVal1"]),
            nAdjParamVal2: parseInt(data["nAdjParamVal2"]),
            nAdjParamVal3: parseInt(data["nAdjParamVal3"]),
            dwCircleTime: parseInt(data["dwCircleTime"]),
            dwSfxObj: parseInt(data["dwSfxObj"]),
            dwSfxObj2: parseInt(data["dwSfxObj2"]),
            dwSfxObj3: parseInt(data["dwSfxObj3"]),
            dwSfxObj4: parseInt(data["dwSfxObj4"]),
            dwSfxObj5: parseInt(data["dwSfxObj5"]),
            dwSkillReady: parseInt(data["dwSkillReady"]),
            dwWeaponType: parseInt(data["dwWeaponType"]),
            dwItemAtkOrder1: parseInt(data["dwItemAtkOrder1"]),
            dwItemAtkOrder2: parseInt(data["dwItemAtkOrder2"]),
            dwItemAtkOrder3: parseInt(data["dwItemAtkOrder3"]),
            dwItemAtkOrder4: parseInt(data["dwItemAtkOrder4"]),
            dwSkillReadyType: parseInt(data["dwSkillReadyType"]),
            dwReferStat1: data["dwReferStat1"],
            dwAddSkillMin: parseInt(data["dwAddSkillMin"]),
            dwAddSkillMax: parseInt(data["dwAddSkillMax"]),
            dwReqMp: parseInt(data["dwReqMp"]),
            dwReqFp: parseInt(data["dwReqFp"]),
            bCharged: data["bCharged"] === "true",
            dwReferStat2: parseInt(data["dwReferStat2"]),
            dwReferTarget1: parseInt(data["dwReferTarget1"]),
            dwReferTarget2: parseInt(data["dwReferTarget2"]),
            dwReferValue1: parseInt(data["dwReferValue1"]),
            dwReferValue2: parseInt(data["dwReferValue2"]),
            dwFlightLimit: parseInt(data["dwFlightLimit"]),
            dwFFuelReMax: parseInt(data["dwFFuelReMax"]),
            dwAFuelReMax: parseInt(data["dwAFuelReMax"]),
            dwLimitLevel: parseInt(data["dwLimitLevel"]),
            dwReflect: parseInt(data["dwReflect"]),
            szIcon: data["szIcon"],
            dwQuestID: parseInt(data["dwQuestID"]),
            szTextFile: data["szTextFile"],
            szComment: data["szComment"],
        };
    }
    cleanCache() {
        return new Promise((resolve, reject) => {
            this.redisClient.keys("item:*", (err, keys) => {
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
exports.ItemResources = ItemResources;
