import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Mails, User } from "lucide-react";

type User = {
  id: string;
  room: string;
  username: string;
};

export default function ChatRoomSidebar() {
  const [roomName, setRoomName] = useState("");
  const [usersList, setUsersList] = useState<User[]>([]);
  useEffect(() => {
    socket.on("roomUsers", ({ room, users }) => {
      setRoomName(room);
      setUsersList(users);
    });
  }, []);
  return (
    <div className="hidden sm:block bg-indigo-500 text-white max-h-96 overflow-y-auto px-5 pt-5 pb-16">
      <h3 className="mb-4 text-lg font-bold">
        {" "}
        <Mails className="inline mr-0.5 mb-1" size={18} /> Room:
      </h3>
      <h2
        className="text-xl p-3 mb-5 bg-black bg-opacity-10 rounded-lg"
        id="room-name"
      >
        {roomName}
      </h2>
      <h3 className="mb-4 text-lg font-bold">
        <User className="inline mr-0.5 mb-1" size={18} /> Users:
      </h3>
      <ul id="users">
        {usersList.map((user) => (
          <li className="py-3" key={user.id}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}
