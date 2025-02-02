import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

const refreshTokenController = (req:Request, res:Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET as string
      ) as {
        userId: string;
      };
      generateAccessToken(res, decoded.userId);
      generateRefreshToken(res, decoded.userId);
      res.status(200).json({ message: "Refreshed token" })
    } catch (error) {
      res.status(403);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

const router = express.Router();
router.post("/", refreshTokenController);

export { router };
