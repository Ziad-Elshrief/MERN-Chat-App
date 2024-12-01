import { X } from "lucide-react";
import { MessageType } from "../lib/types";
import { socket } from "../socket";
import { profilePictures } from "../utils/profilePictures";
import { reacts } from "../utils/reacts";

type ReactsListPopupType = {
  message: MessageType;
  setViewReactsList: React.Dispatch<React.SetStateAction<number>>;
};

export default function ReactsListPopup({
  message,
  setViewReactsList,
}: ReactsListPopupType) {
  function removeReact(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const messageId = e.currentTarget.getAttribute("data-id");
    socket.emit("sendReact", { react: -1, messageId });
  }
  return (
    <div className="absolute bottom-5 right-[5%] rounded-xl  z-20 p-3 space-y-4 h-fit w-[90%] shadow-md bg-slate-300 dark:bg-slate-700 dark:text-white overflow-hidden">
      <header className="flex justify-between items-center px-1.5">
        <h3 className="">Reactions</h3>
        <button onClick={() => setViewReactsList(-1)}>
          <X className="text-indigo-900 dark:text-indigo-300" size={24} />
        </button>
      </header>
      <ul className="space-y-2.5 h-[98px] overflow-y-auto px-1.5">
        {message.reactsList.map((reactElement) => (
          <li className="w-full flex gap-x-5 items-center justify-between">
            <div className="flex items-center gap-x-2">
              <img
                src={profilePictures[reactElement.userAvatar]}
                alt="User"
                className="size-10 object-contain rounded-full"
              />
              <div>
                <h5>{reactElement.username}</h5>
                {reactElement.userId === socket.id && (
                  <button
                    className="text-sm font-semibold"
                    data-id={reactElement.messageId}
                    onClick={(e) => {
                      removeReact(e);
                      setViewReactsList(-1);
                    }}
                  >
                    Tap to remove
                  </button>
                )}
              </div>
            </div>
            <img
              className="size-8"
              src={reacts[reactElement.react]}
              alt="react"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
