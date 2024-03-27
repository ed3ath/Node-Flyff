import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";
import yaml from "js-yaml";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { DeathPenalty, PenaltyValue } from "../interfaces/resource";
import { tryParseInt } from "../helpers/parsing";

export class DeathPenaltyResources {
  logger: Logger;
  redisClient: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("Death Penalty Resources");
    this.redisClient = new Redis(options);
  }

  public async getRevivalPenalty(
    level: string | number
  ): Promise<PenaltyValue | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`revivalPenalty:${level}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            data
              ? {
                  level: tryParseInt(data.level),
                  value: tryParseInt(data.value),
                }
              : null
          );
        }
      });
    });
  }

  public async getDecreaseExpPenalty(
    level: string | number
  ): Promise<PenaltyValue | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`decreaseExpPenalty:${level}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            data
              ? {
                  level: tryParseInt(data.level),
                  value: tryParseInt(data.value),
                }
              : null
          );
        }
      });
    });
  }

  public async getLevelDownPenalty(
    level: string | number
  ): Promise<PenaltyValue | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`levelDownPenalty:${level}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            data
              ? {
                  level: tryParseInt(data.level),
                  value: tryParseInt(data.value),
                }
              : null
          );
        }
      });
    });
  }

  public async loadDeathPenalty(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.expCharacter);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load exp character. Reason: cannot find '${absolutePath}' file.`
      );
    }

    const text = fs.readFileSync(absolutePath, "utf-8");
    const data = yaml.load(text) as DeathPenalty;

    _.forEach(data.revivalPenalty, async (penalty) => {
      this.redisClient.hmset(`revivalPenalty:${penalty.level}`, penalty);
    });
    _.forEach(data.decreaseExpPenalty, async (penalty) => {
      this.redisClient.hmset(`decreaseExpPenalty:${penalty.level}`, penalty);
    });
    _.forEach(data.levelDownPenalty, async (penalty) => {
      this.redisClient.hmset(`levelDownPenalty:${penalty.level}`, penalty);
    });
    this.logger.main("Death penalty loaded.");
  }
}
