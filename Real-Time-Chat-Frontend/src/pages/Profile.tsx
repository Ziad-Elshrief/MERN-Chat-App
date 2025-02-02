import { useState } from "react";
import {Edit, UserRoundPen } from "lucide-react";
import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { useUserInfo } from "../context/UserInfoContext";

export default function Profile() {
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const { userInfo } = useUserInfo();
  return (
      <main className="flex-1 p-8 w-full md:overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          Welcome, {userInfo?.username}!
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">
            Profile Information
          </h2>
          <div className="mb-4">
            <p className="text-gray-600">
              Username:{" "}
              <span className="font-medium text-indigo-600">
                {userInfo?.username}
              </span>
            </p>
            <p className="text-gray-600">
              Email:{" "}
              <span className="font-medium text-indigo-600">
                {userInfo?.email}
              </span>
            </p>
          </div>
          <button
            onClick={() => setIsUpdateFormOpen(true)}
            className="inline-flex justify-center gap-x-1.5 rounded-md bg-slate-900  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
          >
            <Edit className="mr-2 size-4" />
            Update Profile
          </button>

          {isUpdateFormOpen && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 text-indigo-700">
                <UserRoundPen className="mr-0.5 mb-1 size-5 inline" /> Update Profile
              </h3>
              <UpdateProfileForm onClose={() => setIsUpdateFormOpen(false)} />
            </div>
          )}
        </div>
      </main>
  );
}
