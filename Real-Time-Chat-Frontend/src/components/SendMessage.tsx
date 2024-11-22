import { ImageUp, Send, X } from "lucide-react";
import { socket } from "../socket";
import { useRef, useState } from "react";

export default function SendMessage() {
  const [image, setImage] = useState("");
  const fileInput = useRef<HTMLInputElement | null>(null);
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    if (image !== "") {
      socket.emit("imageMessage", image);
      setImage("");
    }
    const message = target.msg.value.trim();
    if (message !== "") {
      socket.emit("chatMessage", message);
      target.msg.value = "";
      target.msg.focus();
    }
  }
  function getImage() {
    if (!fileInput.current?.files?.length) {
      return;
    }
    setImage(URL.createObjectURL(fileInput.current?.files[0]));
  }
  return (
    <div className="py-5 px-4 sm:px-8 bg-indigo-700 h-fit">
      {image !== "" && (
        <div className="relative w-fit mb-2">
          <img src={image} className="w-20" alt="messge" />
          <button
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-indigo-300 border border-indigo-950 rounded-full"
            onClick={() => setImage("")}
          >
            <X className="text-indigo-950 " size={20} />
          </button>
        </div>
      )}
      <form id="chat-form" className="flex" onSubmit={(e) => sendMessage(e)}>
        <button
          type="button"
          className="flex-shrink-0  bg-indigo-900 p-2 text-white hover:bg-indigo-500 rounded-s-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0"
          onClick={() => fileInput.current?.click()}
        >
          <ImageUp />
        </button>
        <input
          autoComplete="off"
          className="bg-white dark:bg-slate-800 p-2 h-10 flex-1  caret-indigo-700 text-indigo-900 dark:text-indigo-300 focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0"
          id="msg"
          name="msg"
          type="text"
          placeholder="Enter Message"
        />
        <input
          type="file"
          className="hidden"
          ref={fileInput}
          onChange={getImage}
        />
        <button className="flex-shrink-0  bg-indigo-900 p-2 rounded-e-lg text-white hover:bg-indigo-500 focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0">
          <Send className="mr-0.5 inline mb-1" size={14} /> Send
        </button>
      </form>
    </div>
  );
}
