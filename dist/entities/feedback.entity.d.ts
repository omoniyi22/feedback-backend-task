import { UserEntity } from "./user.entity";
import { ProductEntity } from "./product.entity";
export declare class FeedbackEntity {
    uuid: string;
    customerName: string;
    customerFeedback: string;
    sentiment: string;
    user: UserEntity;
    product: ProductEntity;
    createdAt: Date;
    updatedAt: Date;
}
