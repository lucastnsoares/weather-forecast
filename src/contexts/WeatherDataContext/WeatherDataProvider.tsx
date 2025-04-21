import { ReactNode, useCallback, useRef, useState } from "react";
import { getWeatherDataApi, getSuggestionsApi } from "../../services/api";
import { Toast } from "primereact/toast";
import { WeatherDataContext, ISelectedCity } from "./WeatherDataContext";

interface IWeatherDataProvider {
  children: ReactNode; // Define que 'children' pode ser qualquer nó React
}

export const WeatherDataProvider = ({ children }: IWeatherDataProvider) => {
  const [weatherData, setWeatherData] = useState(null);
  const [filteredCities, setfilteredCities] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingWeatherData, setLoadingWeatherData] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const toast = useRef<Toast>(null);

  const getSuggestions = useCallback(async (query: string) => {
    if (!query) {
      setfilteredCities([]); // Se o input estiver vazio, limpa sugestões
      return;
    }
    try {
      setLoadingSuggestions(true);
      const response = await getSuggestionsApi(query);
      setfilteredCities(response);
      setLoadingSuggestions(false);
    } catch (error) {
      setfilteredCities([]);
      if (error instanceof Error) {
        toast.current?.show({
          severity: "error",
          summary: "Erro na API",
          detail: error.message,
          life: 3000,
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro na API",
          detail: "Erro desconhecido",
          life: 3000,
        });
      }
    } finally {
      setLoadingSuggestions(false);
    }
  }, []);

  const getWeatherData = async (selectedCity: ISelectedCity) => {
    setHasSearched(true);
    try {
      setLoadingWeatherData(true);
      const response = await getWeatherDataApi(selectedCity.id);
      setWeatherData(response);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.current?.show({
          severity: "error",
          summary: "Erro na API",
          detail: error.message,
          life: 3000,
        });
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Erro na API",
          detail: "Erro desconhecido",
          life: 3000,
        });
      }
      setHasSearched(false);
    }
    setLoadingWeatherData(false);
  };

  return (
    <WeatherDataContext.Provider
      value={{
        weatherData,
        getWeatherData,
        getSuggestions,
        loadingSuggestions,
        loadingWeatherData,
        filteredCities,
        hasSearched,
      }}
    >
      <>
        <Toast ref={toast} />
        {children}
      </>
    </WeatherDataContext.Provider>
  );
};
