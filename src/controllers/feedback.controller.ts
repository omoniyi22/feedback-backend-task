import { Request, Response } from "express";
import { feedbackService } from "@/services";
import { errorHandlerWrapper } from "@/utils";


const createFeedbackHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { productId } = req.params
        const { customerName, customerFeedback } = req.body;
        const feedback = await feedbackService.createFeedback({
            customerName,
            customerFeedback,
            productId
        });

        return res.status(201).json({
            message: "Feedback created successfully",
            feedback,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || "Failed to create feedback",
        });
    }
};


const getFeedbackHandler = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { productId } = req.params;
        const feedbacks = await feedbackService.getFeedbacks({ productId });
        return res.status(200).json({
            message: "Feedbacks retrieved successfully",
            feedbacks,
        });
    } catch (error: any) {
        return res.status(400).json({
            message: error.message || "Failed to fetch feedbacks",
        });
    }
};


export const createFeedback = errorHandlerWrapper(createFeedbackHandler)
export const getFeedbacks = errorHandlerWrapper(getFeedbackHandler)