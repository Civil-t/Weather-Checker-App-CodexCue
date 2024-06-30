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

const HourlyForecastCard = () => {
  const [hourlyData, setHourlyData] = useState(null);

  useEffect(() => {
    fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York?unitGroup=us&include=hours&key=XCW2LFCJQRUA2SNEQZBSHEAG7&contentType=json",
      {
        method: "GET",
        headers: {},
      }
    )
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("hourlyData", JSON.stringify(data));
        setHourlyData(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getIcon = (condition) => {
    const words = condition.toLowerCase().split(" ");

    for (const word of words) {
      if (word.includes("cloud")) return CloudIcon;
      if (word.includes("rain") || word.includes("rain,")) return RainIcon;
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
      <div id="forecast-details">
        {hourlyData &&
          hourlyData.days[0].hours
            .slice(6, 17)
            .filter((_, index) => index % 2 === 0)
            .map((hour, index) => (
              <div key={index} className="hourly-forecast">
                <p style={{ fontWeight: "bold", marginLeft: "0.65rem" }}>
                  {hour.datetime.slice(0, 5)}{" "}
                </p>
                <div
                  style={{
                    backgroundImage: `url(${getIcon(hour.conditions)})`,
                    backgroundSize: "cover",
                    width: "100%",
                    height: "90%",
                    marginRight: "4rem",
                    padding: "auto",
                  }}
                ></div>
                <p style={{ fontWeight: "bold", marginLeft: "0.65rem" }}>
                  {hour.temp} °C
                </p>
              </div>
            ))}
      </div>
    </>
  );
};

export default HourlyForecastCard;
