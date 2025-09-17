import { DataSource } from "typeorm";
import _ from "lodash";

import { TcpServer } from "../libraries/tcpServer";
import { ConfigBuilder } from "./configBuilder";
import { DatabaseBuilder } from "./databaseBuilder";
import { HandlerBuilder } from "./handlerBuilder";
import { ServerBuilder } from "./serverBuilder";
import { HandlerConstructor } from "../libraries/packetHandler";
import { PacketType } from "../common/packetType";
import { sleep } from "../helpers/sleep";
import { IConfig } from "../interfaces/config";
import { RedisBuilder } from "./redisBuilder";
import { Redis } from "ioredis";
import { IInstance } from "../interfaces/instance";
import { IDatabaseOptions } from "../interfaces/database";
import { IRedisClient } from "../interfaces/redis";
import { ResourceBuilder } from "./resourceBuilder";
import { GameResources } from "../interfaces/resource";

export class InstanceBuilder {
  config: IConfig | null;
  databaseBuilder: DatabaseBuilder;
  handlerBuilder: HandlerBuilder;
  serverBuilder: ServerBuilder;
  redisBuilder: RedisBuilder;
  resourceBuilder: ResourceBuilder;

  constructor() {}

  buildConfig(_: (builder: ConfigBuilder) => void): void {
    const builder = new ConfigBuilder();
    _(builder);
    this.config = builder.build();
  }

  buildDatabase(_: (builder: DatabaseBuilder) => void): void {
    const builder = new DatabaseBuilder();
    _(builder);
    this.databaseBuilder = builder;
  }

  buildHandlers(_: (builder: HandlerBuilder) => void): void {
    const builder = new HandlerBuilder();
    _(builder);
    this.handlerBuilder = builder;
  }

  buildServer(_: (builder: ServerBuilder) => void): void {
    const builder = new ServerBuilder();
    _(builder);
    this.serverBuilder = builder;
  }

  buildRedis(_: (builder: RedisBuilder) => void): void {
    const builder = new RedisBuilder();
    _(builder);
    this.redisBuilder = builder;
  }

  buildResource(_: (builder: ResourceBuilder) => void): void {
    const builder = new ResourceBuilder();
    _(builder);
    this.resourceBuilder = builder;
  }

  async build(): Promise<IInstance> {
    // build config
    let server: TcpServer | null = null;
    let publisher: Redis | null = null;
    let subscriber: Redis | null = null;
    let client: IRedisClient | null = null;
    let database: DataSource | null = null;
    let handlers: Map<PacketType, HandlerConstructor> = new Map();
    let gameResources: GameResources | null = null;

    // build database
    let dbConfig: any = null;
    if (this.serverBuilder?.serverType) {
      switch (this.serverBuilder.serverType) {
        case "LoginServer":
          dbConfig = this.config?.login_server?.database;
          break;
        case "ClusterServer":
          dbConfig = this.config?.cluster_server?.database;
          break;
        case "WorldServer":
          dbConfig = this.config?.world_server?.database;
          break;
      }
    } else {
      dbConfig = this.config?.database;
    }

    if (dbConfig && this.databaseBuilder) {
      await this.databaseBuilder.addConnection({
        name: "default",
        dataSource: {
          type: (dbConfig as any).provider || (dbConfig as any).type,
          database: (dbConfig as any)["connection-string"] || (dbConfig as any).database,
          url: (dbConfig as any).url,
          host: (dbConfig as any).host,
          port: (dbConfig as any).port,
          username: (dbConfig as any).username,
          password: (dbConfig as any).password,
        },
        entities: [],
      } as IDatabaseOptions);
      database = await this.databaseBuilder.build();
    }

    await this.handlerBuilder.loadHandlers();
    handlers = this.handlerBuilder.build();

    if (this.redisBuilder) {
      const redis = this.redisBuilder.build();
      publisher = redis.publisher;
      subscriber = redis.subscriber;
      client = redis.client;
    }

    if (this.resourceBuilder) {
      gameResources = await this.resourceBuilder.build();
    }

    if (this.serverBuilder && handlers) {
      this.serverBuilder.addHandlers(handlers);
      if (client) {
        this.serverBuilder.addRedisClient(client);
      }
      this.serverBuilder.setConfig(this.config as IConfig);
      server = this.serverBuilder.build();
    }

    const instance: IInstance = {
      config: this.config,
      server,
      handlers,
      publisher,
      subscriber,
      client,
      database,
      gameResources,
      getEntity: (entityName: string) => {
        return database?.getRepository(entityName);
      },
    };

    if (server) {
      server.instance = instance;
    }
    return instance;
  }
}
