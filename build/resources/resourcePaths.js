"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcePaths = void 0;
const path_1 = __importDefault(require("path"));
const resPath = path_1.default.join(__dirname, "res");
exports.ResourcePaths = {
    itemsProp: path_1.default.join(resPath, "data", "propItem.txt"),
    itemsText: path_1.default.join(resPath, "data", "propItem.txt.txt"),
    defineItem: path_1.default.join(resPath, "data", "defineItem.h"),
    defineItemKind: path_1.default.join(resPath, "data", "defineItemKind.h"),
    defineJob: path_1.default.join(resPath, "data", "defineJob.h"),
    moversProp: path_1.default.join(resPath, "data", "propMover.txt"),
    moversText: path_1.default.join(resPath, "data", "propMover.txt.txt"),
    moversEx: path_1.default.join(resPath, "custom", "propMoverEx.yaml"),
    defineObject: path_1.default.join(resPath, "data", "defineObj.h"),
    character: path_1.default.join(resPath, "custom", "characters.yaml"),
    characterText: path_1.default.join(resPath, "data", "character.txt.txt"),
    characterSchool: path_1.default.join(resPath, "custom", "characterSchool.yaml"),
    characterSchoolText: path_1.default.join(resPath, "data", "character-school.txt.txt"),
    dialogsDir: path_1.default.join(__dirname, "dialogs"),
    shopsDir: path_1.default.join(__dirname, "shops"),
    job: path_1.default.join(resPath, "custom", "job.yaml"),
    expCharacter: path_1.default.join(resPath, "custom", "expCharacter.yaml"),
    expDropLuck: path_1.default.join(resPath, "custom", "expDropLuck.yaml"),
    deathPenalty: path_1.default.join(resPath, "custom", "deathPenalty.yaml"),
    worldPath: path_1.default.join(resPath, "custom", "world.yaml"),
    world: path_1.default.join(__dirname, "maps"),
    defineWorld: path_1.default.join(resPath, "data", "defineWorld.h")
};
