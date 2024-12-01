import { MessageSquareMore } from "lucide-react";
import { useEffect, useState } from "react";
import { socket } from "../socket";

type typingPersonType = {
    username: string;
    id: string;
  };

export default function TypingPeopleInfo(){
  const [typingPeople, setTypingPeople] = useState<typingPersonType[]>([]);

    useEffect(()=>{
        socket.on("typingPeople", (typing) => {
            setTypingPeople(
              typing
                .filter(
                  (typingPerson: typingPersonType) => typingPerson.id !== socket.id
                )
                .map((typingPerson: typingPersonType) => typingPerson.username)
            );
          });
    },[])
    return (
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
    )
}