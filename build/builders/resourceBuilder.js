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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceBuilder = void 0;
const logger_1 = require("../helpers/logger");
const builderType_1 = require("../common/builderType");
const itemResource_1 = require("../resources/itemResource");
const monsterResource_1 = require("../resources/monsterResource");
const npcResource_1 = require("../resources/npcResource");
const jobResource_1 = require("../resources/jobResource");
const expTableResource_1 = require("../resources/expTableResource");
const deathPenaltyResource_1 = require("../resources/deathPenaltyResource");
const mapResources_1 = require("../resources/mapResources");
class ResourceBuilder {
    constructor() {
        this.load = true;
        this.logger = new logger_1.Logger(builderType_1.BuilderType.RESOURCE_BUILDER);
    }
    setRedisOptions(options) {
        this.options = options;
    }
    setLoad(load) {
        this.load = load;
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options) {
                this.itemResources = new itemResource_1.ItemResources(this.options);
                this.monsterResources = new monsterResource_1.MonsterResources(this.options);
                this.npcResources = new npcResource_1.NpcResources(this.options);
                this.jobResources = new jobResource_1.JobResources(this.options);
                this.expTableResources = new expTableResource_1.ExpTableResources(this.options);
                this.deathPenaltyResource = new deathPenaltyResource_1.DeathPenaltyResources(this.options);
                this.mapResource = new mapResources_1.MapResources(this.options);
                if (this.load) {
                    yield this.itemResources.loadDefines();
                    yield this.itemResources.loadItemsPropStrings();
                    yield this.itemResources.loadItemsProp();
                    yield this.monsterResources.loadDefines();
                    yield this.monsterResources.loadMonstersPropStrings();
                    yield this.monsterResources.loadMonstersProp();
                    yield this.npcResources.loadNpcDialogs();
                    yield this.npcResources.loadNpcShops();
                    yield this.npcResources.loadNpcPropStrings();
                    yield this.npcResources.loadNpcSchoolPropStrings();
                    yield this.npcResources.loadNpcProp();
                    yield this.jobResources.loadDefines();
                    yield this.jobResources.loadJobsProp();
                    yield this.expTableResources.loadExpCharacter();
                    yield this.expTableResources.loadExpDropLuck();
                    yield this.deathPenaltyResource.loadDeathPenalty();
                    yield this.mapResource.loadDefines();
                    yield this.mapResource.loadWorldPaths();
                    yield this.mapResource.loadWorldProp();
                }
                // console.log(await this.jobResources.get("JOB_PSYCHIKEEPER_HERO"));
            }
            return {
                itemResources: this.itemResources,
                monsterResources: this.monsterResources,
                npcResources: this.npcResources,
                jobResources: this.jobResources,
                expTableResources: this.expTableResources,
                deathPenaltyResource: this.deathPenaltyResource,
                mapResource: this.mapResource,
            };
        });
    }
}
exports.ResourceBuilder = ResourceBuilder;
