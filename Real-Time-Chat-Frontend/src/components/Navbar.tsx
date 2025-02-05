import { Link } from "react-router-dom";
import { useUserInfo } from "../context/UserInfoContext";
import {
  Check,
  Home,
  LogOut,
  Mails,
  Menu,
  MessagesSquare,
  Moon,
  Settings,
  Sun,
  User2,
  UserPlus,
} from "lucide-react";
import DropdownMenu, {
  DropdownMenuButtonItem,
  DropdownMenuLinkItem,
} from "./DropdownMenu";
import { UserInfoApi } from "../api/userApi";
import { profilePictures } from "../utils/profilePictures";
import { useSiteTheme } from "../context/SiteThemeContext";

export default function Navbar() {
  const { userInfo, setUserInfo, isLoading } = useUserInfo();
  function logout() {
    UserInfoApi.logout();
    setUserInfo(null);
  }
  return (
    <nav className="flex items-center justify-between w-full bg-indigo-900 py-4 px-4 sm:px-5 h-[68px]">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-white text-sm sm:text-base">
          <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
        </Link>
        <Link
          to="/"
          className="hidden sm:inline-flex justify-center gap-x-1.5 rounded-md bg-indigo-700  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
        >
          Home
        </Link>
        <Link
          to="/join-chat"
          className="hidden sm:inline-flex justify-center gap-x-1.5 rounded-md bg-indigo-700  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
        >
          Join Room
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 sm:hidden">
          <DropdownMenu
            direction={`${userInfo ? "right-0" : "-translate-x-1/2"}`}
            heading={<Menu className="inline size-8" />}
          >
            <DropdownMenuLinkItem
              linkLabel={
                <>
                  <Home className="inline size-3.5 mb-1" /> Home
                </>
              }
              linkHref="/"
            />
            <DropdownMenuLinkItem
              linkLabel={
                <>
                  <Mails className="inline size-3.5 mb-1" /> Join Chat
                </>
              }
              linkHref="/join-chat"
            />
            {!userInfo && <DropdownMenuLinkItem
              linkLabel={
                <>
                  <UserPlus className="inline size-3.5 mb-1" /> Sign Up
                </>
              }
              linkHref="/register"
            />}
          </DropdownMenu>
        </div>
        <NavbarThemeButton />

        {!isLoading && (
          <>
            {userInfo ? (
              <div className="h-8">
                <DropdownMenu
                  direction="right-0"
                  variant="muted"
                  heading={
                    <img
                      src={profilePictures[userInfo.avatar]}
                      alt={userInfo.username}
                      className="size-8 rounded-full"
                    />
                  }
                >
                  <div className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:outline-hidden focus:bg-gray-100 focus:text-gray-900 focus:outline-hidden dark:text-gray-200 hover:dark:text-gray-800 focus:dark:text-gray-800">
                    <img
                      className="size-10 rounded-full border-2 border-indigo-300"
                      src={profilePictures[userInfo?.avatar || 0]}
                      alt={userInfo?.username}
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {userInfo?.username}
                      </h2>
                      <p className="text-sm">{userInfo?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuLinkItem
                    linkLabel={
                      <>
                        <User2 className="inline size-3.5 mb-1" /> Profile
                      </>
                    }
                    linkHref="/profile"
                  />
                  <DropdownMenuButtonItem
                    buttonLabel={
                      <>
                        <LogOut className="size-3.5" /> Sign Out
                      </>
                    }
                    onClick={logout}
                  />
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex justify-center gap-x-1.5 rounded-md bg-slate-900  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:inline-flex justify-center gap-x-1.5 text-sm font-semibold text-white  hover:text-indigo-400 focus:text-indigo-400"
                >
                  Sign Up
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

function NavbarThemeButton() {
  const { siteTheme, setSiteThemeGlobal } = useSiteTheme();
  const preferDarkMode = siteTheme === "system" ? window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches : siteTheme === "dark"
  function changeTheme(theme: typeof siteTheme) {
    if (theme) {
      setSiteThemeGlobal(theme);
    }
  }
  return (
    <div className="h-8">
      <DropdownMenu
        direction="-right-5"
        heading={
          <>
            {preferDarkMode ? (
              <Sun className="inline size-8" />
            ) : (
              <Moon className="inline size-8" />
            )}
          </>
        }
      >
        <DropdownMenuButtonItem
          buttonLabel={
            <>
              <Settings className="size-3.5" /> System
            </>
          }
          buttonRightIcon={siteTheme === "system" && <Check className="ml-auto size-4" />}
          onClick={() => {
            if (siteTheme !== "system") changeTheme("system");
          }}
        />
        <DropdownMenuButtonItem
          buttonLabel={
            <>
              <Moon className="size-3.5" /> Dark
            </>
          }
          buttonRightIcon={siteTheme === "dark" && <Check className="ml-auto size-4" />}

          onClick={() => {
            if (siteTheme !== "dark") changeTheme("dark");
          }}
        />
        <DropdownMenuButtonItem
          buttonLabel={
            <>
              <Sun className="size-3.5" /> Light
            </>
          }
          buttonRightIcon={siteTheme === "light" && <Check className="ml-auto size-4" />}

          onClick={() => {
            if (siteTheme !== "light") changeTheme("light");
          }}
        />
      </DropdownMenu>
    </div>
  );
}
