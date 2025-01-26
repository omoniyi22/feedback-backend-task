"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const controllers_1 = require("./../controllers");
const middlewares_1 = require("./../middlewares");
const express_1 = require("express");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.post("/", middlewares_1.authMiddleware, controllers_1.productController.createProduct);
exports.productRouter.get("/", middlewares_1.authMiddleware, controllers_1.productController.getUserProducts);
exports.productRouter.get("/:productId", controllers_1.productController.getProduct);
//# sourceMappingURL=product.router.js.map