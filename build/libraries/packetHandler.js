"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketHandler = void 0;
const logger_1 = require("../helpers/logger");
class PacketHandler {
    constructor() {
        this.logger = new logger_1.Logger("Packet Handler");
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    send(packet) {
        this.userConnection.send(packet);
    }
    wrappedExecute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.execute();
            }
            catch (e) {
                console.log(e);
                this.logger.error(e);
                // if (this.userConnection) {
                //   this.userConnection.disconnect();
                // }
            }
        });
    }
}
exports.PacketHandler = PacketHandler;
