import "./Dashboard.css";
import { useEffect, useState } from "react";

import CloudIcon from "../icons/cloud.png";
import RainIcon from "../icons/rain.png";
import SnowIcon from "../icons/snow.png";
import StormIcon from "../icons/storm.png";
import SunIcon from "../icons/sun.png";
import FogIcon from "../icons/fog.png";
import WindIcon from "../icons/windy.png";
import OvercastIcon from "../icons/overcast.png";

const WeeklyForecastCard = ({ place, apiKey }) => {
  const [weeklyData, setWeeklyData] = useState(null);

  useEffect(() => {
    if (!place) return;
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      place
    )}?unitGroup=us&key=${apiKey}&contentType=json`;

    fetch(url, {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("weeklyData", JSON.stringify(data));
        setWeeklyData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [place]);

  const getIcon = (condition) => {
    const words = condition.toLowerCase().split(" ");

    for (const word of words) {
      if (word.includes("cloud")) return CloudIcon;
      if (word.includes("rain")) return RainIcon;
      if (word.includes("snow")) return SnowIcon;
      if (word.includes("storm") || word.includes("thunder")) return StormIcon;
      if (word.includes("clear")) return SunIcon;
      if (word.includes("fog")) return FogIcon;
      if (word.includes("wind")) return WindIcon;
      if (word.includes("overcast")) return OvercastIcon;
    }

    return null; // Default case if no words match
  };

  return (
    <>
      <h4>7 Day Forecast</h4>
      <div id="week">
        {weeklyData &&
          weeklyData.days.slice(2, 9).map((day, index) => (
            <>
              <div key={index} className="day">
                <div className="day-details">
                  {new Date(day.datetime).toDateString().slice(0, 10)}
                </div>
                <div
                  className="day-details"
                  style={{
                    backgroundImage: `url(${getIcon(day.conditions)})`,
                    backgroundSize: "contain",
                    width: "100%",
                    height: "100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    margin: "0 auto",
                  }}
                ></div>
                <div className="day-details">{day.conditions}</div>
                <div className="day-details">{day.temp} °C</div>
              </div>
              <hr />
            </>
          ))}
      </div>
    </>
  );
};

export default WeeklyForecastCard;
