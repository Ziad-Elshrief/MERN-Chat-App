import { Link } from "react-router-dom";
import { useUserInfo } from "../context/UserInfoContext";
import { Home, LogOut, Mails, Menu, MessagesSquare, User2 } from "lucide-react";
import DropdownMenu, {
  DropdownMenuButtonItem,
  DropdownMenuLinkItem,
} from "./DropdownMenu";
import { UserInfoApi } from "../api/userApi";
import { profilePictures } from "../utils/profilePictures";

export default function Navbar() {
  const { userInfo, setUserInfo } = useUserInfo();
  function logout() {
    UserInfoApi.logout();
    setUserInfo(null);
  }
  return (
    <nav className="flex items-center justify-between w-full bg-indigo-900 py-4 px-4 sm:px-5">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-white text-sm sm:text-base">
          <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
        </Link>
        <div className="inline-flex sm:hidden">
          <DropdownMenu
            direction="left-0"
            heading={
              <>
                <Menu className="inline size-4 mt-0.5" /> Menu
              </>
            }
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
          </DropdownMenu>
        </div>
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

      <div>
        {userInfo ? (
          <DropdownMenu
            direction="right-0"
            variant="indigo-btn"
            heading={
              <>
                <img
                  src={profilePictures[userInfo.avatar]}
                  alt={userInfo.username}
                  className="size-5 rounded-full"
                />{" "}
                {userInfo.username}
              </>
            }
          >
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
                  <LogOut className="inline size-3.5 mb-1" /> Sign Out
                </>
              }
              onClick={logout}
            />
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="inline-flex justify-center gap-x-1.5 rounded-md bg-slate-900  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-flex justify-center gap-x-1.5 text-sm font-semibold text-white  hover:text-indigo-400 focus:text-indigo-400"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
