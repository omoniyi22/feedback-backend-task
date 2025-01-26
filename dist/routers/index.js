"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./auth.router");
const feedback_router_1 = require("./feedback.router");
const product_router_1 = require("./product.router");
const router = express_1.default.Router();
router.use("/auth", auth_router_1.authRouter);
router.use("/products", product_router_1.productRouter);
router.use("/feedbacks", feedback_router_1.feedbackRouter);
exports.default = router;
//# sourceMappingURL=index.js.map