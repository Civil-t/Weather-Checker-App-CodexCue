import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import WeatherIcons from "./WeatherIcons";
import HourlyForecastCard from "./HourlyForecastCard";
import WeeklyForecastCard from "./WeeklyForecastCard";

const apiKey = "XCW2LFCJQRUA2SNEQZBSHEAG7";

export const InputComponent = ({ onEnter }) => {
  return (
    <input
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onEnter(e.target.value);
        }
      }}
      placeholder="Type a City"
    />
  );
};

async function fetchWeatherData(place) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    place
  )}?unitGroup=us&key=${apiKey}&contentType=json`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {},
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
}

const Dashboard = () => {
  const [data, setData] = useState(() => {
    const localData = localStorage.getItem("weatherData");
    return localData ? JSON.parse(localData) : null;
  });
  const [place, setPlace] = useState("Nairobi");

  useEffect(() => {
    const fetchAndStoreData = async () => {
      if (place) {
        const fetchedData = await fetchWeatherData(place);
        localStorage.setItem("weatherData", JSON.stringify(fetchedData));
        setData(fetchedData);
      }
    };

    fetchAndStoreData();
  }, [place]);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="container">
        {/* Vertical Navigation Panel */}
        <div id="nav-panel">
          <div id="half-container">
            <img id="logo" src={logo} />
            <div id="weather">
              <i className="bi bi-cloud-sun-fill"></i>
              <h5>Weather</h5>
            </div>
            <div id="cities">
              <i className="bi bi-geo-alt-fill"></i>
              <h5>Cities</h5>
            </div>
            <div id="map">
              <i className="bi bi-map-fill"></i>
              <h5>Map</h5>
            </div>
            <div id="settings">
              <i className="bi bi-sliders2"></i>
              <h5>Settings</h5>
            </div>
          </div>
        </div>
        {/* Middle Section - Main Content */}
        <div id="mid-section">
          <div className="search">
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setPlace(e.target.value);
                }
              }}
              placeholder="Type a City"
            />
            <i className="bi bi-search "></i>
          </div>

          {/* Place mid section */}
          <div id="place">
            <div id="city">
              <h1>{data.address}</h1>
              {new Date(data.days[1].datetime).toDateString().slice(0, 10)}{" "}
              <p>{data.currentConditions.datetime.slice(0, 5)}</p>
            </div>
            <div id="degrees">
              <h2>{data.currentConditions.temp} °C</h2>
              <hr />
              <h3>{data.currentConditions.conditions}</h3>
              <p>{data.description.split(",")[0]}</p>
            </div>
            <div id="weatherIcon">
              <WeatherIcons place={place} />
            </div>
          </div>
          {/* Today's Forecast mid section */}
          <div id="today-forecast">
            <h4>Today's Forecast</h4>
            <HourlyForecastCard place={place} apiKey={apiKey} />
          </div>
          {/* Air Condition mid section */}
          <div id="air-conditions">
            <h4>Air Conditions</h4>
            <div id="condition-details">
              <div id="temp">
                <h5>
                  <i className="bi bi-thermometer-half"> Temperature</i>
                </h5>
                <h3>{data.currentConditions.temp}</h3>
              </div>
              <div id="humidity">
                <h5>
                  <i className="bi bi-droplet-half"> Humidity</i>
                </h5>
                <h3>{data.currentConditions.humidity}</h3>
              </div>
              <div id="wind">
                <h5>
                  <i className="bi bi-wind"> Wind</i>
                </h5>
                <h3>{data.currentConditions.windspeed}</h3>
              </div>
              <div id="uv">
                <h5>
                  <i className="bi bi-brightness-high-fill"> UV Index</i>
                </h5>
                <h3>{data.currentConditions.uvindex}</h3>
              </div>
            </div>
          </div>
        </div>
        {/* far right section */}
        <div id="day-forecast">
          <WeeklyForecastCard place={place} apiKey={apiKey} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

export const getPlace = () => place;
