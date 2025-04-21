import { Button } from "primereact/button";
import SearchCity from "../SearchCity";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext/ThemeContext";

export function Header() {
  const context = useContext(ThemeContext);
  if (!context) {
    return;
  }
  const { changeTheme, lightTheme } = context;
  return (
    <>
      <h1 className="flex justify-content-center">APP - Previsão do Tempo</h1>
      <div className="flex justify-content-center gap-3">
        <SearchCity />
        <Button
          onClick={() => {
            changeTheme();
          }}
          icon={lightTheme ? "pi pi-sun" : "pi pi-moon"}
        />
      </div>
    </>
  );
}
