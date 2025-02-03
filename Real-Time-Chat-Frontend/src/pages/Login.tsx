import { KeySquare, LogIn, Mail, UserCheck2 } from "lucide-react";
import { Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { UserInfoApi } from "../api/userApi";
import { useUserInfo } from "../context/UserInfoContext";
import { Input } from "../components/Input";
import Container from "../components/Container";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useUserInfo();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await UserInfoApi.login(
      formData.get("email") as string,
      formData.get("password") as string
    );
    if (res.errorMessage) {
      toast.error(res.errorMessage);
    } else {
      toast.success("Successfully logged in");
      setUserInfo({
        _id: res._id,
        email: res.email,
        username: res.name,
        avatar: res.avatar,
      });
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <div className="w-full my-6 max-w-xl text-white shadow-md rounded-xl overflow-hidden">
        <header className="text-center p-5 bg-indigo-700 ">
          <h1 className="text-lg">
            <UserCheck2 className="inline mr-0.5 mb-1" /> Sign In
          </h1>
        </header>
        <main className="py-4 px-8 bg-indigo-500">
          <form onSubmit={submitHandler}>
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
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 w-full bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-600"
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="inline mr-0.5 mb-1" size={14} /> Sign In
                </>
              )}
            </button>
          </form>
          <p className="mt-3">
            Do not have an account?{" "}
            <Link to="/register" className="ml-2 font-bold">
              Sign Up
            </Link>
          </p>
        </main>
      </div>
    </Container>
  );
}
