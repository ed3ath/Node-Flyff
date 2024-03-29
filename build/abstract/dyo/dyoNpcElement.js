"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DyoNpcElement = void 0;
const dyoElement_1 = require("./dyoElement");
class DyoNpcElement extends dyoElement_1.DyoElement {
    read(streamReader) {
        super.read(streamReader);
        this.name = this.convertToString(streamReader.readBytes(64));
        this.dialogName = this.convertToString(streamReader.readBytes(32));
        this.characterKey = this.convertToString(streamReader.readBytes(32));
        this.belligerence = streamReader.readInt32();
        this.extraFlag = streamReader.readInt32();
    }
    convertToString(buffer) {
        const nullTerminatorIndex = buffer.indexOf(0);
        if (nullTerminatorIndex !== -1) {
            return buffer.toString('utf8', 0, nullTerminatorIndex);
        }
        else {
            return buffer.toString('utf8');
        }
    }
}
exports.DyoNpcElement = DyoNpcElement;
