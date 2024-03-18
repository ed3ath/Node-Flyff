import path from "path";
import fs from "fs-extra";
import { DataSource } from "typeorm";
import { ServerTypes } from "../common/serverTypes";
import { Logger, SetLogger } from "../helpers/logger";

@SetLogger(ServerTypes.DATABASE_SERVER)
export class Database {
  public connection?: DataSource;
  public config: any;
  public basePath: string;
  private models: Map<string, any> = new Map();

  constructor(config: any) {
    this.config = config;
  }

  async start() {
    try {
      await this.loadModels();
      this.connection = new DataSource({
        ...this.config,
        entities: [...this.models.values()],
      });
      await this.connection.initialize();
      Logger.info("Connected to database successfully");
    } catch (error) {
      Logger.error("Error connecting to database:", error);
      throw error;
    }
  }

  async loadModels(): Promise<void> {
    const modelsFolder = path.join(this.basePath, "models");

    try {
      const files = await fs.readdir(modelsFolder);

      for (const file of files) {
        if (file.endsWith(".ts")) {
          const module = await import(path.join(modelsFolder, file));
          this.models.set(module.default.name, module.default);
        }
      }
    } catch (error) {
      console.log(error); // For debugging purposes, consider removing this in production
      Logger.error("Error loading models:", error);
    }
  }

  getEntity(name: string) {
    return this.connection?.getRepository(this.models.get(name));
  }
}
