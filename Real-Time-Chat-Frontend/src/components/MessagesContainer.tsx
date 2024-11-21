import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";

type Message = {
  text: string;
  time: string;
  username: string;
  userId: string;
};

export default function MessagesContainer() {
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);
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
      className="bg-white dark:bg-slate-800 p-8 max-h-96 overflow-y-scroll border-l-2 border-l-indigo-700 sm:border-0"
      ref={messagesRef}
    >
      {messagesList.map((msg, index) =>
        msg.username === "System" ? (
          <p
            className="mb-3 text-indigo-900 dark:text-indigo-300 block text-center"
            key={index}
          >
            {msg.text}
          </p>
        ) : (
          <div
            className={`p-3 mb-4 ${
              msg.userId === socket.id
                ? "bg-violet-400 ml-auto"
                : "bg-indigo-300"
            } rounded-md w-10/12 sm:w-7/12 break-words shadow-md`}
            key={index}
          >
            <p className="text-indigo-900 font-semibold opacity-70 mb-2 ">
              {msg.username}
              <span className="text-gray-800 font-bold ml-1">{msg.time}</span>
            </p>
            <p>{msg.text}</p>
          </div>
        )
      )}
    </div>
  );
}
