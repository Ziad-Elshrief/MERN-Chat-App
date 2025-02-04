import { KeySquare, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { UserInfoApi } from "../api/userApi";
import { useUserInfo } from "../context/UserInfoContext";

export default function DeleteAccount() {
  const { setUserInfo } = useUserInfo();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await UserInfoApi.deleteAccount(
      formData.get("password") as string
    );
    if (res.errorMessage) {
      toast.error(res.errorMessage);
    } else {
      setUserInfo(null);
      toast.info("Your account has been deleted");
    }
    setIsLoading(false);
  };
  return (
    <div className="bg-white p-6 rounded-lg max-w-xl shadow-md dark:bg-slate-700 dark:text-white">
      <h2 className="flex items-center gap-x-1 text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-200">
        <Trash2 className="size-6" /> Delete Account
      </h2>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
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
        </div>
        <div className="flex items-center">
          <input
            required
            id="confirmDelete"
            type="checkbox"
            className="w-4 h-4 text-red-600 accent-red-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="confirmDelete"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I understand that this action will delete my account forever
          </label>
        </div>
        <div className="flex justify-end space-x-4 items-center">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="inline-flex justify-center gap-x-1.5 text-sm font-semibold  hover:text-indigo-400 focus:text-indigo-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center gap-x-1.5 rounded-md bg-red-700  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-red-500 ring-inset hover:bg-red-600 focus:bg-red-600 disabled:bg-gray-600"
            disabled={isLoading}
          >
            {isLoading ? "Deleting Account..." : "Delete Account"}
          </button>
        </div>
      </form>
    </div>
  );
}
