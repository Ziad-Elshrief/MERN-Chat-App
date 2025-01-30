import mongoose, { Date } from "mongoose";
import bcrypt from "bcryptjs";
import { Model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: number;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserMethods {
  matchPassword(enteredPassword: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: [true, "username is already taken"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true, "A user with this email already exists"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    avatar: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model<IUser, UserModel>("User", userSchema);
