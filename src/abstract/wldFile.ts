import fs from "fs-extra";
import { Vector3 } from "./vector3";
import { WorldData } from "../interfaces/resource";

export class WldFile {
  private static readonly DefaultMPU: number = 4;
  public worldData: WorldData;

  constructor(filePath: string) {
    this.read(filePath);
  }

  private read(filePath: string): void {
    try {
      const data: string = fs.readFileSync(filePath, "utf-8");

      const lines: string[] = data.split("\n");

      let size: Vector3 | null = null;
      let isIndoor: boolean = false;
      let canFly: boolean = false;
      let mpu: number = WldFile.DefaultMPU;
      let revivalMapId: number = 0;
      let revivalKey: string = "";

      for (const lineContent of lines) {
        const line: string = lineContent.trim().toLowerCase();

        if (!line || line.startsWith("//")) {
          continue;
        }

        const lineArray: string[] = line.split(" ");

        switch (lineArray[0].toLowerCase()) {
          case "size":
            size = this.readSize(lineArray);
            break;
          case "indoor":
            isIndoor = lineArray[1] === "1";
            break;
          case "fly":
            canFly = lineArray[1] === "1";
            break;
          case "mpu":
            mpu = parseInt(lineArray[1]);
            break;
          case "revival":
            revivalMapId = parseInt(lineArray[1]);
            revivalKey = lineArray[2].replace(/"/g, "");
            break;
        }
      }

      if (!size) {
        return;
      }

      this.worldData = {
        width: size.x,
        length: size.z,
        mpu,
        indoor: isIndoor,
        fly: canFly,
        revivalMapId,
        revivalKey,
      };
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }

  private readSize(lineArray: string[]): Vector3 {
    const width: string = lineArray[1].replace(",", "");
    const length: string = lineArray[2];

    return new Vector3(parseInt(width), 0, parseInt(length));
  }
}
