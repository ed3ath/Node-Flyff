import fs from "fs-extra";
import { join } from "path";
import yaml from "js-yaml";

import { ConfigType } from "../common/configType";
import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";

export interface IConfig {
  [key: string]: any;
}

export class ConfigBuilder {
  private logger: Logger;
  private config: IConfig | null = null;
  private basePath: string | null = null;
  private configFile: string | null = null;
  private configType: ConfigType | null = null;

  constructor() {
    this.logger = new Logger(BuilderType.CONFIG_BUILDER);
  }

  setBasePath(basePath: string): void {
    if (!fs.existsSync(basePath)) {
      this.logger.error(`Cannot find base path ${basePath}.`);
      return;
    }
    this.basePath = basePath;
  }

  setConfigFile(filePath: string): void {
    if (!this.basePath) {
      this.logger.error(`Cannot find base path ${this.basePath}.`);
      return;
    }
    if (!fs.existsSync(join(String(this.basePath), filePath))) {
      this.logger.error(`Cannot find file ${filePath}.`);
      return;
    }
    this.configFile = filePath;
    this.configType =
      filePath.endsWith(".json") || filePath.endsWith(".JSON")
        ? ConfigType.JSON
        : filePath.endsWith(".yaml") || filePath.endsWith(".yml")
        ? ConfigType.YAML
        : ConfigType.UNKNOWN;
  }

  build(): void {
    if (
      !this.basePath ||
      !this.configFile ||
      this.configType === ConfigType.UNKNOWN
    ) {
      return;
    }
    const configPath = join(this.basePath, this.configFile);
    if (!fs.existsSync(configPath)) {
      this.logger.error(`Cannot find ${configPath}.`);
      return;
    }
    if (this.configType === ConfigType.JSON) {
      this.config = fs.readJSONSync(configPath);
    } else {
      const configFile = fs.readFileSync(configPath, "utf8");
      this.config = yaml.load(configFile) as IConfig;
    }
    this.logger.success("Config successfully loaded");
  }

  getValue(key: string): any {
    return this.config ? this.config[key] : null;
  }

  getValues() {
    return this.config;
  }
}
