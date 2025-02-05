import SendMessage from "../components/SendMessage";
import MessagesContainer from "../components/MessagesContainer";
import { Info, LogOut, MessagesSquare, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { UserType } from "../lib/types";
import { socket } from "../socket";
import { useNavigate, useParams } from "react-router-dom";
import Popup from "../components/Popup";
import Container from "../components/Container";
import { useUserInfo } from "../context/UserInfoContext";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarSection,
} from "../components/Sidebar";
import { profilePictures } from "../utils/profilePictures";
import CopyClipboardLink from "../components/CopyClipboardLink";

export default function ChatRoom() {
  const { room } = useParams();
  const { userInfo } = useUserInfo();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [willLeave, setWillLeave] = useState(false);
  const [usersList, setUsersList] = useState<UserType[]>([]);
  const navigate = useNavigate();

  function leaveRoom() {
    socket.disconnect();
    navigate("/join-chat");
  }

  useEffect(() => {
    if (userInfo) {
      socket.connect();
      socket.emit("joinRoom", {
        username: userInfo.username,
        userId: userInfo._id,
        room,
        avatar: userInfo.avatar,
      });
      socket.on("roomUsers", ({ users }) => {
        setUsersList(users);
      });
    }
    return () => {
      if(socket.connected)
      socket.disconnect();
    };
  });

  return (
    <>
      {willLeave && (
        <Popup
          popupHeader="Are you sure you want to leave?"
          confirmText="Leave"
          confirmOnClick={leaveRoom}
          cancelText="Cancel"
          cancelOnClick={() => setWillLeave(false)}
        />
      )}
      <Container>
        <div className="relative overflow-hidden rounded-xl shadow-md w-full max-w-5xl h-[calc(100dvh-100px)] flex flex-col">
          <header className="text-white bg-indigo-700 px-4 py-3.5 flex justify-between items-center h-[68px]">
            <h1 className="hidden md:block text-lg">
              <MessagesSquare className="inline mr-0.5 mb-1" /> Chat App
            </h1>
            <div className="overflow-hidden rounded-lg flex md:hidden">
              <button
                className=" bg-indigo-900 p-2  hover:bg-indigo-500"
                onClick={() => setIsSidebarOpen((prev) => !prev)}
              >
                <Info className="size-5" />
              </button>
              <div className="text-indigo-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-2 min-w-24">
                <h2 className="font-semibold">{room}</h2>
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
          <main className="relative grid grid-cols-1 md:grid-cols-[1fr_3fr] flex-1 min-h-0 overflow-clip">
            <Sidebar
              setIsOpen={setIsSidebarOpen}
              isOpen={isSidebarOpen}
            >
              {isSidebarOpen && (
                <SidebarHeader>
                  <div className="flex items-center space-x-3">
                    <img
                      className="size-10 rounded-full border-2 border-indigo-300"
                      src={profilePictures[userInfo?.avatar || 0]}
                      alt={userInfo?.username}
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {userInfo?.username}
                      </h2>
                      <p className="text-sm text-indigo-200">
                        {userInfo?.email}
                      </p>
                    </div>
                  </div>
                </SidebarHeader>
              )}
              <SidebarContent>
                <SidebarSection title="Room:">
                  <h3 className="mb-4 pl-4 text-lg font-bold">{room}</h3>
                  <CopyClipboardLink />
                </SidebarSection>
                <SidebarSection title="Users:">
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

                </SidebarSection>
              </SidebarContent>
            </Sidebar>
            <MessagesContainer />
          </main>
          <SendMessage />
        </div>
      </Container>
    </>
  );
}
