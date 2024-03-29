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
exports.MapResources = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const ioredis_1 = __importDefault(require("ioredis"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const logger_1 = require("../helpers/logger");
const resourcePaths_1 = require("../resources/resourcePaths");
const wldFile_1 = require("../abstract/wldFile");
const rgnFile_1 = require("../abstract/rgn/rgnFile");
const regionRespawnProperties_1 = require("../abstract/regionRespawnProperties");
const regionInfoType_1 = require("../common/regionInfoType");
const mapRevivalRegion_1 = require("../abstract/mapRevivalRegion");
const mapTriggerRegionProperties_1 = require("../abstract/mapTriggerRegionProperties");
const dyoFile_1 = require("../abstract/dyo/dyoFile");
const mapObjectProperties_1 = require("../abstract/mapObjectProperties");
const rectangle_1 = require("../abstract/rectangle");
const mapProperties_1 = require("../abstract/mapProperties");
const parsing_1 = require("../helpers/parsing");
class MapResources {
    constructor(options) {
        this.worldPaths = [];
        this.maps = [];
        this.logger = new logger_1.Logger("World Resources");
        this.redisClient = new ioredis_1.default(options);
    }
    loadDefines() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.defineWorld);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load world defines. Reason: cannot find '${absolutePath}' file.`);
            }
            const data = fs_extra_1.default.readFileSync(absolutePath, "utf8");
            const lines = data.split("\n");
            lodash_1.default.forEach(lines, (line) => __awaiter(this, void 0, void 0, function* () {
                if (lodash_1.default.trim(line).startsWith("#define")) {
                    const parts = lodash_1.default.trim(line).split(/\s+/);
                    const id = (0, parsing_1.tryParseInt)(parts[2]);
                    const name = parts[1];
                    if (!lodash_1.default.isNaN(id) && name !== "") {
                        yield this.redisClient.hset("worldDefines", name, id);
                    }
                }
            }));
        });
    }
    loadWorldPaths() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.worldPath);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.error(`Unable to load worlds. Reason: cannot find '${absolutePath}' file.`);
            }
            const text = fs_extra_1.default.readFileSync(absolutePath, "utf-8");
            this.worldPaths = js_yaml_1.default.load(text);
        });
    }
    loadWorldData(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const worldFile = new wldFile_1.WldFile(path);
            return worldFile.worldData;
        });
    }
    loadRegions(worldName, revivalMapId) {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.world, worldName);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load regions. Reason: cannot find '${absolutePath}' folder.`);
                return [];
            }
            const worldPath = path_1.default.join(absolutePath, `${worldName}.rgn`);
            if (!fs_extra_1.default.existsSync(worldPath)) {
                this.logger.warn(`Unable to load regions. Reason: cannot find ${worldPath}`);
                return [];
            }
            const regions = [];
            const rgnFile = new rgnFile_1.RgnFile(worldPath);
            const respawnerRgn = rgnFile
                .getElements()
                .map((region) => new regionRespawnProperties_1.MapRespawnRegionProperties(region.left, region.top, region.width, region.left, region.time, region.position.y, region.type, region.model, region.count));
            regions.push(...respawnerRgn);
            const mapRegions = rgnFile.getElements().map((region) => {
                if (region.index === regionInfoType_1.RegionInfoType.Revival) {
                    return new mapRevivalRegion_1.MapRevivalRegionProperties(region.left, region.top, region.width, region.length, revivalMapId, region.key, region.chaoKey, region.targetKey, region.position);
                }
                if (region.index === regionInfoType_1.RegionInfoType.Trigger) {
                    return new mapTriggerRegionProperties_1.MapTriggerRegionProperties(region.left, region.top, region.width, region.length, region.teleportWorldId, region.teleportPosition);
                }
                return null;
            });
            const filteredMapRegions = mapRegions.filter((i) => !!i);
            if (filteredMapRegions.length)
                regions.push(...filteredMapRegions);
            return regions;
        });
    }
    loadWorldObjects(worldName) {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.world, worldName);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load regions. Reason: cannot find '${absolutePath}' folder.`);
                return [];
            }
            const worldPath = path_1.default.join(absolutePath, `${worldName}.dyo`);
            if (!fs_extra_1.default.existsSync(worldPath)) {
                this.logger.warn(`Unable to load regions. Reason: cannot find ${worldPath}`);
                return [];
            }
            const elements = new dyoFile_1.DyoFile(path_1.default.join(resourcePaths_1.ResourcePaths.world, worldName, `${worldName}.dyo`));
            return elements
                .getElements()
                .filter((i) => !!i)
                .map((element) => new mapObjectProperties_1.MapObjectProperties(element.index, element.position, element.angle, element.characterKey));
        });
    }
    loadWorldProp() {
        return __awaiter(this, void 0, void 0, function* () {
            const absolutePath = path_1.default.resolve(resourcePaths_1.ResourcePaths.world);
            if (!fs_extra_1.default.existsSync(absolutePath)) {
                this.logger.warn(`Unable to load world. Reason: cannot find '${absolutePath}' folder.`);
            }
            yield Promise.all(this.worldPaths.map((worldPath) => __awaiter(this, void 0, void 0, function* () {
                if (fs_extra_1.default.existsSync(path_1.default.join(resourcePaths_1.ResourcePaths.world, worldPath.name))) {
                    const id = yield this.redisClient.hget("worldDefines", worldPath.id);
                    if (id) {
                        const worldData = yield this.loadWorldData(path_1.default.join(resourcePaths_1.ResourcePaths.world, worldPath.name, `${worldPath.name}.wld`));
                        const regions = yield this.loadRegions(worldPath.name, worldData.revivalMapId);
                        const objects = yield this.loadWorldObjects(worldPath.name);
                        const bounds = new rectangle_1.Rectangle(0, 0, worldData.width * worldData.mpu * mapProperties_1.MapProperties.regionSize, worldData.length * worldData.mpu * mapProperties_1.MapProperties.regionSize);
                        const map = new mapProperties_1.MapProperties((0, parsing_1.tryParseInt)(id), worldPath.name, worldData.width, worldData.length, [], worldData.revivalMapId, worldData.mpu, bounds, regions, objects);
                        this.maps.push(map);
                    }
                }
            })));
            this.logger.main(`${this.maps.length} maps loaded.`);
        });
    }
}
exports.MapResources = MapResources;
