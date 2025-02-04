import { FormEvent, useState } from "react";
import { Input } from "./Input";
import { Check, Clipboard } from "lucide-react";

export default function CopyClipboardLink() {
  const [isClicked, setIsClicked] = useState(false);
  function copyRoomLink(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const roomLink = formData.get("roomLink") as string;
    if (roomLink != null) {
      navigator.clipboard.writeText(roomLink);
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
    }
  }
  return (
    <>
      <form
        onSubmit={copyRoomLink}
        className="flex justify-center items-center"
      >
        <Input
          defaultValue={location.href}
          readOnly
          name="roomLink"
          id="roomLink"
          
        />
        <button
          type="submit"
          className="text-white bg-indigo-800 hover:bg-indigo-600 focus:ring-4 focus:outline-none focus:ring-indigo-400 font-medium rounded-lg text-sm  p-2.5 text-center"
          disabled={isClicked}
        >
          {isClicked ? (
            <Check className="size-5" />
          ) : (
            <Clipboard className="size-5" />
          )}
        </button>
      </form>
    </>
  );
}
