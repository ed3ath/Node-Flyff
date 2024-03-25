import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";
import yaml from "js-yaml";

import { Logger } from "../helpers/logger";
import { ResourcePaths } from "../resources/resourcePaths";
import {
  DialogProperties,
  NpcProperties,
  ShopProperties,
} from "../interfaces/resource";

export class NpcResources {
  logger: Logger;
  redisClient: Redis;
  language: string;

  constructor(options: RedisOptions, language = "en") {
    this.logger = new Logger("Npc Resources");
    this.redisClient = new Redis(options);
    this.language = language;
  }

  public async loadNpcPropStrings(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.characterText);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load npc prop strings. Reason: cannot find '${absolutePath}' file.`
      );
    }

    try {
      const data = fs.readFileSync(absolutePath, "utf16le");
      const lines = data.split("\n").map((i) => i.toString().trim());
      _.forEach(lines, async (line, i) => {
        const [id, text] = line.split("\t");
        await this.redisClient.hset("npcStrings", id, text);
      });
    } catch (err) {
      this.logger.error("Error parsing npc strings:", err);
    }
  }
  public async loadNpcSchoolPropStrings(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.characterSchoolText);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load npc school prop strings. Reason: cannot find '${absolutePath}' file.`
      );
    }

    try {
      const data = fs.readFileSync(absolutePath, "utf16le");
      const lines = data.split("\n").map((i) => i.toString().trim());
      _.forEach(lines, async (line, i) => {
        const [id, text] = line.split("\t");
        await this.redisClient.hset("npcStrings", id, text);
      });
    } catch (err) {
      this.logger.error("Error parsing npc school strings:", err);
    }
  }

  public async loadNpcDialogs() {
    const absolutePath = path.resolve(ResourcePaths.dialogsDir, this.language);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load dialogs. Reason: cannot find '${absolutePath}' file.`
      );
    }
    try {
      const dialogsFile = fs.readdirSync(absolutePath);

      await Promise.all(
        _.map(dialogsFile, async (dialogFile) => {
          const dialog = fs.readJSONSync(path.join(absolutePath, dialogFile));
          await this.redisClient.hmset(`dialogs:${dialog.name}`, {
            name: dialog.name,
            introText: dialog.introText,
            shoutText: dialog.oralText,
            byeText: dialog.byeText,
            links: JSON.stringify(dialog.links),
          });
        })
      );
    } catch (err) {
      this.logger.error("Error parsing npc dialog:", err);
    }
  }

  public async loadNpcShops() {
    const absolutePath = path.resolve(ResourcePaths.shopsDir);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load shops. Reason: cannot find '${absolutePath}' file.`
      );
    }
    try {
      const shopsFile = fs.readdirSync(absolutePath);
      await Promise.all(
        _.map(shopsFile, async (shopFile) => {
          const shop = fs.readJSONSync(path.join(absolutePath, shopFile));
          await this.redisClient.hmset(`shops:${shop.name}`, {
            name: shop.name,
            items: JSON.stringify(shop.items),
          });
        })
      );
    } catch (err) {
      this.logger.error("Error parsing npc dialog:", err);
    }
  }

  public async getString(id: string) {
    return new Promise((resolve, reject) => {
      this.redisClient.hget("npcStrings", id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  public async getDialog(id: string): Promise<DialogProperties | undefined> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`dialogs:${id}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.parseDialog(data));
        }
      });
    });
  }

  public async getShop(id: string): Promise<ShopProperties | undefined> {
    return new Promise((resolve, reject) => {
      this.redisClient.hgetall(`shops:${id}`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.parseShop(data));
        }
      });
    });
  }

  public async loadNpcProp(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.character);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load npcs. Reason: cannot find '${absolutePath}' file.`
      );
    }
    await this.cleanCache(); // clean cache

    const data = fs.readFileSync(absolutePath, "utf8");
    const npcData: any = yaml.load(data);

    _.forEach(npcData, async (data: any) => {
      const dialog = await this.getDialog(data.id);
      const shop = await this.getShop(data.id);
      const npc: NpcProperties = {
        id: data.id,
        name: (await this.getString(data.name)) as string,
        modelId: 0,
        hairId: 0,
        hairColor: 0,
        faceId: 0,
        items: [],
        hasShop: !_.isEmpty(shop),
        shop,
        dialog,
        hasDialog: !_.isEmpty(dialog),
        canBuff:
          !_.isEmpty(data.canBuff) &&
          !_.isNil(data.canBuff) &&
          !_.isUndefined(data.canBuff),
      };

      if (npc.id) {
        this.redisClient.hmset(`npc:${npc.id}`, npc);
      }
    });

    this.logger.main(`${npcData.length} npc loaded.`);
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

  tryJsonParse(value: string) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  parseDialog(
    dialog: Record<string, string> | undefined
  ): DialogProperties | undefined {
    if (!dialog || !dialog?.name) return;
    return {
      name: dialog.name,
      introText: dialog.introText,
      shoutText: dialog.oralText,
      byeText: dialog.byeText,
      links: this.tryJsonParse(dialog.links),
    };
  }

  parseShop(
    shop: Record<string, string> | undefined
  ): ShopProperties | undefined {
    if (!shop || !shop?.name) return;
    return {
      name: shop.name,
      items: this.tryJsonParse(shop.items),
    };
  }

  cleanString(value: string) {
    return value === "=" ? "" : value;
  }

  cleanCache() {
    return new Promise<void>((resolve, reject) => {
      this.redisClient.keys("npc:*", (err, keys) => {
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
