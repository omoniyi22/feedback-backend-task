import { ProductEntity } from "./../entities";
import { CreateProductRequestType } from "./../types";
export declare const createProduct: ({ name, cost, userId, }: CreateProductRequestType) => Promise<ProductEntity | null>;
export declare const getProduct: (productId: string) => Promise<ProductEntity | null>;
export declare const getUserProducts: (name: string) => Promise<ProductEntity[] | null>;
export declare const getAllProducts: () => Promise<ProductEntity[] | null>;
