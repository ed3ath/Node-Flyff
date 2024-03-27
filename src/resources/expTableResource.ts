import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";
import yaml from "js-yaml";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { CharacterExp, DropLuck } from "../interfaces/resource";
import { tryParseInt, tryParseFloat } from "../helpers/parsing";

export class ExpTableResources {
  logger: Logger;
  redisClient: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("ExpTable Resources");
    this.redisClient = new Redis(options);
  }

  public async getExpCharacter(
    level: string | number
  ): Promise<CharacterExp | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`expCharacter:${level}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            data
              ? {
                  level: tryParseInt(data.level),
                  exp: tryParseFloat(data.level),
                  pxp: tryParseFloat(data.level),
                  gp: tryParseFloat(data.level),
                  limitExp: tryParseFloat(data.level),
                }
              : null
          );
        }
      });
    });
  }

  public async getDropLuck(level: string | number): Promise<DropLuck | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`expDropLuck:${level}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            data
              ? {
                  level: parseInt(data.level),
                  chance: JSON.parse(data.chance),
                }
              : null
          );
        }
      });
    });
  }

  public async loadExpCharacter(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.expCharacter);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load exp character. Reason: cannot find '${absolutePath}' file.`
      );
    }

    const text = fs.readFileSync(absolutePath, "utf-8");
    const data = yaml.load(text) as CharacterExp[];

    _.forEach(data, async (exp) => {
      this.redisClient.hmset(`expCharacter:${exp.level}`, exp);
    });
    this.logger.main(`${data.length} exp character loaded.`);
  }

  public async loadExpDropLuck(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.expDropLuck);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load exp drop luck. Reason: cannot find '${absolutePath}' file.`
      );
    }

    const text = fs.readFileSync(absolutePath, "utf-8");
    const data = yaml.load(text) as DropLuck[];

    _.forEach(data, async (dropLuck) => {
      this.redisClient.hmset(`expDropLuck:${dropLuck.level}`, {
        level: dropLuck.level,
        chance: JSON.stringify(dropLuck.chance),
      });
    });
    this.logger.main(`${data.length} exp drop luck loaded.`);
  }
}
