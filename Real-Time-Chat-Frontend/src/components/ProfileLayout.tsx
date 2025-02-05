import {
  User,
  LogOut,
  UserRoundPen,
  KeyRound,
  Trash2,
  X,
  Menu,
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarSection,
  SidebarLinkItem,
  SidebarButtonItem,
} from "./Sidebar";

import { useUserInfo } from "../context/UserInfoContext";
import { profilePictures } from "../utils/profilePictures";
import { UserInfoApi } from "../api/userApi";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function ProfileLayout() {
  const { userInfo, setUserInfo } = useUserInfo();
  function logout() {
    UserInfoApi.logout();
    setUserInfo(null);
  }
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100dvh-68px)] md:h-[calc(100dvh-68px)] md:overflow-hidden bg-indigo-50">
      <div className="md:hidden bg-indigo-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Profile</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white hover:bg-indigo-500"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <Sidebar
        setIsOpen={setIsSidebarOpen}
        isOpen={isSidebarOpen}
        inPlaceheightClass="h-[calc(100dvh-68px)]"
      >
        <SidebarHeader>
          <div className="flex items-center space-x-3">
            <img
              className="size-10 rounded-full border-2 border-indigo-300"
              src={profilePictures[userInfo?.avatar || 0]}
              alt={userInfo?.username}
            />
            <div>
              <h2 className="text-lg font-semibold">{userInfo?.username}</h2>
              <p className="text-sm text-indigo-200">{userInfo?.email}</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarSection title="Navigation">
            <SidebarLinkItem href="/profile" icon={<User className="size-5" />}>
              Profile
            </SidebarLinkItem>
            <SidebarLinkItem
              href="/profile/update"
              icon={<UserRoundPen className="size-5" />}
            >
              Update Profile
            </SidebarLinkItem>
          </SidebarSection>
          <SidebarSection title="Account">
            <SidebarLinkItem
              href="/profile/change-password"
              icon={<KeyRound className="size-5" />}
            >
              Change Password
            </SidebarLinkItem>
            <SidebarButtonItem
              onClick={logout}
              icon={<LogOut className="size-5" />}
            >
              Logout
            </SidebarButtonItem>
            <SidebarLinkItem
              href="/profile/delete-account"
              icon={<Trash2 className="size-5" />}
            >
              Delete Account
            </SidebarLinkItem>
          </SidebarSection>
        </SidebarContent>
      </Sidebar>
      <main className="flex-1 p-8 w-full md:overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-indigo-800">
          Welcome, {userInfo?.username}!
        </h1>
        <Outlet />
      </main>
    </div>
  );
}
