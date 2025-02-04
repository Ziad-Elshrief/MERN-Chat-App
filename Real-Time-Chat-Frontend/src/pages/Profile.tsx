import { useState } from "react";
import { Edit, UserRoundPen } from "lucide-react";
import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { useUserInfo } from "../context/UserInfoContext";

export default function Profile() {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const { userInfo } = useUserInfo();
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl dark:bg-slate-700 dark:text-white">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-300">
        Profile Information
      </h2>
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          Username:{" "}
          <span className="font-medium text-indigo-600 dark:text-indigo-200">
            {userInfo?.username}
          </span>
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Email:{" "}
          <span className="font-medium text-indigo-600 dark:text-indigo-200">
            {userInfo?.email}
          </span>
        </p>
      </div>
      <button
        onClick={() => setIsUpdateFormOpen((prev) => !prev)}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-slate-900  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
      >
        <Edit className="size-4" />
        Update Profile
      </button>

      {isUpdateFormOpen && (
        <div className="mt-6">
          <h3 className="flex items-center gap-x-1  text-lg font-semibold mb-4 text-indigo-700 dark:text-indigo-200">
            <UserRoundPen className="size-5" /> Update Profile
          </h3>
          <UpdateProfileForm onClose={() => setIsUpdateFormOpen(false)} />
        </div>
      )}
    </div>
  );
}
