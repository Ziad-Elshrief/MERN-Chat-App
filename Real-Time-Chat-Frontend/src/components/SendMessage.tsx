import { ImageUp, Send, X } from "lucide-react";
import { socket } from "../socket";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { MessageType } from "../lib/types";

export default function SendMessage({
  setReply,
  reply,
}: {
  setReply: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
  reply: MessageType | undefined;
}) {
  const [image, setImage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const message = target.msg.value.trim();
    if (!(message === "" && image === "")) {
      socket.emit("chatMessage", {
        content: message,
        image,
        repliedMessageId: reply?.messageId || "",
      });
      socket.emit("notTyping");
      setImage("");
      setReply(undefined);
      target.msg.value = "";
      target.msg.style = "height:40px !important";
      target.msg.focus();
      if (fileInput.current) {
        fileInput.current.value = "";
      }
    }
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
        <canvas className="w-20" ref={canvasRef}></canvas>
        <button
          className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-indigo-300 border border-indigo-950 rounded-full"
          onClick={() => cancelImage()}
        >
          <X className="text-indigo-950 " size={20} />
        </button>
      </div>
      {reply && (
        <div className="relative mb-2 rounded-xl bg-violet-400 p-2 border-l-8 border-indigo-800 flex gap-x-2.5 w-full justify-between">
          <div>
            <h6 className="text-indigo-900 font-semibold">
              Replying to{" "}
              {reply.userId === socket.id ? "yourself" : reply.username}
            </h6>
            <p className="whitespace-pre-line line-clamp-2" dir="auto">
              {reply.content}
            </p>
          </div>
          {reply.image !== "" && (
            <img className="mt-1 pl-1 h-[72px]" src={reply.image} />
          )}
          <button
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-indigo-300 border border-indigo-950 rounded-full"
            onClick={() => setReply(undefined)}
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
        <button className="h-10 flex-shrink-0  bg-indigo-900 p-2 rounded-e-lg text-white hover:bg-indigo-500 focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0">
          <Send className="mr-0.5 inline mb-1" size={14} /> Send
        </button>
      </form>
    </div>
  );
}
