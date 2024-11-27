import { MessageSquareMore, Reply } from "lucide-react";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { profilePictures } from "../utils/profilePictures";

type MessageType = {
  username: string;
  userId: string;
  userAvatar: number;
  content: string;
  image: string;
  reply: string;
  replySender: string;
  time: string;
};

type typingPersonType = {
  username: string;
  id: string;
};

export default function MessagesContainer({
  setReply,
}: {
  setReply: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [typingPeople, setTypingPeople] = useState<typingPersonType[]>([]);
  const [messagesList, setMessagesList] = useState<MessageType[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);
  function addReply(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const messageIndex = e.currentTarget.getAttribute("data-index");
    if (messageIndex !== null) {
      if (messagesList[+messageIndex].image !== "") {
        setReply([
          "📷 Photo\n" + messagesList[+messageIndex].content,
          messagesList[+messageIndex].username,
        ]);
      } else {
        setReply([
          messagesList[+messageIndex].content,
          messagesList[+messageIndex].username,
        ]);
      }
    }
  }
  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prev) => [...prev, message]);
    });
  }, []);
  socket.on("typingPeople", (typing) => {
    setTypingPeople(
      typing
        .filter(
          (typingPerson: typingPersonType) => typingPerson.id !== socket.id
        )
        .map((typingPerson: typingPersonType) => typingPerson.username)
    );
  });
  useEffect(() => {
    messagesRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messagesList]);
  return (
    <div
      className=" bg-white dark:bg-slate-800 p-4 overflow-y-scroll border-l-2 border-l-indigo-700 sm:border-0"
      ref={messagesRef}
    >
      {messagesList.map((msg, index) =>
        msg.username === "System" ? (
          <p
            className="mb-3 text-indigo-900 dark:text-indigo-300 text-center"
            key={index}
          >
            {msg.content}
          </p>
        ) : (
          <div
            key={index}
            className={` mb-4 gap-2 sm:gap-3 flex items-end ${
              msg.userId === socket.id ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            <img
              src={profilePictures[+msg.userAvatar]}
              alt="User"
              className="size-10 object-contain rounded-full"
            />
            <div
              className={`p-3 ${
                msg.userId === socket.id
                  ? "bg-violet-400"
                  : "bg-indigo-300 bg-opacity-85"
              } rounded-md w-10/12 sm:w-7/12 break-words shadow-md`}
            >
              <div className="pl-1 flex justify-between items-center flex-shrink-0">
                <p className="text-indigo-900 font-semibold ">{msg.username}</p>
                <span className="text-gray-800 font-semibold text-sm">
                  {msg.time}
                </span>
              </div>
              {msg.reply !== "" && (
                <div className="my-1 rounded-xl bg-slate-800 p-2 bg-opacity-30 border-l-8 border-indigo-800">
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
            <button
              className="bg-indigo-800 p-1 self-center rounded-full text-white"
              data-index={index}
              onClick={(e) => addReply(e)}
            >
              <Reply />
            </button>
          </div>
        )
      )}
      {typingPeople.length > 0 && (
        <p className="text-indigo-900 dark:text-indigo-300">
          <MessageSquareMore className="inline mb-1 mr-1" />{" "}
          {`${typingPeople.join(", ")} ${
            typingPeople.length > 1 ? "are typing..." : "is typing..."
          }`}
        </p>
      )}
    </div>
  );
}
