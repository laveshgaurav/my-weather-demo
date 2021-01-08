import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { BiCloudDrizzle } from "react-icons/bi";
import { GiWindsock } from "react-icons/gi";
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <BiCloudDrizzle size="2rem" />
              <p>{data.humidity}%</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <GiWindsock size="2rem" />
              <p>{data.wind_speed}km/h</p>
            </div>
          </div>
          <div class="weather-card-container">
            <TableContainer>
              <Table aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Morning</TableCell>
                    <TableCell>Afternoon</TableCell>
                    <TableCell>Evening</TableCell>
                    <TableCell>Night</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>TEMPERATURE</TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.temp.morn).toFixed()} ℃
                    </TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.temp.day).toFixed()} ℃
                    </TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.temp.eve).toFixed()} ℃
                    </TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.temp.night).toFixed()} ℃
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>FEELS LIKE</TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.feels_like.morn).toFixed()} ℃
                    </TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.feels_like.day).toFixed()} ℃
                    </TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.feels_like.eve).toFixed()} ℃
                    </TableCell>
                    <TableCell>
                      {kelvinToCelsius(data.feels_like.night).toFixed()} ℃
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </>
      )}
    </Paper>
  );
}

export default WeatherCard;
