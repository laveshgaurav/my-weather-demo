import axios from "axios";

export const loadWeatherRequest = () => {
  return {
    type: "FETCH_REQUEST",
  };
};

export const loadWeatherSuccess = (weatherData) => {
  return {
    type: "FETCH_REQUEST_SUCCESS",
    payload: weatherData,
  };
};

export const loadCurrentTemp = (data) => {
  return {
    type: "FETCH_CURRENT_TEMP",
    payload: data,
  };
};

export const loadCurrencySuccess = (users) => {
  return {
    type: "FETCH_CURRENCY_SUCCESS",
    payload: users,
  };
};

export const getLongLat = ({ latitude, longitude }) => {
  console.log("dispatching getLongLat");
  return {
    type: "GET_LAT_LON",
    payload: { latitude, longitude },
  };
};

export const loadWeatherFailure = (error) => {
  return {
    type: "FETCH_REQUEST_FAIL",
    payload: error,
  };
};

export const generateRandom = (data) => {
  return {
    type: "RANDOM",
    payload: data,
  };
};

export const loadWeather = () => {
  return (dispatch) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          dispatch(getLongLat({ latitude, longitude }));
          try {
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=hourly,minutely&appid=c0e338a36480ecce8e72b69694d1cee5`
              )
              .then((resp) => {
                console.log(resp.data);
                dispatch(loadWeatherSuccess(resp.data));
                dispatch(loadCurrentTemp(resp.data.current.temp));
              });

            axios
              .get(
                "https://cors-anywhere.herokuapp.com/https://v2.api.forex/rates/latest.json?from=INR&key=4f02eef1-58e8-4810-88a4-f0cfe078bc71",
                {
                  mode: "no-cors",
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods":
                      "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                  },
                }
              )
              .then((resp) => {
                console.log(resp.data);
                var data = Object.entries(resp.data.rates);
                dispatch(loadCurrencySuccess(data));
              });
          } catch (err) {
            console.log(err.message);
            dispatch(loadWeatherFailure(err.message));
          }
        },
        function (error) {
          alert("Please enable your location!");
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
        }
      );
    }
  };
};

export const getSearchData = (cityname) => {
  return (dispatch) => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=c0e338a36480ecce8e72b69694d1cee5`
        )
        .then((resp) => {
          dispatch(loadCurrentTemp(resp.data.main.temp));
        });
    } catch (err) {
      console.log(err.message);
    }
  };
};
// lat=${position.coords.latitude}&lon=${position.coords.longitude}
// return {
//   type: "LOAD_WEATHER",
//   payload: resp,
// };
