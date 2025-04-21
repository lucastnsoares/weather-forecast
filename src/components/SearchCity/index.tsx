import { AutoComplete } from "primereact/autocomplete";
import { useContext, useEffect, useRef, useState } from "react";
import {
  WeatherDataContext,
  IWeatherDataContext,
  ISelectedCity,
} from "../../contexts/WeatherDataContext/WeatherDataContext";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import "./styles.css";

export default function SearchCity() {
  const context = useContext<IWeatherDataContext | null>(WeatherDataContext);
  const [selectedCity, setSelectedCity] = useState<ISelectedCity | null>(null);
  const [query, setQuery] = useState("");

  const getSuggestionsRef = useRef(context?.getSuggestions);

  useEffect(() => {
    if (getSuggestionsRef.current) {
      getSuggestionsRef.current(query);
    }
  }, [query]);

  if (!context) {
    return null;
  }

  const { getWeatherData, loadingWeatherData, filteredCities } = context;

  const handleOnClick = () => {
    if (!selectedCity) {
      return;
    }

    getWeatherData(selectedCity);
  };

  interface IItem {
    id: number;
    name: string;
    region: string;
    country: string;
    lat: GLfloat;
    lon: GLfloat;
    url: string;
  }

  const itemTemplate = (item: IItem) => {
    return (
      <div>
        <span>
          {item.name}, {item.region}, {item.country}
        </span>
      </div>
    );
  };

  const inputEmpty = query.length < 3;

  return (
    <div>
      <div className="search">
        <div className="search__input card flex justify-content-center">
          <AutoComplete
            field="name"
            value={selectedCity}
            suggestions={filteredCities}
            completeMethod={(e) => setQuery(e.query)}
            onChange={(e) => setSelectedCity(e.value)}
            itemTemplate={itemTemplate}
          />
        </div>
        <Button
          onClick={handleOnClick}
          label=""
          icon="pi pi-search"
          loading={loadingWeatherData}
          disabled={inputEmpty}
        />
      </div>
    </div>
  );
}
