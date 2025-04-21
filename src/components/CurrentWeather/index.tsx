import { Card } from "primereact/card";
import { useContext } from "react";
import { WeatherDataContext } from "../../contexts/WeatherDataContext/WeatherDataContext";

export const CurrentWeather = () => {
  const context = useContext(WeatherDataContext);
  //const context = null;
  if (!context) {
    return (
      <div
        className="flex flex-column justify-content-center align-content-center align-items-center p-2 m-6 border-1	border-800 border-round-lg"
        style={{ width: "25rem", height: "20rem" }}
      >
        <p>Erro ao carregar dados da condição atual do tempo.</p>
      </div>
    );
  }

  const { weatherData } = context;
  if (!weatherData) {
    return ;
  }
  const currentTemp = parseInt(weatherData.current.temp_c);
  const feelsLikeTemperature = parseInt(weatherData.current.feelslike_c);
  const pressure = weatherData.current.pressure_mb;
  const humidity = weatherData.current.humidity;
  const icon = weatherData?.current?.condition?.icon;
  const cityNameComplete = `${weatherData?.location?.name}, ${weatherData?.location?.region}, ${weatherData?.location?.country}`;
  const lastUpdateDate = new Date(
    weatherData.current.last_updated
  ).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  const lastUpdateHour = new Date(weatherData.current.last_updated)
    .getHours()
    .toString()
    .padStart(2, "0");
  const lastUpdateMinute = new Date(weatherData.current.last_updated)
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const lastUpdate = `${lastUpdateDate} às ${lastUpdateHour}:${lastUpdateMinute}`;
  const currentCondition = weatherData?.current?.condition?.text;

  return (
        <Card
        style={{ width: "25rem", height: "25rem" }}
          className="border-1	border-800 border-round-lg"
        >
          <div className="flex flex-column justify-content-center">
            <p className="mt-0">Tempo agora para {cityNameComplete}</p>
            <div className="flex flex-wrap justify-content-center align-items-center mt-1 mb-1">
              <img
                style={{ width: "4rem", height: "4rem" }}
                alt="Card"
                src={icon}
              />
              <p>{`${currentTemp}ºC`}</p>
              <p className="pl-2">{currentCondition}</p>
            </div>
            <p>Sensação térmica {feelsLikeTemperature}ºC</p>
            <p>Pressão: {pressure} hPA</p>
            <p>Umidade: {humidity}%</p>
            <p className="mt-1" style={{ lineHeight: "1.5" }}>
              Dados atualizados em {lastUpdate}
            </p>
          </div>
        </Card>
  );
};
