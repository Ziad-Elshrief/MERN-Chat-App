import { Ban, Reply, SmilePlus } from "lucide-react";
import { MessageType } from "../lib/types";
import { profilePictures } from "../utils/profilePictures";
import { useUserInfo } from "../context/UserInfoContext";
import TotalReactsButton from "./TotalReactsButton";
import RepliedMessage from "./RepliedMessage";
import { useMessageList } from "../context/MessageListContext";

export default function Message({
  message,
  index,
  handleReactMenu,
  setViewProfilePicture,
  setViewImage,
  setViewReactsList,
  scrollToRepliedMessage,
}: {
  message: MessageType;
  index: number;
  handleReactMenu(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  setViewImage: React.Dispatch<React.SetStateAction<string>>;
  setViewProfilePicture: React.Dispatch<React.SetStateAction<string>>;
  setViewReactsList: React.Dispatch<React.SetStateAction<number>>;
  scrollToRepliedMessage(replyIndex: number): void;
}) {
  const { userInfo } = useUserInfo();
  const { messageList, setRepliedMessageId } = useMessageList();

  const replyIndex = messageList.findIndex(
    (replyMessage) => replyMessage.messageId === message.repliedMessageId
  );

  function addReply(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const replyId = e.currentTarget.getAttribute("data-id");
    if (replyId !== null) {
      setRepliedMessageId(replyId);
    }
  }

  return (
    <div
      key={message.messageId}
      className={` mb-5 gap-2 sm:gap-3 flex items-end ${
        message.userId === userInfo?._id ? "ml-auto flex-row-reverse" : ""
      }`}
    >
      <img
        src={profilePictures[+message.userAvatar]}
        alt={`${message.userAvatar}-${message.username}`}
        className="size-10 object-contain rounded-full cursor-pointer"
        onClick={(e) => setViewProfilePicture(e.currentTarget.alt)}
      />
      <div
        className={`relative p-3 ${
          message.userId === userInfo?._id
            ? "bg-violet-400"
            : "bg-indigo-300 bg-opacity-85"
        } rounded-md w-[calc(100%-88px)] break-words shadow-md`}
      >
        <button
          title="Add react"
          aria-label="Add react"
          data-id={message.messageId}
          className={`absolute  ${
            message.userId === userInfo?._id ? "right-2" : "left-2"
          } bottom-0 translate-y-1/2 py-1 px-1.5 rounded-2xl bg-gray-500`}
          onClick={(e) => handleReactMenu(e)}
        >
          <SmilePlus size={16} />
        </button>
        {message.reactsList.length > 0 && (
          <TotalReactsButton
            Message={message}
            MessageIndex={index}
            setViewReactsList={setViewReactsList}
          />
        )}
        <p className="pl-1 text-indigo-900 font-semibold">{message.username}</p>

        {message.repliedMessageId !== "" && (
          <>
            {replyIndex !== -1 ? (
              <div
                className="cursor-pointer my-1 rounded-xl bg-slate-800 bg-opacity-30 flex gap-x-2.5 justify-between items-stretch overflow-hidden"
                onClick={() => scrollToRepliedMessage(replyIndex)}
              >
                <RepliedMessage messageInReply={messageList[replyIndex]} />
              </div>
            ) : (
              <div className="my-1 rounded-xl bg-slate-800 p-2 bg-opacity-30 border-l-8 border-indigo-800">
                <p className="text-indigo-900 font-semibold">
                  <Ban className="inline mb-1 mr-1" size={16} /> Unavailable
                  Message
                </p>
              </div>
            )}
          </>
        )}
        {message.content !== "" && (
          <p className="pl-1 whitespace-pre-line" dir="auto">
            {message.content}
          </p>
        )}
        {message.image !== "" && (
          <img
            className="mt-1 pl-1 w-full rounded-lg cursor-pointer"
            src={message.image}
            onClick={(e) => setViewImage(e.currentTarget.src)}
          />
        )}
        <time
          className={` ${
            message.userId === userInfo?._id ? "" : "text-right"
          } mt-1 text-gray-800 font-semibold text-xs pl-1 `}
        >
          {message.time}
        </time>
      </div>
      <button
        title="Add reply"
        aria-label="Add reply"
        className="bg-indigo-800 p-1 self-center rounded-full text-white"
        data-id={message.messageId}
        onClick={(e) => addReply(e)}
      >
        <Reply />
      </button>
    </div>
  );
}
