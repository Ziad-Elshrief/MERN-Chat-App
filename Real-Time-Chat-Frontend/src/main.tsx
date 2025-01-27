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
import { JoinedContextProvider } from "./context/JoinedContext.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import { UserInfoContextProvider } from "./context/UserInfoContext.tsx";
import MustJoinRoute from "./components/MustJoinRoute.tsx";
import NoUserRoute from "./components/NoUserRoute.tsx";
import Home from "./pages/Home.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="" element={<NoUserRoute />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route path="/join-chat" element={<JoinChat />} />
        <Route path="" element={<MustJoinRoute />}>
          <Route path="/room/:id" element={<ChatRoom />} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserInfoContextProvider>
      <JoinedContextProvider>
        <RouterProvider router={router} />
      </JoinedContextProvider>
    </UserInfoContextProvider>
  </StrictMode>
);
