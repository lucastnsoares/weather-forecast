import { createContext } from 'react';


interface IThemeContext {
    lightTheme: boolean;
    changeTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
