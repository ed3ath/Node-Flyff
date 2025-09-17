import fs from "fs-extra";
import path from "path";
import _ from "lodash";
import Redis, { RedisOptions } from "ioredis";
import { Logger } from "../helpers/logger";
import { ResourcePaths } from "./resourcePaths";
import { NpcProperties, ShopProperties, DialogProperties } from "../interfaces/resource";

export class NpcResources {
  private readonly logger: Logger;
  private readonly redisClient: Redis;
  private readonly npcs: Map<string, NpcProperties> = new Map();

  constructor(options: RedisOptions) {
    this.logger = new Logger("NPC Resources");
    this.redisClient = new Redis(options);
  }

  public async get(name: string): Promise<NpcProperties | null> {
    // Try cache first
    const cached = await new Promise<any>((resolve) => this.redisClient.hgetall(`npc:${name}`, (err, data) => resolve(data)));
    if (cached && Object.keys(cached).length > 0) {
      return this.parseNpcProperties(cached);
    }

    // Fallback to in-memory
    return this.npcs.get(name) || null;
  }

  public async load(): Promise<void> {
    await this.loadNpcDialogs();
    await this.loadNpcShops();
    await this.loadNpcPropStrings();
    await this.loadNpcSchoolPropStrings();
    await this.loadNpcProp();
  }

  private parseNpcProperties(data: { [key: string]: string }): NpcProperties {
    return {
      id: data["id"],
      name: data["name"],
      modelId: parseInt(data["modelId"] || "0"),
      hairId: parseInt(data["hairId"] || "0"),
      hairColor: parseInt(data["hairColor"] || "0"),
      faceId: parseInt(data["faceId"] || "0"),
      items: JSON.parse(data["items"] || "[]"),
      shop: data["shop"] ? JSON.parse(data["shop"]) : null,
      dialog: data["dialog"] ? JSON.parse(data["dialog"]) : null,
      hasShop: data["shop"] ? true : false,
      hasDialog: data["dialog"] ? true : false,
      canBuff: data["canBuff"] === "true"
    };
  }

  public async loadNpcDialogs(): Promise<void> {
    const dialogDir = path.join(ResourcePaths.dialogsDir, 'en');
    if (!fs.existsSync(dialogDir)) {
      this.logger.warn(`Dialog directory not found: ${dialogDir}`);
      return;
    }

    const dialogFiles = fs.readdirSync(dialogDir).filter(file => file.endsWith('.json'));
    for (const file of dialogFiles) {
      const npcId = file.replace('.json', '');
      const dialogPath = path.join(dialogDir, file);
      try {
        const dialog: DialogProperties = JSON.parse(fs.readFileSync(dialogPath, 'utf8'));
        if (this.npcs.has(npcId)) {
          (this.npcs.get(npcId) as any).dialog = dialog;
          (this.npcs.get(npcId) as any).hasDialog = true;
        } else {
          // Cache dialog separately
          await this.redisClient.hset(`npc:${npcId}`, 'dialog', JSON.stringify(dialog));
        }
      } catch (e) {
        this.logger.warn(`Failed to load dialog for ${npcId}: ${e}`);
      }
    }
  }

  public async loadNpcShops(): Promise<void> {
    if (!fs.existsSync(ResourcePaths.shopsDir)) {
      this.logger.warn(`Shops directory not found: ${ResourcePaths.shopsDir}`);
      return;
    }

    const shopFiles = fs.readdirSync(ResourcePaths.shopsDir).filter(file => file.endsWith('.json'));
    for (const file of shopFiles) {
      const npcId = file.replace('.json', '');
      const shopPath = path.join(ResourcePaths.shopsDir, file);
      try {
        const shop: ShopProperties = JSON.parse(fs.readFileSync(shopPath, 'utf8'));
        if (this.npcs.has(npcId)) {
          (this.npcs.get(npcId) as any).shop = shop;
          (this.npcs.get(npcId) as any).hasShop = true;
        } else {
          // Cache shop separately
          await this.redisClient.hset(`npc:${npcId}`, 'shop', JSON.stringify(shop));
        }
      } catch (e) {
        this.logger.warn(`Failed to load shop for ${npcId}: ${e}`);
      }
    }
  }

  public async loadNpcPropStrings(): Promise<void> {
    // Load from character.txt.txt or similar
    const propPath = path.join(ResourcePaths.resPath, 'data', 'character.txt.txt');
    if (!fs.existsSync(propPath)) {
      this.logger.info('No NPC prop strings file found (stub)');
      return;
    }

    const content = fs.readFileSync(propPath, 'utf8');
    const lines = content.split('\n');
    const pairs = _.chunk(lines.filter(l => l.trim()), 2);

    for (const pair of pairs) {
      if (pair.length >= 2) {
        const [id, name] = pair[0].split('\t');
        if (id && name) {
          await this.redisClient.hset('npcNames', id.trim(), name.trim());
        }
      }
    }
    this.logger.info('NPC prop strings loaded');
  }

  public async loadNpcSchoolPropStrings(): Promise<void> {
    // Load from character-school.txt.txt
    const propPath = path.join(ResourcePaths.resPath, 'data', 'character-school.txt.txt');
    if (!fs.existsSync(propPath)) {
      this.logger.info('No NPC school prop strings file found (stub)');
      return;
    }

    const content = fs.readFileSync(propPath, 'utf8');
    const lines = content.split('\n');
    const pairs = _.chunk(lines.filter(l => l.trim()), 2);

    for (const pair of pairs) {
      if (pair.length >= 2) {
        const [id, name] = pair[0].split('\t');
        if (id && name) {
          await this.redisClient.hset('npcSchoolNames', id.trim(), name.trim());
        }
      }
    }
    this.logger.info('NPC school prop strings loaded');
  }

  public async loadNpcProp(): Promise<void> {
    // Parse character*.inc files for SetName and AddMenu, cache in Redis
    const dataPath = path.join(ResourcePaths.resPath, 'data');
    if (!fs.existsSync(dataPath)) {
      this.logger.warn(`NPC data path not found: ${dataPath}`);
      return;
    }

    const files = fs.readdirSync(dataPath).filter(file => file.startsWith('character') && file.endsWith('.inc'));
    for (const file of files) {
      const filePath = path.join(dataPath, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      let currentNpcId = '';
      let currentNpcName = '';
      let canBuff = false;

      for (const line of lines) {
        let trimmed = line.trim();
        if (trimmed.startsWith('character') && trimmed.includes('{')) {
          const match = trimmed.match(/character\s+(\w+)/);
          if (match) {
            currentNpcId = match[1];
            currentNpcName = currentNpcId;
            canBuff = false;
          }
          continue;
        }

        if (currentNpcId && trimmed.includes('SetName')) {
          const match = trimmed.match(/SetName\s+"([^"]+)"/);
          if (match) {
            currentNpcName = match[1];
          }
        }

        if (currentNpcId && trimmed.includes('AddMenu')) {
          const match = trimmed.match(/AddMenu\s+"([^"]+)"/);
          if (match && match[1] === 'MMI_NPC_BUFF') {
            canBuff = true;
          }
        }

        if (trimmed.includes('}')) {
          if (currentNpcId) {
            const npc: NpcProperties = {
              id: currentNpcId,
              name: currentNpcName,
              modelId: 0,
              hairId: 0,
              hairColor: 0,
              faceId: 0,
              items: [],
              hasShop: false,
              hasDialog: false,
              canBuff
            };

            // Cache in Redis
            await this.redisClient.hset(`npc:${currentNpcId}`, npc);
            this.npcs.set(currentNpcId, npc);
          }
          currentNpcId = '';
        }
      }
    }

    this.logger.info('NPC properties loaded and cached');
  }
}
