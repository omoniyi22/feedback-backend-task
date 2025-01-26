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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbacks = exports.createFeedback = void 0;
const datasource_1 = require("./../setup/datasource");
const feedback_entity_1 = require("./../entities/feedback.entity");
const product_entity_1 = require("./../entities/product.entity");
const user_entity_1 = require("./../entities/user.entity");
const sentiment_1 = __importDefault(require("sentiment"));
const createFeedback = (_a) => __awaiter(void 0, [_a], void 0, function* ({ customerName = "Anonymous", customerFeedback, productId, }) {
    const feedbackRepository = datasource_1.AppDataSource.getRepository(feedback_entity_1.FeedbackEntity);
    const userRepository = datasource_1.AppDataSource.getRepository(user_entity_1.UserEntity);
    const productRepository = datasource_1.AppDataSource.getRepository(product_entity_1.ProductEntity);
    console.log({ productId });
    const product = yield productRepository.findOne({
        where: { uuid: productId }, relations: ["user"], select: {
            user: {
                uuid: true,
                name: true
            }
        }
    });
    console.log({ product });
    const userId = product.user.uuid;
    if (!product) {
        throw new Error("Product not found");
    }
    console.log({ productId, userId });
    const user = yield userRepository.findOne({ where: { uuid: userId }, select: ["uuid", "name"] });
    if (!user) {
        throw new Error("User not found");
    }
    const sentimentAnalyzer = new sentiment_1.default();
    const sentimentResult = sentimentAnalyzer.analyze(customerFeedback);
    const sentiment = sentimentResult.score > 0 ? "positive" : sentimentResult.score < 0 ? "negative" : "neutral";
    const feedback = new feedback_entity_1.FeedbackEntity();
    Object.assign(feedback, {
        customerName,
        customerFeedback,
        sentiment,
        product,
    });
    return yield feedbackRepository.save(feedback);
});
exports.createFeedback = createFeedback;
const getFeedbacks = (_a) => __awaiter(void 0, [_a], void 0, function* ({ productId, }) {
    const feedbackRepository = datasource_1.AppDataSource.getRepository(feedback_entity_1.FeedbackEntity);
    const feedbacks = yield feedbackRepository.find({
        where: { product: { uuid: productId } },
        order: {
            createdAt: "DESC",
        },
    });
    return feedbacks;
});
exports.getFeedbacks = getFeedbacks;
//# sourceMappingURL=feedback.service.js.map