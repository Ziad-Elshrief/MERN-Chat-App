import { MessageReactType,sentMessage, MessageType, UserType } from "../lib/types";


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
  user: UserType
): MessageReactType => {
  return {
    ...reactInfo,
    userId: user.userId,
    userAvatar: user.avatar,
    username: user.username,
  };
};

export { formatMessage, updateReact };
