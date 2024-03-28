import fs from "fs-extra";

import { RgnElement } from "./rgnElement";
import { RgnRegion3 } from "./rgnRegion3";
import { RgnRespawn7 } from "./rgnRespawn7";

export class RgnFile {
  private readonly _elements: RgnElement[] = [];

  public get Elements(): ReadonlyArray<RgnElement> {
    return this._elements;
  }

  constructor(private readonly filePath: string) {
    this.read();
  }

  private read(): void {
    try {
      const fileContent = fs.readFileSync(this.filePath, "utf16le");
      const lines = fileContent.split("\n");

      for (const line of lines) {
        const trimmedLine = line.trim();

        if (!trimmedLine || trimmedLine.startsWith("//")) {
          continue;
        }

        const data = trimmedLine.split(/\s+/);

        if (trimmedLine.startsWith("respawn7")) {
          if (data.length < 24) {
            continue;
          }

          this._elements.push(new RgnRespawn7(data));
        } else if (trimmedLine.startsWith("region3")) {
          if (data.length < 32) {
            continue;
          }

          this._elements.push(new RgnRegion3(data));
        }
      }
    } catch (error) {
      console.error("Error reading RgnFile:", error);
    }
  }

  public getElements<T extends RgnElement>(): T[] {
    return this._elements.filter((x) => x) as T[];
  }
}
