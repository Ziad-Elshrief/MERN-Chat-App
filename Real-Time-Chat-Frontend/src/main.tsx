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
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import { UserInfoContextProvider } from "./context/UserInfoContext.tsx";
import NoUserRoute from "./components/NoUserRoute.tsx";
import Home from "./pages/Home.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Profile from "./pages/Profile.tsx";
import NotFound from "./pages/NotFound.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="" element={<NoUserRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/join-chat" element={<JoinChat />} />
        <Route path="/room/:room" element={<ChatRoom />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserInfoContextProvider>
      <RouterProvider router={router} />
    </UserInfoContextProvider>
  </StrictMode>
);
