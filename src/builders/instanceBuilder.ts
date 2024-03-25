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
    if (this.config?.database) {
      await this.databaseBuilder.addConnection({
        dataSource: {
          type: _.get(this.config?.database, "provider"),
          database: _.get(this.config?.database, "connection-string"),
          url: _.get(this.config?.database, "url"),
          host: _.get(this.config?.database, "host"),
          port: _.get(this.config?.database, "port"),
          username: _.get(this.config?.database, "username"),
          password: _.get(this.config?.database, "password"),
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
