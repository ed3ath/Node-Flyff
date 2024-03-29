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
const genderType_1 = require("../common/genderType");
const equipmentItem_1 = __importDefault(require("./equipmentItem"));
const account_1 = __importDefault(require("./account"));
let CharacterEntity = class CharacterEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => account_1.default, (account) => account.characters),
    __metadata("design:type", account_1.default)
], CharacterEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], CharacterEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "level", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "bankPin", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "mapId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "positionX", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "positionY", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "positionZ", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "skinSetId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "hairId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "hairColor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "faceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "strength", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "stamina", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "intelligence", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "dexterity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "gold", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "statPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "skillPoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 0 }),
    __metadata("design:type", Number)
], CharacterEntity.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => equipmentItem_1.default, (equipmentItem) => equipmentItem.character),
    __metadata("design:type", Array)
], CharacterEntity.prototype, "equipments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CharacterEntity.prototype, "deleted", void 0);
CharacterEntity = __decorate([
    (0, typeorm_1.Entity)("Character")
], CharacterEntity);
exports.default = CharacterEntity;
