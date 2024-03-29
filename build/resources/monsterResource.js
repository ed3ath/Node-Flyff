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
exports.MonsterResources = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const logger_1 = require("../helpers/logger");
const ioredis_1 = __importDefault(require("ioredis"));
const resourcePaths_1 = require("./resourcePaths");
const parsing_1 = require("../helpers/parsing");
class MonsterResources {
    constructor(options) {
        this.logger = new logger_1.Logger("Monster Resources");
        this.redisClient = new ioredis_1.default(options);
    }
    get(monsterIdentifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const monsterId = typeof monsterIdentifier === "number"
                ? monsterIdentifier
                : yield this.redisClient.hget("objectDefines", monsterIdentifier);
            if (!lodash_1.default.isUndefined(monsterId)) {
                return new Promise((resolve, reject) => {
                    this.redisClient.hgetall(`monster:${monsterId}`, (err, data) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(data ? this.parseMoverProperties(data) : null);
                        }
                    });
                });
            }
            return null;
        });
    }
    where(predicate) {
        const monsters = [];
        this.redisClient.keys("monster:*", (err, keys) => {
            if (err) {
                this.logger.error("Error retrieving keys from Redis:", err);
            }
            else {
                if (!lodash_1.default.isUndefined(keys)) {
                    lodash_1.default.forEach(keys, (key) => {
                        this.redisClient.hgetall(key, (err, data) => {
                            if (err) {
                                this.logger.error("Error retrieving monster data from Redis:", err);
                            }
                            else {
                                if (data) {
                                    const monster = this.parseMoverProperties(data);
                                    if (predicate(monster)) {
                                        monsters.push(monster);
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });
        return monsters;
    }
    loadDefines() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.defineObject);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load monsters. Reason: cannot find '${absolutePath}' file.`);
            }
            const data = fs_extra_1.default.readFileSync(absolutePath, "utf8");
            const lines = data.split("\n");
            lodash_1.default.forEach(lines, (line) => __awaiter(this, void 0, void 0, function* () {
                if (lodash_1.default.trim(line).startsWith("#define")) {
                    const parts = lodash_1.default.trim(line).split(/\s+/);
                    const id = (0, parsing_1.tryParseInt)(parts[2]);
                    const name = parts[1];
                    if (!lodash_1.default.isNaN(id) && name !== "") {
                        yield this.redisClient.hset("objectDefines", name, id);
                    }
                }
            }));
        });
    }
    loadMonstersPropStrings() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.moversText);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load monsters. Reason: cannot find '${absolutePath}' file.`);
            }
            if (!(yield this.redisClient.exists("objectDefines"))) {
                this.logger.warn(`Unable to load monsters. Reason: monster defines is empty`);
            }
            try {
                const data = fs_extra_1.default.readFileSync(absolutePath, "utf16le");
                const lines = data.split("\n").map((i) => i.toString().trim());
                const pairs = lodash_1.default.chunk(lines, 2);
                lodash_1.default.forEach(pairs, (pair, i) => __awaiter(this, void 0, void 0, function* () {
                    const [idName, name] = pair[0].split("\t");
                    const [idDesc, desc] = pair[1].split("\t");
                    yield this.redisClient.hset("monsterNames", idName, name);
                    yield this.redisClient.hset("monsterDescriptions", idDesc, desc);
                }));
            }
            catch (err) {
                this.logger.error("Error parsing monster file:", err);
            }
        });
    }
    loadMonstersProp() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.moversProp);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load monsters. Reason: cannot find '${absolutePath}' file.`);
                return;
            }
            if (!(yield this.redisClient.exists("objectDefines"))) {
                this.logger.warn(`Unable to load monsters. Reason: monster defines is empty`);
                return;
            }
            yield this.cleanCache(); // clean cache
            const data = fs_extra_1.default.readFileSync(absolutePath, "utf8");
            const lines = data.split("\n");
            lodash_1.default.forEach(lines, (line) => __awaiter(this, void 0, void 0, function* () {
                const monsterData = line.trim().split("\t");
                const id = yield this.redisClient.hget("objectDefines", monsterData[0]);
                if (!lodash_1.default.isNil(id)) {
                    const monster = {
                        id: parseInt(id),
                        dwID: monsterData[0],
                        szName: (0, parsing_1.cleanString)(monsterData[1]),
                        dwAI: (0, parsing_1.cleanString)(monsterData[2]),
                        dwStr: (0, parsing_1.tryParseInt)(monsterData[3]),
                        dwSta: (0, parsing_1.tryParseInt)(monsterData[4]),
                        dwDex: (0, parsing_1.tryParseInt)(monsterData[5]),
                        dwInt: (0, parsing_1.tryParseInt)(monsterData[6]),
                        dwHR: (0, parsing_1.tryParseInt)(monsterData[7]),
                        dwER: (0, parsing_1.tryParseInt)(monsterData[8]),
                        dwRace: (0, parsing_1.cleanString)(monsterData[9]),
                        dwBelligerence: (0, parsing_1.cleanString)(monsterData[10]),
                        dwGender: (0, parsing_1.cleanString)(monsterData[11]),
                        dwLevel: (0, parsing_1.tryParseInt)(monsterData[12]),
                        dwFlightLevel: (0, parsing_1.tryParseInt)(monsterData[13]),
                        dwSize: (0, parsing_1.tryParseInt)(monsterData[14]),
                        dwClass: (0, parsing_1.tryParseInt)(monsterData[15]),
                        bIfPart: (0, parsing_1.cleanString)(monsterData[16]),
                        dwKarma: (0, parsing_1.cleanString)(monsterData[17]),
                        dwUseable: (0, parsing_1.cleanString)(monsterData[18]),
                        dwActionRadius: (0, parsing_1.tryParseInt)(monsterData[19]),
                        dwAtkMin: (0, parsing_1.tryParseInt)(monsterData[20]),
                        dwAtkMax: (0, parsing_1.tryParseInt)(monsterData[21]),
                        dwAtk1: (0, parsing_1.tryParseInt)(monsterData[22]),
                        dwAtk2: (0, parsing_1.tryParseInt)(monsterData[23]),
                        dwAtk3: (0, parsing_1.tryParseInt)(monsterData[24]),
                        dwHorizontalRate: (0, parsing_1.tryParseInt)(monsterData[25]),
                        dwVerticalRate: (0, parsing_1.tryParseInt)(monsterData[26]),
                        dwDiagonalRate: (0, parsing_1.tryParseInt)(monsterData[27]),
                        dwThrustRate: (0, parsing_1.tryParseInt)(monsterData[28]),
                        dwChestRate: (0, parsing_1.tryParseInt)(monsterData[29]),
                        dwHeadRate: (0, parsing_1.tryParseInt)(monsterData[30]),
                        dwArmRate: (0, parsing_1.tryParseInt)(monsterData[31]),
                        dwLegRate: (0, parsing_1.tryParseInt)(monsterData[32]),
                        dwAttackSpeed: (0, parsing_1.tryParseInt)(monsterData[33]),
                        dwReAttackDelay: (0, parsing_1.tryParseInt)(monsterData[34]),
                        dwAddHp: (0, parsing_1.tryParseInt)(monsterData[35]),
                        dwAddMp: (0, parsing_1.tryParseInt)(monsterData[36]),
                        dwNaturealArmor: (0, parsing_1.tryParseInt)(monsterData[37]),
                        nAbrasion: (0, parsing_1.tryParseInt)(monsterData[38]),
                        nHardness: (0, parsing_1.tryParseInt)(monsterData[39]),
                        dwAdjAtkDelay: (0, parsing_1.tryParseInt)(monsterData[40]),
                        eElementType: (0, parsing_1.cleanString)(monsterData[41]),
                        wElementAtk: (0, parsing_1.tryParseInt)(monsterData[42]),
                        dwHideLevel: (0, parsing_1.tryParseInt)(monsterData[43]),
                        fSpeed: (0, parsing_1.tryParseFloat)(monsterData[44]),
                        dwShelter: (0, parsing_1.tryParseInt)(monsterData[45]),
                        bFlying: (0, parsing_1.cleanString)(monsterData[46]),
                        dwJumpIng: (0, parsing_1.tryParseInt)(monsterData[47]),
                        dwAirJump: (0, parsing_1.tryParseInt)(monsterData[48]),
                        bTaming: (0, parsing_1.cleanString)(monsterData[49]),
                        dwResisMagic: (0, parsing_1.tryParseInt)(monsterData[50]),
                        fResistElecricity: (0, parsing_1.tryParseFloat)(monsterData[51]),
                        fResistFire: (0, parsing_1.tryParseFloat)(monsterData[52]),
                        fResistWind: (0, parsing_1.tryParseFloat)(monsterData[53]),
                        fResistWater: (0, parsing_1.tryParseFloat)(monsterData[54]),
                        fResistEarth: (0, parsing_1.tryParseFloat)(monsterData[55]),
                        dwCash: (0, parsing_1.tryParseInt)(monsterData[56]),
                        dwSourceMaterial: (0, parsing_1.tryParseInt)(monsterData[57]),
                        dwMaterialAmount: (0, parsing_1.tryParseInt)(monsterData[58]),
                        dwCohesion: (0, parsing_1.tryParseInt)(monsterData[59]),
                        dwHoldingTime: (0, parsing_1.tryParseInt)(monsterData[60]),
                        dwCorrectionValue: (0, parsing_1.tryParseInt)(monsterData[61]),
                        dwExpValue: (0, parsing_1.tryParseInt)(monsterData[62]),
                        nFxpValue: (0, parsing_1.tryParseInt)(monsterData[63]),
                        nBodyState: (0, parsing_1.tryParseInt)(monsterData[64]),
                        dwAddAbility: (0, parsing_1.tryParseInt)(monsterData[65]),
                        bKillable: (0, parsing_1.cleanString)(monsterData[66]),
                        dwVirtItem1: (0, parsing_1.cleanString)(monsterData[67]),
                        dwVirtType1: (0, parsing_1.cleanString)(monsterData[68]),
                        dwVirtItem2: (0, parsing_1.cleanString)(monsterData[69]),
                        dwVirtType2: (0, parsing_1.cleanString)(monsterData[70]),
                        dwVirtItem3: (0, parsing_1.cleanString)(monsterData[71]),
                        dwVirtType3: (0, parsing_1.cleanString)(monsterData[72]),
                        dwSndAtk1: (0, parsing_1.tryParseInt)(monsterData[73]),
                        dwSndAtk2: (0, parsing_1.tryParseInt)(monsterData[74]),
                        dwSndDie1: (0, parsing_1.tryParseInt)(monsterData[75]),
                        dwSndDie2: (0, parsing_1.tryParseInt)(monsterData[76]),
                        dwSndDmg1: (0, parsing_1.tryParseInt)(monsterData[77]),
                        dwSndDmg2: (0, parsing_1.tryParseInt)(monsterData[78]),
                        dwSndDmg3: (0, parsing_1.tryParseInt)(monsterData[79]),
                        dwSndIdle1: (0, parsing_1.tryParseInt)(monsterData[80]),
                        dwSndIdle2: (0, parsing_1.tryParseInt)(monsterData[81]),
                        szComment: (0, parsing_1.cleanString)(monsterData[82]),
                        dwAreaColor: (0, parsing_1.tryParseInt)(monsterData[83]),
                        szNpcMark: (0, parsing_1.cleanString)(monsterData[84]),
                        dwMadrigalGiftPoint: (0, parsing_1.tryParseInt)(monsterData[85]),
                    };
                    if (monster.id) {
                        this.redisClient.hmset(`monster:${monster.id}`, monster);
                    }
                }
            }));
            this.logger.main(`${lines.length} monsters loaded.`);
        });
    }
    parseMoverProperties(data) {
        return {
            id: (0, parsing_1.tryParseInt)(data["id"]),
            dwID: data["dwID"],
            szName: data["szName"],
            dwAI: data["dwAI"],
            dwStr: (0, parsing_1.tryParseInt)(data["dwStr"]),
            dwSta: (0, parsing_1.tryParseInt)(data["dwSta"]),
            dwDex: (0, parsing_1.tryParseInt)(data["dwDex"]),
            dwInt: (0, parsing_1.tryParseInt)(data["dwInt"]),
            dwHR: (0, parsing_1.tryParseInt)(data["dwHR"]),
            dwER: (0, parsing_1.tryParseInt)(data["dwER"]),
            dwRace: data["dwRace"],
            dwBelligerence: data["dwBelligerence"],
            dwGender: data["dwGender"],
            dwLevel: (0, parsing_1.tryParseInt)(data["dwLevel"]),
            dwFlightLevel: (0, parsing_1.tryParseInt)(data["dwFlightLevel"]),
            dwSize: (0, parsing_1.tryParseInt)(data["dwSize"]),
            dwClass: (0, parsing_1.tryParseInt)(data["dwClass"]),
            bIfPart: (0, parsing_1.cleanString)(data["bIfPart"]),
            dwKarma: (0, parsing_1.cleanString)(data["dwKarma"]),
            dwUseable: (0, parsing_1.cleanString)(data["dwUseable"]),
            dwActionRadius: (0, parsing_1.tryParseInt)(data["dwActionRadius"]),
            dwAtkMin: (0, parsing_1.tryParseInt)(data["dwAtkMin"]),
            dwAtkMax: (0, parsing_1.tryParseInt)(data["dwAtkMax"]),
            dwAtk1: (0, parsing_1.tryParseInt)(data["dwAtk1"]),
            dwAtk2: (0, parsing_1.tryParseInt)(data["dwAtk2"]),
            dwAtk3: (0, parsing_1.tryParseInt)(data["dwAtk3"]),
            dwHorizontalRate: (0, parsing_1.tryParseInt)(data["dwHorizontalRate"]),
            dwVerticalRate: (0, parsing_1.tryParseInt)(data["dwVerticalRate"]),
            dwDiagonalRate: (0, parsing_1.tryParseInt)(data["dwDiagonalRate"]),
            dwThrustRate: (0, parsing_1.tryParseInt)(data["dwThrustRate"]),
            dwChestRate: (0, parsing_1.tryParseInt)(data["dwChestRate"]),
            dwHeadRate: (0, parsing_1.tryParseInt)(data["dwHeadRate"]),
            dwArmRate: (0, parsing_1.tryParseInt)(data["dwArmRate"]),
            dwLegRate: (0, parsing_1.tryParseInt)(data["dwLegRate"]),
            dwAttackSpeed: (0, parsing_1.tryParseFloat)(data["dwAttackSpeed"]),
            dwReAttackDelay: (0, parsing_1.tryParseInt)(data["dwReAttackDelay"]),
            dwAddHp: (0, parsing_1.tryParseInt)(data["dwAddHp"]),
            dwAddMp: (0, parsing_1.tryParseInt)(data["dwAddMp"]),
            dwNaturealArmor: (0, parsing_1.tryParseInt)(data["dwNaturealArmor"]),
            nAbrasion: (0, parsing_1.tryParseInt)(data["nAbrasion"]),
            nHardness: (0, parsing_1.tryParseInt)(data["nHardness"]),
            dwAdjAtkDelay: (0, parsing_1.tryParseInt)(data["dwAdjAtkDelay"]),
            eElementType: data["eElementType"],
            wElementAtk: (0, parsing_1.tryParseInt)(data["wElementAtk"]),
            dwHideLevel: (0, parsing_1.tryParseInt)(data["dwHideLevel"]),
            fSpeed: (0, parsing_1.tryParseFloat)(data["fSpeed"]),
            dwShelter: (0, parsing_1.tryParseInt)(data["dwShelter"]),
            bFlying: (0, parsing_1.cleanString)(data["bFlying"]),
            dwJumpIng: (0, parsing_1.tryParseInt)(data["dwJumpIng"]),
            dwAirJump: (0, parsing_1.tryParseInt)(data["dwAirJump"]),
            bTaming: (0, parsing_1.cleanString)(data["bTaming"]),
            dwResisMagic: (0, parsing_1.tryParseFloat)(data["dwResisMagic"]),
            fResistElecricity: (0, parsing_1.tryParseFloat)(data["fResistElecricity"]),
            fResistFire: (0, parsing_1.tryParseFloat)(data["fResistFire"]),
            fResistWind: (0, parsing_1.tryParseFloat)(data["fResistWind"]),
            fResistWater: (0, parsing_1.tryParseFloat)(data["fResistWater"]),
            fResistEarth: (0, parsing_1.tryParseFloat)(data["fResistEarth"]),
            dwCash: (0, parsing_1.tryParseInt)(data["dwCash"]),
            dwSourceMaterial: (0, parsing_1.tryParseInt)(data["dwSourceMaterial"]),
            dwMaterialAmount: (0, parsing_1.tryParseInt)(data["dwMaterialAmount"]),
            dwCohesion: (0, parsing_1.tryParseInt)(data["dwCohesion"]),
            dwHoldingTime: (0, parsing_1.tryParseInt)(data["dwHoldingTime"]),
            dwCorrectionValue: (0, parsing_1.tryParseInt)(data["dwCorrectionValue"]),
            dwExpValue: (0, parsing_1.tryParseInt)(data["dwExpValue"]),
            nFxpValue: (0, parsing_1.tryParseInt)(data["nFxpValue"]),
            nBodyState: (0, parsing_1.tryParseInt)(data["nBodyState"]),
            dwAddAbility: (0, parsing_1.tryParseInt)(data["dwAddAbility"]),
            bKillable: (0, parsing_1.cleanString)(data["bKillable"]),
            dwVirtItem1: (0, parsing_1.cleanString)(data["dwVirtItem1"]),
            dwVirtType1: (0, parsing_1.cleanString)(data["dwVirtType1"]),
            dwVirtItem2: (0, parsing_1.cleanString)(data["dwVirtItem2"]),
            dwVirtType2: (0, parsing_1.cleanString)(data["dwVirtType2"]),
            dwVirtItem3: (0, parsing_1.cleanString)(data["dwVirtItem3"]),
            dwVirtType3: (0, parsing_1.cleanString)(data["dwVirtType3"]),
            dwSndAtk1: (0, parsing_1.tryParseInt)(data["dwSndAtk1"]),
            dwSndAtk2: (0, parsing_1.tryParseInt)(data["dwSndAtk2"]),
            dwSndDie1: (0, parsing_1.tryParseInt)(data["dwSndDie1"]),
            dwSndDie2: (0, parsing_1.tryParseInt)(data["dwSndDie2"]),
            dwSndDmg1: (0, parsing_1.tryParseInt)(data["dwSndDmg1"]),
            dwSndDmg2: (0, parsing_1.tryParseInt)(data["dwSndDmg2"]),
            dwSndDmg3: (0, parsing_1.tryParseInt)(data["dwSndDmg3"]),
            dwSndIdle1: (0, parsing_1.tryParseInt)(data["dwSndIdle1"]),
            dwSndIdle2: (0, parsing_1.tryParseInt)(data["dwSndIdle2"]),
            szComment: data["szComment"],
            dwAreaColor: (0, parsing_1.tryParseInt)(data["dwAreaColor"]),
            szNpcMark: data["szNpcMark"],
            dwMadrigalGiftPoint: (0, parsing_1.tryParseInt)(data["dwMadrigalGiftPoint"]),
        };
    }
    cleanCache() {
        return new Promise((resolve, reject) => {
            this.redisClient.keys("monster:*", (err, keys) => {
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
exports.MonsterResources = MonsterResources;
