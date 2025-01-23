import { Navigate, Outlet } from "react-router-dom";
import { useUserInfo } from "../context/UserInfoContext";

export default function NoUserRoute() {
  const { userInfo } = useUserInfo();
  return userInfo ? <Navigate to="/" /> : <Outlet />;
}
