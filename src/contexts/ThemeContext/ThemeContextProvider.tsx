import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface IThemeContextProvider {
  children: ReactNode; // Define que 'children' pode ser qualquer nó React
}

export const ThemeContextProvider = ({ children }: IThemeContextProvider) => {
  const [lightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    const themeLink = document.getElementById(
      "theme-link"
    ) as HTMLLinkElement | null;
    if (themeLink) {
      themeLink.href = lightTheme
        ? "/node_modules/primereact/resources/themes/lara-light-indigo/theme.css"
        : "/node_modules/primereact/resources/themes/lara-dark-indigo/theme.css";
    }
  }, [lightTheme]);

  const changeTheme = () => {
    setLightTheme(!lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ lightTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
