import { socket } from "../socket";
import SendMessage from "./SendMessage";
import ChatRoomSidebar from "./ChatRoomSidebar";
import MessagesContainer from "./MessagesContainer";
import { MessagesSquare, SquareArrowOutUpRight } from "lucide-react";

type chatRoomProps = {
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatRoom({ setJoined }: chatRoomProps) {
  function leaveRoom() {
    setJoined(false);
    socket.disconnect();
  }
  return (
    <div className="mx-5 md:w-4/5 max-w-5xl my-8 md:mx-auto overflow-hidden max-h-dynamic bg-white rounded-xl shadow-md">
      <header className="text-white bg-indigo-700  p-4 flex justify-between items-center">
        <h1 className="text-lg">
          <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
        </h1>
        <button
          className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-500"
          type="button"
          onClick={() => leaveRoom()}
        >
          <SquareArrowOutUpRight className="inline mr-0.5 mb-1" size={14} />
          Leave Room
        </button>
      </header>
      <main className="sm:grid sm:grid-cols-[1fr_3fr]">
        <ChatRoomSidebar />
        <MessagesContainer />
      </main>
      <SendMessage />
    </div>
  );
}
