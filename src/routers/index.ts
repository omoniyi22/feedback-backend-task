/** @format */

import express from "express";
import { authRouter } from "./auth.router";
import { feedbackRouter } from "./feedback.router";
import { productRouter } from "./product.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/feedbacks", feedbackRouter);

export default router;
