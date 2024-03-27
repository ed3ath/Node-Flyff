import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import { Logger } from "../helpers/logger";
import Redis, { RedisOptions } from "ioredis";
import { ResourcePaths } from "./resourcePaths";
import { MonsterProperties } from "../interfaces/resource";
import { tryParseInt, cleanString, tryParseFloat } from "../helpers/parsing";

export class MonsterResources {
  logger: Logger;
  redisClient: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("Monster Resources");
    this.redisClient = new Redis(options);
  }

  public async get(
    monsterIdentifier: string | number
  ): Promise<MonsterProperties | null> {
    const monsterId =
      typeof monsterIdentifier === "number"
        ? monsterIdentifier
        : await this.redisClient.hget("objectDefines", monsterIdentifier);
    if (!_.isUndefined(monsterId)) {
      return new Promise((resolve, reject) => {
        this.redisClient.hgetall(`monster:${monsterId}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data ? this.parseMonsterProperties(data) : null);
          }
        });
      });
    }
    return null;
  }

  public where(
    predicate: (monster: MonsterProperties) => boolean
  ): MonsterProperties[] {
    const monsters: MonsterProperties[] = [];
    this.redisClient.keys("monster:*", (err, keys) => {
      if (err) {
        this.logger.error("Error retrieving keys from Redis:", err);
      } else {
        if (!_.isUndefined(keys)) {
          _.forEach(keys, (key) => {
            this.redisClient.hgetall(key, (err, data) => {
              if (err) {
                this.logger.error(
                  "Error retrieving monster data from Redis:",
                  err
                );
              } else {
                if (data) {
                  const monster = this.parseMonsterProperties(data);
                  if (predicate(monster)) {
                    monsters.push(monster);
                  }
                }
              }
            });
          });
        }
      }
    });
    return monsters;
  }

  public async loadDefines(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.defineObject);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load monsters. Reason: cannot find '${absolutePath}' file.`
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
          await this.redisClient.hset("objectDefines", name, id);
        }
      }
    });
  }

  public async loadMonstersPropStrings(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.moversText);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load monsters. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!(await this.redisClient.exists("objectDefines"))) {
      this.logger.warn(
        `Unable to load monsters. Reason: monster defines is empty`
      );
    }

    try {
      const data = fs.readFileSync(absolutePath, "utf16le");
      const lines = data.split("\n").map((i) => i.toString().trim());
      const pairs = _.chunk(lines, 2);
      _.forEach(pairs, async (pair, i) => {
        const [idName, name] = pair[0].split("\t");
        const [idDesc, desc] = pair[1].split("\t");
        await this.redisClient.hset("monsterNames", idName, name);
        await this.redisClient.hset("monsterDescriptions", idDesc, desc);
      });
    } catch (err) {
      this.logger.error("Error parsing monster file:", err);
    }
  }

  public async loadMonstersProp(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.moversProp);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load monsters. Reason: cannot find '${absolutePath}' file.`
      );
      return;
    }
    if (!(await this.redisClient.exists("objectDefines"))) {
      this.logger.warn(
        `Unable to load monsters. Reason: monster defines is empty`
      );
      return;
    }

    await this.cleanCache(); // clean cache

    const data = fs.readFileSync(absolutePath, "utf8");

    const lines = data.split("\n");
    _.forEach(lines, async (line) => {
      const monsterData = line.trim().split("\t");

      const id = await this.redisClient.hget("objectDefines", monsterData[0]);

      if (!_.isNil(id)) {
        const monster: MonsterProperties = {
          id: parseInt(id),
          dwID: monsterData[0],
          szName: cleanString(monsterData[1]),
          dwAI: cleanString(monsterData[2]),
          dwStr: tryParseInt(monsterData[3]),
          dwSta: tryParseInt(monsterData[4]),
          dwDex: tryParseInt(monsterData[5]),
          dwInt: tryParseInt(monsterData[6]),
          dwHR: tryParseInt(monsterData[7]),
          dwER: tryParseInt(monsterData[8]),
          dwRace: cleanString(monsterData[9]),
          dwBelligerence: cleanString(monsterData[10]),
          dwGender: cleanString(monsterData[11]),
          dwLevel: tryParseInt(monsterData[12]),
          dwFlightLevel: tryParseInt(monsterData[13]),
          dwSize: tryParseInt(monsterData[14]),
          dwClass: tryParseInt(monsterData[15]),
          bIfPart: cleanString(monsterData[16]),
          dwKarma: cleanString(monsterData[17]),
          dwUseable: cleanString(monsterData[18]),
          dwActionRadius: tryParseInt(monsterData[19]),
          dwAtkMin: tryParseInt(monsterData[20]),
          dwAtkMax: tryParseInt(monsterData[21]),
          dwAtk1: tryParseInt(monsterData[22]),
          dwAtk2: tryParseInt(monsterData[23]),
          dwAtk3: tryParseInt(monsterData[24]),
          dwHorizontalRate: tryParseInt(monsterData[25]),
          dwVerticalRate: tryParseInt(monsterData[26]),
          dwDiagonalRate: tryParseInt(monsterData[27]),
          dwThrustRate: tryParseInt(monsterData[28]),
          dwChestRate: tryParseInt(monsterData[29]),
          dwHeadRate: tryParseInt(monsterData[30]),
          dwArmRate: tryParseInt(monsterData[31]),
          dwLegRate: tryParseInt(monsterData[32]),
          dwAttackSpeed: tryParseInt(monsterData[33]),
          dwReAttackDelay: tryParseInt(monsterData[34]),
          dwAddHp: tryParseInt(monsterData[35]),
          dwAddMp: tryParseInt(monsterData[36]),
          dwNaturealArmor: tryParseInt(monsterData[37]),
          nAbrasion: tryParseInt(monsterData[38]),
          nHardness: tryParseInt(monsterData[39]),
          dwAdjAtkDelay: tryParseInt(monsterData[40]),
          eElementType: cleanString(monsterData[41]),
          wElementAtk: tryParseInt(monsterData[42]),
          dwHideLevel: tryParseInt(monsterData[43]),
          fSpeed: tryParseFloat(monsterData[44]),
          dwShelter: tryParseInt(monsterData[45]),
          bFlying: cleanString(monsterData[46]),
          dwJumpIng: tryParseInt(monsterData[47]),
          dwAirJump: tryParseInt(monsterData[48]),
          bTaming: cleanString(monsterData[49]),
          dwResisMagic: tryParseInt(monsterData[50]),
          fResistElecricity: tryParseFloat(monsterData[51]),
          fResistFire: tryParseFloat(monsterData[52]),
          fResistWind: tryParseFloat(monsterData[53]),
          fResistWater: tryParseFloat(monsterData[54]),
          fResistEarth: tryParseFloat(monsterData[55]),
          dwCash: tryParseInt(monsterData[56]),
          dwSourceMaterial: tryParseInt(monsterData[57]),
          dwMaterialAmount: tryParseInt(monsterData[58]),
          dwCohesion: tryParseInt(monsterData[59]),
          dwHoldingTime: tryParseInt(monsterData[60]),
          dwCorrectionValue: tryParseInt(monsterData[61]),
          dwExpValue: tryParseInt(monsterData[62]),
          nFxpValue: tryParseInt(monsterData[63]),
          nBodyState: tryParseInt(monsterData[64]),
          dwAddAbility: tryParseInt(monsterData[65]),
          bKillable: cleanString(monsterData[66]),
          dwVirtItem1: cleanString(monsterData[67]),
          dwVirtType1: cleanString(monsterData[68]),
          dwVirtItem2: cleanString(monsterData[69]),
          dwVirtType2: cleanString(monsterData[70]),
          dwVirtItem3: cleanString(monsterData[71]),
          dwVirtType3: cleanString(monsterData[72]),
          dwSndAtk1: tryParseInt(monsterData[73]),
          dwSndAtk2: tryParseInt(monsterData[74]),
          dwSndDie1: tryParseInt(monsterData[75]),
          dwSndDie2: tryParseInt(monsterData[76]),
          dwSndDmg1: tryParseInt(monsterData[77]),
          dwSndDmg2: tryParseInt(monsterData[78]),
          dwSndDmg3: tryParseInt(monsterData[79]),
          dwSndIdle1: tryParseInt(monsterData[80]),
          dwSndIdle2: tryParseInt(monsterData[81]),
          szComment: cleanString(monsterData[82]),
          dwAreaColor: tryParseInt(monsterData[83]),
          szNpcMark: cleanString(monsterData[84]),
          dwMadrigalGiftPoint: tryParseInt(monsterData[85]),
      };

        if (monster.id) {
          this.redisClient.hmset(`monster:${monster.id}`, monster);
        }
      }
    });

    this.logger.main(`${lines.length} monsters loaded.`);
  }

  parseMonsterProperties(data: { [key: string]: string }): MonsterProperties {
    return {
      id: tryParseInt(data["id"]),
      dwID: data["dwID"],
      szName: data["szName"],
      dwAI: data["dwAI"],
      dwStr: tryParseInt(data["dwStr"]),
      dwSta: tryParseInt(data["dwSta"]),
      dwDex: tryParseInt(data["dwDex"]),
      dwInt: tryParseInt(data["dwInt"]),
      dwHR: tryParseInt(data["dwHR"]),
      dwER: tryParseInt(data["dwER"]),
      dwRace: data["dwRace"],
      dwBelligerence: data["dwBelligerence"],
      dwGender: data["dwGender"],
      dwLevel: tryParseInt(data["dwLevel"]),
      dwFlightLevel: tryParseInt(data["dwFlightLevel"]),
      dwSize: tryParseInt(data["dwSize"]),
      dwClass: tryParseInt(data["dwClass"]),
      bIfPart: cleanString(data["bIfPart"]),
      dwKarma: cleanString(data["dwKarma"]),
      dwUseable: cleanString(data["dwUseable"]),
      dwActionRadius: tryParseInt(data["dwActionRadius"]),
      dwAtkMin: tryParseInt(data["dwAtkMin"]),
      dwAtkMax: tryParseInt(data["dwAtkMax"]),
      dwAtk1: tryParseInt(data["dwAtk1"]),
      dwAtk2: tryParseInt(data["dwAtk2"]),
      dwAtk3: tryParseInt(data["dwAtk3"]),
      dwHorizontalRate: tryParseInt(data["dwHorizontalRate"]),
      dwVerticalRate: tryParseInt(data["dwVerticalRate"]),
      dwDiagonalRate: tryParseInt(data["dwDiagonalRate"]),
      dwThrustRate: tryParseInt(data["dwThrustRate"]),
      dwChestRate: tryParseInt(data["dwChestRate"]),
      dwHeadRate: tryParseInt(data["dwHeadRate"]),
      dwArmRate: tryParseInt(data["dwArmRate"]),
      dwLegRate: tryParseInt(data["dwLegRate"]),
      dwAttackSpeed: tryParseFloat(data["dwAttackSpeed"]),
      dwReAttackDelay: tryParseInt(data["dwReAttackDelay"]),
      dwAddHp: tryParseInt(data["dwAddHp"]),
      dwAddMp: tryParseInt(data["dwAddMp"]),
      dwNaturealArmor: tryParseInt(data["dwNaturealArmor"]),
      nAbrasion: tryParseInt(data["nAbrasion"]),
      nHardness: tryParseInt(data["nHardness"]),
      dwAdjAtkDelay: tryParseInt(data["dwAdjAtkDelay"]),
      eElementType: data["eElementType"],
      wElementAtk: tryParseInt(data["wElementAtk"]),
      dwHideLevel: tryParseInt(data["dwHideLevel"]),
      fSpeed: tryParseFloat(data["fSpeed"]),
      dwShelter: tryParseInt(data["dwShelter"]),
      bFlying: cleanString(data["bFlying"]),
      dwJumpIng: tryParseInt(data["dwJumpIng"]),
      dwAirJump: tryParseInt(data["dwAirJump"]),
      bTaming: cleanString(data["bTaming"]),
      dwResisMagic: tryParseFloat(data["dwResisMagic"]),
      fResistElecricity: tryParseFloat(data["fResistElecricity"]),
      fResistFire: tryParseFloat(data["fResistFire"]),
      fResistWind: tryParseFloat(data["fResistWind"]),
      fResistWater: tryParseFloat(data["fResistWater"]),
      fResistEarth: tryParseFloat(data["fResistEarth"]),
      dwCash: tryParseInt(data["dwCash"]),
      dwSourceMaterial: tryParseInt(data["dwSourceMaterial"]),
      dwMaterialAmount: tryParseInt(data["dwMaterialAmount"]),
      dwCohesion: tryParseInt(data["dwCohesion"]),
      dwHoldingTime: tryParseInt(data["dwHoldingTime"]),
      dwCorrectionValue: tryParseInt(data["dwCorrectionValue"]),
      dwExpValue: tryParseInt(data["dwExpValue"]),
      nFxpValue: tryParseInt(data["nFxpValue"]),
      nBodyState: tryParseInt(data["nBodyState"]),
      dwAddAbility: tryParseInt(data["dwAddAbility"]),
      bKillable: cleanString(data["bKillable"]),
      dwVirtItem1: cleanString(data["dwVirtItem1"]),
      dwVirtType1: cleanString(data["dwVirtType1"]),
      dwVirtItem2: cleanString(data["dwVirtItem2"]),
      dwVirtType2: cleanString(data["dwVirtType2"]),
      dwVirtItem3: cleanString(data["dwVirtItem3"]),
      dwVirtType3: cleanString(data["dwVirtType3"]),
      dwSndAtk1: tryParseInt(data["dwSndAtk1"]),
      dwSndAtk2: tryParseInt(data["dwSndAtk2"]),
      dwSndDie1: tryParseInt(data["dwSndDie1"]),
      dwSndDie2: tryParseInt(data["dwSndDie2"]),
      dwSndDmg1: tryParseInt(data["dwSndDmg1"]),
      dwSndDmg2: tryParseInt(data["dwSndDmg2"]),
      dwSndDmg3: tryParseInt(data["dwSndDmg3"]),
      dwSndIdle1: tryParseInt(data["dwSndIdle1"]),
      dwSndIdle2: tryParseInt(data["dwSndIdle2"]),
      szComment: data["szComment"],
      dwAreaColor: tryParseInt(data["dwAreaColor"]),
      szNpcMark: data["szNpcMark"],
      dwMadrigalGiftPoint: tryParseInt(data["dwMadrigalGiftPoint"]),
    };
  }

  cleanCache() {
    return new Promise<void>((resolve, reject) => {
      this.redisClient.keys("monster:*", (err, keys) => {
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
