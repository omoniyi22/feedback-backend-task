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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbacks = exports.createFeedback = void 0;
const services_1 = require("./../services");
const utils_1 = require("./../utils");
const createFeedbackHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { productId } = req.params;
        const { customerName, customerFeedback } = req.body;
        const feedback = yield services_1.feedbackService.createFeedback({
            customerName,
            customerFeedback,
            productId
        });
        return res.status(201).json({
            message: "Feedback created successfully",
            feedback,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to create feedback",
        });
    }
});
const getFeedbackHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const feedbacks = yield services_1.feedbackService.getFeedbacks({ productId });
        return res.status(200).json({
            message: "Feedbacks retrieved successfully",
            feedbacks,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to fetch feedbacks",
        });
    }
});
exports.createFeedback = (0, utils_1.errorHandlerWrapper)(createFeedbackHandler);
exports.getFeedbacks = (0, utils_1.errorHandlerWrapper)(getFeedbackHandler);
//# sourceMappingURL=feedback.controller.js.map