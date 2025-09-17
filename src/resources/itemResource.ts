import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";

import { ResourcePaths } from "../resources/resourcePaths";
import { ItemProperties } from "../interfaces/resource";
import { tryParseInt, cleanString, tryParseFloat } from "../helpers/parsing";
import { BaseResource } from "../abstract/baseResource";

export class ItemResources extends BaseResource {
  redisClient: Redis;
  private itemCount: number = 0;

  constructor(options: RedisOptions) {
    super("Item");
    this.redisClient = new Redis(options);
  }

  public getItemCount(): number {
    return this.itemCount;
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
        this.logLoadError("Error retrieving keys from Redis", err);
      } else {
        if (!_.isUndefined(keys)) {
          _.forEach(keys, (key) => {
            this.redisClient.hgetall(key, (err, data) => {
              if (err) {
                this.logLoadError("Error retrieving item data from Redis", err);
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
          (await this.redisClient.hget("itemNames", cleanString(items[2]))) ||
          "";
        const szComment =
          (await this.redisClient.hget(
            "itemDescriptions",
            cleanString(items[123])
          )) || "";

        const item: ItemProperties = {
          id: tryParseInt(id),
          ver6: tryParseInt(items[0]),
          dwID: items[1],
          szName,
          szNameId: cleanString(items[2]),
          dwPackMax: tryParseInt(items[4]),
          dwItemKind1: items[5],
          dwItemKind2: items[6],
          dwItemKind3: items[7],
          dwItemJob: items[8],
          bPermanence: items[9] === "TRUE",
          dwUseable: items[10] === "TRUE",
          dwItemSex: tryParseInt(items[11]),
          dwCost: tryParseInt(items[12]),
          dwParts: items[18],
          dwItemLV: tryParseInt(items[23]),
          dwItemRare: tryParseInt(items[24]),
          dwAbilityMin: tryParseInt(items[30]),
          dwAbilityMax: tryParseInt(items[31]),
          eItemType: items[32],
          dwAttackSpeed: tryParseInt(items[49]),
          dwDestParam1: cleanString(items[53]),
          dwDestParam2: cleanString(items[54]),
          dwDestParam3: cleanString(items[55]),
          nAdjParamVal1: tryParseInt(items[56]),
          nAdjParamVal2: tryParseInt(items[57]),
          nAdjParamVal3: tryParseInt(items[58]),
          dwSfxObj: cleanString(items[79]),
          dwSfxObj2: cleanString(items[80]),
          dwSfxObj3: cleanString(items[81]),
          dwSfxObj4: cleanString(items[82]),
          dwSfxObj5: cleanString(items[83]),
          dwCircleTime: tryParseInt(items[85]),
          dwSkillReady: tryParseInt(items[76]),
          dwWeaponType: tryParseInt(items[39]),
          dwItemAtkOrder1: tryParseInt(items[40]),
          dwItemAtkOrder2: tryParseInt(items[41]),
          dwItemAtkOrder3: tryParseInt(items[42]),
          dwItemAtkOrder4: tryParseInt(items[43]),
          dwSkillReadyType: tryParseInt(items[75]),
          dwReferStat1: items[91],
          dwAddSkillMin: tryParseInt(items[36]),
          dwAddSkillMax: tryParseInt(items[37]),
          dwReqMp: tryParseInt(items[68]),
          dwReqFp: tryParseInt(items[69]),
          dwReferStat2: cleanString(items[92]),
          dwLimitLevel1: tryParseInt(items[116]),
          dwReferTarget1: cleanString(items[93]),
          dwReferTarget2: cleanString(items[94]),
          dwReferValue1: tryParseInt(items[95]),
          dwReferValue2: tryParseInt(items[96]),
          dwFlightLimit: tryParseInt(items[112]),
          dwFFuelReMax: tryParseInt(items[113]),
          dwAFuelReMax: tryParseInt(items[114]),
          dwReflect: tryParseInt(items[117]),
          dwQuestID: tryParseInt(items[121]),
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
      dwDestParam1: cleanString(data["dwDestParam1"]),
      dwDestParam2: cleanString(data["dwDestParam2"]),
      dwDestParam3: cleanString(data["dwDestParam3"]),
      nAdjParamVal1: parseInt(data["nAdjParamVal1"]),
      nAdjParamVal2: parseInt(data["nAdjParamVal2"]),
      nAdjParamVal3: parseInt(data["nAdjParamVal3"]),
      dwCircleTime: parseInt(data["dwCircleTime"]),
      dwSfxObj: cleanString(data["dwSfxObj"]),
      dwSfxObj2: cleanString(data["dwSfxObj2"]),
      dwSfxObj3: cleanString(data["dwSfxObj3"]),
      dwSfxObj4: cleanString(data["dwSfxObj4"]),
      dwSfxObj5: cleanString(data["dwSfxObj5"]),
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
      dwReferStat2: cleanString(data["dwReferStat2"]),
      dwReferTarget1: cleanString(data["dwReferTarget1"]),
      dwReferTarget2: cleanString(data["dwReferTarget2"]),
      dwReferValue1: parseInt(data["dwReferValue1"]),
      dwReferValue2: parseInt(data["dwReferValue2"]),
      dwFlightLimit: parseInt(data["dwFlightLimit"]),
      dwFFuelReMax: parseInt(data["dwFFuelReMax"]),
      dwAFuelReMax: parseInt(data["dwAFuelReMax"]),
      dwReflect: parseInt(data["dwReflect"]),
      dwQuestID: parseInt(data["dwQuestID"]),
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
