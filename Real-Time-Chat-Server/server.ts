import path from "path";
import cors from "cors";
import express, { Request, Response } from "express";
import { formatMessage, updateReact } from "./utils/messages.js";
import { Socket, Server } from "socket.io";
import {
  getCurrentUser,
  userJoin,
  userLeave,
  getRoomUsers,
  checkUserInRoom,
} from "./utils/users.js";
import router from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";
import bp from "body-parser";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";

dotenv.config();
connectDB();
const app = express();

let corsOptions = {};

app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(
    express.static(
      path.join(__dirname, "..", "Real-Time-Chat-Frontend", "dist")
    )
  );
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(
        __dirname,
        "../",
        "Real-Time-Chat-Frontend",
        "dist",
        "index.html"
      )
    )
  );
} else {
  corsOptions = {
    origin: "*",
  };

  app.use(
    cors({
      origin: [process.env.FRONTEND_DEV_URL as string],
      methods: ["GET", "POST"],
    })
  );
  app.get("/", (_req: Request, res: Response) => {
    res.send("Please convert to production enviroment");
  });
}

app.use("/api/users", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

const io = new Server(server, {
  cors: corsOptions,
});

let typingPeople: { username: string; id: string }[] = [];

// Run when client connects
io.on("connection", (socket: Socket) => {
  socket.on("joinRoom", ({ username, room, avatar }) => {
    let userInroom = checkUserInRoom(room, username);
    if (userInroom) {
      socket.emit("rejoin");
      /* Check if user tries to join from another tab or device 
      and disconnect them from old session if they confirm */
      socket.on("rejoinConfirm", ({ username, room, avatar }) => {
        userLeave(userInroom.id);
        const oldSocket = io.sockets.sockets.get(userInroom.id);
        if (oldSocket) {
          oldSocket.emit("leave");
          oldSocket.disconnect();
        }
        const user = userJoin(socket.id, username, room, avatar);
        socket.join(user.room);
        // Send users and room info
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      });
    } else {
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
    }
  });
  //  Listen for chat message
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (user)
      io.to(user.room).emit(
        "message",
        formatMessage(user.username, user.id, msg, user.avatar)
      );
  });
  //Listen for react
  socket.on("sendReact", (reactInfo) => {
    const user = getCurrentUser(socket.id);
    if (user)
      io.to(user.room).emit("updateReact", updateReact(reactInfo, user));
  });
  // Send typing people to each client in room
  socket.on("typing", () => {
    const user = getCurrentUser(socket.id);
    if (user) {
      if (!typingPeople.find((person) => person.id === user.id)) {
        typingPeople.push({ username: user.username, id: user.id });
        io.to(user.room).emit("typingPeople", typingPeople);
      }
    }
  });
  socket.on("notTyping", () => {
    const user = getCurrentUser(socket.id);
    if (user) {
      typingPeople = typingPeople.filter((typing) => typing.id !== user.id);
      io.to(user.room).emit("typingPeople", typingPeople);
    }
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
        users: getRoomUsers(user.room),
      });
      // remove from typing
      typingPeople = typingPeople.filter((typing) => typing.id !== user.id);
      io.to(user.room).emit("typingPeople", typingPeople);
    }
  });
});
