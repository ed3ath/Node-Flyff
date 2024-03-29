"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlerBuilder = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("path");
const lodash_1 = __importDefault(require("lodash"));
const logger_1 = require("../helpers/logger");
const builderType_1 = require("../common/builderType");
class HandlerBuilder {
    constructor() {
        this.handlers = new Map();
        this.logger = new logger_1.Logger(builderType_1.BuilderType.HANDLER_BUILDER);
    }
    setBasePath(basePath) {
        if (!fs_extra_1.default.existsSync(basePath)) {
            this.logger.error(`Cannot find base path ${basePath}.`);
            return;
        }
        this.basePath = basePath;
    }
    loadHandlers() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fs_extra_1.default.existsSync(this.basePath)) {
                this.logger.error(`Cannot find base path ${this.basePath}.`);
                return;
            }
            const handlersFolder = (0, path_1.join)(this.basePath, "handlers");
            if (!fs_extra_1.default.existsSync(handlersFolder))
                return;
            const files = fs_extra_1.default.readdirSync(handlersFolder);
            if (!files.length)
                return;
            yield Promise.all(lodash_1.default.map(files, (file) => __awaiter(this, void 0, void 0, function* () {
                const handlerModule = yield Promise.resolve(`${(0, path_1.join)(handlersFolder, file)}`).then(s => __importStar(require(s)));
                if (handlerModule && handlerModule.default) {
                    const HandlerClass = handlerModule.default;
                    const decoratedKey = Reflect.getMetadata("packetType", HandlerClass);
                    if (decoratedKey) {
                        this.handlers.set(decoratedKey, HandlerClass);
                    }
                }
            })));
        });
    }
    build() {
        this.logger.main(this.handlers.size, "handlers loaded");
        return this.handlers;
    }
}
exports.HandlerBuilder = HandlerBuilder;
