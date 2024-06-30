import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import WeatherIcons from "./WeatherIcons";
import HourlyForecastCard from "./HourlyForecastCard";
import WeeklyForecastCard from "./WeeklyForecastCard";

const Dashboard = () => {
  /* normal daily data */
  useEffect(() => {
    fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York%20City%2CNY?unitGroup=us&key=XCW2LFCJQRUA2SNEQZBSHEAG7&contentType=json",
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("weatherData", JSON.stringify(data));
      })

      .catch((err) => {
        console.error(err);
      });
  }, []);

  const data = JSON.parse(localStorage.getItem("weatherData"));
  //console.log("FROM DASHBOARD", data);
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
            <input placeholder="Type a City" />
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
              <WeatherIcons />
            </div>
          </div>
          {/* Today's Forecast mid section */}
          <div id="today-forecast">
            <h4>Today's Forecast</h4>
            <HourlyForecastCard />
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
          <WeeklyForecastCard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
