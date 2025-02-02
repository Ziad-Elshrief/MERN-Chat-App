import { UserRoundPen } from "lucide-react";
import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { useUserInfo } from "../context/UserInfoContext";

export default function ProfileUpdate() {

  const { userInfo } = useUserInfo();
  return (
      <main className="flex-1 p-8 w-full md:overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          Welcome, {userInfo?.username}!
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
                <UserRoundPen className="mr-0.5 mb-1 size-6 inline" /> Update Profile
              </h2>
              <UpdateProfileForm onClose={() => {}} />
        </div>
      </main>
  );
}
