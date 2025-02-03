import {
  CirclePlus,
  CircleUserRound,
  KeySquare,
  Mail,
  User,
  UserPlus2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { UserInfoApi } from "../api/userApi";
import { Input } from "../components/Input";
import Container from "../components/Container";
import AvatarPicker from "../components/AvatarPicker";

const MAX_LENGTH = 16;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(0);
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      toast.error("Passwords do not match");
    } else {
      const res = await UserInfoApi.register(
        formData.get("username") as string,
        formData.get("email") as string,
        formData.get("password") as string,
        avatar
      );
      if (res.errorMessage) {
        toast.error(res.errorMessage);
      } else {
        toast.success("Account created. You can now log in");
        navigate("/login");
      }
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <div className="w-full my-6 max-w-xl text-white shadow-md rounded-xl overflow-hidden">
        <header className="text-center p-5 bg-indigo-700 ">
          <h1 className="text-lg">
            <UserPlus2 className="inline mr-0.5 mb-1" /> Register
          </h1>
          <p className="text-gray-300">Create a new account</p>
        </header>
        <main className="py-4 px-8 bg-indigo-500">
          <form method="post" onSubmit={submitHandler}>
            <label htmlFor="username" className="mb-1 block">
              <User className="inline mr-0.5 mb-1" size={16} /> Username
            </label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              maxLength={MAX_LENGTH}
            />
            <label htmlFor="email" className="mb-1 block">
              <Mail className="inline mr-0.5 mb-1" size={16} /> Email
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              required
            />
            <label htmlFor="password" className="mb-1 block">
              <KeySquare className="inline mr-0.5 mb-1" size={16} /> Password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            <label htmlFor="confirmPassword" className="mb-1 block">
              <KeySquare className="inline mr-0.5 mb-1" size={16} /> Confirm
              Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your password"
              required
            />
            <label className="mb-1 block">
              <CircleUserRound className="inline mr-0.5 mb-1" size={16} />
              Avatar
            </label>
            <p className="text-gray-300 mb-3">
              You can change your avatar any time later
            </p>
            <AvatarPicker setAvatar={setAvatar} avatar={avatar} />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 w-full bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-600"
            >
              {isLoading ? (
                "Registering..."
              ) : (
                <>
                  <CirclePlus className="inline mr-0.5 mb-1" size={14} />{" "}
                  Register
                </>
              )}
            </button>
          </form>
          <p className="mt-3">
            Already have an account?{" "}
            <Link to="/login" className="ml-2 font-bold">
              Sign in
            </Link>
          </p>
        </main>
      </div>
    </Container>
  );
}
