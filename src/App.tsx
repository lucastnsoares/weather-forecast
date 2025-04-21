import { useContext } from "react";
import { WeatherDataContext } from "./contexts/WeatherDataContext/WeatherDataContext";
import { CurrentWeather } from "./components/CurrentWeather";
import { ForecastWeather } from "./components/ForecastWeather";
import { Header } from "./components/Header/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import { Footer } from "./components/Footer";

function App() {
  const context = useContext(WeatherDataContext);
  if (!context) {
    return (
      <div className="flex justify-content-center">
        <p>Erro ao carregar página.</p>
      </div>
    );
  }
  const { hasSearched, loadingWeatherData } = context;
  return (
    <>
      <div className="min-h-screen flex flex-column">
        <Header />
        <div className="flex flex-1 flex-row flex-wrap justify-content-center">
          {hasSearched && loadingWeatherData ? (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="8"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : null}
          <div className="flex flex-wrap gap-3 p-3 justify-content-center">
            {hasSearched && !loadingWeatherData ? <CurrentWeather /> : null}
            {hasSearched && !loadingWeatherData ? <ForecastWeather /> : null}
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
