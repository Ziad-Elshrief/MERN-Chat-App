import {
  Ban,
  ChevronsDown,
  Image,
  MessageSquareMore,
  Reply,
  Smile,
  SmilePlus,
  X,
} from "lucide-react";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { profilePictures } from "../utils/profilePictures";
import { MessageReactType, MessageType } from "../lib/types";
import { reacts } from "../utils/reacts";

type typingPersonType = {
  username: string;
  id: string;
};

type ReactMenuInfoType = {
  messageId: string;
  positionX: number;
  positionY: number;
};

const SCROLL_DISTANCE = 200;

export default function MessagesContainer({
  setReply,
}: {
  setReply: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
}) {
  const [typingPeople, setTypingPeople] = useState<typingPersonType[]>([]);
  const [messagesList, setMessagesList] = useState<MessageType[]>([]);
  const [scrolledUp, setScrolledUp] = useState(0);
  const [messageArrived, setMessageArrived] = useState(true); //true or false doesn't indicate anything
  const [viewImage, setViewImage] = useState("");
  const [viewReactMenu, setViewReactMenu] = useState(false);
  const [reactMenuInfo, setReactMenuInfo] = useState<ReactMenuInfoType>();
  const [viewReactsList, setViewReactsList] = useState(-1);
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
  function sendReact(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const index = e.currentTarget.getAttribute("data-index");
    socket.emit("sendReact", {
      react: index,
      messageId: reactMenuInfo?.messageId,
    });
    setViewReactMenu(false);
  }
  function removeReact(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const messageId = e.currentTarget.getAttribute("data-id");
    socket.emit("sendReact", { react: -1, messageId });
  }
  function handleReactMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const messageId = e.currentTarget.getAttribute("data-id") || "";
    const positionY =
      (e.clientY || 0) - (messagesRef.current?.getClientRects()[0].y || 0);
    let positionX =
      (e.clientX || 0) - (messagesRef.current?.getClientRects()[0].x || 0);
    if (positionX > (messagesRef.current?.getClientRects()[0].width || 0) / 2) {
      positionX -= 80;
    }
    if (positionY - (reactMenuInfo?.positionY || 0) < 40) {
      setViewReactMenu((prev) => !prev);
    } else {
      setViewReactMenu(true);
    }
    setReactMenuInfo({ messageId, positionX, positionY });
  }

  function updateReacts(MessageReact: MessageReactType) {
    setMessagesList((prev) =>
      prev.map((msg) => {
        if (msg.messageId === MessageReact.messageId) {
          const reactIndex = msg.reactsList.findIndex(
            (react) => react.userId === MessageReact.userId
          );
          if (MessageReact.react === -1) {
            msg.reactsList = msg.reactsList.filter(
              (react) => react.userId !== MessageReact.userId
            );
          } else {
            if (reactIndex !== -1) {
              msg.reactsList[reactIndex] = MessageReact;
            } else {
              msg.reactsList = [...msg.reactsList, MessageReact];
            }
          }
        }
        return msg;
      })
    );
  }
  useEffect(() => {
    socket.on("message", (message) => {
      setMessagesList((prev) => [...prev, message]);
      setMessageArrived((prev) => !prev);
    });
    socket.on("updateReact", (MessageReact: MessageReactType) => {
      updateReacts(MessageReact);
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
    setViewReactMenu(false);
    scrollToBottom();
  }, [messageArrived]);
  return (
    <>
      {viewImage !== "" && (
        <div className="absolute top-0 left-0 w-full z-30 h-[calc(100dvh-136px)] bg-black flex justify-center items-center overflow-hidden">
          <img src={viewImage} alt="image" className="max-h-96" />
          <button
            className="absolute right-2 top-2 z-[35]"
            onClick={() => setViewImage("")}
          >
            <X className="text-indigo-400 " size={24} />
          </button>
        </div>
      )}
      <section className="relative overflow-hidden">
        <div
          className=" bg-white dark:bg-slate-800 p-4 h-full overflow-x-hidden overflow-y-scroll border-l-2 border-l-indigo-700 sm:border-0"
          ref={messagesRef}
          onScroll={(e) =>
            setScrolledUp(
              e.currentTarget.scrollHeight -
                e.currentTarget.clientHeight -
                e.currentTarget.scrollTop
            )
          }
        >
          {viewReactsList !== -1 && (
            <div className="absolute bottom-5 right-[5%] rounded-xl  z-20 p-3 space-y-4 h-40 w-[90%] shadow-md bg-slate-300 dark:bg-slate-600 dark:text-white overflow-y-auto">
              <header className="flex justify-between items-center">
                <h3 className="">Reactions</h3>
                <button onClick={() => setViewReactsList(-1)}>
                  <X className="text-indigo-900" size={24} />
                </button>
              </header>
              <ul className="space-y-2.5">
                {messagesList[viewReactsList].reactsList.map((reactElement) => (
                  <li className="w-full flex gap-x-5  justify-between">
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
          )}
          {messagesList.map((msg, index) => {
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
                className={` mb-5 gap-2 sm:gap-3 flex items-end ${
                  msg.userId === socket.id ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <img
                  src={profilePictures[+msg.userAvatar]}
                  alt="User"
                  className="size-10 object-contain rounded-full"
                />
                <div
                  className={`relative p-3 ${
                    msg.userId === socket.id
                      ? "bg-violet-400"
                      : "bg-indigo-300 bg-opacity-85"
                  } rounded-md w-[calc(100%-88px)] break-words shadow-md`}
                >
                  <button
                    data-id={msg.messageId}
                    className={`absolute  ${
                      msg.userId === socket.id ? "right-2" : "left-2"
                    } bottom-0 translate-y-1/2 py-1 px-1.5 rounded-2xl bg-gray-500`}
                    onClick={(e) => handleReactMenu(e)}
                  >
                    <SmilePlus size={16} />
                  </button>
                  {msg.reactsList.length > 0 && (
                    <button
                      className={`absolute  ${
                        msg.userId === socket.id ? "right-11" : "left-11"
                      } bottom-0 translate-y-1/2 p-1 rounded-2xl bg-gray-500 text-sm font-semibold`}
                      data-index={index}
                      onClick={(e) =>
                        setViewReactsList(
                          Number(e.currentTarget.getAttribute("data-index"))
                        )
                      }
                    >
                      {msg.reactsList.length}{" "}
                      <Smile className="mb-0.5 inline" size={14} />
                    </button>
                  )}

                  <p className="pl-1 text-indigo-900 font-semibold">
                    {msg.username}
                  </p>

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
                          <div className="border-l-8 border-indigo-800 p-2 max-w-[calc(100%-64px)]">
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
                    <img
                      className="mt-1 pl-1 w-full rounded-lg cursor-pointer"
                      src={msg.image}
                      onClick={(e) => setViewImage(e.currentTarget.src)}
                    />
                  )}
                  <p
                    className={` ${
                      msg.userId === socket.id ? "" : "text-right"
                    } mt-1 text-gray-800 font-semibold text-xs pl-1 `}
                  >
                    {msg.time}
                  </p>
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
              scrolledUp > SCROLL_DISTANCE ? "" : "hidden"
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
        {viewReactMenu && (
          <div
            className="absolute top-0 left-0 w-full h-full"
            onClick={() => setViewReactMenu(false)}
          >
            <div
              style={{
                top: `${reactMenuInfo?.positionY}px`,
                left: `${reactMenuInfo?.positionX}px`,
              }}
              className={`absolute -translate-y-16 flex gap-2 bg-gray-700 rounded-lg w-fit p-2 `}
            >
              {reacts.map((react, index) => (
                <button
                  key={index}
                  data-index={index}
                  onClick={(e) => sendReact(e)}
                >
                  <img className="size-4" src={react} alt="react" />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
