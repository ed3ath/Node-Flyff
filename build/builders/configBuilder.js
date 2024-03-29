"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigBuilder = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const js_yaml_1 = __importDefault(require("js-yaml"));
const configType_1 = require("../common/configType");
const logger_1 = require("../helpers/logger");
const builderType_1 = require("../common/builderType");
class ConfigBuilder {
    constructor() {
        this.basePath = null;
        this.getConfig = () => this.config;
        this.logger = new logger_1.Logger(builderType_1.BuilderType.CONFIG_BUILDER);
    }
    setBasePath(basePath) {
        if (!fs_extra_1.default.existsSync(basePath)) {
            this.logger.error(`Cannot find base path ${basePath}.`);
            return;
        }
        this.basePath = basePath;
    }
    build() {
        if (!this.basePath) {
            return null;
        }
        this.config = {};
        const files = fs_extra_1.default.readdirSync(this.basePath);
        files.forEach((file) => {
            const filePath = (0, path_1.join)(this.basePath, file);
            if (!fs_extra_1.default.existsSync(filePath)) {
                this.logger.error(`Cannot find ${filePath}.`);
                return null;
            }
            const configType = filePath.endsWith(".json") || filePath.endsWith(".JSON")
                ? configType_1.ConfigType.JSON
                : filePath.endsWith(".yaml") || filePath.endsWith(".yml")
                    ? configType_1.ConfigType.YAML
                    : configType_1.ConfigType.UNKNOWN;
            if (configType === configType_1.ConfigType.JSON) {
                this.config[file.split(".").shift()] = fs_extra_1.default.readJSONSync(filePath);
            }
            else {
                const configFile = fs_extra_1.default.readFileSync(filePath, "utf8");
                this.config[file.split(".").shift()] = js_yaml_1.default.load(configFile);
            }
        });
        this.logger.success("Config successfully loaded");
        return this.config;
    }
}
exports.ConfigBuilder = ConfigBuilder;
