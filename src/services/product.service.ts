/** @format */
import { ProductEntity, UserEntity } from "./../entities";
import { AppDataSource } from "./../setup/datasource";
import { CreateProductRequestType } from "./../types";

export const createProduct = async ({
    name,
    cost,
    userId,
}: CreateProductRequestType): Promise<ProductEntity | null> => {
    const productRepository = AppDataSource.getRepository(ProductEntity);
    const userRepository = AppDataSource.getRepository(UserEntity);


    const user = await userRepository.findOne({ where: { uuid: userId }, select: ["uuid", "name"] });

    if (!user) {
        throw new Error("User not found");
    }

    const newProduct = new ProductEntity();
    Object.assign(newProduct, { name, cost, user });

    return await productRepository.save(newProduct);
};

export const getProduct = async (productId: string): Promise<ProductEntity | null> => {
    const productRepository = AppDataSource.getRepository(ProductEntity);

    const product: ProductEntity | null = await productRepository.findOne({
        where: { uuid: productId },
        relations: ["user", "feedbacks"],
        select: { user: { "uuid": true, "name": true } }
    });

    if (product) return product;
    return null;
};

export const getUserProducts = async (name: string): Promise<ProductEntity[] | null> => {
    const productRepository = AppDataSource.getRepository(ProductEntity);

    const product: ProductEntity[] = await productRepository.find({
        where: { user: { name } },
        relations: ["user", "feedbacks"],
        select: { user: { "uuid": true, "name": true } },
        order: {
            createdAt: "DESC",
        },
    });

    if (product) return product;
    return null;
};
export const getAllProducts = async (): Promise<ProductEntity[] | null> => {
    const productRepository = AppDataSource.getRepository(ProductEntity);

    const product: ProductEntity[] = await productRepository.find({
        relations: ["user", "feedbacks"],
        select: { user: { "uuid": true, "name": true } },
        order: {
            createdAt: "DESC",
        },
    });

    if (product) return product;
    return null;
};
