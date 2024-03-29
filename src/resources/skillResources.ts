import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { SkillProperties } from "../interfaces/resource";
import { tryParseInt, cleanString, tryParseFloat } from "../helpers/parsing";

export class SkillResources {
  logger: Logger;
  redisClient: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("Skill Resources");
    this.redisClient = new Redis(options);
  }

  public async get(
    skillIdentifier: string | number
  ): Promise<SkillProperties | null> {
    const skillId =
      typeof skillIdentifier === "number"
        ? skillIdentifier
        : await this.redisClient.hget("skillDefines", skillIdentifier);
    if (!_.isUndefined(skillId)) {
      return new Promise((resolve, reject) => {
        this.redisClient.hgetall(`skill:${skillId}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data ? this.parseSkillProperties(data) : null);
          }
        });
      });
    }
    return null;
  }

  public where(predicate: (skill: SkillProperties) => boolean): SkillProperties[] {
    const skills: SkillProperties[] = [];
    this.redisClient.keys("skill:*", (err, keys) => {
      if (err) {
        this.logger.error("Error retrieving keys from Redis:", err);
      } else {
        if (!_.isUndefined(keys)) {
          _.forEach(keys, (key) => {
            this.redisClient.hgetall(key, (err, data) => {
              if (err) {
                this.logger.error(
                  "Error retrieving skill data from Redis:",
                  err
                );
              } else {
                if (data) {
                  const skill = this.parseSkillProperties(data);
                  if (predicate(skill)) {
                    skills.push(skill);
                  }
                }
              }
            });
          });
        }
      }
    });
    return skills;
  }

  public async loadDefines(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.defineSkill);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load skills. Reason: cannot find '${absolutePath}' file.`
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
          await this.redisClient.hset("skillDefines", name, id);
        }
      }
    });
  }

  public async loadSkillsPropStrings(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.skillsText);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load skills. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!(await this.redisClient.exists("skillDefines"))) {
      this.logger.warn(`Unable to load skills. Reason: skill defines is empty`);
    }

    try {
      const data = fs.readFileSync(absolutePath, "utf16le");
      const lines = data.split("\n").map((i) => i.toString().trim());
      const pairs = _.chunk(lines, 2);
      _.forEach(pairs, async (pair, i) => {
        const [idName, name] = pair[0].split("\t");
        const [idDesc, desc] = pair[1].split("\t");
        await this.redisClient.hset("skillNames", idName, name);
        await this.redisClient.hset("skillDescriptions", idDesc, desc);
      });
    } catch (err) {
      this.logger.error("Error parsing skill file:", err);
    }
  }

  public async loadSkillsProp(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.skillsProp);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load skills. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!(await this.redisClient.exists("skillDefines"))) {
      this.logger.warn(`Unable to load skills. Reason: skill defines is empty`);
    }

    await this.cleanCache(); // clean cache

    const data = fs.readFileSync(absolutePath, "utf8");

    const lines = data.split("\n");
    _.forEach(lines, async (line) => {
      const skills = line.trim().split("\t");

      const id = await this.redisClient.hget("skillDefines", skills[1]);

      if (!_.isNil(id)) {
        const szName =
          (await this.redisClient.hget("skillNames", cleanString(skills[2]))) ||
          "";
        const szComment =
          (await this.redisClient.hget(
            "skillDescriptions",
            cleanString(skills[123])
          )) || "";
        // TODO skill parse properties
        const skill: SkillProperties = {
          id: tryParseInt(id),
          ver: tryParseInt(skills[0]),
          dwID: skills[1],
          szName,
          szNameId: cleanString(skills[2]),
          dwItemKind1: "",
          dwItemKind2: "",
          dwItemKind3: "",
          dwLinkKind: "",
          dwLinkKindBullet: "",
          eItemType: "",
          tmContinuousPain: 0,
          dwReqDisLV: 0,
          dwReSkill1: 0,
          dwReSkillLevel1: 0,
          dwReSkill2: 0,
          dwReSkillLevel2: 0,
          dwSkillReady: 0,
          dwSfxObj: "",
          dwSfxObj2: "",
          dwSfxObj3: "",
          dwSfxObj4: "",
          dwSfxObj5: "",
          ExpertMax: 0,
          dwSkillType: "",
          dwSpellRegion: "",
          dwSpellType: "",
          dwExeTarget: "",
          dwReferStat1: "",
          dwReferStat2: "",
          dwReferTarget1: "",
          dwReferValue1: 0,
          dwReferTarget2: "",
          dwReferValue2: 0
        };

        if (skill.id) {
          this.redisClient.hmset(`skill:${skill.id}`, skill);
        }
      }
    });

    this.logger.main(`${lines.length} skills loaded.`);
  }

  parseSkillProperties(data: { [key: string]: string }): SkillProperties {
    // TODO skill parse properties
    return {
      id: parseInt(data["id"]),
      ver: parseInt(data["ver6"]),
      dwID: data["dwID"],
      szName: data["szName"],
      szNameId: data["szNameId"],
      dwItemKind1: "",
      dwItemKind2: "",
      dwItemKind3: "",
      dwLinkKind: "",
      dwLinkKindBullet: "",
      eItemType: "",
      tmContinuousPain: 0,
      dwReqDisLV: 0,
      dwReSkill1: 0,
      dwReSkillLevel1: 0,
      dwReSkill2: 0,
      dwReSkillLevel2: 0,
      dwSkillReady: 0,
      dwSfxObj: "",
      dwSfxObj2: "",
      dwSfxObj3: "",
      dwSfxObj4: "",
      dwSfxObj5: "",
      ExpertMax: 0,
      dwSkillType: "",
      dwSpellRegion: "",
      dwSpellType: "",
      dwExeTarget: "",
      dwReferStat1: "",
      dwReferStat2: "",
      dwReferTarget1: "",
      dwReferValue1: 0,
      dwReferTarget2: "",
      dwReferValue2: 0
    };
  }

  cleanCache() {
    return new Promise<void>((resolve, reject) => {
      this.redisClient.keys("skill:*", (err, keys) => {
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
