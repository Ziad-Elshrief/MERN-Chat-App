import { Ban, ChevronsDown, Reply, SmilePlus } from "lucide-react";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { profilePictures } from "../utils/profilePictures";
import { MessageReactType, MessageType, ReactMenuInfoType } from "../lib/types";
import ReactsMenu from "./ReactsMenu";
import ImageViewer from "./ImageViewer";
import ReactsListPopup from "./ReactsListPopup";
import TypingPeopleInfo from "./TypingPeopleInfo";
import RepliedMessage from "./RepliedMessage";
import TotalReactsButton from "./TotalReactsButton";
import ProfilePictureViewer from "./ProfilePictureViewer";

const SCROLL_DISTANCE = 200;

export default function MessagesContainer({
  setReply,
}: {
  setReply: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
}) {
  const [messagesList, setMessagesList] = useState<MessageType[]>([]);
  const [scrolledUp, setScrolledUp] = useState(0);
  const [messageArrived, setMessageArrived] = useState(true); //true or false doesn't indicate anything
  const [viewImage, setViewImage] = useState("");
  const [viewProfilePicture, setViewProfilePicture] = useState("");
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
  function handleReactMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const messageId = e.currentTarget.getAttribute("data-id") || "";
    const positionY =
      (e.clientY || 0) - (messagesRef.current?.getClientRects()[0].y || 0);
    let positionX =
      (e.clientX || 0) - (messagesRef.current?.getClientRects()[0].x || 0);
    if (positionX > (messagesRef.current?.getClientRects()[0].width || 0) / 2) {
      positionX -= 80;
    }
    setViewReactMenu(true);
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
              if (MessageReact.userId === socket.id) {
                msg.reactsList = [MessageReact, ...msg.reactsList];
              } else {
                msg.reactsList = [...msg.reactsList, MessageReact];
              }
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

  useEffect(() => {
    setViewReactMenu(false);
    scrollToBottom();
  }, [messageArrived]);
  return (
    <>
      {viewProfilePicture !== "" && (
        <ProfilePictureViewer
          setViewProfilePicture={setViewProfilePicture}
          viewProfilePicture={viewProfilePicture}
        />
      )}
      {viewImage !== "" && (
        <ImageViewer setViewImage={setViewImage} viewImage={viewImage} />
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
            <ReactsListPopup
              message={messagesList[viewReactsList]}
              setViewReactsList={setViewReactsList}
            />
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
                  alt={`${msg.userAvatar}-${msg.username}`}
                  className="size-10 object-contain rounded-full cursor-pointer"
                  onClick={(e) => setViewProfilePicture(e.currentTarget.alt)}
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
                    <TotalReactsButton
                      Message={msg}
                      MessageIndex={index}
                      setViewReactsList={setViewReactsList}
                    />
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
                          <RepliedMessage
                            messageInReply={messagesList[replyIndex]}
                          />
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
          <TypingPeopleInfo />
        </div>
        {viewReactMenu && (
          <ReactsMenu
            setViewReactMenu={setViewReactMenu}
            reactMenuInfo={reactMenuInfo}
          />
        )}
      </section>
    </>
  );
}
