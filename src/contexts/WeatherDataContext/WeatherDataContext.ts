import { createContext } from "react";

interface IWeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: string;
        mintemp_c: string;
        condition: {
          icon: string;
          text: string;
        };
      };
    }[];
  };
  current: {
    feelslike_c: string;
    pressure_mb: string;
    humidity: string;
    temp_c: string;
    condition: {
      text: string;
      icon: string;
    };
    last_updated: string | number;
  };
}

interface IFilteredCities {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: GLfloat;
  lon: GLfloat;
  url: string;
}

export interface ISelectedCity {
  id: string;
}

export interface IWeatherDataContext {
  weatherData: IWeatherData | null;
  loadingWeatherData: boolean;
  loadingSuggestions: boolean;
  hasSearched: boolean;
  filteredCities: IFilteredCities[];
  getWeatherData: (selectedCity: ISelectedCity) => Promise<void>;
  getSuggestions: (query: string) => Promise<void>;
}

export const WeatherDataContext = createContext<IWeatherDataContext | null>(
  null
);
