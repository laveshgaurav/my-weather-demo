import React, { useState } from "react";
import { connect } from "react-redux";
import { Button, Paper } from "@material-ui/core";
import { getSearchData, loadWeather } from "../redux/weather/weatherAction";

import loader from "../asset/805.gif";
import "./WeatherLayout.css";
import WeatherCard from "./WeatherCard";
import axios from "axios";

function WeatherLayout(props) {
  console.log(props);
  const [toggle, setToggle] = useState(true);
  const [time, setTime] = useState();
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState();
  // const d = new Date();
  const myClock = () => {
    const d = new Date();
    setTime(d.toLocaleString());
  };
  // React.useEffect(() => {
  //   const Interval = setInterval(() => {
  //     myClock();
  //   }, 1000);
  //   return () => clearInterval(Interval);
  // });

  // console.log(props);

  // React.useEffect(() => {
  //   props.getWeather();
  //   console.log(props);
  //   // setTemp(props.weatherData.current.temp);
  // }, []);

  const kelvinToCelsius = (temp) => {
    var constantTemp = 273.15;
    var inCel = parseInt(temp) - constantTemp;
    return inCel;
  };
  function allowDrop(ev) {
    ev.preventDefault();
    console.log("event called");
  }

  const getCityData = async (cityname) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=c0e338a36480ecce8e72b69694d1cee5`
      );
      setTemp(response.data.main.temp);
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", backdropFilter: "blur(4px)" }}>
      {props.loadingWeather ? (
        <img src={loader} alt="Loader" />
      ) : (
        <Paper className="main-weather" elevation={5}>
          <div className="header">{/* <p>{time}</p> */}</div>
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            disabled={!city}
            onClick={() => {
              props.getSearchData(city);
            }}
          >
            GET CITY DATA
          </button>
          <div className="header">
            <div className="temp">
              {/* <h2>{kelvinToCelsius(temp).toFixed(2)} ℃</h2> */}
              <h2>{kelvinToCelsius(props.currentTemp).toFixed(2)}</h2>
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
            Next 7 Days Forcast
          </Button>
          {props.weatherData.daily.slice(1).map((data, i) => (
            <div key={i}>
              {toggle ? null : <WeatherCard key={i} data={data} />}
            </div>
          ))}
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentTemp: state.weather.currentTemp,
    loadingWeather: state.weather.loadingWeather,
    weatherData: state.weather.weatherData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: () => dispatch(loadWeather()),
    getSearchData: (data) => dispatch(getSearchData(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WeatherLayout);
