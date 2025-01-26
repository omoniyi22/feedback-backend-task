"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackRouter = void 0;
const controllers_1 = require("./../controllers");
const middlewares_1 = require("./../middlewares");
const express_1 = require("express");
exports.feedbackRouter = (0, express_1.Router)();
exports.feedbackRouter.post("/:productId", controllers_1.feedbackController.createFeedback);
exports.feedbackRouter.get("/:productId", middlewares_1.authMiddleware, controllers_1.feedbackController.getFeedbacks);
//# sourceMappingURL=feedback.router.js.map