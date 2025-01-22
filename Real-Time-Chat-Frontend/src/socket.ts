import { io } from "socket.io-client";

export const socket =
  import.meta.env.NODE_ENV === "production"
    ? io()
    : io("http://localhost:3000/");
