import { Paper } from "@material-ui/core";
import React from "react";
import "./WeatherLayout.css";
function WeatherCard({ data }) {
  const [toggle, setToggle] = React.useState(true);

  //   console.log(props);
  const kelvinToCelsius = (temp) => {
    var constantTemp = 273.15;
    var inCel = parseInt(temp) - constantTemp;
    return inCel;
  };

  return (
    <Paper style={{ margin: "0.8rem" }}>
      <div
        className="weather-card-container"
        onClick={() => setToggle(!toggle)}
      >
        <h2 style={{ padding: "10px" }}>
          {new Date(parseInt(data.dt.toString() + "000")).toDateString()}
        </h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="icon"
          />
          <h3>
            {kelvinToCelsius(data.temp.max).toFixed()}/
            {kelvinToCelsius(data.temp.min).toFixed()} ℃
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4>{data.weather[0].description}</h4>
          <span style={{ margin: "0 6px" }}>
            {toggle ? (
              <i class="fa fa-arrow-down" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
            )}
          </span>
        </div>
      </div>
      {toggle ? null : (
        <>
          <div class="weather-card-container">
            <p>
              The high will be {kelvinToCelsius(data.temp.max).toFixed()} ℃, the
              low will be {kelvinToCelsius(data.temp.min).toFixed()} ℃
            </p>
          </div>
        </>
      )}
    </Paper>
  );
}

export default WeatherCard;
