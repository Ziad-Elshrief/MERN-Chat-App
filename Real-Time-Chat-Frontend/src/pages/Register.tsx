import {
  CirclePlus,
  CircleUserRound,
  KeySquare,
  Mail,
  User,
  UserPlus2,
} from "lucide-react";
import { profilePictures } from "../utils/profilePictures";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { UserInfoApi } from "../api/userApi";

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
    <>
      <div className="w-full my-6 max-w-xl text-white shadow-md rounded-xl overflow-hidden">
        <header className="text-center p-5 bg-indigo-700 ">
          <h1 className="text-lg">
            <UserPlus2 className="inline mr-0.5 mb-1" /> Register
          </h1>
          <p className="text-gray-300">Create a new account</p>
        </header>
        <main className="py-6 px-8 bg-indigo-500">
          <form method="post" onSubmit={submitHandler}>
            <label htmlFor="username" className="mb-1 block">
              <User className="inline mr-0.5 mb-1" size={16} /> Username
            </label>
            <input
              className="bg-white dark:bg-slate-800 mb-5 p-2 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300  rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
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
            <input
              className="bg-white dark:bg-slate-800 p-2 mb-5 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300 rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email..."
              required
            />
            <label htmlFor="password" className="mb-1 block">
              <KeySquare className="inline mr-0.5 mb-1" size={16} /> Password
            </label>
            <input
              className="bg-white dark:bg-slate-800 p-2 mb-5 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300 rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
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
            <input
              className="bg-white dark:bg-slate-800 p-2 mb-5 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300 rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
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
              You can change your avatar any time in your profile page
            </p>
            <div className="flex flex-wrap justify-center gap-3 py-2.5 h-36 sm:h-48 overflow-y-auto">
              {profilePictures.map((pic, index) => (
                <img
                  key={index}
                  src={pic}
                  alt="User"
                  id={`profile${index}`}
                  className={`size-14 sm:size-20 object-contain rounded-full border-[6px] cursor-pointer ${
                    avatar === index ? "border-indigo-900" : "border-gray-400"
                  } `}
                  onClick={(e) =>
                    setAvatar(Number(e.currentTarget.id.slice(7)))
                  }
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 w-full bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
            >
              <CirclePlus className="inline mr-0.5 mb-1" size={14} /> Register
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
    </>
  );
}
