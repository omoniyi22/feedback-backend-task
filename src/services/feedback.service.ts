import { AppDataSource } from "@/setup/datasource";
import { FeedbackEntity } from "@/entities/feedback.entity";
import { ProductEntity } from "@/entities/product.entity";
import { UserEntity } from "@/entities/user.entity";
import { CreateFeedbackRequestType } from "@/types";
import Sentiment from "sentiment"

export const createFeedback = async ({
    customerName = "Anonymous",
    customerFeedback,
    productId,
}: CreateFeedbackRequestType): Promise<FeedbackEntity | null> => {
    const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);
    const userRepository = AppDataSource.getRepository(UserEntity);
    const productRepository = AppDataSource.getRepository(ProductEntity);

    console.log({ productId })

    const product = await productRepository.findOne({
        where: { uuid: productId }, relations: ["user"], select: {
            user: {
                uuid: true,
                name: true
            }
        }
    });

    console.log({ product })
    const userId = product.user.uuid

    if (!product) {
        throw new Error("Product not found");
    }
    console.log({ productId, userId })
    const user = await userRepository.findOne({ where: { uuid: userId }, select: ["uuid", "name"] });


    if (!user) {
        throw new Error("User not found");
    }

    const sentimentAnalyzer = new Sentiment();
    const sentimentResult = sentimentAnalyzer.analyze(customerFeedback);
    const sentiment = sentimentResult.score > 0 ? "positive" : sentimentResult.score < 0 ? "negative" : "neutral";

    const feedback = new FeedbackEntity();
    Object.assign(feedback, {
        customerName,
        customerFeedback,
        sentiment,
        product,
    });
    return await feedbackRepository.save(feedback);
};


export const getFeedbacks = async ({
    productId,
}: { productId: string; }): Promise<FeedbackEntity[]> => {
    const feedbackRepository = AppDataSource.getRepository(FeedbackEntity);

    const feedbacks = await feedbackRepository.find({
        where: { product: { uuid: productId } },
        order: {
            createdAt: "DESC",
        },
    });

    return feedbacks;
};
