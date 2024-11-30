export type MessageType = {
  username: string;
  userId: string;
  userAvatar: number;
  messageId: string;
  content: string;
  image: string;
  repliedMessageId: string;
  time: string;
};

export type UserType = {
  id: string;
  room: string;
  username: string;
  avatar: number;
};