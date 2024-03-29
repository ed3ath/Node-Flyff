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
exports.DatabaseBuilder = void 0;
const lodash_1 = __importDefault(require("lodash"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const logger_1 = require("../helpers/logger");
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const builderType_1 = require("../common/builderType");
const databaseType_1 = require("../common/databaseType");
class DatabaseBuilder {
    constructor() {
        this.logger = new logger_1.Logger(builderType_1.BuilderType.DATABASE_BUILDER);
    }
    setEntitiesPath(entitiesPath) {
        this.entitiesPath = entitiesPath;
    }
    getOptionByType(options) {
        switch (options.type) {
            case databaseType_1.DatabaseType.MYSQL:
            case databaseType_1.DatabaseType.MARIADB:
                return options;
            case databaseType_1.DatabaseType.LITE:
                return options;
            case databaseType_1.DatabaseType.POSTGRES:
                return options;
            default:
                return options;
        }
    }
    addConnection(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.loadEntities();
                this.database = new typeorm_1.DataSource(Object.assign(Object.assign({}, this.getOptionByType(options.dataSource)), { entities: [...entities] }));
            }
            catch (error) {
                console.log(error);
                this.logger.error("Error adding connection:", error);
            }
        });
    }
    loadEntities() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = new Set();
            try {
                if (!fs_extra_1.default.existsSync(this.entitiesPath)) {
                    throw new Error(`Cannot find path ${this.entitiesPath}`);
                }
                const files = fs_extra_1.default.readdirSync((0, path_1.join)(this.entitiesPath));
                if (lodash_1.default.isEmpty(files))
                    return [];
                yield Promise.all(lodash_1.default.map(files, (file) => __awaiter(this, void 0, void 0, function* () {
                    if (file.endsWith(".ts") &&
                        fs_extra_1.default.existsSync((0, path_1.join)(this.entitiesPath, file))) {
                        // const module = await import();
                        entities.add((0, path_1.join)(this.entitiesPath, file));
                    }
                })));
                this.logger.main(`${entities.size} entities loaded`);
            }
            catch (error) {
                console.log(error);
                this.logger.error("Error loading models:", error);
            }
            return entities;
        });
    }
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.initialize();
                yield this.database.synchronize();
            }
            catch (e) {
                this.logger.warn(e.message);
            }
            this.logger.success(`Database successfully loaded`);
            return this.database;
        });
    }
}
exports.DatabaseBuilder = DatabaseBuilder;
