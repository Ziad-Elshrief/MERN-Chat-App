import { UserRoundPen } from "lucide-react";
import { UpdateProfileForm } from "../components/UpdateProfileForm";
import { useNavigate } from "react-router-dom";

export default function ProfileUpdate() {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-lg max-w-xl shadow-md dark:bg-slate-700 dark:text-white">
      <h2 className="flex items-center gap-x-1 text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-200">
        <UserRoundPen className="size-6" /> Update Profile
      </h2>
      <UpdateProfileForm onClose={() => navigate("/profile")} />
    </div>
  );
}
