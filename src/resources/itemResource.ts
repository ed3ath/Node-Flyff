import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import { ItemProperties } from "../interfaces/resource";
import { tryParseInt, cleanString, tryParseFloat } from "../helpers/parsing";

export class ItemResources {
  logger: Logger;
  redisClient: Redis;

  constructor(options: RedisOptions) {
    this.logger = new Logger("Item Resources");
    this.redisClient = new Redis(options);
  }

  public async get(
    itemIdentifier: string | number
  ): Promise<ItemProperties | null> {
    const itemId =
      typeof itemIdentifier === "number"
        ? itemIdentifier
        : await this.redisClient.hget("itemDefines", itemIdentifier);
    if (!_.isUndefined(itemId)) {
      return new Promise((resolve, reject) => {
        this.redisClient.hgetall(`item:${itemId}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data ? this.parseItemProperties(data) : null);
          }
        });
      });
    }
    return null;
  }

  public where(predicate: (item: ItemProperties) => boolean): ItemProperties[] {
    const items: ItemProperties[] = [];
    this.redisClient.keys("item:*", (err, keys) => {
      if (err) {
        this.logger.error("Error retrieving keys from Redis:", err);
      } else {
        if (!_.isUndefined(keys)) {
          _.forEach(keys, (key) => {
            this.redisClient.hgetall(key, (err, data) => {
              if (err) {
                this.logger.error(
                  "Error retrieving item data from Redis:",
                  err
                );
              } else {
                if (data) {
                  const item = this.parseItemProperties(data);
                  if (predicate(item)) {
                    items.push(item);
                  }
                }
              }
            });
          });
        }
      }
    });
    return items;
  }

  public async loadDefines(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.defineItem);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load items. Reason: cannot find '${absolutePath}' file.`
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
          await this.redisClient.hset("itemDefines", name, id);
        }
      }
    });
  }

  public async loadItemsPropStrings(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.itemsText);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load items. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!(await this.redisClient.exists("itemDefines"))) {
      this.logger.warn(`Unable to load items. Reason: item defines is empty`);
    }

    try {
      const data = fs.readFileSync(absolutePath, "utf16le");
      const lines = data.split("\n").map((i) => i.toString().trim());
      const pairs = _.chunk(lines, 2);
      _.forEach(pairs, async (pair, i) => {
        const [idName, name] = pair[0].split("\t");
        const [idDesc, desc] = pair[1].split("\t");
        await this.redisClient.hset("itemNames", idName, name);
        await this.redisClient.hset("itemDescriptions", idDesc, desc);
      });
    } catch (err) {
      this.logger.error("Error parsing item file:", err);
    }
  }

  public async loadItemsProp(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.itemsProp);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load items. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!(await this.redisClient.exists("itemDefines"))) {
      this.logger.warn(`Unable to load items. Reason: item defines is empty`);
    }

    await this.cleanCache(); // clean cache

    const data = fs.readFileSync(absolutePath, "utf8");

    const lines = data.split("\n");
    _.forEach(lines, async (line) => {
      const items = line.trim().split("\t");

      const id = await this.redisClient.hget("itemDefines", items[1]);

      if (!_.isNil(id)) {
        const szName =
          (await this.redisClient.hget(
            "itemNames",
            cleanString(items[2])
          )) || "";
        const szComment =
          (await this.redisClient.hget(
            "itemDescriptions",
            cleanString(items[60])
          )) || "";

        const item: ItemProperties = {
          id: tryParseInt(id),
          ver6: tryParseInt(items[0]),
          dwID: items[1],
          szName,
          szNameId: cleanString(items[2]),
          dwPackMax: tryParseInt(items[4]),
          dwItemKind1: cleanString(items[5]),
          dwItemKind2: cleanString(items[6]),
          dwItemKind3: cleanString(items[7]),
          dwItemJob: cleanString(items[8]),
          bPermanence: items[9] === "TRUE",
          dwUseable: items[10] === "TRUE",
          dwItemSex: tryParseInt(items[11]),
          dwCost: tryParseInt(items[12]),
          dwLimitLevel1: tryParseInt(items[14]),
          dwParts: cleanString(items[15]),
          dwAbilityMin: tryParseInt(items[16]),
          dwAbilityMax: tryParseInt(items[17]),
          eItemType: cleanString(items[18]),
          dwItemLV: tryParseInt(items[19]),
          dwItemRare: tryParseInt(items[20]),
          dwAttackSpeed: tryParseFloat(items[21]),
          dwDestParam1: tryParseInt(items[22]),
          dwDestParam2: tryParseInt(items[23]),
          dwDestParam3: tryParseInt(items[24]),
          nAdjParamVal1: tryParseInt(items[25]),
          nAdjParamVal2: tryParseInt(items[26]),
          nAdjParamVal3: tryParseInt(items[27]),
          dwCircleTime: tryParseInt(items[28]),
          dwSfxObj: tryParseInt(items[29]),
          dwSfxObj2: tryParseInt(items[30]),
          dwSfxObj3: tryParseInt(items[31]),
          dwSfxObj4: tryParseInt(items[32]),
          dwSfxObj5: tryParseInt(items[33]),
          dwSkillReady: tryParseInt(items[34]),
          dwWeaponType: tryParseInt(items[35]),
          dwItemAtkOrder1: tryParseInt(items[36]),
          dwItemAtkOrder2: tryParseInt(items[37]),
          dwItemAtkOrder3: tryParseInt(items[38]),
          dwItemAtkOrder4: tryParseInt(items[39]),
          dwSkillReadyType: tryParseInt(items[40]),
          dwReferStat1: cleanString(items[41]),
          dwAddSkillMin: tryParseInt(items[42]),
          dwAddSkillMax: tryParseInt(items[43]),
          dwReqMp: tryParseInt(items[44]),
          dwReqFp: tryParseInt(items[45]),
          bCharged: items[46] === "TRUE",
          dwReferStat2: tryParseInt(items[47]),
          dwReferTarget1: tryParseInt(items[48]),
          dwReferTarget2: tryParseInt(items[49]),
          dwReferValue1: tryParseInt(items[50]),
          dwReferValue2: tryParseInt(items[51]),
          dwFlightLimit: tryParseInt(items[52]),
          dwFFuelReMax: tryParseInt(items[53]),
          dwAFuelReMax: tryParseInt(items[54]),
          dwLimitLevel: tryParseInt(items[55]),
          dwReflect: tryParseInt(items[56]),
          szIcon: cleanString(items[57]),
          dwQuestID: tryParseInt(items[58]),
          szTextFile: cleanString(items[59]),
          szComment,
        };

        if (item.id) {
          this.redisClient.hmset(`item:${item.id}`, item);
        }
      }
    });

    this.logger.main(`${lines.length} items loaded.`);
  }

  parseItemProperties(data: { [key: string]: string }): ItemProperties {
    return {
      id: parseInt(data["id"]),
      ver6: parseInt(data["ver6"]),
      dwID: data["dwID"],
      szName: data["szName"],
      szNameId: data["szNameId"],
      dwPackMax: parseInt(data["dwPackMax"]),
      dwItemKind1: data["dwItemKind1"],
      dwItemKind2: data["dwItemKind2"],
      dwItemKind3: data["dwItemKind3"],
      dwItemJob: data["dwItemJob"],
      bPermanence: data["bPermanence"] === "true",
      dwUseable: data["dwUseable"] === "true",
      dwItemSex: parseInt(data["dwItemSex"]),
      dwCost: parseInt(data["dwCost"]),
      dwLimitLevel1: parseInt(data["dwLimitLevel1"]),
      dwParts: data["dwParts"],
      dwAbilityMin: parseInt(data["dwAbilityMin"]),
      dwAbilityMax: parseInt(data["dwAbilityMax"]),
      eItemType: data["eItemType"],
      dwItemLV: parseInt(data["dwItemLV"]),
      dwItemRare: parseInt(data["dwItemRare"]),
      dwAttackSpeed: parseFloat(data["dwAttackSpeed"]),
      dwDestParam1: parseInt(data["dwDestParam1"]),
      dwDestParam2: parseInt(data["dwDestParam2"]),
      dwDestParam3: parseInt(data["dwDestParam3"]),
      nAdjParamVal1: parseInt(data["nAdjParamVal1"]),
      nAdjParamVal2: parseInt(data["nAdjParamVal2"]),
      nAdjParamVal3: parseInt(data["nAdjParamVal3"]),
      dwCircleTime: parseInt(data["dwCircleTime"]),
      dwSfxObj: parseInt(data["dwSfxObj"]),
      dwSfxObj2: parseInt(data["dwSfxObj2"]),
      dwSfxObj3: parseInt(data["dwSfxObj3"]),
      dwSfxObj4: parseInt(data["dwSfxObj4"]),
      dwSfxObj5: parseInt(data["dwSfxObj5"]),
      dwSkillReady: parseInt(data["dwSkillReady"]),
      dwWeaponType: parseInt(data["dwWeaponType"]),
      dwItemAtkOrder1: parseInt(data["dwItemAtkOrder1"]),
      dwItemAtkOrder2: parseInt(data["dwItemAtkOrder2"]),
      dwItemAtkOrder3: parseInt(data["dwItemAtkOrder3"]),
      dwItemAtkOrder4: parseInt(data["dwItemAtkOrder4"]),
      dwSkillReadyType: parseInt(data["dwSkillReadyType"]),
      dwReferStat1: data["dwReferStat1"],
      dwAddSkillMin: parseInt(data["dwAddSkillMin"]),
      dwAddSkillMax: parseInt(data["dwAddSkillMax"]),
      dwReqMp: parseInt(data["dwReqMp"]),
      dwReqFp: parseInt(data["dwReqFp"]),
      bCharged: data["bCharged"] === "true",
      dwReferStat2: parseInt(data["dwReferStat2"]),
      dwReferTarget1: parseInt(data["dwReferTarget1"]),
      dwReferTarget2: parseInt(data["dwReferTarget2"]),
      dwReferValue1: parseInt(data["dwReferValue1"]),
      dwReferValue2: parseInt(data["dwReferValue2"]),
      dwFlightLimit: parseInt(data["dwFlightLimit"]),
      dwFFuelReMax: parseInt(data["dwFFuelReMax"]),
      dwAFuelReMax: parseInt(data["dwAFuelReMax"]),
      dwLimitLevel: parseInt(data["dwLimitLevel"]),
      dwReflect: parseInt(data["dwReflect"]),
      szIcon: data["szIcon"],
      dwQuestID: parseInt(data["dwQuestID"]),
      szTextFile: data["szTextFile"],
      szComment: data["szComment"],
    };
  }

  cleanCache() {
    return new Promise<void>((resolve, reject) => {
      this.redisClient.keys("item:*", (err, keys) => {
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
