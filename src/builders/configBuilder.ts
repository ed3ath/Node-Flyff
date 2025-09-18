import fs from "fs-extra";
import { join } from "path";
import yaml from "js-yaml";

import { ConfigType } from "../types/configType";
import { Logger } from "../helpers/logger";
import { BuilderType } from "../types/builderType";
import { IConfig } from "../interfaces/config";

export class ConfigBuilder {
  private logger: Logger;
  private config: IConfig;
  private basePath: string | null = null;

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

  build(): IConfig | null {
    if (!this.basePath) {
      return null;
    }
    this.config = {};
    const files = fs.readdirSync(this.basePath);

    files.forEach((file) => {
      const filePath = join(this.basePath as string, file);
      if (!fs.existsSync(filePath)) {
        this.logger.error(`Cannot find ${filePath}.`);
        return null;
      }
      const configType =
        filePath.endsWith(".json") || filePath.endsWith(".JSON")
          ? ConfigType.JSON
          : filePath.endsWith(".yaml") || filePath.endsWith(".yml")
          ? ConfigType.YAML
          : ConfigType.UNKNOWN;
      if (configType === ConfigType.JSON) {
        this.config[file.split(".").shift()!] = fs.readJSONSync(filePath);
      } else {
        const configFile = fs.readFileSync(filePath, "utf8");
        this.config[file.split(".").shift()!] = yaml.load(
          configFile
        ) as IConfig;
      }
    });

    this.logger.success("Config successfully loaded");
    return this.config;
  }

  getConfig = () => this.config;
}
