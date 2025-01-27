import { CirclePlus, Mails, User, Users } from "lucide-react";
import { useJoined } from "../context/JoinedContext";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import Container from "../components/Container";
import { useUserInfo } from "../context/UserInfoContext";

const MAX_LENGTH = 16;

export default function JoinChat() {
  const { setJoined } = useJoined();
  const { userInfo } = useUserInfo();
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
      avatar: userInfo?.avatar || 0,
    });
  }
  return (
    <Container>
      <div className="w-full max-w-xl my-6 text-white shadow-md rounded-xl overflow-hidden">
        <header className="text-center px-5 py-5 bg-indigo-700 ">
          <h1 className="text-lg">
            <Users className="inline mr-0.5 mb-1" /> Join/Create a room
          </h1>
        </header>
        <main className="py-5 px-8 bg-indigo-500">
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
            <button
              type="submit"
              className="mt-5 w-full bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
            >
              <CirclePlus className="inline mr-0.5 mb-1" size={14} /> Join Chat
            </button>
          </form>
        </main>
      </div>
    </Container>
  );
}
