import { ImageUp, Send, X } from "lucide-react";
import { socket } from "../socket";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useUserInfo } from "../context/UserInfoContext";
import { useMessageList } from "../context/MessageListContext";

export default function SendMessage() {
  const { userInfo } = useUserInfo();
  const { messageList, repliedMessageId, setRepliedMessageId } =
    useMessageList();
  const messageInReply = messageList.filter(
    (msg) => msg.messageId === repliedMessageId
  )[0];
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const target = e.target as HTMLFormElement;
    const message = target.msg.value.trim();
    if (!(message === "" && image === "")) {
      socket.emit("chatMessage", {
        content: message,
        image,
        repliedMessageId: repliedMessageId || "",
      });
      socket.emit("notTyping");
      setImage("");
      setRepliedMessageId(undefined);
      target.msg.value = "";
      target.msg.style = "height:40px !important";
      target.msg.focus();
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
    setIsLoading(false);
  }
  function handleTyping(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.trim() === "") {
      socket.emit("notTyping");
    } else {
      socket.emit("typing");
    }
  }
  async function getImage() {
    if (!fileInput.current?.files?.length) {
      return;
    }
    await compressImage(fileInput.current?.files[0], {
      quality: 0.5,
    });
  }

  function cancelImage() {
    setImage("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }

  const compressImage = async (file: File, { quality = 1 }) => {
    const imageBitmap = await createImageBitmap(file);
    if (canvasRef.current !== null) {
      canvasRef.current.width = imageBitmap.width;
      canvasRef.current.height = imageBitmap.height;
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.drawImage(imageBitmap, 0, 0);
      setImage(canvasRef.current?.toDataURL("image/jpeg", quality) || "");
    }
  };

  return (
    <div className="py-5 px-4 sm:px-8 bg-indigo-700 h-fit">
      <div className={`${image === "" ? "hidden" : ""} relative w-fit mb-2`}>
        <canvas className="w-20 rounded-lg" ref={canvasRef}></canvas>
        <button
          className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-indigo-300 border border-indigo-950 rounded-full"
          onClick={() => cancelImage()}
        >
          <X className="text-indigo-950 " size={20} />
        </button>
      </div>
      {repliedMessageId && (
        <div
          className={` relative mb-2 overflow-hidden rounded-xl bg-violet-400  flex gap-x-2.5 w-full justify-between items-stretch`}
        >
          <div className="border-l-8 border-indigo-800 p-2 max-w-[80%]">
            <h6 className="text-indigo-900 font-semibold">
              Replying to{" "}
              {messageInReply.userId === userInfo?._id
                ? "yourself"
                : messageInReply.username}
            </h6>
            <p className="whitespace-pre-line line-clamp-2" dir="auto">
              {messageInReply.content}
            </p>
          </div>
          {messageInReply.image !== "" && (
            <img
              className="w-1/5 self-stretch object-cover object-center rounded-e-xl  max-h-28"
              src={messageInReply.image}
            />
          )}
          <button
            className="absolute right-1 top-1  bg-indigo-300 border border-indigo-950 rounded-full"
            onClick={() => setRepliedMessageId(undefined)}
          >
            <X className="text-indigo-950 " size={20} />
          </button>
        </div>
      )}
      <form
        id="chat-form"
        className="flex items-end"
        onSubmit={(e) => sendMessage(e)}
      >
        <input
          tabIndex={-1}
          type="file"
          className="hidden"
          ref={fileInput}
          onChange={getImage}
          accept="image/*"
        />
        <button
          type="button"
          className="h-10 w-10 flex-shrink-0 bg-indigo-900 p-2 text-white hover:bg-indigo-500 rounded-s-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0"
          onClick={() => fileInput.current?.click()}
        >
          <ImageUp />
        </button>
        <TextareaAutosize
          className=" bg-white dark:bg-slate-800 p-[7px] min-h-10 flex-1 resize-none  caret-indigo-700 text-indigo-900 dark:text-indigo-300 focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0"
          id="msg"
          name="msg"
          placeholder="Enter message..."
          maxRows={4}
          autoComplete="off"
          dir="auto"
          onChange={(e) => handleTyping(e)}
        />
        <button
          disabled={isLoading}
          className="h-10 flex-shrink-0  bg-indigo-900 p-2 rounded-e-lg text-white hover:bg-indigo-500 focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0 disabled:bg-gray-600"
        >
          <Send className="mr-0.5 inline mb-1" size={14} /> Send
        </button>
      </form>
    </div>
  );
}
