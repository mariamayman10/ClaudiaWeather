import React, { useState, useEffect } from "react";
import "./Forecast.css";

const Forecast = ({ data }) => {
  const [showDetails, setShowDetails] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedItem(null);
  }, [data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const ShowDetails = (item) => {
    setSelectedItem(item);
  };

  const hideDetails = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div className="weather-forecast">
        <div className="forecast-cards">
          {data.forecast.forecastday.map((item, index) => (
            <div className="card" key={index} onClick={() => ShowDetails(item)}>
              <div className="forecast-top">
                <div>
                  <p className="forecast-day-date">
                    {formatDate(item.date)}
                    <span className="forecast-date"> {item.date}</span>
                  </p>
                </div>
              </div>
              <div className="middle">
                <img
                  className="forecast-weather-icon"
                  src={`icons2/weather/64x64/day${item.day.condition.icon.substring(
                    item.day.condition.icon.lastIndexOf("/")
                  )}`}
                  alt="weather"
                ></img>
              </div>
              <div className="forecast-bottom">
                <p className="forecast-temperature">
                  {item.day.mintemp_c.toFixed()}℃ /{" "}
                  {item.day.maxtemp_c.toFixed()}℃
                </p>
              </div>
              <button className="details" onClick={() => ShowDetails(item)}>
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedItem && (
        <div>
          <button className="close-btn" onClick={hideDetails}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
          <div className="date-div">
            <h2 className="forecast-day-date2">
              {formatDate(selectedItem.date)}
              {"  "}
              <span className="date">{selectedItem.date}</span>
            </h2>
          </div>

          <table className="TFforecast">
            <thead>
              <tr>
                {selectedItem.hour.map((h, index) => (
                  <th key={index}>{h.time.substring(11, 16)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {selectedItem.hour.map((h, index) => (
                  <td key={index}>{h.temp_c.toFixed()}℃</td>
                ))}
              </tr>
            </tbody>
          </table>
          <div className="moredetails">
            <p>Humidity: {selectedItem.day.avghumidity}%</p>
            <p>Precipitation: {selectedItem.day.totalprecip_mm} mm</p>
            <p>Wind: {selectedItem.day.maxwind_kph} kph</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Forecast;
