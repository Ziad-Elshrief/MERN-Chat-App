import { Mails, User } from "lucide-react";
import { profilePictures } from "../utils/profilePictures";
import { UserType } from "../lib/types";
import { useParams } from "react-router-dom";

type ChatRoomSidebarProps = {
  customClass?: string;
  usersList: UserType[];
};

export default function ChatRoomSidebar({
  customClass,
  usersList,
}: ChatRoomSidebarProps) {
  const { room } = useParams();
  return (
    <aside
      className={`${customClass} bg-indigo-500 text-white overflow-y-auto pt-5 px-5 pb-16`}
    >
      <h3 className="mb-4 text-lg font-bold">
        <Mails className="inline mr-0.5 mb-1" size={18} /> Room:
      </h3>
      <h2
        className="text-xl p-3 mb-5 bg-black bg-opacity-10 rounded-lg w-fit"
        id="room-name"
      >
        {room}
      </h2>
      <h3 className="mb-4 text-lg font-bold">
        <User className="inline mr-0.5 mb-1" size={18} /> Users(
        {usersList.length}):
      </h3>
      <ul id="users">
        {usersList.map((user) => (
          <li className="py-3" key={user.id}>
            <img
              src={profilePictures[user.avatar]}
              alt={`${user.avatar}-${user.username}`}
              className="size-10 object-contain rounded-full inline mr-1.5"
            />
            {user.username}
          </li>
        ))}
      </ul>
    </aside>
  );
}
