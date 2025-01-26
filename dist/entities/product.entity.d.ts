import { UserEntity } from "./user.entity";
import { FeedbackEntity } from "./feedback.entity";
export declare class ProductEntity {
    uuid: string;
    name: string;
    cost: number;
    user: UserEntity;
    feedbacks: FeedbackEntity[];
    createdAt: Date;
    updatedAt: Date;
}
