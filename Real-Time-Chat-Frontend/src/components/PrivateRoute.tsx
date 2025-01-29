import { Navigate, Outlet } from "react-router-dom";
import { useUserInfo } from "../context/UserInfoContext";

export default function PrivateRoute() {
  const { userInfo } = useUserInfo();
  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} />
  );
}
