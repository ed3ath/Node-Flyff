"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RgnFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const rgnRegion3_1 = require("./rgnRegion3");
const rgnRespawn7_1 = require("./rgnRespawn7");
class RgnFile {
    get Elements() {
        return this._elements;
    }
    constructor(filePath) {
        this.filePath = filePath;
        this._elements = [];
        this.read();
    }
    read() {
        try {
            const fileContent = fs_extra_1.default.readFileSync(this.filePath, "utf16le");
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
                    this._elements.push(new rgnRespawn7_1.RgnRespawn7(data));
                }
                else if (trimmedLine.startsWith("region3")) {
                    if (data.length < 32) {
                        continue;
                    }
                    this._elements.push(new rgnRegion3_1.RgnRegion3(data));
                }
            }
        }
        catch (error) {
            console.error("Error reading RgnFile:", error);
        }
    }
    getElements() {
        return this._elements.filter((x) => x);
    }
}
exports.RgnFile = RgnFile;
