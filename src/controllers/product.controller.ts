import { Request, Response } from "express";
import { errorHandlerWrapper } from "@/utils";
import { productService } from "@/services";

const createProductHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, cost } = req.body;

        const { uuid } = req.user
        console.log({ uuid, uiid: req.user })


        const product = await productService.createProduct({ name, cost, userId: uuid });

        if (!product) {
            return res.status(400).json({
                message: "Failed to create product",
            });
        }

        return res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || "Failed to create product",
        });
    }
};

const getUserProductsHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, role } = req.user;
        console.log({ name })

        let product

        if (role === "admin") {
            product = await productService.getAllProducts();
        } else {
            product = await productService.getUserProducts(name);
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
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || "Failed to fetch product",
        });
    }
};

const getProductHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { productId } = req.params;

        const product = await productService.getProduct(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        return res.status(200).json({
            message: "Product retrieved successfully",
            product,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || "Failed to fetch product",
        });
    }
};

export const createProduct = errorHandlerWrapper(createProductHandler)
export const getProduct = errorHandlerWrapper(getProductHandler)
export const getUserProducts = errorHandlerWrapper(getUserProductsHandler)