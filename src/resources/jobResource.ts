import { JobType } from "./../common/defineJob";
import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";
import yaml from "js-yaml";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { JobProperties } from "../interfaces/resource";
import { DefineJob } from "../common/defineJob";
import { tryParseInt, tryParseFloat } from "../helpers/parsing";

export class JobResources {
  logger: Logger;
  redisClient: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("Job Resources");
    this.redisClient = new Redis(options);
  }

  public async get(
    jobIdentifier: string | number
  ): Promise<JobProperties | null> {
    const jobId =
      typeof jobIdentifier === "number"
        ? jobIdentifier
        : await this.redisClient.hget("jobDefines", jobIdentifier);
    if (!_.isUndefined(jobId)) {
      return new Promise((resolve, reject) => {
        this.redisClient.hgetall(`job:${jobId}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data ? this.parseJobProperties(data) : null);
          }
        });
      });
    }
    return null;
  }

  public where(predicate: (job: JobProperties) => boolean): JobProperties[] {
    const jobs: JobProperties[] = [];
    this.redisClient.keys("job:*", (err, keys) => {
      if (err) {
        this.logger.error("Error retrieving keys from Redis:", err);
      } else {
        if (!_.isUndefined(keys)) {
          _.forEach(keys, (key) => {
            this.redisClient.hgetall(key, (err, data) => {
              if (err) {
                this.logger.error("Error retrieving job data from Redis:", err);
              } else {
                if (data) {
                  const job = this.parseJobProperties(data);
                  if (predicate(job)) {
                    jobs.push(job);
                  }
                }
              }
            });
          });
        }
      }
    });
    return jobs;
  }

  public async loadDefines(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.defineJob);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load jobs. Reason: cannot find '${absolutePath}' file.`
      );
    }

    const data = fs.readFileSync(absolutePath, "utf8");

    const lines = data.split("\n");
    _.forEach(lines, async (line) => {
      if (_.trim(line).startsWith("#define")) {
        const parts = _.trim(line).split(/\s+/);
        const id = tryParseInt(parts[2]);
        const name = parts[1];

        if (!_.isNaN(id) && name !== "") {
          await this.redisClient.hset("jobDefines", name, id);
        }
      }
    });
  }

  public async loadJobsProp(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.job);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load jobs. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!(await this.redisClient.exists("itemDefines"))) {
      this.logger.warn(`Unable to load jobs. Reason: job defines is empty`);
    }

    await this.cleanCache(); // clean cache

    const text = fs.readFileSync(absolutePath, "utf-8");
    const data = yaml.load(text) as JobProperties[];

    _.forEach(data, async (job) => {
      const formattedJob = {
        ...job,
        id: DefineJob[job.id],
        identifier: job.id
      };
      if (formattedJob.id) {
        this.redisClient.hmset(`job:${formattedJob.id}`, formattedJob);
      }
    });

    this.logger.main(`${data.length} jobs loaded.`);
  }

  parseJobProperties(data: { [key: string]: string }): JobProperties {
    return {
      id: tryParseInt(data.id),
      identifier: data.identifier,
      attackSpeed: tryParseFloat(data.attackSpeed),
      maxHpFactor: tryParseFloat(data.maxHpFactor),
      maxMpFactor: tryParseFloat(data.maxMpFactor),
      maxFpFactor: tryParseFloat(data.maxFpFactor),
      defenseFactor: tryParseFloat(data.defenseFactor),
      hpRecoveryFactor: tryParseFloat(data.hpRecoveryFactor),
      mpRecoveryFactor: tryParseFloat(data.mpRecoveryFactor),
      fpRecoveryFactor: tryParseFloat(data.fpRecoveryFactor),
      meleeSword: tryParseFloat(data.meleeSword),
      meleeAxe: tryParseFloat(data.meleeAxe),
      meleeStaff: tryParseFloat(data.meleeStaff),
      meleeStick: tryParseFloat(data.meleeStick),
      meleeKnuckle: tryParseFloat(data.meleeKnuckle),
      magicWand: tryParseFloat(data.magicWand),
      blocking: tryParseFloat(data.blocking),
      meleeYoyo: tryParseFloat(data.meleeYoyo),
      critical: tryParseFloat(data.critical),
      type: JobType[data.type],
      parent: tryParseInt(data.parent),
      minLevel: tryParseInt(data.minLevel),
      maxLevel: tryParseInt(data.maxLevel),
    };
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
