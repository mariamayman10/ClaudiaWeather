import React from "react";
import "./Weather.css";

const Weather = ({ data }) => {
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.current.condition.text}</p>
        </div>
        <img
          className="weather-icon"
          src={`icons2/weather/64x64/${data.current.condition.icon
            .split("/")
            .slice(-2)
            .join("/")}`}
          alt="weather"
        />
      </div>
      <div className="bottom">
        <p className="temperature">{data.current.temp_c}℃</p>
        <div className="weather-details">
          <p>Humidity: {data.current.humidity}%</p>
          <p>Precipitation: {data.current.precip_mm} mm</p>
          <p>Wind: {data.current.wind_kph}kph</p>
          <p>Pressure: {data.current.pressure_mb}hPa</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
