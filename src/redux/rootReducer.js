import { combineReducers } from "redux";
import weatherReducer from "./weather/WeatherReducer";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
