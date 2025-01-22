const path = require("path");
const cors = require("cors");
const express = require("express");
const socketio = require("socket.io");
const { formatMessage, updateReact } = require("./utils/messages");
const {
  getCurrentUser,
  userJoin,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();

let corsOptions = {};

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "Real-Time-Chat-Frontend", "dist")))
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "Real-Time-Chat-Frontend", "dist", "index.html")
    )
  );
} else {
  corsOptions = {
    origin: "*",
  };

  app.use(cors({ origin: process.env.FRONTEND_DEV_URL }));
  app.get("/", (req, res) =>
    res.send("Please convert to production enviroment")
  );
}

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const io = socketio(server, {
  cors: corsOptions,
});

let typingPeople = [];

// Run when client connects
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room, avatar }) => {
    const user = userJoin(socket.id, username, room, avatar);
    socket.join(user.room);
    //Welcome current user
    socket.emit(
      "message",
      formatMessage("System", "0", {
        content: `Welcome to ${user.room} room chat`,
      })
    );
    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit(
      "message",
      formatMessage("System", "0", {
        content: `${user.username} has joined the chat`,
      })
    );
    // Send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });
  //  Listen for chat message
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit(
      "message",
      formatMessage(user.username, user.id, msg, user.avatar)
    );
  });
  //Listen for react
  socket.on("sendReact", (reactInfo) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("updateReact", updateReact(reactInfo, user));
  });
  // Send typing people to each client in room
  socket.on("typing", () => {
    const user = getCurrentUser(socket.id);
    if (!typingPeople.find((person) => person.id === user.id)) {
      typingPeople.push({ username: user.username, id: user.id });
      io.to(user.room).emit("typingPeople", typingPeople);
    }
  });
  socket.on("notTyping", () => {
    const user = getCurrentUser(socket.id);
    typingPeople = typingPeople.filter((typing) => typing.id !== user.id);
    io.to(user.room).emit("typingPeople", typingPeople);
  });

  // Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("System", "0", {
          content: `${user.username} has left the chat`,
        })
      );
      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
      // remove from typing
      typingPeople = typingPeople.filter((typing) => typing.id !== user.id);
      io.to(user.room).emit("typingPeople", typingPeople);
    }
  });
});
