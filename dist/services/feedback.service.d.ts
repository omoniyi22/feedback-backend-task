import { FeedbackEntity } from "./../entities/feedback.entity";
import { CreateFeedbackRequestType } from "./../types";
export declare const createFeedback: ({ customerName, customerFeedback, productId, }: CreateFeedbackRequestType) => Promise<FeedbackEntity | null>;
export declare const getFeedbacks: ({ productId, }: {
    productId: string;
}) => Promise<FeedbackEntity[]>;
