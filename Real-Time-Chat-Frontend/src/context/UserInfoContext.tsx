import { createContext, useContext, useState, ReactNode } from "react";
import { UserInfoType } from "../lib/types";

type UserInfoContextType = {
  userInfo: UserInfoType | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType | null>>;
};

const UserInfoContext = createContext<UserInfoContextType | null>(null);

export const UserInfoContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
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
