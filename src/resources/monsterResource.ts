import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import { Logger } from "../helpers/logger";
import Redis, { RedisOptions } from "ioredis";
import { ResourcePaths } from "./resourcePaths";
import { MonsterProperties } from "../interfaces/resource";

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
        const id = this.tryParseInt(parts[2]);
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

      const id = await this.redisClient.hget("objectDefines", monsterData[1]);

      if (!_.isNil(id)) {
        const monster: MonsterProperties = {
          id: parseInt(id),
          dwID: monsterData[0],
          szName: this.cleanString(monsterData[1]),
          dwAI: this.cleanString(monsterData[2]),
          dwStr: this.tryParseInt(monsterData[3]),
          dwSta: this.tryParseInt(monsterData[4]),
          dwDex: this.tryParseInt(monsterData[5]),
          dwInt: this.tryParseInt(monsterData[6]),
          dwHR: this.tryParseInt(monsterData[7]),
          dwER: this.tryParseInt(monsterData[8]),
          dwRace: this.cleanString(monsterData[9]),
          dwBelligerence: this.cleanString(monsterData[10]),
          dwGender: this.cleanString(monsterData[11]),
          dwLevel: this.tryParseInt(monsterData[12]),
          dwFlightLevel: this.tryParseInt(monsterData[13]),
          dwSize: this.tryParseInt(monsterData[14]),
          dwClass: this.tryParseInt(monsterData[15]),
          bIfPart: this.cleanString(monsterData[16]),
          dwKarma: this.cleanString(monsterData[17]),
          dwUseable: this.cleanString(monsterData[18]),
          dwActionRadius: this.tryParseInt(monsterData[19]),
          dwAtkMin: this.tryParseInt(monsterData[20]),
          dwAtkMax: this.tryParseInt(monsterData[21]),
          dwAtk1: this.tryParseInt(monsterData[22]),
          dwAtk2: this.tryParseInt(monsterData[23]),
          dwAtk3: this.tryParseInt(monsterData[24]),
          dwHorizontalRate: this.tryParseInt(monsterData[25]),
          dwVerticalRate: this.tryParseInt(monsterData[26]),
          dwDiagonalRate: this.tryParseInt(monsterData[27]),
          dwThrustRate: this.tryParseInt(monsterData[28]),
          dwChestRate: this.tryParseInt(monsterData[29]),
          dwHeadRate: this.tryParseInt(monsterData[30]),
          dwArmRate: this.tryParseInt(monsterData[31]),
          dwLegRate: this.tryParseInt(monsterData[32]),
          dwAttackSpeed: this.tryParseInt(monsterData[33]),
          dwReAttackDelay: this.tryParseInt(monsterData[34]),
          dwAddHp: this.tryParseInt(monsterData[35]),
          dwAddMp: this.tryParseInt(monsterData[36]),
          dwNaturealArmor: this.tryParseInt(monsterData[37]),
          nAbrasion: this.tryParseInt(monsterData[38]),
          nHardness: this.tryParseInt(monsterData[39]),
          dwAdjAtkDelay: this.tryParseInt(monsterData[40]),
          eElementType: this.cleanString(monsterData[41]),
          wElementAtk: this.tryParseInt(monsterData[42]),
          dwHideLevel: this.tryParseInt(monsterData[43]),
          fSpeed: parseFloat(monsterData[44]),
          dwShelter: this.tryParseInt(monsterData[45]),
          bFlying: this.cleanString(monsterData[46]),
          dwJumpIng: this.tryParseInt(monsterData[47]),
          dwAirJump: this.tryParseInt(monsterData[48]),
          bTaming: this.cleanString(monsterData[49]),
          dwResisMagic: this.tryParseInt(monsterData[50]),
          fResistElecricity: parseFloat(monsterData[51]),
          fResistFire: parseFloat(monsterData[52]),
          fResistWind: parseFloat(monsterData[53]),
          fResistWater: parseFloat(monsterData[54]),
          fResistEarth: parseFloat(monsterData[55]),
          dwCash: this.tryParseInt(monsterData[56]),
          dwSourceMaterial: this.tryParseInt(monsterData[57]),
          dwMaterialAmount: this.tryParseInt(monsterData[58]),
          dwCohesion: this.tryParseInt(monsterData[59]),
          dwHoldingTime: this.tryParseInt(monsterData[60]),
          dwCorrectionValue: this.tryParseInt(monsterData[61]),
          dwExpValue: this.tryParseInt(monsterData[62]),
          nFxpValue: this.tryParseInt(monsterData[63]),
          nBodyState: this.tryParseInt(monsterData[64]),
          dwAddAbility: this.tryParseInt(monsterData[65]),
          bKillable: this.cleanString(monsterData[66]),
          dwVirtItem1: this.cleanString(monsterData[67]),
          dwVirtType1: this.cleanString(monsterData[68]),
          dwVirtItem2: this.cleanString(monsterData[69]),
          dwVirtType2: this.cleanString(monsterData[70]),
          dwVirtItem3: this.cleanString(monsterData[71]),
          dwVirtType3: this.cleanString(monsterData[72]),
          dwSndAtk1: this.tryParseInt(monsterData[73]),
          dwSndAtk2: this.tryParseInt(monsterData[74]),
          dwSndDie1: this.tryParseInt(monsterData[75]),
          dwSndDie2: this.tryParseInt(monsterData[76]),
          dwSndDmg1: this.tryParseInt(monsterData[77]),
          dwSndDmg2: this.tryParseInt(monsterData[78]),
          dwSndDmg3: this.tryParseInt(monsterData[79]),
          dwSndIdle1: this.tryParseInt(monsterData[80]),
          dwSndIdle2: this.tryParseInt(monsterData[81]),
          szComment: this.cleanString(monsterData[82]),
          dwAreaColor: this.tryParseInt(monsterData[83]),
          szNpcMark: this.cleanString(monsterData[84]),
          dwMadrigalGiftPoint: this.tryParseInt(monsterData[85]),
      };

        if (monster.id) {
          this.redisClient.hmset(`monster:${monster.id}`, monster);
        }
      }
    });

    this.logger.main(`${lines.length} monsters loaded.`);
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

  parseMonsterProperties(data: { [key: string]: string }): MonsterProperties {
    return {
      id: this.tryParseInt(data["id"]),
      dwID: data["dwID"],
      szName: data["szName"],
      dwAI: data["dwAI"],
      dwStr: this.tryParseInt(data["dwStr"]),
      dwSta: this.tryParseInt(data["dwSta"]),
      dwDex: this.tryParseInt(data["dwDex"]),
      dwInt: this.tryParseInt(data["dwInt"]),
      dwHR: this.tryParseInt(data["dwHR"]),
      dwER: this.tryParseInt(data["dwER"]),
      dwRace: data["dwRace"],
      dwBelligerence: data["dwBelligerence"],
      dwGender: data["dwGender"],
      dwLevel: this.tryParseInt(data["dwLevel"]),
      dwFlightLevel: this.tryParseInt(data["dwFlightLevel"]),
      dwSize: this.tryParseInt(data["dwSize"]),
      dwClass: this.tryParseInt(data["dwClass"]),
      bIfPart: this.cleanString(data["bIfPart"]),
      dwKarma: this.cleanString(data["dwKarma"]),
      dwUseable: this.cleanString(data["dwUseable"]),
      dwActionRadius: this.tryParseInt(data["dwActionRadius"]),
      dwAtkMin: this.tryParseInt(data["dwAtkMin"]),
      dwAtkMax: this.tryParseInt(data["dwAtkMax"]),
      dwAtk1: this.tryParseInt(data["dwAtk1"]),
      dwAtk2: this.tryParseInt(data["dwAtk2"]),
      dwAtk3: this.tryParseInt(data["dwAtk3"]),
      dwHorizontalRate: this.tryParseInt(data["dwHorizontalRate"]),
      dwVerticalRate: this.tryParseInt(data["dwVerticalRate"]),
      dwDiagonalRate: this.tryParseInt(data["dwDiagonalRate"]),
      dwThrustRate: this.tryParseInt(data["dwThrustRate"]),
      dwChestRate: this.tryParseInt(data["dwChestRate"]),
      dwHeadRate: this.tryParseInt(data["dwHeadRate"]),
      dwArmRate: this.tryParseInt(data["dwArmRate"]),
      dwLegRate: this.tryParseInt(data["dwLegRate"]),
      dwAttackSpeed: this.tryParseFloat(data["dwAttackSpeed"]),
      dwReAttackDelay: this.tryParseInt(data["dwReAttackDelay"]),
      dwAddHp: this.tryParseInt(data["dwAddHp"]),
      dwAddMp: this.tryParseInt(data["dwAddMp"]),
      dwNaturealArmor: this.tryParseInt(data["dwNaturealArmor"]),
      nAbrasion: this.tryParseInt(data["nAbrasion"]),
      nHardness: this.tryParseInt(data["nHardness"]),
      dwAdjAtkDelay: this.tryParseInt(data["dwAdjAtkDelay"]),
      eElementType: data["eElementType"],
      wElementAtk: this.tryParseInt(data["wElementAtk"]),
      dwHideLevel: this.tryParseInt(data["dwHideLevel"]),
      fSpeed: parseFloat(data["fSpeed"]),
      dwShelter: this.tryParseInt(data["dwShelter"]),
      bFlying: this.cleanString(data["bFlying"]),
      dwJumpIng: this.tryParseInt(data["dwJumpIng"]),
      dwAirJump: this.tryParseInt(data["dwAirJump"]),
      bTaming: this.cleanString(data["bTaming"]),
      dwResisMagic: this.tryParseFloat(data["dwResisMagic"]),
      fResistElecricity: this.tryParseFloat(data["fResistElecricity"]),
      fResistFire: this.tryParseFloat(data["fResistFire"]),
      fResistWind: this.tryParseFloat(data["fResistWind"]),
      fResistWater: this.tryParseFloat(data["fResistWater"]),
      fResistEarth: this.tryParseFloat(data["fResistEarth"]),
      dwCash: this.tryParseInt(data["dwCash"]),
      dwSourceMaterial: this.tryParseInt(data["dwSourceMaterial"]),
      dwMaterialAmount: this.tryParseInt(data["dwMaterialAmount"]),
      dwCohesion: this.tryParseInt(data["dwCohesion"]),
      dwHoldingTime: this.tryParseInt(data["dwHoldingTime"]),
      dwCorrectionValue: this.tryParseInt(data["dwCorrectionValue"]),
      dwExpValue: this.tryParseInt(data["dwExpValue"]),
      nFxpValue: this.tryParseInt(data["nFxpValue"]),
      nBodyState: this.tryParseInt(data["nBodyState"]),
      dwAddAbility: this.tryParseInt(data["dwAddAbility"]),
      bKillable: this.cleanString(data["bKillable"]),
      dwVirtItem1: this.cleanString(data["dwVirtItem1"]),
      dwVirtType1: this.cleanString(data["dwVirtType1"]),
      dwVirtItem2: this.cleanString(data["dwVirtItem2"]),
      dwVirtType2: this.cleanString(data["dwVirtType2"]),
      dwVirtItem3: this.cleanString(data["dwVirtItem3"]),
      dwVirtType3: this.cleanString(data["dwVirtType3"]),
      dwSndAtk1: this.tryParseInt(data["dwSndAtk1"]),
      dwSndAtk2: this.tryParseInt(data["dwSndAtk2"]),
      dwSndDie1: this.tryParseInt(data["dwSndDie1"]),
      dwSndDie2: this.tryParseInt(data["dwSndDie2"]),
      dwSndDmg1: this.tryParseInt(data["dwSndDmg1"]),
      dwSndDmg2: this.tryParseInt(data["dwSndDmg2"]),
      dwSndDmg3: this.tryParseInt(data["dwSndDmg3"]),
      dwSndIdle1: this.tryParseInt(data["dwSndIdle1"]),
      dwSndIdle2: this.tryParseInt(data["dwSndIdle2"]),
      szComment: data["szComment"],
      dwAreaColor: this.tryParseInt(data["dwAreaColor"]),
      szNpcMark: data["szNpcMark"],
      dwMadrigalGiftPoint: this.tryParseInt(data["dwMadrigalGiftPoint"]),
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
