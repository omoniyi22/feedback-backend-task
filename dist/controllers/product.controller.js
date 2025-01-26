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
exports.getUserProducts = exports.getProduct = exports.createProduct = void 0;
const utils_1 = require("./../utils");
const services_1 = require("./../services");
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, cost } = req.body;
        const { uuid } = req.user;
        console.log({ uuid, uiid: req.user });
        const product = yield services_1.productService.createProduct({ name, cost, userId: uuid });
        if (!product) {
            return res.status(400).json({
                message: "Failed to create product",
            });
        }
        return res.status(201).json({
            message: "Product created successfully",
            product,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to create product",
        });
    }
});
const getUserProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, role } = req.user;
        console.log({ name });
        let product;
        if (role === "admin") {
            product = yield services_1.productService.getAllProducts();
        }
        else {
            product = yield services_1.productService.getUserProducts(name);
        }
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json({
            message: "Product retrieved successfully",
            product,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to fetch product",
        });
    }
});
const getProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield services_1.productService.getProduct(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        return res.status(200).json({
            message: "Product retrieved successfully",
            product,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message || "Failed to fetch product",
        });
    }
});
exports.createProduct = (0, utils_1.errorHandlerWrapper)(createProductHandler);
exports.getProduct = (0, utils_1.errorHandlerWrapper)(getProductHandler);
exports.getUserProducts = (0, utils_1.errorHandlerWrapper)(getUserProductsHandler);
//# sourceMappingURL=product.controller.js.map