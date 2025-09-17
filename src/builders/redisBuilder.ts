import _ from "lodash";
;
import { Logger } from "../helpers/logger";
import { BuilderType } from "../common/builderType";
import { Redis, RedisOptions } from "ioredis";
import { IRedisClient } from "../interfaces/redis";
import { RedisClient } from "../libraries/redis";

export class RedisBuilder {
  private logger: Logger;
  options: RedisOptions;

  constructor() {
    this.logger = new Logger(BuilderType.REDIS_BUILDER);
  }

  setRedisOptions(options: RedisOptions): void {
    this.options = options;
  }

  build(): {
    subscriber: Redis | null;
    publisher: Redis | null;
    client: IRedisClient | null;
  } {
    if (!this.options) {
      return {
        subscriber: null,
        publisher: null,
        client: null,
      };
    }

    this.logger.success("Redis successfully loaded");
    return {
      subscriber: new Redis(this.options),
      publisher: new Redis(this.options),
      client: new RedisClient(this.options),
    };
  }
}
