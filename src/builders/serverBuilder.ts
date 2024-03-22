import { PacketType } from "../common/packetType";
import { ServerType } from "../common/serverType";
import { TcpServer } from "../libraries/tcpServer";
import { HandlerConstructor } from "../libraries/packetHandler";
import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";
import { Redis, RedisOptions } from "ioredis";
import { IRedisClient } from "../interfaces/redis";

export interface IServerConfig {
  host: string;
  port: number;
  buildVersion?: string;
  accountVerification?: boolean;
  passwordEncryptionKey?: string;
  maxConnection: number;
  clientBufferSize: number;
}

export class ServerBuilder {
  private logger: Logger;
  private server: TcpServer;
  private handlers: Map<PacketType, HandlerConstructor> = new Map();
  private redisClient: IRedisClient;
  serverType: ServerType;

  constructor() {}

  setServerType(type: ServerType) {
    this.logger = new Logger(BuilderType.SERVER_BUILDER);
    this.serverType = type;
  }

  addServer(server: TcpServer) {
    this.server = server;
  }

  addHandlers(handlers: Map<PacketType, HandlerConstructor>) {
    this.handlers = handlers;
  }

  addRedisClient(redisClient: IRedisClient) {
    this.redisClient = redisClient;
  }

  build(): TcpServer | null {
    if (!this.serverType) return null;
    this.server.addHandlers(this.handlers);
    this.server.addRedisClient(this.redisClient);
    this.server.start();
    return this.server;
  }
}
