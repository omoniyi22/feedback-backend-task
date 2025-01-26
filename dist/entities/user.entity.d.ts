import { CoreEntity } from "./core.entity";
import { ProductEntity } from "./product.entity";
import { FeedbackEntity } from "./feedback.entity";
export declare class UserEntity extends CoreEntity {
    uuid: string;
    name: string;
    hashedPassword: string;
    role: string;
    products: ProductEntity[];
    feedbacks: FeedbackEntity[];
}
