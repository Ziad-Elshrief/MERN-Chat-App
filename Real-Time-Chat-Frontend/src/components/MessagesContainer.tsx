import {
  Ban,
  ChevronsDown,
  Image,
  MessageSquareMore,
  Reply,
} from "lucide-react";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { profilePictures } from "../utils/profilePictures";
import { MessageType } from "../lib/types";

type typingPersonType = {
  username: string;
  id: string;
};

const SCROLL_DISTANCE = 200;

export default function MessagesContainer({
  setReply,
}: {
  setReply: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
}) {
  const [typingPeople, setTypingPeople] = useState<typingPersonType[]>([]);
  const [messagesList, setMessagesList] = useState<MessageType[]>([]);
  const [messagesScroll, setMessageScroll] = useState(0);
  const messagesRef = useRef<HTMLDivElement>(null);
  function addReply(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const replyId = e.currentTarget.getAttribute("data-id");
    if (replyId !== null) {
      setReply(messagesList.filter((msg) => msg.messageId === replyId)[0]);
    }
  }
  function scrollToBottom() {
    messagesRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
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
    scrollToBottom();
  }, [messagesList]);
  return (
    <div
      className="relative bg-white dark:bg-slate-800 p-4 overflow-y-scroll border-l-2 border-l-indigo-700 sm:border-0"
      ref={messagesRef}
      onScroll={(e) =>
        setMessageScroll(
          e.currentTarget.scrollHeight -
            e.currentTarget.clientHeight -
            e.currentTarget.scrollTop
        )
      }
    >
      {messagesList.map((msg) => {
        const replyIndex = messagesList.findIndex(
          (replyMessage) => replyMessage.messageId === msg.repliedMessageId
        );
        return msg.username === "System" ? (
          <p
            className="mb-3 text-indigo-900 dark:text-indigo-300 text-center"
            key={msg.messageId}
          >
            {msg.content}
          </p>
        ) : (
          <div
            key={msg.messageId}
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

              {msg.repliedMessageId !== "" && (
                <>
                  {replyIndex !== -1 ? (
                    <div
                      className="cursor-pointer my-1 rounded-xl bg-slate-800 bg-opacity-30 flex gap-x-2.5 justify-between items-end overflow-hidden"
                      onClick={() =>
                        messagesRef.current?.children[
                          replyIndex
                        ].scrollIntoView({
                          behavior: "smooth",
                        })
                      }
                    >
                      <div  className="border-l-8 border-indigo-800 p-2">
                      <h6 className="text-indigo-900 font-semibold">
                        {messagesList[replyIndex].userId === socket.id
                          ? "You"
                          : messagesList[replyIndex].username}
                      </h6>
                        <p
                          className="whitespace-pre-line line-clamp-3"
                          dir="auto"
                        >
                          {messagesList[replyIndex].content !== "" ? (
                            messagesList[replyIndex].content
                          ) : (
                            <>
                              <Image
                                className="inline mb-0.5 mr-0.5"
                                size={16}
                              />
                              Photo
                            </>
                          )}
                        </p>
                      </div>
                      {messagesList[replyIndex].image !== "" && (
                          <img
                            className="w-16 self-stretch object-cover object-center rounded-e-xl"
                            src={messagesList[replyIndex].image}
                          />
                        )}
                    </div>
                  ) : (
                    <div className="my-1 rounded-xl bg-slate-800 p-2 bg-opacity-30 border-l-8 border-indigo-800">
                      <p className="text-indigo-900 font-semibold">
                        <Ban className="inline mb-1 mr-1" size={16} />{" "}
                        Unavailable Message
                      </p>
                    </div>
                  )}
                </>
              )}

              {msg.content !== "" && (
                <p className="pl-1 whitespace-pre-line" dir="auto">
                  {msg.content}
                </p>
              )}
              {msg.image !== "" && (
                <img className="mt-1 pl-1 w-full rounded-lg" src={msg.image} />
              )}
            </div>
            <button
              className="bg-indigo-800 p-1 self-center rounded-full text-white"
              data-id={msg.messageId}
              onClick={(e) => addReply(e)}
            >
              <Reply />
            </button>
          </div>
        );
      })}
      <button
        className={`${
          messagesScroll > SCROLL_DISTANCE ? "" : "hidden"
        } sticky bottom-4 right-4 left-full p-1 bg-indigo-900 text-indigo-400 shadow-gray-900 rounded-full shadow-sm`}
        onClick={scrollToBottom}
      >
        <ChevronsDown />
      </button>
      <p
        className={`${
          typingPeople.length > 0 ? "" : "h-0 overflow-hidden"
        } text-indigo-900 dark:text-indigo-300`}
      >
        <MessageSquareMore className="inline mb-1 mr-1" />
        {`${typingPeople.join(", ")} ${
          typingPeople.length > 1 ? "are typing..." : "is typing..."
        }`}
      </p>
    </div>
  );
}
