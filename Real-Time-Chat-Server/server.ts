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
  userRejoin,
} from "./utils/users.js";
import { router as usersRouter } from "./routes/userRoutes.js";
import { router as refreshRouter } from "./routes/refreshTokenRoute.js";
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

app.use("/api/users", usersRouter);
app.use("/api/refresh-token", refreshRouter);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(
    express.static(
      path.join(__dirname, "..", "Real-Time-Chat-Frontend", "dist")
    )
  );
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      return res.sendFile(
        path.resolve(
          __dirname,
          "../",
          "Real-Time-Chat-Frontend",
          "dist",
          "index.html"
        )
      );
    }
  });
} else {
  corsOptions = {
    origin: "*",
  };

  app.use(
    cors({
      origin: [process.env.FRONTEND_DEV_URL as string],
      methods: ["GET", "POST", "PUT"],
    })
  );
  app.get("/", (_req: Request, res: Response) => {
    res.send("Please convert to production enviroment");
  });
}

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV === "production") {
    console.log(`Server running on port: ${PORT}`);
  } else {
    console.log(`Server running on http://localhost:${PORT}`);
  }
});

const io = new Server(server, {
  cors: corsOptions,
});

let typingPeople: { username: string; userId: string }[] = [];

// Run when client connects
io.on("connection", (socket: Socket) => {
  socket.on("joinRoom", ({ username, userId, room, avatar }) => {
    let userInroom = checkUserInRoom(room, userId);
    if (userInroom) {
      const user = userRejoin(socket.id, userId, room);
      socket.join(user.room);
      // Send users and room info
      socket.emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    } else {
      const user = userJoin(socket.id, userId, username, room, avatar);
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
        formatMessage(user.username, user.userId, msg, user.avatar)
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
      if (!typingPeople.find((person) => person.userId === user.userId)) {
        typingPeople.push({ username: user.username, userId: user.userId });
        io.to(user.room).emit("typingPeople", typingPeople);
      }
    }
  });
  socket.on("notTyping", () => {
    const user = getCurrentUser(socket.id);
    if (user) {
      typingPeople = typingPeople.filter(
        (typing) => typing.userId !== user.userId
      );
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
      typingPeople = typingPeople.filter(
        (typing) => typing.userId !== user.userId
      );
      io.to(user.room).emit("typingPeople", typingPeople);
    }
  });
});
