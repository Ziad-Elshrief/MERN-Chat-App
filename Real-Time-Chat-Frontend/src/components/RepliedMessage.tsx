import { Image } from "lucide-react";
import { MessageType } from "../lib/types";
import { useUserInfo } from "../context/UserInfoContext";

type RepliedMessagePropsType = {
  messageInReply: MessageType;
};

export default function RepliedMessage({
  messageInReply,
}: RepliedMessagePropsType) {
  const { userInfo } = useUserInfo();
  return (
    <>
      <div className="border-l-8 border-indigo-800 p-2 max-w-[calc(100%-64px)]">
        <h6 className="text-indigo-900 font-semibold">
          {messageInReply.userId === userInfo?._id
            ? "You"
            : messageInReply.username}
        </h6>
        <p className="whitespace-pre-line line-clamp-3" dir="auto">
          {messageInReply.content !== "" ? (
            messageInReply.content
          ) : (
            <>
              <Image className="inline mb-0.5 mr-0.5" size={16} />
              Photo
            </>
          )}
        </p>
      </div>
      {messageInReply.image !== "" && (
        <img
          className="w-16 self-stretch object-cover object-center rounded-e-xl max-h-28"
          src={messageInReply.image}
        />
      )}
    </>
  );
}
