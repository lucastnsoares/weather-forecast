import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

//import "primereact/resources/themes/lara-dark-teal/theme.css";
// import "primereact/resources/primereact.min.css";
import "./primeflex.css";
import "primeicons/primeicons.css";
import "./index.css";
import { WeatherDataProvider } from "./contexts/WeatherDataContext/WeatherDataProvider.tsx";
import { ThemeContextProvider } from "./contexts/ThemeContext/ThemeContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <WeatherDataProvider>
        <App />
      </WeatherDataProvider>
    </ThemeContextProvider>
  </StrictMode>
);
