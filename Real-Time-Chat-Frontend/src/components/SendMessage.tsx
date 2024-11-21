import { Send } from "lucide-react";
import { socket } from "../socket";

export default function SendMessage() {
  function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const message = target.msg.value.trim();
    if (message !== "") {
      socket.emit("chatMessage", message);
      target.msg.value = "";
      target.msg.focus();
    }
  }
  return (
    <div className="py-5 px-4 sm:px-8 bg-indigo-700">
      <form id="chat-form" className="flex" onSubmit={(e) => sendMessage(e)}>
        <input
          autoComplete="off"
          className="bg-white dark:bg-slate-800 p-2 h-10 flex-1  caret-indigo-700 text-indigo-900 dark:text-indigo-300 rounded-s-lg focus-visible:outline-indigo-700"
          id="msg"
          name="msg"
          type="text"
          placeholder="Enter Message"
          required
        />
        <button className="flex-shrink-0  bg-indigo-900 p-2 rounded-e-lg text-white hover:bg-indigo-500">
          <Send className="mr-0.5 inline mb-1" size={14} /> Send
        </button>
      </form>
    </div>
  );
}
