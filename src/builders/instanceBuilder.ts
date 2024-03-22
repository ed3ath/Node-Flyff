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

export class InstanceBuilder {
  config: IConfig | null;
  databaseBuilder: DatabaseBuilder;
  handlerBuilder: HandlerBuilder;
  serverBuilder: ServerBuilder;
  redisBuilder: RedisBuilder;

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

  async build(): Promise<IInstance> {
    // build config
    let server: TcpServer | null = null;
    let publisher: Redis | null = null;
    let subscriber: Redis | null = null;
    let client: IRedisClient | null = null;
    let databases: Map<string, DataSource> = new Map();
    let handlers: Map<PacketType, HandlerConstructor> = new Map();

    // build database
    await Promise.all(
      _.map(_.get(this.config, "database", []), async (options: any) => {
        await this.databaseBuilder.addConnection({
          name: options.name,
          dataSource: {
            type: _.get(options, "provider", "sqlite"),
            database: _.get(options, "connection-string", options.name),
            url: _.get(options, "url"),
            host: _.get(options, "host"),
            port: _.get(options, "port"),
            username: _.get(options, "username"),
            password: _.get(options, "password"),
          },
          entities: [],
        } as IDatabaseOptions);
      })
    );
    databases = await this.databaseBuilder.build();

    await this.handlerBuilder.loadHandlers();
    handlers = this.handlerBuilder.build();

    if (this.redisBuilder) {
      const redis = this.redisBuilder.build();
      publisher = redis.publisher;
      subscriber = redis.subscriber;
      client = redis.client;
    }

    if (handlers) {
      this.serverBuilder.addHandlers(handlers);
      if (client) {
        this.serverBuilder.addRedisClient(client);
      }
      server = this.serverBuilder.build();
    }
    const instance: IInstance = {
      config: this.config,
      server,
      handlers,
      publisher,
      subscriber,
      client,
      databases,
      getDatabase: (db: string) => databases.get(db),
    };

    if (server) {
      server.instance = instance;
    }
    return instance;
  }
}
