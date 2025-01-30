import { MessageReactType, MessageType, userActionType } from "../lib/types";

type sentMessage = {
  content?: string;
  image?: string;
  repliedMessageId?: string;
};

const formatMessage = (
  username: string,
  userId: string,
  msg: sentMessage,
  userAvatar?: number
): MessageType => {
  const messageId = `${Date.now()}-${userId}`;
  return {
    username,
    userId,
    userAvatar,
    messageId,
    content: msg.content || "",
    image: msg.image || "",
    repliedMessageId: msg.repliedMessageId || "",
    reactsList: [],
    time: new Date().toISOString(),
  };
};

const updateReact = (
  reactInfo: { react: number; messageId: string },
  user: userActionType
): MessageReactType => {
  return {
    ...reactInfo,
    userId: user.id,
    userAvatar: user.avatar,
    username: user.username,
  };
};

export { formatMessage, updateReact };
