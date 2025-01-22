import SendMessage from "../components/SendMessage";
import ChatRoomSidebar from "../components/ChatRoomSidebar";
import MessagesContainer from "../components/MessagesContainer";
import { Info, LogOut, MessagesSquare, Users } from "lucide-react";
import { useEffect, useState } from "react";
import LeaveMenu from "../components/LeaveMenu";
import { MessageType, UserType } from "../lib/types";
import { socket } from "../socket";
import { useJoined } from "../context/JoinedContext";

const SMALL_SCREEN_WIDTH = 640;

export default function ChatRoom() {
  const { joined } = useJoined();
  const [reply, setReply] = useState<MessageType>();
  const [showSide, setShowSide] = useState(false);
  const [willLeave, setWillLeave] = useState(false);
  const [usersList, setUsersList] = useState<UserType[]>([]);
  useEffect(() => {
    if (joined.state) {
      socket.connect();
      socket.emit("joinRoom", {
        username: joined.username,
        room: joined.room,
        avatar: joined.avatar,
      });
    }
    socket.on("roomUsers", ({ users }) => {
      setUsersList(users);
    });
    const sidebarHandler = () => {
      if (window.innerWidth > SMALL_SCREEN_WIDTH) setShowSide(false);
    };
    window.addEventListener("resize", sidebarHandler);
    return () => window.removeEventListener("resize", sidebarHandler);
  }, [joined.avatar, joined.room, joined.state, joined.username]);
  return (
    <>
      {willLeave && <LeaveMenu setWillLeave={setWillLeave} />}
      <div className="h-dvh">
        <div className="relative overflow-hidden mx-5 mt-8 w-full max-w-5xl h-[calc(100dvh-64px)] rounded-xl shadow-md flex flex-col">
          <header className="text-white bg-indigo-700  p-4 flex justify-between items-center h-[72px]">
            <h1 className="hidden sm:block text-lg">
              <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
            </h1>
            <div className="overflow-hidden rounded-lg flex sm:hidden">
              <button
                className=" bg-indigo-900 p-2  hover:bg-indigo-500"
                onClick={() => setShowSide((prev) => !prev)}
              >
                <Info className="size-5" />
              </button>
              <div className="text-indigo-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-2 min-w-24">
                <h2 className="font-semibold">{joined.room}</h2>
                <h4 className="text-slate-700 dark:text-slate-400  text-xs">
                  <Users className="inline mr-0.5 mb-1 size-3" />
                  {usersList.length} users
                </h4>
              </div>
            </div>
            <button
              className=" bg-indigo-900 p-2 rounded-lg hover:bg-indigo-500"
              type="button"
              onClick={() => setWillLeave(true)}
            >
              <LogOut className="inline mr-0.5 mb-1" size={14} />
              Leave
            </button>
          </header>
          <main className="relative grid grid-cols-1 sm:grid-cols-[1fr_3fr] flex-1 min-h-0">
            <ChatRoomSidebar
              usersList={usersList}
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
      </div>
    </>
  );
}
