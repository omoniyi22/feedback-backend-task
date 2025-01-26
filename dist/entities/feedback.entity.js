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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const product_entity_1 = require("./product.entity");
let FeedbackEntity = class FeedbackEntity {
};
exports.FeedbackEntity = FeedbackEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "customer_name", default: "Anonymous", nullable: true }),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "customerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "customer_feedback", type: "text" }),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "customerFeedback", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FeedbackEntity.prototype, "sentiment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.feedbacks),
    __metadata("design:type", user_entity_1.UserEntity)
], FeedbackEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.feedbacks, { onDelete: "CASCADE" }),
    __metadata("design:type", product_entity_1.ProductEntity)
], FeedbackEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FeedbackEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], FeedbackEntity.prototype, "updatedAt", void 0);
exports.FeedbackEntity = FeedbackEntity = __decorate([
    (0, typeorm_1.Entity)()
], FeedbackEntity);
//# sourceMappingURL=feedback.entity.js.map