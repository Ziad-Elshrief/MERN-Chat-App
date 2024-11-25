import { socket } from "../socket";
import SendMessage from "./SendMessage";
import ChatRoomSidebar from "./ChatRoomSidebar";
import MessagesContainer from "./MessagesContainer";
import { Menu, MessagesSquare, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const SMALL_SCREEN_WIDTH = 640;

type chatRoomProps = {
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChatRoom({ setJoined }: chatRoomProps) {
  const [showSide, setShowSide] = useState(false);
  const [willLeave, setWillLeave] = useState(false);
  function leaveRoom() {
    setJoined(false);
    socket.disconnect();
  }
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
        <div
          className="absolute top-0 left-0 w-screen z-50 h-dvh bg-slate-800 bg-opacity-90 flex justify-center items-center"
          onClick={() => setWillLeave(false)}
        >
          <div
            className=" text-white shadow-md rounded-xl overflow-hidden m-5"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="text-center p-5 bg-indigo-700 ">
              <h1 className="text-lg">Are you sure you want to leave?</h1>
            </header>
            <main className="p-5 bg-indigo-500 flex justify-center items-center gap-5">
              <button
                type="button"
                className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
                onClick={() => leaveRoom()}
              >
                Leave
              </button>
              <button
                type="button"
                className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
                onClick={() => setWillLeave(false)}
              >
                Cancel
              </button>
            </main>
          </div>
        </div>
      )}
      <div className="overflow-hidden mx-5 md:w-4/5 max-w-5xl my-8 md:mx-auto h-[calc(100dvh-64px) rounded-xl shadow-md flex flex-col">
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
          <MessagesContainer />
        </main>
        <SendMessage />
      </div>
    </>
  );
}
