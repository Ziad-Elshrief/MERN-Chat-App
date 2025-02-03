import { UserType } from "../lib/types";

const users: UserType[] = [];

function userJoin(
  socketId: string,
  userId: string,
  username: string,
  room: string,
  avatar: number
): UserType {
  const user = { socketIds: [socketId], userId, username, room, avatar };
  users.push(user);
  return user;
}

function userRejoin(socketId: string, userId: string, room: string) {
  const index = users.findIndex(
    (user) => user.userId === userId && user.room === room
  );
  if (index !== -1) {
    users[index].socketIds.push(socketId);
  }
  return users[index]
}

function getCurrentUser(socketId: string): UserType | undefined {
  return users.find((user) => user.socketIds.includes(socketId));
}

function userLeave(socketId: string) {
  const index = users.findIndex((user) => user.socketIds.includes(socketId));
  if (index !== -1) {
    const socketIndex = users[index].socketIds.findIndex(
      (socket) => socket === socketId
    );
    users[index].socketIds.splice(socketIndex, 1);
    if (users[index].socketIds.length === 0) {
      return users.splice(index, 1)[0];
    }
  }
}

function getRoomUsers(room: string): UserType[] {
  return users.filter((user) => user.room === room);
}

function checkUserInRoom(room: string, userId: string) {
  return users.find((user) => user.userId === userId && user.room === room);
}

export {
  userJoin,
  userRejoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  checkUserInRoom,
};
