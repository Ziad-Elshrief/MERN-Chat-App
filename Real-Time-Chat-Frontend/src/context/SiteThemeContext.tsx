import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Theme= "dark" | "light" | "system"

type SiteThemeContextType = {
  siteTheme: Theme | undefined;
  setSiteThemeGlobal: (theme: Theme) => void
};

const SiteThemeContext = createContext<SiteThemeContextType | null>(null);

export const SiteThemeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [siteTheme, setSiteTheme] = useState<Theme>();
  const setSiteThemeGlobal=(theme:Theme)=>{
    if(theme){
      setSiteTheme(theme)
      if(theme === "system"){
        localStorage.removeItem("userTheme")
      }else{
        localStorage.setItem("userTheme",theme)
      }
    }
  }
  useEffect(() => {
    const getTheme = () => {
      if (
        localStorage.getItem("userTheme") === "dark" ||
        localStorage.getItem("userTheme") === "light"
      ) {
        const userPrefrence = localStorage.getItem("userTheme");
        if (userPrefrence === "dark") {
          document.body.classList.add("dark");
          setSiteTheme("dark");
        } else if (userPrefrence === "light") {
          document.body.classList.remove("dark");
          setSiteTheme("light");
        }
      } else {
        const preferDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (preferDarkMode) {
          document.body.classList.add("dark");
          setSiteTheme("system");
        } else {
          document.body.classList.remove("dark");
          setSiteTheme("system");
        }
      }
    };
    getTheme();
  }, [siteTheme]);
  return (
    <SiteThemeContext.Provider
      value={{
        siteTheme,
        setSiteThemeGlobal,
      }}
    >
      {children}
    </SiteThemeContext.Provider>
  );
};

export const useSiteTheme = () => {
  const context = useContext(SiteThemeContext);
  if (!context) {
    throw new Error(
      "SiteTheme Context must be used within an SiteTheme Provider"
    );
  }
  return context;
};
