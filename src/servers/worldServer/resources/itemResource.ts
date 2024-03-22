import fs from "fs-extra";
import path from "path";
import _ from "lodash";

import { Logger } from "../../../helpers/logger";
import { ItemProperties } from "../../../interfaces/itemProperties";

export class ItemResources {
  logger: Logger;
  defineItemPath: string;
  itemsPropPath: string;
  defines: Map<string, number> = new Map();
  itemsById: Map<number, ItemProperties> = new Map();
  itemsByName: Map<string, ItemProperties> = new Map();

  constructor(defineItemPath: string, itemsPropPath: string) {
    this.logger = new Logger("Item Resources");
    this.defineItemPath = defineItemPath;
    this.itemsPropPath = itemsPropPath;
  }

  public get(itemIdentifier: string | number): ItemProperties | null {
    const itemId =
      typeof itemIdentifier === "number"
        ? itemIdentifier
        : this.defines[itemIdentifier];
    if (itemId !== undefined) {
      return this.itemsById.get(itemId) || null;
    }
    return null;
  }

  public where(predicate: (item: ItemProperties) => boolean): ItemProperties[] {
    return [...this.itemsById.values()].filter(predicate);
  }

  public loadDefines(): void {
    const absolutePath = path.resolve(this.defineItemPath);
    if (!fs.existsSync(absolutePath)) {
      throw new Error(
        `Unable to load items. Reason: cannot find '${absolutePath}' file.`
      );
    }

    const data = fs.readFileSync(absolutePath, "utf8");

    const lines = data.split("\n");
    for (const line of lines) {
      if (line.trim().startsWith("#define")) {
        const parts = line.trim().split(/\s+/);
        const id = this.tryParseInt(parts[2]);
        const name = parts[1];
        if (!isNaN(id) && name !== "") {
          this.defines.set(name, id);
        }
      }
    }
  }

  public loadItems(): void {
    const absolutePath = path.resolve(this.itemsPropPath);
    if (!fs.existsSync(absolutePath)) {
      this.logger.warn(
        `Unable to load items. Reason: cannot find '${absolutePath}' file.`
      );
    }
    if (!this.defines.size) {
      this.logger.warn(`Unable to load items. Reason: item defines is empty`);
    }

    const data = fs.readFileSync(absolutePath, "utf8");

    // Parse data and load items
    const lines = data.split("\n");
    for (const line of lines) {
      const items = line.trim().split("\t");

      if (items[1] === "II_ARM_M_RIN_BOOTS04") {
        console.log(items[5], items[16], items[17]);
      }
      const item: ItemProperties = {
        id: this.defines.get(items[1]),
        ver6: this.tryParseInt(items[0]),
        dwID: items[1],
        szName: items[2],
        dwPackMax: this.tryParseInt(items[4]),
        dwItemKind1: this.cleanString(items[5]),
        dwItemKind2: this.cleanString(items[6]),
        dwItemKind3: this.cleanString(items[7]),
        dwItemJob: this.cleanString(items[8]),
        bPermanence: items[9] === "TRUE",
        dwUseable: items[10] === "TRUE",
        dwItemSex: this.tryParseInt(items[11]),
        dwCost: this.tryParseInt(items[12]),
        dwLimitLevel1: this.tryParseInt(items[14]),
        dwParts: this.cleanString(items[15]),
        dwAbilityMin: this.tryParseInt(items[16]),
        dwAbilityMax: this.tryParseInt(items[17]),
        eItemType: this.cleanString(items[18]),
        dwItemLV: this.tryParseInt(items[19]),
        dwItemRare: this.tryParseInt(items[20]),
        dwAttackSpeed: this.tryParseFloat(items[21]),
        dwDestParam1: this.tryParseInt(items[22]),
        dwDestParam2: this.tryParseInt(items[23]),
        dwDestParam3: this.tryParseInt(items[24]),
        nAdjParamVal1: this.tryParseInt(items[25]),
        nAdjParamVal2: this.tryParseInt(items[26]),
        nAdjParamVal3: this.tryParseInt(items[27]),
        dwCircleTime: this.tryParseInt(items[28]),
        dwSfxObj: this.tryParseInt(items[29]),
        dwSfxObj2: this.tryParseInt(items[30]),
        dwSfxObj3: this.tryParseInt(items[31]),
        dwSfxObj4: this.tryParseInt(items[32]),
        dwSfxObj5: this.tryParseInt(items[33]),
        dwSkillReady: this.tryParseInt(items[34]),
        dwWeaponType: this.tryParseInt(items[35]),
        dwItemAtkOrder1: this.tryParseInt(items[36]),
        dwItemAtkOrder2: this.tryParseInt(items[37]),
        dwItemAtkOrder3: this.tryParseInt(items[38]),
        dwItemAtkOrder4: this.tryParseInt(items[39]),
        dwSkillReadyType: this.tryParseInt(items[40]),
        dwReferStat1: this.cleanString(items[41]),
        dwAddSkillMin: this.tryParseInt(items[42]),
        dwAddSkillMax: this.tryParseInt(items[43]),
        dwReqMp: this.tryParseInt(items[44]),
        dwReqFp: this.tryParseInt(items[45]),
        bCharged: items[46] === "TRUE",
        dwReferStat2: this.tryParseInt(items[47]),
        dwReferTarget1: this.tryParseInt(items[48]),
        dwReferTarget2: this.tryParseInt(items[49]),
        dwReferValue1: this.tryParseInt(items[50]),
        dwReferValue2: this.tryParseInt(items[51]),
        dwFlightLimit: this.tryParseInt(items[52]),
        dwFFuelReMax: this.tryParseInt(items[53]),
        dwAFuelReMax: this.tryParseInt(items[54]),
        dwLimitLevel: this.tryParseInt(items[55]),
        dwReflect: this.tryParseInt(items[56]),
        szIcon: this.cleanString(items[57]),
        dwQuestID: this.tryParseInt(items[58]),
        szTextFile: this.cleanString(items[59]),
        szComment: this.cleanString(items[60]),
      };

      if (item.id) {
        this.itemsById.set(item.id, item);
        this.itemsByName.set(item.szName, item);
      }
    }

    this.logger.info(`${this.itemsById.size} items loaded.`);
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
}
