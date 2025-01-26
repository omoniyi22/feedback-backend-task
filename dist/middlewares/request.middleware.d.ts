import { Request, Response, NextFunction } from "express";
import "dotenv/config";
export declare const routeMiddleware: (req: Request, _res: Response, next: NextFunction) => Promise<void>;
