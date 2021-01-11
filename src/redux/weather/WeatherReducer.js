const initState = {
  loadingWeather: true,
  loadingCurrency: true,
  weatherData: [],
  currentTemp: "",
  currency: [],
  error: "",
  latitude: "",
  longitude: "",
};

const weatherReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST_SUCCESS":
      return {
        ...state,
        loadingWeather: false,
        weatherData: action.payload,
        // currentTemp: action.payload.current,
      };

    case "FETCH_CURRENT_TEMP":
      return {
        ...state,
        currentTemp: action.payload,
      };
    case "FETCH_CURRENCY_SUCCESS":
      return {
        ...state,
        loading: false,
        currency: action.payload,
        loadingCurrency: false,
      };
    case "FETCH_REQUEST_FAIL":
      return {
        ...state,
        loadingWeather: true,
        error: action.payload,
      };
    case "RANDOM":
      return {
        ...state,
        randomNos: [...state.randomNos, action.payload],
      };
    case "GET_LAT_LON":
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
};

export default weatherReducer;
