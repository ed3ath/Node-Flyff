"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DyoFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const lodash_1 = __importDefault(require("lodash"));
const binaryStream_1 = require("../../libraries/binaryStream");
const dyoElement_1 = require("./dyoElement");
const worldObjectType_1 = require("../../common/worldObjectType");
const dyoCommonControlElement_1 = require("./dyoCommonControlElement");
const dyoNpcElement_1 = require("./dyoNpcElement");
class DyoFile {
    constructor(dyoFilePath) {
        this._elements = [];
        const data = fs_extra_1.default.readFileSync(dyoFilePath, "binary");
        const buffer = Buffer.from(data, "binary");
        const streamReader = new binaryStream_1.BinaryStream(buffer);
        while (streamReader.position < streamReader.buffer.length) {
            let rgnElement = null;
            const type = streamReader.readUInt32LE();
            switch (type) {
                case worldObjectType_1.WorldObjectType.Control:
                    rgnElement = new dyoCommonControlElement_1.DyoCommonControlElement();
                    break;
                case worldObjectType_1.WorldObjectType.Mover:
                    rgnElement = new dyoNpcElement_1.DyoNpcElement();
                    break;
                case worldObjectType_1.WorldObjectType.Object:
                case worldObjectType_1.WorldObjectType.Item:
                case worldObjectType_1.WorldObjectType.Ship:
                    rgnElement = new dyoElement_1.DyoElement();
                    break;
            }
            if (!rgnElement) {
                break;
            }
            rgnElement.elementType = type;
            rgnElement.read(streamReader);
            if (!lodash_1.default.isUndefined(rgnElement.angle)) {
                this._elements.push(rgnElement);
            }
        }
    }
    get Elements() {
        return this._elements;
    }
    getElements() {
        return this._elements.filter((element) => element);
    }
}
exports.DyoFile = DyoFile;
