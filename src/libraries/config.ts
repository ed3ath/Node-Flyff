import { Logger } from "../helpers/logger";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export class ConfigLoader {
  private logger: Logger;
  private serverName: string;
  public config: any;

  constructor(serverName: string) {
    this.logger = new Logger("Config Loader");
    this.serverName = serverName.trim().toLowerCase().replace(/\s/g, "_");
    this.loadConfig();
    this.logger.success("Loaded configuration");
  }

  loadConfig(): void {
    const configPath = path.join(__dirname, "../configs", `${this.serverName}.yaml`);
    try {
      const configFile = fs.readFileSync(configPath, "utf8");
      this.config = yaml.load(configFile);
    } catch (err) {
      this.logger.error(`Error loading configuration for server ${this.serverName}:`, err);
    }
  }

  public getConfig(): any {
    return this.config;
  }

  public getValue(key: string): any {
    return this.config[key];
  }
}
