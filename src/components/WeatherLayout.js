import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Paper } from "@material-ui/core";
import loader from "../asset/805.gif";
import "./WeatherLayout.css";
import WeatherCard from "./WeatherCard";

function WeatherLayout(props) {
  const [toggle, setToggle] = useState(true);

  const d = new Date();

  console.log(props);
  const kelvinToCelsius = (temp) => {
    var constantTemp = 273.15;
    var inCel = parseInt(temp) - constantTemp;
    return inCel;
  };

  return (
    <div style={{ width: "100%", height: "100%", backdropFilter: "blur(4px)" }}>
      {props.loadingWeather ? (
        <img src={loader} alt="Loader" />
      ) : (
        <Paper className="main-weather" elevation={5}>
          <div className="header">
            <p>{d.toLocaleString()}</p>
          </div>
          <div className="header">
            <div className="temp">
              <h2>
                {kelvinToCelsius(props.weatherData.current.temp).toFixed(2)} ℃
              </h2>
              <h3>{props.weatherData.timezone}</h3>
            </div>
            <div className="icon">
              <img
                src={`https://openweathermap.org/img/w/${props.weatherData.current.weather[0].icon}.png`}
                alt="icon"
              ></img>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setToggle(!toggle)}
          >
            Next 3 Days Forcast
          </Button>
          {props.weatherData.daily.slice(0, 3).map((data, i) => (
            <React.Fragment key={i}>
              {toggle ? null : (
                <WeatherCard
                  key={i}
                  data={data}
                  // date={new Date(parseInt(data.dt.toString() + "000"))}
                />
              )}
            </React.Fragment>
          ))}
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loadingWeather: state.weather.loadingWeather,
    weatherData: state.weather.weatherData,
  };
};
export default connect(mapStateToProps, null)(WeatherLayout);
