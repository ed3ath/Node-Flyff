import { DataSource } from "typeorm";

import { TcpServer } from "../libraries/tcpServer";
import { ConfigBuilder, IConfig } from "./configBuilder";
import { DatabaseBuilder } from "./databaseBuilder";
import { HandlerBuilder } from "./handlerBuilder";
import { ServerBuilder } from "./serverBuilder";
import { HandlerConstructor } from "../libraries/packetHandler";
import { PacketType } from "../common/packetType";
import { sleep } from "../helpers/sleep";

export class InstanceBuilder {
  private config: IConfig | null;
  private server: TcpServer;
  private databases: Map<string, DataSource> = new Map();
  private serverHandlers: Map<PacketType, HandlerConstructor> = new Map();
  private clientHandlers: Map<PacketType, HandlerConstructor> = new Map();

  constructor() {}

  buildConfig(_: (builder: ConfigBuilder) => void): void {
    const builder = new ConfigBuilder();
    _(builder);
    builder.build();
    this.config = builder.getValues();
  }

  async buildDatabase(_: (builder: DatabaseBuilder) => void): Promise<void> {
    const builder = new DatabaseBuilder();
    _(builder);
    this.databases = builder.getDatabase();
  }

  async buildHandlers(_: (builder: HandlerBuilder) => void): Promise<void> {
    const builder = new HandlerBuilder();
    _(builder);
    builder.build();
    if(builder.type === 'server') {
      this.serverHandlers = builder.getHandlers();
    } else {
      this.clientHandlers = builder.getHandlers();
    }
  }

  async buildServer(_: (builder: ServerBuilder) => void): Promise<void> {
    const builder = new ServerBuilder();
    _(builder);
    await sleep(3000); // sleep for 3 seconds (temp solution)
    builder.build()
    this.server = builder.getServer();
  }

  getConfig = () => this.config;

  getServer = () => this.server;

  getDatabases = () => this.databases;

  getDatabase = (name: string) => this.databases.get(name);

  getServerHandlers = () => this.serverHandlers;

  getClientHandlers = () => this.clientHandlers

  getInstance = () => ({
    config: this.config,
    server: this.server,
    databases: this.databases,
    serverHandlers: this.serverHandlers,
    clientHandlers: this.clientHandlers,
    getDatabase: this.getDatabase
  });
}
