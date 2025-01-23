import { Navigate, Outlet } from "react-router-dom";
import { useJoined } from "../context/JoinedContext";

export default function MustJoinRoute() {
  const { joined } = useJoined();
  return joined.state ? <Outlet /> : <Navigate to="/join-chat" />;
}
