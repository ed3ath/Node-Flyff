import fs from "fs-extra";
import { Logger } from "../helpers/logger";
import { IncludeFile, Block } from "../helpers/includeFile";
import { ResourcePaths } from "./resourcePaths";
import { CharacterExpTableProperties } from "../interfaces/characterExpTableProperties";

export class ExperienceTableResources {
  private readonly logger: Logger;
  private expDropLuck: number[][] = [];
  private characterExpTable: Map<number, CharacterExpTableProperties> = new Map();

  constructor() {
    this.logger = new Logger("ExperienceTableResources");
  }

  public load(): void {
    const startTime = Date.now();
    const expTablePath = ResourcePaths.expTablePath;

    if (!fs.existsSync(expTablePath)) {
      this.logger.warn(`Unable to load exp table. Reason: Cannot find '${expTablePath}' file.`);
      return;
    }

    try {
      const expTableFile = new IncludeFile(expTablePath, "([(){}=,;\\n\\r\\t ])");

      const dropLuckBlock = expTableFile.getBlock("expDropLuck");
      if (!dropLuckBlock) {
        this.logger.warn("Unable to load exp table. Reason: Cannot find drop luck data.");
        expTableFile.dispose();
        return;
      }

      const expCharacterBlock = expTableFile.getBlock("expCharacter");
      if (!expCharacterBlock) {
        this.logger.warn("Unable to load exp table. Reason: Cannot find character experience data.");
        expTableFile.dispose();
        return;
      }

      this.expDropLuck = this.loadDropLuck(dropLuckBlock);
      this.characterExpTable = this.loadCharacterExperience(expCharacterBlock);

      expTableFile.dispose();

      const elapsed = Date.now() - startTime;
      this.logger.info(`Experience tables loaded in ${elapsed}ms.`);
    } catch (error) {
      this.logger.error(`Failed to load experience tables: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  public getDropLuck(level: number, refine: number): number {
    if (level < 1 || level > this.expDropLuck.length) {
      return 0;
    }

    const levelArray = this.expDropLuck[level - 1];
    if (!levelArray || refine < 0 || refine >= levelArray.length) {
      return 0;
    }

    return levelArray[refine];
  }

  public getCharacterExp(level: number): CharacterExpTableProperties | null {
    return this.characterExpTable.get(level) || null;
  }

  private loadDropLuck(dropLuckBlock: Block): number[][] {
    const values = dropLuckBlock.unknownStatements.map(x => parseInt(x, 10));
    const result: number[][] = [];

    for (let i = 0; i < values.length; i += 11) {
      const group = values.slice(i, i + 11);
      if (group.length === 11) {
        result.push(group);
      }
    }

    return result;
  }

  private loadCharacterExperience(expTableBlock: Block): Map<number, CharacterExpTableProperties> {
    const values = expTableBlock.unknownStatements;
    const result = new Map<number, CharacterExpTableProperties>();

    for (let i = 0; i < values.length; i += 4) {
      if (i + 3 < values.length) {
        const level = Math.floor(i / 4);
        const properties: CharacterExpTableProperties = {
          level: level,
          exp: parseInt(values[i], 10),
          pxp: parseInt(values[i + 1], 10),
          gp: parseInt(values[i + 2], 10),
          limitExp: parseInt(values[i + 3], 10)
        };

        result.set(level, properties);
      }
    }

    return result;
  }
}