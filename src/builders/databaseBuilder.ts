import _ from "lodash";
import fs from "fs-extra";
import { Logger } from "../helpers/logger";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { BuilderType } from "../common/builderType";
import { IDataSource, IDatabaseOptions } from "../interfaces/database";
import { DatabaseType } from "../common/databaseType";

export class DatabaseBuilder {
  private logger: Logger;
  private entitiesPath: string;
  private database: DataSource;

  constructor() {
    this.logger = new Logger(BuilderType.DATABASE_BUILDER);
  }

  setEntitiesPath(entitiesPath: string) {
    this.entitiesPath = entitiesPath;
  }

  getOptionByType(options: IDataSource) {
    switch (options.type) {
      case DatabaseType.MYSQL:
      case DatabaseType.MARIADB:
        return options as MysqlConnectionOptions;
      case DatabaseType.LITE:
        return options as SqliteConnectionOptions;
      case DatabaseType.POSTGRES:
        return options as PostgresConnectionOptions;
      default:
        return options as DataSourceOptions;
    }
  }

  async addConnection(options: IDatabaseOptions) {
    try {
      const entities = await this.loadEntities();
      this.database = new DataSource({
        ...this.getOptionByType(options.dataSource),
        entities: [...entities] as string[],
      });
    } catch (error) {
      console.log(error);
      this.logger.error("Error adding connection:", error);
    }
  }

  async loadEntities() {
    const entities = new Set();
    try {
      if (!fs.existsSync(this.entitiesPath)) {
        throw new Error(`Cannot find path ${this.entitiesPath}`);
      }
      const files = fs.readdirSync(join(this.entitiesPath));
      if (_.isEmpty(files)) return [];
      await Promise.all(
        _.map(files, async (file: string) => {
          if (
            file.endsWith(".ts") &&
            fs.existsSync(join(this.entitiesPath, file))
          ) {
            // const module = await import();
            entities.add(join(this.entitiesPath, file));
          }
        })
      );
      this.logger.success(`Loaded ${entities.size} entities`);
    } catch (error) {
      console.log(error);
      this.logger.error("Error loading models:", error);
    }
    return entities;
  }

  async build() {
    try {
      await this.database.initialize();
      await this.database.synchronize();
    } catch (e) {
      this.logger.warn(e.message);
    }
    this.logger.success(`Database successfully loaded`);
    return this.database;
  }
}
