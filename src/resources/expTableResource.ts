import { JobType } from "./../common/defineJob";
import fs from "fs-extra";
import path from "path";
import _, { chain } from "lodash";
import Redis, { RedisOptions } from "ioredis";
import yaml from "js-yaml";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { CharacterExp, DropLuck } from "../interfaces/resource";
import { DefineJob } from "../common/defineJob";

export class ExpTableResources {
  logger: Logger;
  redisClient: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("ExpTable Resources");
    this.redisClient = new Redis(options);
  }

  public async getExpCharacter(level: string | number): Promise<CharacterExp | null> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`expCharacter:${level}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(
            data
              ? {
                  level: this.tryParseInt(data.level),
                  exp: this.tryParseFloat(data.level),
                  pxp: this.tryParseFloat(data.level),
                  gp: this.tryParseFloat(data.level),
                  limitExp: this.tryParseFloat(data.level),
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
                  chance: JSON.parse(data.chance)
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

  tryParseInt(value: string) {
    try {
      return !_.isNaN(parseInt(value)) ? parseInt(value) : 0;
    } catch {
      return 0;
    }
  }

  tryParseFloat(value: string) {
    try {
      return !_.isNaN(parseFloat(value)) ? parseFloat(value) : 0;
    } catch {
      return 0;
    }
  }

  cleanString(value: string) {
    return value === "=" ? "" : value;
  }

  cleanCache() {
    return new Promise<void>((resolve, reject) => {
      this.redisClient.keys("job:*", (err, keys) => {
        if (err) {
          reject(err);
        } else {
          if (keys) {
            if (keys.length === 0) {
              resolve();
            } else {
              this.redisClient.del(...keys, (delErr, reply) => {
                if (delErr) {
                  reject(delErr);
                } else {
                  resolve();
                }
              });
            }
          }
        }
      });
    });
  }
}
