import { Logger } from "../helpers/logger";

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export class ConfigLoader {
  logger: Logger
  serverName: string;
  config: any;

  constructor(serverName: string) {
    this.logger = new Logger("Config Loader")
    this.serverName = serverName.trim().toLowerCase().replace(/\s/g, "_");
    this.config = this.loadConfig();
    this.logger.success("Loaded configuration");
  }

  loadConfig() {
    const configPath = path.join(
      __dirname,
      "../configs",
      `${this.serverName}.yaml`
    );
    try {
      const configFile = fs.readFileSync(configPath, "utf8");
      return yaml.load(configFile);
    } catch (err) {
      this.logger.error(
        `Error loading configuration for server ${this.serverName}:`,
        err
      );
    }
  }

  getConfig() {
    return this.config;
  }

  getValue(key: string) {
    return this.config[key];
  }
}
