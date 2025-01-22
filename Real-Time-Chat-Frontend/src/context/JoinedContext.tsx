import { createContext, useContext, useState, ReactNode } from "react";

type JoinedContextType = {
  joined: {
    state: boolean;
    room: string;
    avatar: number;
    username: string;
  };
  setJoined: React.Dispatch<
    React.SetStateAction<{
      state: boolean;
      room: string;
      avatar: number;
      username: string;
    }>
  >;
};

const JoinedContext = createContext<JoinedContextType | null>(null);

export const JoinedContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [joined, setJoined] = useState({
    state: false,
    room: "",
    avatar: 0,
    username: "",
  });
  return (
    <JoinedContext.Provider
      value={{
        joined,
        setJoined,
      }}
    >
      {children}
    </JoinedContext.Provider>
  );
};

export const useJoined = () => {
  const context = useContext(JoinedContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
