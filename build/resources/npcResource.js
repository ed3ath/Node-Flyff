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
exports.NpcResources = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const ioredis_1 = __importDefault(require("ioredis"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const logger_1 = require("../helpers/logger");
const resourcePaths_1 = require("../resources/resourcePaths");
const parsing_1 = require("../helpers/parsing");
class NpcResources {
    constructor(options, language = "en") {
        this.logger = new logger_1.Logger("Npc Resources");
        this.redisClient = new ioredis_1.default(options);
        this.language = language;
    }
    loadNpcPropStrings() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.characterText);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load npc prop strings. Reason: cannot find '${absolutePath}' file.`);
            }
            try {
                const data = fs_extra_1.default.readFileSync(absolutePath, "utf16le");
                const lines = data.split("\n").map((i) => i.toString().trim());
                lodash_1.default.forEach(lines, (line, i) => __awaiter(this, void 0, void 0, function* () {
                    const [id, text] = line.split("\t");
                    yield this.redisClient.hset("npcStrings", id, text);
                }));
            }
            catch (err) {
                this.logger.error("Error parsing npc strings:", err);
            }
        });
    }
    loadNpcSchoolPropStrings() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.characterSchoolText);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load npc school prop strings. Reason: cannot find '${absolutePath}' file.`);
            }
            try {
                const data = fs_extra_1.default.readFileSync(absolutePath, "utf16le");
                const lines = data.split("\n").map((i) => i.toString().trim());
                lodash_1.default.forEach(lines, (line, i) => __awaiter(this, void 0, void 0, function* () {
                    const [id, text] = line.split("\t");
                    yield this.redisClient.hset("npcStrings", id, text);
                }));
            }
            catch (err) {
                this.logger.error("Error parsing npc school strings:", err);
            }
        });
    }
    loadNpcDialogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.dialogsDir, this.language);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load dialogs. Reason: cannot find '${absolutePath}' file.`);
            }
            try {
                const dialogsFile = fs_extra_1.default.readdirSync(absolutePath);
                yield Promise.all(lodash_1.default.map(dialogsFile, (dialogFile) => __awaiter(this, void 0, void 0, function* () {
                    const dialog = fs_extra_1.default.readJSONSync(path_1.default.join(absolutePath, dialogFile));
                    yield this.redisClient.hmset(`dialogs:${dialog.name}`, {
                        name: dialog.name,
                        introText: dialog.introText,
                        shoutText: dialog.oralText,
                        byeText: dialog.byeText,
                        links: JSON.stringify(dialog.links),
                    });
                })));
            }
            catch (err) {
                this.logger.error("Error parsing npc dialog:", err);
            }
        });
    }
    loadNpcShops() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.shopsDir);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load shops. Reason: cannot find '${absolutePath}' file.`);
            }
            try {
                const shopsFile = fs_extra_1.default.readdirSync(absolutePath);
                yield Promise.all(lodash_1.default.map(shopsFile, (shopFile) => __awaiter(this, void 0, void 0, function* () {
                    const shop = fs_extra_1.default.readJSONSync(path_1.default.join(absolutePath, shopFile));
                    yield this.redisClient.hmset(`shops:${shop.name}`, {
                        name: shop.name,
                        items: JSON.stringify(shop.items),
                    });
                })));
            }
            catch (err) {
                this.logger.error("Error parsing npc dialog:", err);
            }
        });
    }
    getString(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hget("npcStrings", id, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    getDialog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hgetall(`dialogs:${id}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(this.parseDialog(data));
                    }
                });
            });
        });
    }
    getShop(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.redisClient.hgetall(`shops:${id}`, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(this.parseShop(data));
                    }
                });
            });
        });
    }
    loadNpcProp() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.character);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load npcs. Reason: cannot find '${absolutePath}' file.`);
            }
            yield this.cleanCache(); // clean cache
            const data = fs_extra_1.default.readFileSync(absolutePath, "utf8");
            const npcData = js_yaml_1.default.load(data);
            lodash_1.default.forEach(npcData, (data) => __awaiter(this, void 0, void 0, function* () {
                const dialog = yield this.getDialog(data.id);
                const shop = yield this.getShop(data.id);
                const npc = {
                    id: data.id,
                    name: (yield this.getString(data.name)),
                    modelId: 0,
                    hairId: 0,
                    hairColor: 0,
                    faceId: 0,
                    items: [],
                    hasShop: !lodash_1.default.isEmpty(shop),
                    shop,
                    dialog,
                    hasDialog: !lodash_1.default.isEmpty(dialog),
                    canBuff: !lodash_1.default.isEmpty(data.canBuff) &&
                        !lodash_1.default.isNil(data.canBuff) &&
                        !lodash_1.default.isUndefined(data.canBuff),
                };
                if (npc.id) {
                    this.redisClient.hmset(`npc:${npc.id}`, npc);
                }
            }));
            this.logger.main(`${npcData.length} npc loaded.`);
        });
    }
    parseDialog(dialog) {
        if (!dialog || !(dialog === null || dialog === void 0 ? void 0 : dialog.name))
            return;
        return {
            name: dialog.name,
            introText: dialog.introText,
            shoutText: dialog.oralText,
            byeText: dialog.byeText,
            links: (0, parsing_1.tryJsonParse)(dialog.links),
        };
    }
    parseShop(shop) {
        if (!shop || !(shop === null || shop === void 0 ? void 0 : shop.name))
            return;
        return {
            name: shop.name,
            items: (0, parsing_1.tryJsonParse)(shop.items),
        };
    }
    cleanCache() {
        return new Promise((resolve, reject) => {
            this.redisClient.keys("npc:*", (err, keys) => {
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
exports.NpcResources = NpcResources;
