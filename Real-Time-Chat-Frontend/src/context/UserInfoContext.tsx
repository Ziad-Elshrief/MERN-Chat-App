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
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType | null>>;
  isLoading: boolean;
};

const UserInfoContext = createContext<UserInfoContextType | null>(null);

export const UserInfoContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  let refreshTimeout: number | undefined = undefined;

  const refreshToken = async () => {
    try {
      const refreshTokenResult = await UserInfoApi.refreshToken();
      if (refreshTokenResult.errorMessage) {
        setUserInfo(null);
      } else {
        scheduleTokenRefresh();
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  };

  const scheduleTokenRefresh = () => {
    // Refresh after 14min -> access token is valid for 15min in backend
    const refreshTime = 14 * 60 * 1000;
    if (refreshTimeout) clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(refreshToken, refreshTime);
  };

  useEffect(() => {
    async function fetchUserInfo() {
      const res = await UserInfoApi.getUserInfo();
      if (res.errorMessage) {
        const refreshTokenResult = await UserInfoApi.refreshToken();
        scheduleTokenRefresh();
        if (refreshTokenResult.errorMessage) {
          setUserInfo(null);
        } else {
          const res = await UserInfoApi.getUserInfo();
          setUserInfo({
            _id: res._id,
            email: res.email,
            username: res.name,
            avatar: res.avatar,
          });
        }
      } else {
        setUserInfo({
          _id: res._id,
          email: res.email,
          username: res.name,
          avatar: res.avatar,
        });
      }
      setIsLoading(false);
    }
    fetchUserInfo();
    return () => clearTimeout(refreshTimeout);
  },);
  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLoading,
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
