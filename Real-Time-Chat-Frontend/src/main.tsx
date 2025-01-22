import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import JoinChat from "./pages/JoinChat.tsx";
import ChatRoom from "./pages/ChatRoom.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { JoinedContextProvider } from "./context/JoinedContext.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/join-chat" element={<JoinChat />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/room/:id" element={<ChatRoom />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JoinedContextProvider>
      <RouterProvider router={router} />
    </JoinedContextProvider>
  </StrictMode>
);
