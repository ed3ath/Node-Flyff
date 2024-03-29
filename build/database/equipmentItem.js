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
const item_1 = __importDefault(require("./item"));
const character_1 = __importDefault(require("./character"));
let EquipmentItemEntity = class EquipmentItemEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)() // Primary key with auto-increment
    ,
    __metadata("design:type", Number)
], EquipmentItemEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => character_1.default, (character) => character.equipments),
    __metadata("design:type", character_1.default)
], EquipmentItemEntity.prototype, "character", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], EquipmentItemEntity.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => item_1.default),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", item_1.default)
], EquipmentItemEntity.prototype, "item", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], EquipmentItemEntity.prototype, "quantity", void 0);
EquipmentItemEntity = __decorate([
    (0, typeorm_1.Entity)("EquipmentItem")
], EquipmentItemEntity);
exports.default = EquipmentItemEntity;
