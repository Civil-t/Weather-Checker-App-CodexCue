/* layout for changing bacground images depending on the weather */
import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";

/* background Images */
import Clear from "../images/Clear.jpg";
import Cloudy from "../images/Cloudy.jpg";
import Fog from "../images/fog.png";
import Rainy from "../images/Rainy.jpg";
import Snow from "../images/snow.jpg";
import Stormy from "../images/Stormy.jpg";
import Sunny from "../images/Sunny.jpg";

const BackgroundLayout = () => {
  const [image, setImage] = useState();

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
          let imageString = data.currentConditions.conditions;
          if (imageString.toLowerCase().includes("clear")) {
            setImage(Clear);
          } else if (
            imageString.toLowerCase().includes("cloud") ||
            imageString.toLowerCase().includes("shower")
          ) {
            setImage(Cloudy);
          } else if (imageString.toLowerCase().includes("rain")) {
            setImage(Rainy);
          } else if (imageString.toLowerCase().includes("snow")) {
            setImage(Snow);
          } else if (
            imageString.toLowerCase().includes("storm") ||
            imageString.toLowerCase().includes("thunder")
          ) {
            setImage(Stormy);
          } else if (imageString.toLowerCase().includes("sunny")) {
            setImage(Sunny);
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
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Dashboard />
    </div>
  );
};

export default BackgroundLayout;
