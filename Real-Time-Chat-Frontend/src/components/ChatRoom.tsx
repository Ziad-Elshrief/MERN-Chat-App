import SendMessage from "./SendMessage";
import ChatRoomSidebar from "./ChatRoomSidebar";
import MessagesContainer from "./MessagesContainer";
import { Menu, MessagesSquare, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import LeaveMenu from "./LeaveMenu";
import { MessageType } from "../lib/types";

const SMALL_SCREEN_WIDTH = 640;

type chatRoomProps = {
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatRoom({ setJoined }: chatRoomProps) {
  const [reply, setReply] = useState<MessageType>();
  const [showSide, setShowSide] = useState(false);
  const [willLeave, setWillLeave] = useState(false);
  useEffect(() => {
    const sidebarHandler = () => {
      if (window.innerWidth > SMALL_SCREEN_WIDTH) setShowSide(false);
    };
    window.addEventListener("resize", sidebarHandler);
    return () => window.removeEventListener("resize", sidebarHandler);
  }, []);
  return (
    <>
      {willLeave && (
        <LeaveMenu setWillLeave={setWillLeave} setJoined={setJoined} />
      )}
      <div className="overflow-hidden mx-5 md:w-4/5 max-w-5xl h-[calc(100dvh-64px)] rounded-xl shadow-md flex flex-col">
        <header className="text-white bg-indigo-700  p-4 flex justify-between items-center h-[72px]">
          <button
            className="sm:hidden"
            onClick={() => setShowSide((prev) => !prev)}
          >
            <Menu />
          </button>
          <h1 className="text-lg">
            <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
          </h1>
          <button
            className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-500"
            type="button"
            onClick={() => setWillLeave(true)}
          >
            <SquareArrowOutUpRight className="inline mr-1 mb-1" size={14} />
            Leave
          </button>
        </header>
        <main className="relative grid grid-cols-1 sm:grid-cols-[1fr_3fr] flex-1 min-h-0">
          <ChatRoomSidebar
            customClass={`${
              showSide
                ? "absolute top-0 left-0 z-40 w-full h-[calc(100dvh-136px)]"
                : "hidden sm:block"
            } `}
          />
          <MessagesContainer setReply={setReply} />
        </main>
        <SendMessage reply={reply} setReply={setReply} />
      </div>
    </>
  );
}
