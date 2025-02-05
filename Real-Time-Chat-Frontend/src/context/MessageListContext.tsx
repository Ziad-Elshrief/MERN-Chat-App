import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { MessageType } from "../lib/types";

type MessageListContextType = {
  messageList: MessageType[];
  setMessageList: React.Dispatch<React.SetStateAction<MessageType[]>>;
  setRepliedMessageId: React.Dispatch<React.SetStateAction<string | undefined>>;
  repliedMessageId: string | undefined;
};

const MessageListContext = createContext<MessageListContextType | null>(null);

export const MessageListContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [messageList, setMessageList] = useState<MessageType[]>([]);
  const [repliedMessageId, setRepliedMessageId] = useState<string>();
  useEffect(() => {
    if (messageList.length > 0) {
      sessionStorage.setItem(
        `room-${location.pathname}`,
        JSON.stringify(messageList)
      );
    }
  }, [messageList]);
  return (
    <MessageListContext.Provider
      value={{
        messageList,
        setMessageList,
        repliedMessageId,
        setRepliedMessageId,
      }}
    >
      {children}
    </MessageListContext.Provider>
  );
};

export const useMessageList = () => {
  const context = useContext(MessageListContext);
  if (!context) {
    throw new Error(
      "MessageList Context must be used within an MessageList Provider"
    );
  }
  return context;
};
