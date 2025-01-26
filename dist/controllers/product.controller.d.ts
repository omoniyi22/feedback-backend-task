import { Request, Response } from "express";
export declare const createProduct: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getProduct: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
export declare const getUserProducts: (req: Request, res: Response, next: import("express").NextFunction) => Promise<void>;
