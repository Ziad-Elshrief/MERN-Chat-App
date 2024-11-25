import { ImageUp, Send, X } from "lucide-react";
import { socket } from "../socket";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export default function SendMessage() {
  const [image, setImage] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      target.msg.style = "height:40px !important";
      target.msg.focus();
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

  const compressImage = async (
    file: File,
    { quality = 1, type = file.type }
  ) => {
    const imageBitmap = await createImageBitmap(file);
    console.log(canvasRef);
    if (canvasRef.current !== null) {
      canvasRef.current.width = imageBitmap.width;
      canvasRef.current.height = imageBitmap.height;
      const ctx = canvasRef.current?.getContext("2d");
      ctx?.drawImage(imageBitmap, 0, 0);
      setImage(canvasRef.current?.toDataURL(type, quality) || "");
    }
  };

  return (
    <div className="py-5 px-4 sm:px-8 bg-indigo-700 h-fit">
      <div className={`${image === "" ? "hidden" : ""} relative w-fit mb-2`}>
        <canvas className="w-20" ref={canvasRef}></canvas>
        <button
          className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-indigo-300 border border-indigo-950 rounded-full"
          onClick={() => setImage("")}
        >
          <X className="text-indigo-950 " size={20} />
        </button>
      </div>
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
          className="flex-shrink-0 bg-indigo-900 p-2 text-white hover:bg-indigo-500 rounded-s-lg focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0"
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
        />
        <button className="flex-shrink-0  bg-indigo-900 p-2 rounded-e-lg text-white hover:bg-indigo-500 focus:outline-none focus:border focus:border-indigo-300 focus:ring-0 focus:ring-offset-0">
          <Send className="mr-0.5 inline mb-1" size={14} /> Send
        </button>
      </form>
    </div>
  );
}
