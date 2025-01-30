import { Mail, User } from "lucide-react";
import Container from "../components/Container";
import { useUserInfo } from "../context/UserInfoContext";
import { profilePictures } from "../utils/profilePictures";

export default function Profile() {
  const { userInfo } = useUserInfo();
  return (
    <Container>
      <div className="shadow-lg border border-indigo-800">
        <h1 className="bg-indigo-800 text-white py-3 px-5 text-center text-2xl">
          <User className="inline mb-1 mr-0.5 size-6" /> Profile
        </h1>
        <div className="p-3 divide-y-2 divide-indigo-800 space-y-3 text-xl dark:text-white">
          <div className="flex items-center gap-3">
            <img
              src={profilePictures[Number(userInfo?.avatar)]}
              alt={userInfo?.username}
              className="size-20 object-contain rounded-full"
            />
            <h2>{userInfo?.username}</h2>
          </div>
          <h2 className="pt-2">
            <strong className="block">
              {" "}
              <Mail className="inline mb-1 mr-0.5 size-4" /> Email:
            </strong>
            {userInfo?.email}
          </h2>
        </div>
      </div>
    </Container>
  );
}
