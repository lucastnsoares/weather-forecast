import axios from "axios";

const apiURL = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: apiURL,
});

export const getSuggestionsApi = async (query: string) => {
  try {
    const response = await api.get(
      `search.json?key=${apiKey}&q=${query}&aqi=no`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
    throw error;
  }
};

export const getWeatherDataApi = async (city: string) => {
  try {
    const response = await api.get(
      `forecast.json?key=${apiKey}&q=id:${city}&days=3&aqi=no&alerts=no&lang=pt`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao obter dados da API:", error);
    throw error;
  }
};
