export type MessageReactType = {
  username: string;
  userId: string;
  userAvatar: number;
  messageId: string;
  react: number;
};

export type UserInfoType = {
  _id: string;
  username: string;
  email: string;
  avatar: number;
};

export type MessageType = {
  username: string;
  userId: string;
  userAvatar: number;
  messageId: string;
  content: string;
  image: string;
  repliedMessageId: string;
  reactsList: MessageReactType[];
  time: string;
};

export type UserType = {
  id: string;
  room: string;
  username: string;
  avatar: number;
};

export type ReactMenuInfoType = {
  messageId: string;
  positionX: number;
  positionY: number;
};
