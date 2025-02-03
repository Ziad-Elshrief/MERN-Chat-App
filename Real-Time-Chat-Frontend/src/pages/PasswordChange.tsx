import { KeyRound, KeySquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { UserInfoApi } from "../api/userApi";


export default function PasswordChange() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
        toast.error("Passwords do not match");
      } else {
    const res = await UserInfoApi.updateUserPassword(
      formData.get("currentPassword") as string,
      formData.get("newPassword") as string,
    );
    if (res.errorMessage) {
      toast.error(res.errorMessage);
    } else {
      toast.success("Successfully updated your password");
      navigate("/profile")
    }}
    setIsLoading(false);
  };
  return (
    <div className="bg-white p-6 rounded-lg max-w-xl shadow-md dark:bg-slate-700 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-200">
        <KeyRound className="mr-0.5 mb-1 size-6 inline" /> Change Password
      </h2>
    <form onSubmit={submitHandler} className="space-y-4">
     <div>
     <label htmlFor="currentPassword" className="mb-1 block">
              <KeySquare className="inline mr-0.5 mb-1" size={16} /> Current Password
            </label>
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter your current password"
              required
            />
     </div>
          <div>
          <label htmlFor="newPassword" className="mb-1 block">
              <KeySquare className="inline mr-0.5 mb-1" size={16} /> New Password
            </label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter your new password"
              required
            />
          </div>
          <div>
          <label htmlFor="confirmPassword" className="mb-1 block">
              <KeySquare className="inline mr-0.5 mb-1" size={16} /> Confirm new
              password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your current password"
              required
            />
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
          className="inline-flex justify-center gap-x-1.5 rounded-md bg-slate-900  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500 disabled:bg-gray-600"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
    </div>
  );
}