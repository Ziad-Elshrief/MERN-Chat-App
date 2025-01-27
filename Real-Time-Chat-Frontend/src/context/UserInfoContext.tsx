import { createContext, useContext, useState, ReactNode } from "react";
import { UserInfoType } from "../lib/types";

type UserInfoContextType = {
  userInfo: UserInfoType | null;
  setUserInfo: (user: UserInfoType | null) => void;
};

const UserInfoContext = createContext<UserInfoContextType | null>(null);

export const UserInfoContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialState: UserInfoType = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null;
  const [userInfo, setUser] = useState<UserInfoType | null>(initialState);
  function setUserInfo(user: UserInfoType | null) {
    if (user) {
      setUser((prev) => ({
        ...prev,
        ...user,
      }));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...userInfo, ...user })
      );
    } else {
      setUser(null);
      localStorage.removeItem("userInfo");
    }
  }
  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export const useUserInfo = () => {
  const context = useContext(UserInfoContext);
  if (!context) {
    throw new Error("useUserInfo must be used within an UserInfoProvider");
  }
  return context;
};
