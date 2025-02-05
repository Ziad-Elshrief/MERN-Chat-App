import { ChevronsDown } from "lucide-react";
import { socket } from "../socket";
import { useEffect, useRef, useState } from "react";
import { MessageReactType, MessageType, ReactMenuInfoType } from "../lib/types";
import ReactsMenu from "./ReactsMenu";
import ImageViewer from "./ImageViewer";
import ReactsListPopup from "./ReactsListPopup";
import TypingPeopleInfo from "./TypingPeopleInfo";
import ProfilePictureViewer from "./ProfilePictureViewer";
import { useUserInfo } from "../context/UserInfoContext";
import { useMessageList } from "../context/MessageListContext";
import Message from "./Message";

const SCROLL_DISTANCE = 200;

export default function MessagesContainer() {
  const { userInfo } = useUserInfo();
  const { messageList, setMessageList } = useMessageList();
  const [scrolledUp, setScrolledUp] = useState(0);
  const [scrollFlag, setScrollFlag] = useState(false);
  const [viewImage, setViewImage] = useState("");
  const [viewProfilePicture, setViewProfilePicture] = useState("");
  const [viewReactMenu, setViewReactMenu] = useState(false);
  const [reactMenuInfo, setReactMenuInfo] = useState<ReactMenuInfoType>();
  const [viewReactsList, setViewReactsList] = useState(-1);
  const messagesRef = useRef<HTMLDivElement>(null);
  function scrollToBottom() {
    messagesRef.current?.lastElementChild?.scrollIntoView({
      behavior: "smooth",
    });
  }
  function scrollToRepliedMessage(replyIndex: number) {
    messagesRef.current?.children[replyIndex].scrollIntoView({
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
    setMessageList((prev) =>
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
              if (MessageReact.userId === userInfo?._id) {
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
    socket.on("message", (message: MessageType) => {
      setMessageList((prev) => [
        ...prev,
        {
          ...message,
          time: new Date(message.time).toLocaleTimeString(["en-US"], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        },
      ]);
      if (message.userId === userInfo?._id) setScrollFlag(true);
    });
    socket.on("updateReact", (MessageReact: MessageReactType) => {
      updateReacts(MessageReact);
    });
  }, [userInfo?._id]);

  useEffect(() => {
    if (scrollFlag) {
      scrollToBottom();
      setScrollFlag(false);
    }
  }, [scrollFlag]);
  return (
    <>
      <section className="relative overflow-hidden">
      {viewProfilePicture !== "" && (
        <ProfilePictureViewer
          setViewProfilePicture={setViewProfilePicture}
          viewProfilePicture={viewProfilePicture}
        />
      )}
      {viewImage !== "" && (
        <ImageViewer setViewImage={setViewImage} viewImage={viewImage} />
      )}
        <div
          className=" bg-white dark:bg-slate-800 p-4 h-full overflow-x-hidden overflow-y-scroll border-l-2 border-l-indigo-700 md:border-0"
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
              message={messageList[viewReactsList]}
              setViewReactsList={setViewReactsList}
            />
          )}
          {messageList.map((msg, index) => {
            return msg.username === "System" ? (
              <p
                className="mb-3 text-indigo-900 dark:text-indigo-300 text-center"
                key={msg.messageId}
              >
                {msg.content}
              </p>
            ) : (
              <Message
                message={msg}
                index={index}
                handleReactMenu={handleReactMenu}
                setViewImage={setViewImage}
                setViewProfilePicture={setViewProfilePicture}
                setViewReactsList={setViewReactsList}
                scrollToRepliedMessage={scrollToRepliedMessage}
              />
            );
          })}
          <button
            title="Scroll to bottom"
            aria-label="Scroll to bottom"
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
