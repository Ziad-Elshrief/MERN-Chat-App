import { Navigate, Outlet } from "react-router-dom";
import { useJoined } from "../context/JoinedContext";

export default function PrivateRoute() {
    const {joined}=useJoined()
  return joined ? <Outlet /> : <Navigate to="/join-chat" />;
}
