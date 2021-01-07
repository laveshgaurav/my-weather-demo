import React, { useEffect, useRef } from "react";
import { Map as OLmap, Overlay } from "ol";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { connect } from "react-redux";
import placeholder from "../asset/placeholder.png";
import { Paper } from "@material-ui/core";
import "../App.css";

function MyMap(props) {
  const mapRef = useRef(null);

  const createMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          var pos = fromLonLat([
            position.coords.longitude,
            position.coords.latitude,
          ]);
          console.log(position.coords.longitude, position.coords.latitude);

          var marker = new Overlay({
            position: pos,
            positioning: "center-center",
            element: document.getElementsByClassName("marker")[0],
            stopEvent: false,
          });

          var vienna = new Overlay({
            position: pos,
            element: document.getElementsByClassName("vienna")[0],
          });

          new OLmap({
            target: document.getElementById("map"),
            view: new View({
              center: pos,
              zoom: 8,
            }),
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
            ],
          }).addOverlay(marker, vienna);
        },
        function (error) {
          alert("Enable your location");
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
        }
      );
    }

    console.log(mapRef);
  };

  useEffect(() => {
    createMap();
  }, []);

  return (
    <div style={{ width: "100%", height: "320px" }}>
      <Paper elevation={5} ref={mapRef} className="map-box" id="map"></Paper>
      <div
        style={{
          width: "20px",
          height: "20px",
        }}
        className="marker"
        title="Marker"
      >
        <img
          src={placeholder}
          style={{ width: "100%", height: "100%" }}
          alt="Pos"
        />
      </div>
    </div>
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
export default connect(mapStateToProps, null)(MyMap);
