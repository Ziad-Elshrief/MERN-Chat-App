import { createContext, useContext, useState, ReactNode } from "react";

type JoinedContextType = {
  joined: boolean;
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
};

const JoinedContext = createContext<JoinedContextType | null>(null);

export const JoinedContextProvider = ({ children }: { children: ReactNode }) => {
  const [joined, setJoined] = useState(false);
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
