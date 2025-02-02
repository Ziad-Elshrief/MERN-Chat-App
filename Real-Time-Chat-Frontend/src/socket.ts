import { io } from "socket.io-client";

export const socket =
  import.meta.env.MODE === "development" ? io("http://localhost:3000/") : io();
