/** @format */

import { productController } from "./../controllers";
import { authMiddleware } from "./../middlewares";
import { Router } from "express";

export const productRouter = Router();

productRouter.post("/", authMiddleware, productController.createProduct);
productRouter.get("/", authMiddleware, productController.getUserProducts);
productRouter.get("/:productId", productController.getProduct);
