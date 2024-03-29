"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WldFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const vector3_1 = require("./vector3");
class WldFile {
    constructor(filePath) {
        this.read(filePath);
    }
    read(filePath) {
        try {
            const data = fs_extra_1.default.readFileSync(filePath, "utf-8");
            const lines = data.split("\n");
            let size = null;
            let isIndoor = false;
            let canFly = false;
            let mpu = WldFile.DefaultMPU;
            let revivalMapId = 0;
            let revivalKey = "";
            for (const lineContent of lines) {
                const line = lineContent.trim().toLowerCase();
                if (!line || line.startsWith("//")) {
                    continue;
                }
                const lineArray = line.split(" ");
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
        }
        catch (error) {
            console.error("Error reading file:", error);
        }
    }
    readSize(lineArray) {
        const width = lineArray[1].replace(",", "");
        const length = lineArray[2];
        return new vector3_1.Vector3(parseInt(width), 0, parseInt(length));
    }
}
exports.WldFile = WldFile;
WldFile.DefaultMPU = 4;
