import { CirclePlus, Mails, MessagesSquare, User } from "lucide-react";
import { socket } from "../socket";

const MAX_LENGTH = 16;

type joinChatProps = {
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function JoinChat({ setJoined }: joinChatProps) {
  function joinRoom(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    socket.connect();
    socket.emit("joinRoom", {
      username: target.username.value.trim(),
      room: target.room.value.trim(),
    });
    setJoined(true);
  }
  return (
    <div className="max-w-lg text-white mt-20 mx-5 md:mx-auto shadow-md rounded-xl overflow-hidden">
      <header className="text-center p-5 bg-indigo-700 ">
        <h1 className="text-lg">
          <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
        </h1>
      </header>
      <main className="py-8 px-10 bg-indigo-500">
        <form onSubmit={(e) => joinRoom(e)}>
          <div className="mb-5">
            <label htmlFor="username" className="mb-1 block">
              <User className="inline mr-0.5 mb-1" size={16} /> Username
            </label>
            <input
              className="bg-white dark:bg-slate-800 p-2 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300  rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              maxLength={MAX_LENGTH}
            />
          </div>
          <div>
            <label htmlFor="room" className="mb-1 block">
              <Mails className="inline mr-0.5 mb-1" size={16} /> Room
            </label>
            <input
              className="bg-white dark:bg-slate-800 p-2 h-10 w-full caret-indigo-700 text-indigo-900 dark:text-indigo-300 rounded-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 autofill:shadow-[inset_0_0_0px_1000px_rgb(129,140,248)]"
              type="text"
              name="room"
              id="room"
              placeholder="Enter room name..."
              required
              maxLength={MAX_LENGTH}
            />
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
