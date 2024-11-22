import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Mails, User } from "lucide-react";

type User = {
  id: string;
  room: string;
  username: string;
};

type ChatRoomSidebarProps = {
  customClass?: string;
};

export default function ChatRoomSidebar({ customClass }: ChatRoomSidebarProps) {
  const [roomName, setRoomName] = useState("");
  const [usersList, setUsersList] = useState<User[]>([]);
  useEffect(() => {
    socket.on("roomUsers", ({ room, users }) => {
      setRoomName(room);
      setUsersList(users);
    });
  }, []);
  return (
    <aside
      className={`${customClass} bg-indigo-500 text-white overflow-y-auto p-5 sm:pb-16`}
    >
      <h3 className="mb-4 text-lg font-bold">
        <Mails className="inline mr-0.5 mb-1" size={18} /> Room:
      </h3>
      <h2
        className="text-xl p-3 mb-5 bg-black bg-opacity-10 rounded-lg w-fit"
        id="room-name"
      >
        {roomName}
      </h2>
      <h3 className="mb-4 text-lg font-bold">
        <User className="inline mr-0.5 mb-1" size={18} /> Users(
        {usersList.length}):
      </h3>
      <ul id="users">
        {usersList.map((user) => (
          <li className="py-3" key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </aside>
  );
}
