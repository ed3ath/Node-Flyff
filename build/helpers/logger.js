"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const cli_color_1 = __importDefault(require("cli-color"));
const moment_1 = __importDefault(require("moment"));
class Logger {
    constructor(sender) {
        this.sender = "MAIN";
        this.sender = sender;
    }
    info(...message) {
        this.log("info", ...message);
    }
    warn(...message) {
        this.log("warn", ...message);
    }
    error(...message) {
        this.log("error", ...message);
    }
    success(...message) {
        this.log("success", ...message);
    }
    main(...message) {
        this.log("main", ...message);
    }
    log(level = "main", ...message) {
        console.log(cli_color_1.default.blue((0, moment_1.default)().format("LTS")) +
            " " +
            Logger.SeverityMap[level](`[${this.sender.toUpperCase()}] ${level.toUpperCase()} -`) +
            " " +
            cli_color_1.default.white.bold(message.join(" ")));
    }
}
exports.Logger = Logger;
Logger.SeverityMap = {
    info: cli_color_1.default.cyan,
    warn: cli_color_1.default.yellow,
    error: cli_color_1.default.red,
    success: cli_color_1.default.green,
    main: cli_color_1.default.magenta,
};
