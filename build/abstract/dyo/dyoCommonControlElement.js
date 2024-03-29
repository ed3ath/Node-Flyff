"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DyoCommonControlElement = void 0;
const defineJob_1 = require("../../common/defineJob");
const dyoElement_1 = require("./dyoElement");
class DyoCommonControlElement extends dyoElement_1.DyoElement {
    constructor() {
        super();
        this.CommonControlVersion1 = 0x80000000;
        this.CommonControlVersion2 = 0x90000000;
        this.MaxControlDropItem = 4;
        this.MaxControlDropMonster = 3;
        this.MaxTrap = 3;
        this.MaxKey = 64;
        // Define the size of the data structure
        this.Size = 432;
        this.setJob = new Array(defineJob_1.JobMax.MAX_JOB);
        this.insideItemKind = new Array(this.MaxControlDropItem);
        this.insideItemPer = new Array(this.MaxControlDropItem);
        this.monsterResistanceKind = new Array(this.MaxControlDropMonster);
        this.monsterResistanceNum = new Array(this.MaxControlDropMonster);
        this.monsterActionAttack = new Array(this.MaxControlDropMonster);
        this.trapKind = new Array(this.MaxTrap);
        this.trapLevel = new Array(this.MaxTrap);
        this.insideItemKind.fill(0);
        this.insideItemPer.fill(0);
        this.monsterResistanceKind.fill(0);
        this.monsterResistanceNum.fill(0);
        this.monsterActionAttack.fill(0);
        this.trapKind.fill(0);
        this.trapLevel.fill(0);
    }
    read(streamReader) {
        this.version = streamReader.readUInt32();
        if (this.version === this.CommonControlVersion1) {
            this.set = streamReader.readUInt32();
            this.setItem = streamReader.readUInt32();
            this.setLevel = streamReader.readUInt32();
            this.setQuestNum = streamReader.readUInt32();
            this.setFlagNum = streamReader.readUInt32();
            this.setGender = streamReader.readUInt32();
            for (let i = 0; i < this.setJob.length; i++) {
                this.setJob[i] = streamReader.readInt32() === 1;
            }
            this.setEndu = streamReader.readUInt32();
            this.minItemNum = streamReader.readUInt32();
            this.maxItemNum = streamReader.readUInt32();
            for (let i = 0; i < this.MaxControlDropItem; i++) {
                this.insideItemKind[i] = streamReader.readUInt32();
                this.insideItemPer[i] = streamReader.readUInt32();
            }
            for (let i = 0; i < this.MaxControlDropMonster; i++) {
                this.monsterResistanceKind[i] = streamReader.readUInt32();
                this.monsterResistanceNum[i] = streamReader.readUInt32();
                this.monsterActionAttack[i] = streamReader.readUInt32();
            }
            this.trapOperTime = streamReader.readUInt32();
            this.trapRandomPer = streamReader.readUInt32();
            this.trapDelay = streamReader.readUInt32();
            for (let i = 0; i < this.MaxTrap; i++) {
                this.trapKind[i] = streamReader.readUInt32();
                this.trapLevel[i] = streamReader.readUInt32();
            }
            this.linkControlKey = streamReader.readBytes(this.MaxKey).toString('utf8');
            this.controlKey = streamReader.readBytes(this.MaxKey).toString('utf8');
            this.setQuestNum1 = streamReader.readUInt32();
            this.setFlagNum1 = streamReader.readUInt32();
            this.setQuestNum2 = streamReader.readUInt32();
            this.setFlagNum2 = streamReader.readUInt32();
            this.setItemCount = streamReader.readUInt32();
            this.teleportWorldId = streamReader.readUInt32();
            this.teleportX = streamReader.readUInt32();
            this.teleportY = streamReader.readUInt32();
            this.teleportZ = streamReader.readUInt32();
        }
        else if (this.version === this.CommonControlVersion2) {
            this.set = streamReader.readUInt32();
            this.setItem = streamReader.readUInt32();
            this.setLevel = streamReader.readUInt32();
            this.setQuestNum = streamReader.readUInt32();
            this.setFlagNum = streamReader.readUInt32();
            this.setGender = streamReader.readUInt32();
            for (let i = 0; i < this.setJob.length; i++) {
                this.setJob[i] = streamReader.readInt32() === 1;
            }
            this.setEndu = streamReader.readUInt32();
            this.minItemNum = streamReader.readUInt32();
            this.maxItemNum = streamReader.readUInt32();
            for (let i = 0; i < this.MaxControlDropItem; i++) {
                this.insideItemKind[i] = streamReader.readUInt32();
            }
            this.insideItemPer[0] = streamReader.readUInt32();
            this.trapOperTime = streamReader.readUInt32();
            this.trapRandomPer = streamReader.readUInt32();
            this.trapDelay = streamReader.readUInt32();
            for (let i = 0; i < this.MaxTrap; i++) {
                this.trapKind[i] = streamReader.readUInt32();
                this.trapLevel[i] = streamReader.readUInt32();
            }
            this.linkControlKey = streamReader.readBytes(this.MaxKey).toString('utf8');
            this.controlKey = streamReader.readBytes(this.MaxKey).toString('utf8');
            this.setQuestNum1 = streamReader.readUInt32();
            this.setFlagNum1 = streamReader.readUInt32();
            this.setQuestNum2 = streamReader.readUInt32();
            this.setFlagNum2 = streamReader.readUInt32();
            this.setItemCount = streamReader.readUInt32();
            this.teleportWorldId = streamReader.readUInt32();
            this.teleportX = streamReader.readUInt32();
            this.teleportY = streamReader.readUInt32();
            this.teleportZ = streamReader.readUInt32();
        }
        else {
            this.set = this.version;
            streamReader.position += this.Size - 4 * 10; // sizeof(uint) * 10;
            this.setItem = streamReader.readUInt32();
        }
    }
}
exports.DyoCommonControlElement = DyoCommonControlElement;
