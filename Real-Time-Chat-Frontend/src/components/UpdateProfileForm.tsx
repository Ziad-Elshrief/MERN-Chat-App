import { CircleUserRound, Mail, User } from "lucide-react";
import { Input } from "../components/Input";
import { useUserInfo } from "../context/UserInfoContext";
import AvatarPicker from "./AvatarPicker";
import { FormEvent, useState } from "react";
import { UserInfoApi } from "../api/userApi";
import { toast } from "react-toastify";

interface UpdateProfileFormProps {
  onClose: () => void;
}

export function UpdateProfileForm({ onClose }: UpdateProfileFormProps) {
  const { userInfo } = useUserInfo();
  const [avatar, setAvatar] = useState(userInfo?.avatar ?? 0);

  const [isLoading, setIsLoading] = useState(false);
  const { setUserInfo } = useUserInfo();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await UserInfoApi.updateUserInfo(
      formData.get("email") as string,
      formData.get("username") as string,
      avatar
    );
    if (res.errorMessage) {
      toast.error(res.errorMessage);
    } else {
      toast.success("Successfully updated your profile");
      onClose();
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
    <form onSubmit={submitHandler} className="space-y-4">
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
          type="button"
          onClick={onClose}
          className="inline-flex justify-center gap-x-1.5 text-sm font-semibold  hover:text-indigo-400 focus:text-indigo-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex justify-center gap-x-1.5 rounded-md bg-slate-900  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
