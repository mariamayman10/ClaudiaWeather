import Search from "./Components/Search";
import Weather from "./Components/Weather";
import React, { useState } from "react";
import Forecast from "./Components/Forecast";

function App() {
  const [CurrentWeather, setCurrentWeather] = useState(null);
  const [ForecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const CurrentWeather = fetch(
      `https://api.weatherapi.com/v1/current.json?key=d632c822083340268b3170100230907&q=${searchData.value}&aqi=no`
    );
    const ForecastWeather = fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=d632c822083340268b3170100230907&q=${searchData.value}&days=8&aqi=no`
    );
    Promise.all([CurrentWeather, ForecastWeather])
      .then(async (response) => {
        const weather_response = await response[0].json();
        const forecast_response = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weather_response });
        setForecastWeather({ city: searchData.label, ...forecast_response });
      })
      .catch((err) => console.log(err));
  };
  console.log(CurrentWeather);
  console.log(ForecastWeather);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {CurrentWeather && <Weather data={CurrentWeather} />}
      {ForecastWeather && <Forecast data={ForecastWeather} />}
    </div>
  );
}

export default App;
