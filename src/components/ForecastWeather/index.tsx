import { Carousel } from "primereact/carousel";
import { useContext, useEffect, useState } from "react";
import { WeatherDataContext } from "../../contexts/WeatherDataContext/WeatherDataContext";
import { Card } from "primereact/card";

export const ForecastWeather = () => {
  interface IForecastDays {
    date: string;
    day: {
      maxtemp_c: string;
      mintemp_c: string;
      condition: {
        icon: string;
        text: string;
      };
    };
  }

  const context = useContext(WeatherDataContext);
  const [forecastDays, setForecastDays] = useState<IForecastDays[] | null>(
    null
  );

  useEffect(() => {
    if (!context) {
      return;
    }
    if (context.weatherData?.forecast.forecastday) {
      setForecastDays(context.weatherData.forecast.forecastday);
    }
  }, [context]);

  if (!context) {
    return (
      <div className="flex justify-content-center">
        <p>Erro ao obter previsão para os próximos dias.</p>
      </div>
    );
  }

  if (!forecastDays) {
    return;
  }

  interface IItem {
    date: string;
    day: {
      maxtemp_c: string;
      mintemp_c: string;
      condition: {
        icon: string;
        text: string;
      };
    };
  }

  const weatherDataTemplate = (item: IItem) => {
    if (!item) {
      return;
    }
    const date = new Date(item.date);
    const dateConverted = new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
    let getDayOfWeek = "";
    switch (date.getUTCDay()) {
      case 0:
        getDayOfWeek = "Domingo";
        break;
      case 1:
        getDayOfWeek = "Segunda";
        break;
      case 2:
        getDayOfWeek = "Terça";
        break;
      case 3:
        getDayOfWeek = "Quarta";
        break;
      case 4:
        getDayOfWeek = "Quinta";
        break;
      case 5:
        getDayOfWeek = "Sexta";
        break;
      case 6:
        getDayOfWeek = "Sábado";
        break;
    }
    return (
      <div className="flex flex-column align-items-center">
        <p className="mb-1">
          {getDayOfWeek}, {dateConverted}
        </p>
        <div
          className="mb-0 flex flex-column align-items-center justify-content-center"
          style={{ height: "10rem" }}
        >
          <img
            src={item.day.condition.icon}
            alt={item.day.condition.text}
            width="75px"
            height="75px"
          />
          <p className=" mb-1 text-center">{item.day.condition.text}</p>
        </div>
        <div className="flex flex-column align-items-center">
          <p className="m-0">Max: {parseInt(item.day.maxtemp_c)} °C</p>
          <p className="m-0">Min: {parseInt(item.day.mintemp_c)} °C</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-content-center">
      <Card
        className="border-1	border-800 border-round-lg"
        style={{ width: "25rem", height: "25rem" }}
      >
        <p className="m-0 mb-3">Previsão do tempo para os próximos dias</p>

        <Carousel
          showIndicators={false}
          value={forecastDays}
          numVisible={1}
          numScroll={1}
          itemTemplate={weatherDataTemplate}
          autoplayInterval={4000}
        />
      </Card>
    </div>
  );
};
