import {
  CirclePlus,
  CircleUserRound,
  Mails,
  MessagesSquare,
  User,
} from "lucide-react";
import { profilePictures } from "../utils/profilePictures";
import { useState } from "react";
import { useJoined } from "../context/JoinedContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";

const MAX_LENGTH = 16;

export default function JoinChat() {
  const { setJoined } = useJoined();
  const [avatar, setAvatar] = useState(0);
  const navigate = useNavigate();
  function joinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const room = target.room.value.trim();
    navigate(`/room/${room}`);
    setJoined({
      state: true,
      username: target.username.value.trim(),
      room,
      avatar,
    });
  }
  return (
    <div className="w-full max-w-xl text-white mx-5 mt-5 shadow-md rounded-xl overflow-hidden">
      <header className="text-center p-5 bg-indigo-700 ">
        <h1 className="text-lg">
          <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
        </h1>
      </header>
      <main className="py-6 px-8 bg-indigo-500">
        <form onSubmit={(e) => joinRoom(e)}>
          <label htmlFor="username" className="mb-1 block">
            <User className="inline mr-0.5 mb-1" size={16} /> Username
          </label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username..."
            required
            maxLength={MAX_LENGTH}
          />
          <label htmlFor="room" className="mb-1 block">
            <Mails className="inline mr-0.5 mb-1" size={16} /> Room
          </label>
          <Input
            type="text"
            name="room"
            id="room"
            placeholder="Enter room name..."
            required
            maxLength={MAX_LENGTH}
          />
          <label className="mb-1 block">
            <CircleUserRound className="inline mr-0.5 mb-1" size={16} /> Avatar
          </label>
          <div className="flex flex-wrap justify-center gap-3 py-2.5 h-36 sm:h-48 overflow-y-auto">
            {profilePictures.map((pic, index) => (
              <img
                key={index}
                src={pic}
                alt="User"
                id={`profile${index}`}
                className={`size-14 sm:size-20 object-contain rounded-full border-[6px] cursor-pointer ${
                  avatar === index ? "border-indigo-900" : "border-gray-400"
                } `}
                onClick={(e) => setAvatar(Number(e.currentTarget.id.slice(7)))}
              />
            ))}
          </div>
          <button
            type="submit"
            className="mt-5 w-full bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
          >
            <CirclePlus className="inline mr-0.5 mb-1" size={14} /> Join Chat
          </button>
        </form>
      </main>
    </div>
  );
}
