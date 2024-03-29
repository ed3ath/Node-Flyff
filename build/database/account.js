"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const authorityType_1 = require("../common/authorityType");
const character_1 = __importDefault(require("./character"));
let AccountEntity = class AccountEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)() // Primary key with auto-increment
    ,
    __metadata("design:type", Number)
], AccountEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, unique: true }) // Column definition with constraints
    ,
    __metadata("design:type", String)
], AccountEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }) // Optional column with default value
    ,
    __metadata("design:type", String)
], AccountEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], AccountEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: authorityType_1.AuthorityType.Player }),
    __metadata("design:type", String)
], AccountEntity.prototype, "authority", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AccountEntity.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AccountEntity.prototype, "banned", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AccountEntity.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], AccountEntity.prototype, "lastActivity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => character_1.default, (character) => character.account),
    __metadata("design:type", Array)
], AccountEntity.prototype, "characters", void 0);
AccountEntity = __decorate([
    (0, typeorm_1.Entity)("Account")
], AccountEntity);
exports.default = AccountEntity;
