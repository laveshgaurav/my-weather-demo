import React, { useEffect } from "react";
import { connect } from "react-redux";
import MyMap from "./components/MyMap";
import { loadWeather } from "./redux/weather/weatherAction";
import "./App.css";
import CurrencyLayout from "./components/CurrencyLayout";
import WeatherLayout from "./components/WeatherLayout";

function App(props) {
  useEffect(() => {
    props.getWeather();
    console.log(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {props.latitude ? (
        <div className="container">
          <div className="weather-container">
            <WeatherLayout />
          </div>
          <div elevation={5} className="map-container">
            <MyMap />
            <CurrencyLayout />
          </div>
        </div>
      ) : (
        <div>
          <h1>Enable Your GPS</h1>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    latitude: state.weather.latitude,
    longitude: state.weather.longitude,
    loading: state.weather.loading,
    weatherData: state.weather.weatherData,
    error: state.weather.error,
    randomNos: state.weather.randomNos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWeather: () => dispatch(loadWeather()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
