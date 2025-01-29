import { Outlet, useNavigate } from "react-router-dom";
import { useUserInfo } from "../context/UserInfoContext";
import { useEffect } from "react";

export default function NoUserRoute() {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  return <Outlet />;
}
