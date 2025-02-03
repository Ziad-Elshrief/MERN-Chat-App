import { MessageSquareMore } from "lucide-react";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { useUserInfo } from "../context/UserInfoContext";

type typingPersonType = {
    username: string;
    userId: string;
  };

export default function TypingPeopleInfo(){
  const [typingPeople, setTypingPeople] = useState<typingPersonType[]>([]);
  const {userInfo}=useUserInfo()
    useEffect(()=>{
        socket.on("typingPeople", (typing) => {
            setTypingPeople(
              typing
                .filter(
                  (typingPerson: typingPersonType) => typingPerson.userId !== userInfo?._id
                )
                .map((typingPerson: typingPersonType) => typingPerson.username)
            );
          });
    },[userInfo?._id])
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