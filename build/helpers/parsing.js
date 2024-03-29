"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryJsonParse = exports.cleanString = exports.tryParseFloat = exports.tryParseInt = void 0;
const lodash_1 = __importDefault(require("lodash"));
const tryParseInt = (value) => {
    try {
        return !lodash_1.default.isNaN(parseInt(value)) ? parseInt(value) : 0;
    }
    catch (_a) {
        return 0;
    }
};
exports.tryParseInt = tryParseInt;
const tryParseFloat = (value) => {
    try {
        return !lodash_1.default.isNaN(parseFloat(value)) ? parseFloat(value) : 0;
    }
    catch (_a) {
        return 0;
    }
};
exports.tryParseFloat = tryParseFloat;
const cleanString = (value) => {
    return value === "=" ? "" : value;
};
exports.cleanString = cleanString;
const tryJsonParse = (value) => {
    try {
        return JSON.parse(value);
    }
    catch (_a) {
        return value;
    }
};
exports.tryJsonParse = tryJsonParse;
