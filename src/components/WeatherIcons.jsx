import { useState, useEffect } from "react";
import "./Dashboard.css";

import CloudIcon from "../icons/cloud.png";
import RainIcon from "../icons/rain.png";
import SnowIcon from "../icons/snow.png";
import StormIcon from "../icons/storm.png";
import SunIcon from "../icons/sun.png";
import FogIcon from "../icons/fog.png";
import WindIcon from "../icons/windy.png";
import OvercastIcon from "../icons/overcast.png";

const WeatherIcons = () => {
  const [icon, setIcon] = useState();

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
        if (data.currentConditions.conditions) {
          let iconString = data.currentConditions.conditions.toLowerCase();
          let words = iconString.split(" ");

          for (let word of words) {
            if (word.includes("cloud")) {
              setIcon(CloudIcon);
              break;
            } else if (
              word.includes("rain") ||
              word.includes("rain,") ||
              word.includes("shower.")
            ) {
              setIcon(RainIcon);
              break;
            } else if (word.includes("snow")) {
              setIcon(SnowIcon);
              break;
            } else if (word.includes("storm") || word.includes("thunder")) {
              setIcon(StormIcon);
              break;
            } else if (word.includes("clear")) {
              setIcon(SunIcon);
              break;
            } else if (word.includes("fog")) {
              setIcon(FogIcon);
              break;
            } else if (word.includes("wind")) {
              setIcon(WindIcon);
              break;
            } else if (word.includes("overcast")) {
              setIcon(OvercastIcon);
              break;
            }
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <div
      style={{
        backgroundImage: `url(${icon})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        width: "70%",
        height: "75%",
      }}
    ></div>
  );
};

export default WeatherIcons;