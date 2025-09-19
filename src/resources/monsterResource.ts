import * as fs from "fs-extra";
import * as path from "path";
import * as _ from "lodash";
import { Logger } from "../helpers/logger";
import Redis, { RedisOptions } from "ioredis";
import { ResourcePaths } from "./resourcePaths";
import { MoverProperties } from "../interfaces/resource";
import { DropItemProperties, DropItemKindProperties } from "../interfaces/dropItemProperties";
import { tryParseInt, cleanString, tryParseFloat } from "../helpers/parsing";
import { ResourceTableFile } from "../helpers/resourceTableFile";
import { IncludeFile, Block } from "../helpers/includeFile";
import { Instruction, Variable } from "../helpers/instructionParser";
import { ItemKind3 } from "../types/itemKind";
import { ElementType } from "../types/elementType";

export class MonsterResources {
  private readonly logger: Logger;
  private readonly redisClient: Redis;
  private readonly defines: Map<string, number> = new Map();
  private readonly moversById: Map<number, MoverProperties> = new Map();
  private readonly moversByIdentifierName: Map<string, MoverProperties> = new Map();

  constructor(options: RedisOptions) {
    this.logger = new Logger("Monster Resources");
    this.redisClient = new Redis(options);
  }

  public get(moverId: number): MoverProperties | null {
    return this.moversById.get(moverId) || null;
  }

  public getByIdentifier(moverIdentifier: string): MoverProperties | null {
    const moverId = parseInt(moverIdentifier, 10);
    if (!isNaN(moverId)) {
      return this.get(moverId);
    } else {
      return this.moversByIdentifierName.get(moverIdentifier) || null;
    }
  }

  public getLoadedCount(): number {
    return this.moversById.size;
  }

  public async getAsync(
    monsterIdentifier: string | number
  ): Promise<MoverProperties | null> {
    if (this.moversById.size > 0) {
      if (typeof monsterIdentifier === "number") {
        return this.get(monsterIdentifier);
      } else {
        return this.getByIdentifier(monsterIdentifier);
      }
    }

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
            resolve(data ? this.convertRedisDataToMoverProperties(data) : null);
          }
        });
      });
    }
    return null;
  }

  public where(predicate: (monster: MoverProperties) => boolean): MoverProperties[] {
    const monsters: MoverProperties[] = [];
    for (const monster of Array.from(this.moversById.values())) {
      if (predicate(monster)) {
        monsters.push(monster);
      }
    }
    return monsters;
  }

  public whereAsync(
    predicate: (monster: MoverProperties) => boolean
  ): MoverProperties[] {
    if (this.moversById.size > 0) {
      return this.where(predicate);
    }

    const monsters: MoverProperties[] = [];
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
                  const monster = this.convertRedisDataToMoverProperties(data);
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
    this.loadDefinesSync();
  }

  private async loadDefinesSync(): Promise<void> {
    const absolutePath = path.resolve(ResourcePaths.defineObject);
    if (!fs.existsSync(absolutePath)) {
      this.logger.error(
        `Unable to load monster defines. Reason: cannot find '${absolutePath}' file.`
      );
      return;
    }

    this.logger.info(`Loading defines from: ${absolutePath}`);
    const data = fs.readFileSync(absolutePath, "utf8");
    const lines = data.split("\n");
    this.logger.info(`File has ${lines.length} total lines`);

    let defineCount = 0;
    let miDefineCount = 0;
    let oiDefineCount = 0;
    const redisOperations: Promise<any>[] = [];

    for (const line of lines) {
      try {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("#define")) {
          const parts = trimmedLine.split(/\s+/);
          if (parts.length >= 3) {
            const name = parts[1];
            const id = tryParseInt(parts[2]);

            if (!isNaN(id) && name !== "") {
              this.defines.set(name, id);

              // Queue Redis operation without awaiting
              redisOperations.push(
                this.redisClient.hset("objectDefines", name, id)
                  .catch(error => this.logger.warn(`Failed to store define ${name} in Redis: ${error.message}`))
              );

              defineCount++;

              if (name.startsWith("MI_")) {
                miDefineCount++;
                if (miDefineCount <= 5) { // Log first 5 MI_ defines
                  this.logger.info(`Loaded MI_ define: ${name} = ${id}`);
                }
              } else if (name.startsWith("OI_")) {
                oiDefineCount++;
                if (oiDefineCount <= 3) { // Log first 3 OI_ defines
                  this.logger.info(`Loaded OI_ define: ${name} = ${id}`);
                }
              }
            } else {
              this.logger.warn(`Failed to parse define: "${trimmedLine}" - name: "${name}", id: ${id}`);
            }
          } else {
            this.logger.warn(`Invalid #define format: "${trimmedLine}" - parts: ${parts.length}`);
          }
        }
      } catch (error) {
        this.logger.error(`Exception processing line: "${line}" - ${error.message}`);
      }
    }

    // Wait for all Redis operations to complete
    if (redisOperations.length > 0) {
      await Promise.allSettled(redisOperations);
      this.logger.info(`Stored ${redisOperations.length} defines in Redis`);
    }

    this.logger.info(`Loaded ${defineCount} total defines (${miDefineCount} MI_ defines, ${oiDefineCount} OI_ defines)`);
  }

  public async load(): Promise<void> {
    const startTime = Date.now();
    this.logger.info("Starting monster resource load...");

    // Check file existence with detailed logging
    this.logger.info(`Checking for propMover.txt at: ${ResourcePaths.moversProp}`);
    if (!fs.existsSync(ResourcePaths.moversProp)) {
      this.logger.error(`CRITICAL: propMover.txt not found at ${ResourcePaths.moversProp}`);
      throw new Error(`Unable to load mover properties. Reason: cannot find '${ResourcePaths.moversProp}' file.`);
    }
    this.logger.info("✓ propMover.txt found");

    this.logger.info(`Checking for propMoverEx.inc at: ${ResourcePaths.moversPropExPath}`);
    if (!fs.existsSync(ResourcePaths.moversPropExPath)) {
      this.logger.error(`CRITICAL: propMoverEx.inc not found at ${ResourcePaths.moversPropExPath}`);
      throw new Error(`Unable to load extended mover properties. Reason: cannot find '${ResourcePaths.moversPropExPath}' file.`);
    }
    this.logger.info("✓ propMoverEx.inc found");

    this.logger.info("Files exist, loading defines...");
    await this.loadDefines();
    this.logger.info(`Defines loaded: ${this.defines.size} entries`);

    this.logger.info("Loading resource table from propMover.txt...");
    const resourceTable = new ResourceTableFile(ResourcePaths.moversProp, 0, this.defines);
    const movers = resourceTable.getRecords<any>();
    this.logger.info(`Parsed ${movers.length} movers from resource table`);

    let processedCount = 0;
    let skippedCount = 0;
    if (movers.length > 0) {
      this.logger.info(`First mover dwID: "${movers[0].dwID}", szName: "${movers[0].szName}"`);
    }

    for (const mover of movers) {
      let moverId: number;

      // Handle both cases: dwID might be a resolved number or still a string define name
      if (typeof mover.dwID === 'number') {
        // ResourceTableFile already resolved this to a numeric value
        moverId = mover.dwID;
        this.logger.info(`Using pre-resolved moverId: ${moverId} for ${mover.szName}`);
      } else {
        // dwID is still a string, look it up in defines
        moverId = this.defines.get(mover.dwID) || 0;
        if (moverId <= 0) {
          this.logger.warn(`Failed to resolve moverId for dwID="${mover.dwID}" (szName="${mover.szName}")`);
        }
      }

      if (moverId <= 0) {
        if (skippedCount < 5) { // Log first 5 skipped ones
          this.logger.warn(`Skipping mover dwID="${mover.dwID}" (szName="${mover.szName}") - not found in defines (moverId: ${moverId})`);
          // Also log what defines we do have
          const defineKeys = Array.from(this.defines.keys()).slice(0, 10);
          this.logger.info(`Available define keys (first 10): ${defineKeys.join(', ')}`);
        }
        skippedCount++;
        continue;
      }

      processedCount++;

      const moverProperties: MoverProperties = this.convertToNewMoverProperties(mover, moverId);

      if (!this.moversById.has(moverProperties.id)) {
        this.moversById.set(moverProperties.id, moverProperties);
      } else {
        this.logger.warn(`Failed to add mover: ${moverProperties.identifierName} (${moverProperties.name}). Mover already exists.`);
      }

      if (!this.moversByIdentifierName.has(moverProperties.identifierName!)) {
        this.moversByIdentifierName.set(moverProperties.identifierName!, moverProperties);
      } else {
        this.logger.warn(`Failed to add mover: ${moverProperties.identifierName} (${moverProperties.name}). Mover already exists.`);
      }
    }

    this.logger.info(`Processed ${processedCount} movers, skipped ${skippedCount} movers`);
    resourceTable.dispose();

    this.logger.info("Loading extended properties from propMoverEx.inc...");
    const moversPropExFile = new IncludeFile(ResourcePaths.moversPropExPath);
    this.logger.info(`Parsed ${moversPropExFile.Statements.length} statements from extended file`);

    for (const statement of moversPropExFile.Statements) {
      if (statement.type === 'block') {
        const moverId = this.defines.get(statement.name);
        if (moverId && this.moversById.has(moverId)) {
          const mover = this.moversById.get(moverId)!;
          const block = moversPropExFile.getBlock(statement.name);

          if (block) {
            this.loadDropGold(mover, block.getInstruction("DropGold"));
            this.loadDropItems(mover, block.getInstructions("DropItem"));
            this.loadDropItemsKind(mover, block.getInstructions("DropKind"));

            const maxDropVariable = block.getVariable("Maxitem");
            if (maxDropVariable) {
              mover.maxDropItem = Number(maxDropVariable.value);
            }
          }
        }
      }
    }

    moversPropExFile.dispose();

    const elapsed = Date.now() - startTime;
    this.logger.info(`${this.moversById.size} movers loaded in ${elapsed}ms.`);
  }

  private loadDropGold(mover: MoverProperties, dropGoldInstruction: Instruction | null): void {
    if (!dropGoldInstruction) {
      return;
    }

    if (dropGoldInstruction.parameters.length < 2) {
      this.logger.warn(`Cannot load 'DropGold' instruction for mover ${mover.name}. Reason: Missing parameters.`);
      return;
    }

    const minGold = parseInt(dropGoldInstruction.parameters[0], 10);
    const maxGold = parseInt(dropGoldInstruction.parameters[1], 10);

    if (isNaN(minGold)) {
      this.logger.warn(`Cannot load min gold amount for mover ${mover.name}.`);
    }

    if (isNaN(maxGold)) {
      this.logger.warn(`Cannot load max gold amount for mover ${mover.name}.`);
    }

    mover.dropGoldMin = minGold;
    mover.dropGoldMax = maxGold;
  }

  private loadDropItems(mover: MoverProperties, dropItemInstructions: Instruction[]): void {
    if (!dropItemInstructions || dropItemInstructions.length === 0) {
      return;
    }

    for (const dropItemInstruction of dropItemInstructions) {
      const dropItem: DropItemProperties = {
        itemId: 0,
        probability: 0,
        itemMaxRefine: 0,
        count: 0
      };

      const dropItemName = dropItemInstruction.parameters[0];
      const itemId = this.defines.get(dropItemName);

      if (itemId) {
        dropItem.itemId = itemId;
      } else {
        this.logger.warn(`Cannot find drop item id: ${dropItemName} for mover ${mover.name}.`);
        continue;
      }

      const probability = parseInt(dropItemInstruction.parameters[1], 10);
      if (!isNaN(probability)) {
        dropItem.probability = probability;
      } else {
        this.logger.warn(`Cannot read drop item probability for item ${dropItemName} and mover ${mover.name}.`);
      }

      const itemMaxRefine = parseInt(dropItemInstruction.parameters[2], 10);
      if (!isNaN(itemMaxRefine)) {
        dropItem.itemMaxRefine = itemMaxRefine;
      } else {
        this.logger.warn(`Cannot read drop item refine max for item ${dropItemName} and mover ${mover.name}.`);
      }

      const itemCount = parseInt(dropItemInstruction.parameters[3], 10);
      if (!isNaN(itemCount)) {
        dropItem.count = itemCount;
      } else {
        this.logger.warn(`Cannot read drop item count for item ${dropItemName} and mover ${mover.name}.`);
      }

      if (!mover.dropItems) {
        mover.dropItems = [];
      }
      mover.dropItems.push(dropItem);
    }
  }

  private loadDropItemsKind(mover: MoverProperties, instructions: Instruction[]): void {
    if (!instructions || instructions.length === 0) {
      return;
    }

    for (const dropItemKindInstruction of instructions) {
      if (dropItemKindInstruction.parameters.length < 1 || dropItemKindInstruction.parameters.length > 3) {
        this.logger.warn(`Cannot load 'DropKind' instruction for mover ${mover.name}. Reason: Missing parameters.`);
        continue;
      }

      const itemKindStr = dropItemKindInstruction.parameters[0].replace("IK3_", "");
      let itemKind: ItemKind3;

      try {
        itemKind = ItemKind3[itemKindStr as keyof typeof ItemKind3];
      } catch {
        this.logger.warn(`Cannot parse ItemKind3: ${itemKindStr} for mover ${mover.name}.`);
        continue;
      }

      const dropItemKind: DropItemKindProperties = {
        itemKind: itemKind,
        uniqueMin: Math.max((mover.level || 1) - 5, 1),
        uniqueMax: Math.max((mover.level || 1) - 2, 1)
      };

      if (!mover.dropItemsKind) {
        mover.dropItemsKind = [];
      }
      mover.dropItemsKind.push(dropItemKind);
    }
  }

  /**
   * Converts legacy dwXXX properties to new MoverProperties interface
   */
  private convertToNewMoverProperties(legacyMover: any, moverId: number): MoverProperties {
    return {
      id: moverId,
      identifierName: legacyMover.dwID || '',
      name: legacyMover.szName || '',
      AI: tryParseInt(legacyMover.dwAI) || 0,
      belligerence: tryParseInt(legacyMover.dwBelligerence) || 0,
      speed: tryParseFloat(legacyMover.fSpeed) || 0,
      addHp: tryParseInt(legacyMover.dwAddHp) || 0,
      addMp: tryParseInt(legacyMover.dwAddMp) || 0,
      level: tryParseInt(legacyMover.dwLevel) || 1,
      flightLevel: tryParseInt(legacyMover.dwFlightLevel) || 0,
      attackMin: tryParseInt(legacyMover.dwAtkMin) || 0,
      attackMax: tryParseInt(legacyMover.dwAtkMax) || 0,
      strength: tryParseInt(legacyMover.dwStr) || 0,
      stamina: tryParseInt(legacyMover.dwSta) || 0,
      dexterity: tryParseInt(legacyMover.dwDex) || 0,
      intelligence: tryParseInt(legacyMover.dwInt) || 0,
      hitRating: tryParseInt(legacyMover.dwHR) || 0,
      escapeRating: tryParseInt(legacyMover.dwER) || 0,
      class: tryParseInt(legacyMover.dwClass) || 0,
      naturalArmor: tryParseInt(legacyMover.dwNaturealArmor) || 0,
      magicResistance: tryParseInt(legacyMover.dwResisMagic) || 0,
      reAttackDelay: tryParseInt(legacyMover.dwReAttackDelay) || 0,
      attackSpeed: tryParseInt(legacyMover.dwAttackSpeed) || 0,
      correctionValue: tryParseInt(legacyMover.dwCorrectionValue) || 0,
      experience: tryParseInt(legacyMover.dwExpValue) || 0,
      element: this.parseElementType(legacyMover.eElementType),
      electricityResistance: tryParseFloat(legacyMover.fResistElecricity) || 0,
      fireResistance: tryParseFloat(legacyMover.fResistFire) || 0,
      windResistance: tryParseFloat(legacyMover.fResistWind) || 0,
      waterResistance: tryParseFloat(legacyMover.fResistWater) || 0,
      earthResistance: tryParseFloat(legacyMover.fResistEarth) || 0,
      isFlying: legacyMover.bFlying === 'TRUE' || legacyMover.bFlying === '1',
      dropGoldMin: 0,
      dropGoldMax: 0,
      maxDropItem: 0,
      dropItems: [],
      dropItemsKind: []
    };
  }

  /**
   * Parses element type from string to enum
   */
  private parseElementType(elementTypeStr: any): ElementType {
    if (!elementTypeStr) return ElementType.None;

    // Convert to string if it's not already a string
    const strValue = String(elementTypeStr);

    // Handle different formats: "FIRE", "Fire", "1", etc.
    const normalized = strValue.toUpperCase();
    switch (normalized) {
      case 'FIRE':
      case '1':
        return ElementType.Fire;
      case 'WATER':
      case '2':
        return ElementType.Water;
      case 'ELECTRICITY':
      case 'ELECTRIC':
      case '3':
        return ElementType.Electricity;
      case 'WIND':
      case '4':
        return ElementType.Wind;
      case 'EARTH':
      case '5':
        return ElementType.Earth;
      default:
        return ElementType.None;
    }
  }

  /**
   * Converts Redis data to new MoverProperties interface
   */
  private convertRedisDataToMoverProperties(data: { [key: string]: string }): MoverProperties {
    return {
      id: tryParseInt(data.id) || 0,
      identifierName: data.identifierName || '',
      name: data.name || '',
      AI: tryParseInt(data.AI) || 0,
      belligerence: tryParseInt(data.belligerence) || 0,
      speed: tryParseFloat(data.speed) || 0,
      addHp: tryParseInt(data.addHp) || 0,
      addMp: tryParseInt(data.addMp) || 0,
      level: tryParseInt(data.level) || 1,
      flightLevel: tryParseInt(data.flightLevel) || 0,
      attackMin: tryParseInt(data.attackMin) || 0,
      attackMax: tryParseInt(data.attackMax) || 0,
      strength: tryParseInt(data.strength) || 0,
      stamina: tryParseInt(data.stamina) || 0,
      dexterity: tryParseInt(data.dexterity) || 0,
      intelligence: tryParseInt(data.intelligence) || 0,
      hitRating: tryParseInt(data.hitRating) || 0,
      escapeRating: tryParseInt(data.escapeRating) || 0,
      class: tryParseInt(data.class) || 0,
      naturalArmor: tryParseInt(data.naturalArmor) || 0,
      magicResistance: tryParseInt(data.magicResistance) || 0,
      reAttackDelay: tryParseInt(data.reAttackDelay) || 0,
      attackSpeed: tryParseInt(data.attackSpeed) || 0,
      correctionValue: tryParseInt(data.correctionValue) || 0,
      experience: tryParseInt(data.experience) || 0,
      element: this.parseElementType(data.element),
      electricityResistance: tryParseFloat(data.electricityResistance) || 0,
      fireResistance: tryParseFloat(data.fireResistance) || 0,
      windResistance: tryParseFloat(data.windResistance) || 0,
      waterResistance: tryParseFloat(data.waterResistance) || 0,
      earthResistance: tryParseFloat(data.earthResistance) || 0,
      isFlying: data.isFlying === 'true',
      dropGoldMin: tryParseInt(data.dropGoldMin) || 0,
      dropGoldMax: tryParseInt(data.dropGoldMax) || 0,
      maxDropItem: tryParseInt(data.maxDropItem) || 0,
      dropItems: [],
      dropItemsKind: []
    };
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
