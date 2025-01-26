/** ./..format */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// dotenv.config();
import dotenv from "dotenv/config";

console.log("logging")


import { authService } from "./../services";
import { UserEntity } from "./../entities/user.entity";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  if (!token) {
    res.status(401).json({ error: "Authentication required!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let username = decoded.username
    console.log({ username })
    const user = await authService.getUser(username);

    if (!user) throw "User Not Found!";
    req.user = user

    console.log({ userChe: user })

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};