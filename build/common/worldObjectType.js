"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldObjectType = void 0;
var WorldObjectType;
(function (WorldObjectType) {
    WorldObjectType[WorldObjectType["Object"] = 0] = "Object";
    WorldObjectType[WorldObjectType["Animation"] = 1] = "Animation";
    WorldObjectType[WorldObjectType["Control"] = 2] = "Control";
    WorldObjectType[WorldObjectType["SFX"] = 3] = "SFX";
    WorldObjectType[WorldObjectType["Item"] = 4] = "Item";
    WorldObjectType[WorldObjectType["Mover"] = 5] = "Mover";
    WorldObjectType[WorldObjectType["Region"] = 6] = "Region";
    WorldObjectType[WorldObjectType["Ship"] = 7] = "Ship";
    WorldObjectType[WorldObjectType["Path"] = 8] = "Path";
})(WorldObjectType || (exports.WorldObjectType = WorldObjectType = {}));
