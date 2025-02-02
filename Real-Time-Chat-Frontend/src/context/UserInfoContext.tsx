import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { UserInfoType } from "../lib/types";
import { UserInfoApi } from "../api/userApi";

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
  const [userInfo, setUser] = useState<UserInfoType | null>(null);
  useEffect(() => {
    async function getUserInfoContext() {
      const res = await UserInfoApi.getUserInfo();
      if (res.errorMessage) {
        const refreshTokenResult = await UserInfoApi.refreshToken();
        if (refreshTokenResult.errorMessage) {
          return setUserInfo(null);
        } else {
          const res = await UserInfoApi.getUserInfo();
          return setUserInfo({
            _id: res._id,
            email: res.email,
            username: res.name,
            avatar: res.avatar,
          });
        }
      } else {
        return setUserInfo({
          _id: res._id,
          email: res.email,
          username: res.name,
          avatar: res.avatar,
        });
      }
    }
    getUserInfoContext();
  }, [userInfo]);
  function setUserInfo(user: UserInfoType | null) {
    if (user) {
      setUser((prev) => ({
        ...prev,
        ...user,
      }));
    } else {
      setUser(null);
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
