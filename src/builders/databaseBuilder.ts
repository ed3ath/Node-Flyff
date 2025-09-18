import _ from "lodash";
import fs from "fs-extra";
import { Logger } from "../helpers/logger";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

import { BuilderType } from "../types/builderType";
import { IDataSource, IDatabaseOptions } from "../interfaces/database";
import { DatabaseType } from "../types/databaseType";

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

  async addMissingColumns() {
    try {
      const queryRunner = this.database.createQueryRunner();

      // Check and add jobLevel column
      try {
        await queryRunner.query(`SELECT jobLevel FROM Character LIMIT 1`);
        this.logger.main("jobLevel column already exists");
      } catch (error) {
        this.logger.main("Adding missing jobLevel column to Character table");
        await queryRunner.query(`ALTER TABLE Character ADD COLUMN jobLevel integer NOT NULL DEFAULT 0`);
        this.logger.success("jobLevel column added successfully");
      }

      // Check and add jobExperience column
      try {
        await queryRunner.query(`SELECT jobExperience FROM Character LIMIT 1`);
        this.logger.main("jobExperience column already exists");
      } catch (error) {
        this.logger.main("Adding missing jobExperience column to Character table");
        await queryRunner.query(`ALTER TABLE Character ADD COLUMN jobExperience integer NOT NULL DEFAULT 0`);
        this.logger.success("jobExperience column added successfully");
      }

      // Check and add hitPoints column
      try {
        await queryRunner.query(`SELECT hitPoints FROM Character LIMIT 1`);
        this.logger.main("hitPoints column already exists");
      } catch (error) {
        this.logger.main("Adding missing hitPoints column to Character table");
        await queryRunner.query(`ALTER TABLE Character ADD COLUMN hitPoints integer NOT NULL DEFAULT 0`);
        this.logger.success("hitPoints column added successfully");
      }


      await queryRunner.release();
    } catch (error) {
      this.logger.error("Error adding missing columns:", error);
    }
  }

  async addConnection(options: IDatabaseOptions) {
    try {
      const entities = await this.loadEntities();
      this.database = new DataSource({
        ...this.getOptionByType(options.dataSource),
        entities: [...entities] as string[],
      });
      this.logger.main(`Database connection configured for ${options.dataSource.type}`);
    } catch (error) {
      this.logger.error("Error adding connection:", error);
      throw error;
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
      this.logger.main(`${entities.size} entities loaded`);
    } catch (error) {
      console.log(error);
      this.logger.error("Error loading models:", error);
    }
    return entities;
  }

  async build() {
    try {
      if (!this.database) {
        throw new Error("Database connection not configured");
      }
      await this.database.initialize();
      // await this.database.synchronize(); // Skip synchronization to avoid table conflicts

      // Add missing columns if they don't exist
      await this.addMissingColumns();

      this.logger.success(`Database successfully loaded`);
    } catch (e) {
      this.logger.error(`Database connection failed: ${e.message}`);
      throw e;
    }
    return this.database;
  }
}
