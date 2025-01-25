/** @format */

import { feedbackController } from "@/controllers";
import { authMiddleware } from "@/middlewares";
import { Router } from "express";

export const feedbackRouter = Router();

feedbackRouter.post("/:productId", feedbackController.createFeedback);
feedbackRouter.get("/:productId", authMiddleware, feedbackController.getFeedbacks);
