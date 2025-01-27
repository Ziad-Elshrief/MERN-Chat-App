import { Link } from "react-router-dom";
import { useUserInfo } from "../context/UserInfoContext";
import { MessagesSquare } from "lucide-react";
import DropdownMenu, {
  DropdownMenuButtonItem,
  DropdownMenuLinkItem,
} from "./DropDownMenu";

export default function Navbar() {
  const { userInfo } = useUserInfo();

  return (
    <nav className="flex items-center justify-between w-full bg-indigo-900 py-4 px-5">
      <div className="flex items-center gap-3">
        <h1 className="text-white">
          <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
        </h1>
        <Link
          to="/"
          className="inline-flex justify-center gap-x-1.5 rounded-md bg-indigo-700  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
        >
          Home
        </Link>
        <Link
          to="/join-chat"
          className="inline-flex justify-center gap-x-1.5 rounded-md bg-indigo-700  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
        >
          Join Room
        </Link>
      </div>

      <div>
        {userInfo ? (
          <DropdownMenu>
            <DropdownMenuLinkItem linkLabel="Profile" linkHref="/" />
            <DropdownMenuButtonItem
              buttonLabel="Sign out"
              onClick={() => console.log("Clicked")}
            />
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="inline-flex justify-center gap-x-1.5 rounded-md bg-black  px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-indigo-400 ring-inset hover:bg-indigo-500 focus:bg-indigo-500"
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
