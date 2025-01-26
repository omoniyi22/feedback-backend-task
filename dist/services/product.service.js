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
exports.getAllProducts = exports.getUserProducts = exports.getProduct = exports.createProduct = void 0;
const entities_1 = require("./../entities");
const datasource_1 = require("./../setup/datasource");
const createProduct = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, cost, userId, }) {
    const productRepository = datasource_1.AppDataSource.getRepository(entities_1.ProductEntity);
    const userRepository = datasource_1.AppDataSource.getRepository(entities_1.UserEntity);
    const user = yield userRepository.findOne({ where: { uuid: userId }, select: ["uuid", "name"] });
    if (!user) {
        throw new Error("User not found");
    }
    const newProduct = new entities_1.ProductEntity();
    Object.assign(newProduct, { name, cost, user });
    return yield productRepository.save(newProduct);
});
exports.createProduct = createProduct;
const getProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = datasource_1.AppDataSource.getRepository(entities_1.ProductEntity);
    const product = yield productRepository.findOne({
        where: { uuid: productId },
        relations: ["user", "feedbacks"],
        select: { user: { "uuid": true, "name": true } }
    });
    if (product)
        return product;
    return null;
});
exports.getProduct = getProduct;
const getUserProducts = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = datasource_1.AppDataSource.getRepository(entities_1.ProductEntity);
    const product = yield productRepository.find({
        where: { user: { name } },
        relations: ["user", "feedbacks"],
        select: { user: { "uuid": true, "name": true } },
        order: {
            createdAt: "DESC",
        },
    });
    if (product)
        return product;
    return null;
});
exports.getUserProducts = getUserProducts;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const productRepository = datasource_1.AppDataSource.getRepository(entities_1.ProductEntity);
    const product = yield productRepository.find({
        relations: ["user", "feedbacks"],
        select: { user: { "uuid": true, "name": true } },
        order: {
            createdAt: "DESC",
        },
    });
    if (product)
        return product;
    return null;
});
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=product.service.js.map