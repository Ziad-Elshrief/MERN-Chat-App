// import { Reply } from "lucide-react";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";

type Message = {
  username: string;
  userId: string;
  content: string;
  image: string;
  reply: string;
  replySender?: string;
  time: string;
};

export default function MessagesContainer() {
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prev) => [...prev, message]);
    });
  }, []);
  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messagesList]);
  return (
    <div
      className=" bg-white dark:bg-slate-800 p-5 overflow-y-scroll border-l-2 border-l-indigo-700 sm:border-0"
      ref={messagesRef}
    >
      {messagesList.map((msg, index) =>
        msg.username === "System" ? (
          <p
            className="mb-3 text-indigo-900 dark:text-indigo-300 block text-center"
            key={index}
          >
            {msg.content}
          </p>
        ) : (
          <div
            key={index}
            className={` mb-4 gap-3 flex items-center ${
              socket.id === socket.id ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            <div
              className={`p-3 ${
                socket.id === socket.id ? "bg-violet-400" : "bg-indigo-300"
              } rounded-md w-10/12 sm:w-7/12 break-words shadow-md`}
            >
              <div className="pl-1 flex justify-between items-center flex-shrink-0">
                <p className="text-indigo-900 font-semibold ">{msg.username}</p>
                <span className="text-gray-800 font-semibold text-sm">
                  {msg.time}
                </span>
              </div>
              {msg.reply !== "" && (
                <div className="my-1 rounded-xl bg-slate-800 p-2 bg-opacity-30 border-l-4 border-indigo-800">
                  <h6 className="text-indigo-900 font-semibold">
                    {msg.replySender}
                  </h6>
                  <p className="whitespace-pre-line line-clamp-3" dir="auto">
                    {msg.reply}
                  </p>
                </div>
              )}
              {msg.content !== "" && (
                <p className="pl-1 whitespace-pre-line" dir="auto">
                  {msg.content}
                </p>
              )}
              {msg.image !== "" && (
                <img className="mt-1 pl-1 w-full" src={msg.image} />
              )}
            </div>
            {/* <button className="bg-indigo-800 p-2 rounded-full text-white">
              <Reply />
            </button> */}
          </div>
        )
      )}
    </div>
  );
}
