import { DatabaseType } from "../common/databaseType";

export interface IDataSource {
    type: DatabaseType;
    database: string;
    url?: string;
    host?: string;
    port?: string;
    username?: string;
    password?: string;
  }
  
  export interface IDatabaseOptions {
    name: string;
    dataSource: IDataSource;
    entities: [];
  }
  