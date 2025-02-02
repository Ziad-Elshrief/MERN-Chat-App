import { CircleUserRound, Mail, User } from "lucide-react";
import { Input } from "../components/Input";
import { useUserInfo } from "../context/UserInfoContext";
import AvatarPicker from "./AvatarPicker";
import { useState } from "react";

interface UpdateProfileFormProps {
  onClose: () => void;
}

export function UpdateProfileForm({ onClose }: UpdateProfileFormProps) {
  const { userInfo } = useUserInfo();
  const [avatar,setAvatar]=useState(userInfo?.avatar ?? 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label htmlFor="username" className="mb-1 block">
          <User className="inline mr-0.5 mb-1" size={16} /> Username
        </label>
        <Input
          id="username"
          name="username"
          defaultValue={userInfo?.username}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block">
          <Mail className="inline mr-0.5 mb-1" size={16} /> Email
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          defaultValue={userInfo?.email}
        />
      </div>
      <div>
      <label className="mb-1 block">
              <CircleUserRound className="inline mr-0.5 mb-1" size={16} />
              Avatar
            </label>
           <AvatarPicker setAvatar={setAvatar} avatar={avatar} />
      </div>
      <div className="flex justify-end space-x-4 items-center">
        <button
          onClick={onClose}
          className="inline-flex justify-center gap-x-1.5 text-sm font-semibold  hover:text-indigo-400 focus:text-indigo-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center gap-x-1.5 rounded-md bg-slate-900  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
