import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { Request } from "express";
import { UserInfoType } from "../lib/types";

interface UserRequest extends Request {
  user?: UserInfoType;
}

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }
  const isNameTaken = await User.findOne({ name });
  if (isNameTaken) {
    res.status(400);
    throw new Error("This username is already taken");
  }
  const avatar = req.body.avatar ? Number(req.body.avatar) : 0;

  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateAccessToken(res, user.id);
    generateRefreshToken(res, user.id);
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out" });
});

const getUserProfile = asyncHandler(async (req: UserRequest, res) => {
  if (req.user) {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      });
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req: UserRequest, res) => {
  if (req.user) {
    const user = await User.findById(req.user._id);
    if (user) {
      if (req.body.name && user.name !== req.body.name) {
        const isNameTaken = await User.findOne({
          name: user.name,
        });
        if (isNameTaken != null) {
          res.status(400);
          throw new Error("This username is already taken");
        }
      }
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.avatar = req.body.avatar || user.avatar;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
      });
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
