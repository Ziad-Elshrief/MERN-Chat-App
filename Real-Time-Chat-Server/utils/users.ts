import {UserType} from "../lib/types"

const users:UserType[] = [];


function userJoin(id:string, username:string, room:string, avatar:number):UserType {
  const user = { id, username, room, avatar };
  users.push(user);
  return user;
}

function getCurrentUser(id:string):UserType | undefined {
  return users.find((user) => user.id === id);
}

function userLeave(id:string) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

function getRoomUsers(room:string):UserType[] {
  return users.filter((user) => user.room === room);
}

function checkUserInRoom(room:string, username:string,userId:string) {
  const userRooms = users.filter((user) => user.username === username && user.id !== userId);
  if (userRooms.length > 0) {
    return userRooms.find((userRoom) => userRoom.room === room);
  }
  return undefined;
}

export {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  checkUserInRoom,
};
