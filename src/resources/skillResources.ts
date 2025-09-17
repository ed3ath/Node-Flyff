import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { SkillLevelProperties, SkillProperties } from "../interfaces/resource";
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

  public async getLevel(
    skillLevelIdentifier: string | number
  ): Promise<SkillLevelProperties | null> {
    const skillLevelId =
      typeof skillLevelIdentifier === "number"
        ? skillLevelIdentifier
        : await this.redisClient.hget("skillDefines", skillLevelIdentifier);
    if (!_.isUndefined(skillLevelId)) {
      return new Promise((resolve, reject) => {
        this.redisClient.hgetall(`skillLevel:${skillLevelId}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data ? this.parseSkillLevelProperties(data) : null);
          }
        });
      });
    }
    return null;
  }

  public where(
    predicate: (skill: SkillProperties) => boolean
  ): SkillProperties[] {
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

  public whereLevel(
    predicate: (skill: SkillLevelProperties) => boolean
  ): SkillLevelProperties[] {
    const skills: SkillLevelProperties[] = [];
    this.redisClient.keys("skillLevel:*", (err, keys) => {
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
                  const skill = this.parseSkillLevelProperties(data);
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
    this.logger.info(`Loading skill defines from: ${absolutePath}`);

    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load skills. Reason: cannot find '${absolutePath}' file.`
      );
      return;
    }

    this.logger.info(`Found skill defines file, reading contents...`);
    const data = fs.readFileSync(absolutePath, "utf8");
    const lines = data.split("\n");
    this.logger.info(`Processing ${lines.length} lines from skill defines file`);

    let defineCount = 0;
    _.forEach(lines, async (line) => {
      if (_.trim(line).startsWith("#define")) {
        const parts = _.trim(line).split(/\s+/);
        const id = tryParseInt(parts[2]);
        const name = parts[1];

        this.logger.info(`Processing define: ${line.trim()}`);
        this.logger.info(`Parts: [${parts.join(', ')}], id: ${id}, name: ${name}`);

        if (!_.isNaN(id) && name !== "") {
          await this.redisClient.hset("skillDefines", name, id);
          defineCount++;
          this.logger.info(`Added define: ${name} = ${id}`);
        } else {
          this.logger.warn(`Skipped invalid define: id=${id}, name='${name}'`);
        }
      }
    });

    this.logger.main(`Loaded ${defineCount} skill defines into Redis`);
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

  public async loadSkillAddProp(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.skillsProp);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load skill add. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!(await this.redisClient.exists("skillDefines"))) {
      this.logger.warn(
        `Unable to load skill add. Reason: skill defines is empty`
      );
    }

    const data = fs.readFileSync(absolutePath, "utf8");

    const lines = data.split("\n");
    _.forEach(lines, async (line) => {
      const parts = line.trim().split(",");

      const id = await this.redisClient.hget("skillDefines", parts[1]);

      if (!_.isNil(id)) {
        const dwName =
          (await this.redisClient.hget("skillNames", cleanString(parts[1]))) ||
          "";

        const skillLevel: SkillLevelProperties = {
          id: tryParseInt(id),
          dwID: cleanString(parts[0]),
          dwName,
          dwNameId: cleanString(parts[1]),
          dwSkillLvl: tryParseInt(parts[2]),
          dwAbilityMin: tryParseInt(parts[3]),
          dwAtkAbilityMax: tryParseInt(parts[4]),
          dwAbilityMinPVP: tryParseInt(parts[5]),
          dwAbilityMaxPVP: tryParseInt(parts[6]),
          dwAttackSpeed: tryParseInt(parts[7]),
          dwDmgShift: cleanString(parts[8]) === "TRUE",
          nProbability: tryParseInt(parts[9]),
          nProbabilityPVP: tryParseInt(parts[10]),
          dwTaunt: tryParseInt(parts[11]),
          dwDestParam1: cleanString(parts[12]),
          nAdjParamVal1: tryParseInt(parts[14]),
          dwDestParam2: cleanString(parts[13]),
          nAdjParamVal2: tryParseInt(parts[15]),
          dwReqMp: tryParseInt(parts[24]),
          dwRepFp: tryParseInt(parts[25]),
          dwCooldown: tryParseInt(parts[26]),
          dwCastingTime: tryParseInt(parts[27]),
          dwSkillRange: tryParseInt(parts[28]),
          dwCircleTime: tryParseInt(parts[29]),
          dwPainTime: tryParseInt(parts[30]),
          dwSkillTime: tryParseInt(parts[31]),
          dwSkillCount: tryParseInt(parts[33]),
          dwSkillExp: tryParseInt(parts[35]),
          dwExp: tryParseInt(parts[36]),
          dwComboSkillTime: tryParseInt(parts[38]),
        };

        if (skillLevel.id) {
          this.redisClient.hmset(`skillLevel:${skillLevel.id}`, skillLevel);
        }
      }
    });

    this.logger.main(`${lines.length} skills loaded.`);
  }
public async loadSkillsProp(): Promise<void> {
  const absolutePath = path.resolve(ResourcePaths.skillsProp);
  this.logger.info(`Loading skills from: ${absolutePath}`);

  if (!fs.existsSync(absolutePath)) {
    this.logger.warn(
      `Unable to load skills. Reason: cannot find '${absolutePath}' file.`
    );
    return;
  }

  if (!(await this.redisClient.exists("skillDefines"))) {
    this.logger.warn(`Unable to load skills. Reason: skill defines is empty`);
    return;
  }

  await this.cleanCache(); // clean cache
  this.logger.info("Cache cleaned, loading skill data...");

  const data = fs.readFileSync(absolutePath, "utf16le");
  const lines = data.split("\n");
  this.logger.info(`Processing ${lines.length} lines from skills file`);

  let loadedCount = 0;
  for (const line of lines) {
    if (!line.trim()) continue; // Skip empty lines

    const skills = line.trim().split("\t");
    this.logger.info(`Processing line with ${skills.length} columns`);

    if (skills.length < 2) {
      this.logger.warn(`Skipping invalid line: insufficient columns`);
      continue;
    }

    const id = await this.redisClient.hget("skillDefines", skills[1]);
    this.logger.info(`Looking up skill ID for '${skills[1]}': ${id}`);

    if (!_.isNil(id)) {
      const szName =
        (await this.redisClient.hget("skillNames", cleanString(skills[2]))) ||
        "";
      this.logger.info(`Skill name: '${szName}'`);

      const szComment =
        (await this.redisClient.hget(
          "skillDescriptions",
          cleanString(skills[123])
        )) || "";

      const skillLevels = this.whereLevel((skill) => skill.dwName === szName);
      this.logger.info(`Found ${skillLevels.length} skill levels for '${szName}'`);

      // TODO skill parse properties
      const skill: SkillProperties = {
        id: tryParseInt(id),
        ver: tryParseInt(skills[0]),
        dwID: skills[1],
        szName,
        szNameId: cleanString(skills[2]),
        dwItemKind1: cleanString(skills[5]),
        dwItemKind2: cleanString(skills[6]),
        dwItemKind3: cleanString(skills[7]),
        dwLinkKind: cleanString(skills[29]),
        dwLinkKindBullet: cleanString(skills[28]),
        eItemType: cleanString(skills[32]),
        tmContinuousPain: tryParseInt(skills[44]),
        dwReqDisLV: tryParseInt(skills[70]),
        dwReSkill1: tryParseInt(skills[71]),
        dwReSkillLevel1: tryParseInt(skills[72]),
        dwReSkill2: tryParseInt(skills[73]),
        dwReSkillLevel2: tryParseInt(skills[74]),
        dwSkillReady: tryParseInt(skills[75]),
        dwSfxObj: cleanString(skills[79]),
        dwSfxObj2: cleanString(skills[80]),
        dwSfxObj3: cleanString(skills[81]),
        dwSfxObj4: cleanString(skills[82]),
        dwSfxObj5: cleanString(skills[83]),
        ExpertMax: tryParseInt(skills[105]),
        dwSkillType: cleanString(skills[97]),
        dwSpellRegion: cleanString(skills[89]),
        dwSpellType: cleanString(skills[90]),
        dwExeTarget: cleanString(skills[87]),
        dwReferStat1: cleanString(skills[91]),
        dwReferStat2: cleanString(skills[92]),
        dwReferTarget1: cleanString(skills[93]),
        dwReferValue1: tryParseInt(skills[95]),
        dwReferTarget2: cleanString(skills[94]),
        dwReferValue2: tryParseInt(skills[96]),
        szComment,
        skillLevels,
      };

      if (skill.skillLevels) {
        for (const skillLevel of Object.values(skill.skillLevels)) {
          if (skillLevel.dwCooldown <= 0) {
            skillLevel.dwCooldown = skill.dwSkillReady;
          }
        }
      }

      if (skill.id) {
        this.logger.info(`Storing skill ${skill.id} (${skill.szName}) in Redis`);
        await this.redisClient.hmset(`skill:${skill.id}`, skill);
        loadedCount++;
      } else {
        this.logger.warn(`Skipping skill with invalid ID: ${skill.id}`);
      }
    } else {
      this.logger.warn(`No define found for skill: '${skills[1]}'`);
    }
  }

  this.logger.main(`${loadedCount} skills loaded successfully.`);
}

  parseSkillProperties(data: { [key: string]: string }): SkillProperties {
    // TODO skill parse properties
    return {
      id: tryParseInt(data["id"]),
      ver: tryParseInt(data["ver6"]),
      dwID: data["dwID"],
      szName: data["szName"],
      szNameId: data["szNameId"],
      dwItemKind1: data["dwItemKind1"],
      dwItemKind2: data["dwItemKind2"],
      dwItemKind3: data["dwItemKind3"],
      dwLinkKind: data["dwLinkKind"],
      dwLinkKindBullet: data["dwLinkKindBullet"],
      eItemType: data["eItemType"],
      tmContinuousPain: tryParseInt(data["tmContinuousPain"]),
      dwReqDisLV: tryParseInt(data["dwReqDisLV"]),
      dwReSkill1: tryParseInt(data["dwReSkill1"]),
      dwReSkillLevel1: tryParseInt(data["dwReSkillLevel1"]),
      dwReSkill2: tryParseInt(data["dwReSkill2"]),
      dwReSkillLevel2: tryParseInt(data["dwReSkillLevel2"]),
      dwSkillReady: tryParseInt(data["dwSkillReady"]),
      dwSfxObj: data["dwSfxObj"],
      dwSfxObj2: data["dwSfxObj2"],
      dwSfxObj3: data["dwSfxObj3"],
      dwSfxObj4: data["dwSfxObj4"],
      dwSfxObj5: data["dwSfxObj5"],
      ExpertMax: tryParseInt(data["ExpertMax"]),
      dwSkillType: data["dwSkillType"],
      dwSpellRegion: data["dwSpellRegion"],
      dwSpellType: data["dwSpellType"],
      dwExeTarget: data["dwExeTarget"],
      dwReferStat1: data["dwReferStat1"],
      dwReferStat2: data["dwReferStat2"],
      dwReferTarget1: data["dwReferTarget1"],
      dwReferValue1: tryParseInt(data["dwReferValue1"]),
      dwReferTarget2: data["dwReferTarget2"],
      dwReferValue2: tryParseInt(data["dwReferValue2"]),
      szComment: data["szComment"],
    };
  }

  parseSkillLevelProperties(data: {
    [key: string]: string;
  }): SkillLevelProperties {
    return {
      id: tryParseInt(data["id"]),
      dwID: data["dwID"],
      dwName: data["dwName"],
      dwNameId: data["dwNameId"],
      dwSkillLvl: tryParseInt(data["dwSkillLvl"]),
      dwAbilityMin: tryParseInt(data["dwAbilityMin"]),
      dwAtkAbilityMax: tryParseInt(data["dwAtkAbilityMax"]),
      dwAbilityMinPVP: tryParseInt(data["dwAbilityMinPVP"]),
      dwAbilityMaxPVP: tryParseInt(data["dwAbilityMaxPVP"]),
      dwAttackSpeed: tryParseInt(data["dwAttackSpeed"]),
      dwDmgShift: data["dwDmgShift"] === "true",
      nProbability: tryParseInt(data["nProbability"]),
      nProbabilityPVP: tryParseInt(data["nProbabilityPVP"]),
      dwTaunt: tryParseInt(data["dwTaunt"]),
      dwDestParam1: data["dwDestParam1"],
      nAdjParamVal1: tryParseInt(data["nAdjParamVal1"]),
      dwDestParam2: data["dwDestParam2"],
      nAdjParamVal2: tryParseInt(data["nAdjParamVal2"]),
      dwReqMp: tryParseInt(data["dwReqMp"]),
      dwRepFp: tryParseInt(data["dwRepFp"]),
      dwCooldown: tryParseInt(data["dwCooldown"]),
      dwCastingTime: tryParseInt(data["dwCastingTime"]),
      dwSkillRange: tryParseInt(data["dwSkillRange"]),
      dwCircleTime: tryParseInt(data["dwCircleTime"]),
      dwPainTime: tryParseInt(data["dwPainTime"]),
      dwSkillTime: tryParseInt(data["dwSkillTime"]),
      dwSkillCount: tryParseInt(data["dwSkillCount"]),
      dwSkillExp: tryParseInt(data["dwSkillExp"]),
      dwExp: tryParseInt(data["dwExp"]),
      dwComboSkillTime: tryParseInt(data["dwComboSkillTime"]),
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
