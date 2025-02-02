import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { NextFunction, Request } from "express";

interface UserRequest extends Request {
  user?: unknown;
}

const protect = asyncHandler(
  async (req: UserRequest, res, next: NextFunction) => {
    let token;
    token = req.cookies.jwt;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: string;
        };
        req.user = await User.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    } else {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export { protect };
