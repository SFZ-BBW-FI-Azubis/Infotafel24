import React from "react";
import Lottie from "lottie-react";

import thermometer from "../assets/weather/staticLogos/thermometer.svg";
import S_wind from "../assets/weather/staticLogos/wind.svg";
import rain from "../assets/weather/staticLogos/moderate-rain.svg";
import compass from "../assets/weather/staticLogos/compass.svg";
import cloudsIcon from "../assets/weather/staticLogos/clouds.svg";

import weatherInterpretationCodes from "../extras/weatherInterpretationCodes";

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function CurrentWeatherComponent({ currentWeatherData }) {
  return (
    <div className="flex flex-row justify-evenly w-screen sm:max-w-screen-lg sm:mb-52">
      <div className="sm:mr-64" style={{ maxWidth: isMobile ? "40%" : "" }}>
        {/* Display the weather description */}
        <h1 className="text-4xl font-bold text-white m-12" tabIndex="0">
          {currentWeatherData?.current
            ? weatherInterpretationCodes[
                currentWeatherData.current.weather_code
              ].day.desc
            : null}
        </h1>
        {/* Display the weather animation */}
        <Lottie
          animationData={
            currentWeatherData?.current
              ? weatherInterpretationCodes[
                  currentWeatherData.current.weather_code
                ].day.animatedIcon
              : null
          }
          className="w-auto h-96"
        />
      </div>
      <div className="text-white flex flex-col">
        <div className="flex flex-col justify-evenly min-h-fit flex-grow">
          {/* Display the temperature */}
          <p
            className="flex flex-row"
            style={{ fontSize: isMobile ? "30px" : "50px" }}
            tabIndex="0"
          >
            <img
              src={thermometer}
              className="w-12 h-auto mr-10"
              alt=""
              style={{
                filter:
                  "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
              }}
            />
            {currentWeatherData?.current
              ? currentWeatherData.current.temperature_2m
              : null}
            °C
          </p>
          {/* Display the wind speed */}
          <p
            className="flex flex-row"
            style={{ fontSize: isMobile ? "30px" : "50px" }}
            tabIndex="0"
          >
            <img
              src={S_wind}
              className="w-12 h-auto mr-10"
              alt=""
              style={{
                filter:
                  "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
              }}
            />
            {currentWeatherData?.current
              ? currentWeatherData.current.wind_speed_10m
              : null}
            KM/h
          </p>
          {/* Display the wind direction */}
          <p
            className="flex flex-row"
            style={{ fontSize: isMobile ? "30px" : "50px" }}
            tabIndex="0"
          >
            <img
              src={compass}
              className="w-12 h-auto mr-10"
              alt=""
              style={{
                filter:
                  "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                transform: `rotate(${
                  currentWeatherData?.current
                    ? currentWeatherData.current.wind_direction_10m + 90
                    : 0
                }deg)`,
              }}
            />
            {currentWeatherData?.current
              ? currentWeatherData.current.wind_direction_10m
              : null}
            °
          </p>
          {/* Display the cloud cover */}
          <p
            className="flex flex-row"
            style={{ fontSize: isMobile ? "30px" : "50px" }}
            tabIndex="0"
          >
            <img
              src={cloudsIcon}
              className="w-12 h-auto mr-10"
              alt=""
              style={{
                filter:
                  "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
              }}
            />
            {currentWeatherData?.current
              ? currentWeatherData.current.cloud_cover
              : null}
            %
          </p>
          {/* Display the rainfall */}
          <p
            className="flex flex-row"
            style={{ fontSize: isMobile ? "30px" : "50px" }}
            tabIndex="0"
          >
            <img
              src={rain}
              alt=""
              className="w-12 h-auto mr-10"
              style={{
                filter:
                  "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
              }}
            />
            {currentWeatherData?.current
              ? currentWeatherData.current.rain
              : null}
            mm
          </p>
        </div>
      </div>
    </div>
  );
}


export default CurrentWeatherComponent;