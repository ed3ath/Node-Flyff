import { Logger, SetLogger } from "../helpers/logger";

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

@SetLogger("Config")
export class ConfigLoader {
  serverName: string;
  config: any;

  constructor(serverName: string) {
    this.serverName = serverName.trim().toLowerCase().replace(/\s/g, "_");
    this.config = this.loadConfig();
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
      Logger.error(
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
