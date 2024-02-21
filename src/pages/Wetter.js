import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import weatherAnimation from "../assets/weather/animatedLogos/cloud-lightning.json";
import weatherInterpretationCodes from "../extras/weatherInterpretationCodes";
import "./css/stars.css";

import cloudsIcon from "../assets/weather/staticLogos/clouds.svg";

import axios from "axios";

function Wetter() {
  // Define state to store the data fetched from the API
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);

  // Define a function to fetch data from the API
  const fetchData = async (type) => {
    try {
      if (type === "forecast") {
        console.log("Fetching forecast data...");
        // Make the API call for forecast data
        try {
          const response = await axios.get(
            "http://localhost:8000/cache/forecast"
          );

          setWeatherData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        return;
      } else if (type === "current") {
        console.log("Fetching current weather data...");
        // Make the API call for current weather data
        try {
          const response = await axios.get(
            "http://localhost:8000/cache/current_weather"
          );
          setCurrentWeatherData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }

        return;
      } else if (type === "hourly") {
        console.log("Fetching hourly forecast data...");
        // Make the API call for hourly forecast data
        try {
          const response = await axios.get(
            "http://localhost:8000/cache/hourly_forecast"
          );
          setHourlyWeatherData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        return;
      } else {
        console.log("Fetching failed: invalid type specified");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Use useEffect to trigger the API call when the component mounts
  useEffect(() => {
    fetchData("forecast");
    fetchData("current");
    fetchData("hourly");
  }, []); // Empty dependency array means this effect runs only once when component mounts

  return (
    <div className="bg-weather-stars bg-cover min-h-full h-screen flex flex-col flex-grow items-center">
      <div className='"bg-black bg-opacity-80 flex h-full justify-center items-center flex-col'>
        <h1 className="text-4xl font-bold text-white m-12">Current Weather</h1>
        <div className="bg-black bg-opacity-40 text-white">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row justify-center items-center">
            {hourlyWeatherData && hourlyWeatherData.hourly && hourlyWeatherData.hourly.time.slice(0,20).map((hourlyData, index) => (
                <div key={index}>
                  <p>9:00</p>
                  <Lottie
                    animationData={
                      weatherInterpretationCodes[
                        hourlyWeatherData.hourly.weather_code[index + 1]
                      ].animatedIcon
                    }
                    style={{
                      marginRight: 20,
                      filter:
                        "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                    }}
                    />
                  <p>20°C</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <div className="bg-black bg-opacity-40 flex flex-col w-screen text-white">
          <div className="w-full text-center">
            <h1>Forecast</h1>
          </div>
          <div className="flex flex-wrap text-center justify-evenly ">
            {weatherData &&
              weatherData.daily &&
              weatherData.daily.time.slice(1, 6).map((dailyData, index) => (
                <div key={index}>
                  <h1 className="text-l mt-2 font-medium">
                    {new Date(
                      weatherData.daily.time[index + 1] * 1000
                    ).toLocaleDateString("de-DE", { weekday: "long" })}
                  </h1>
                  <h1 className="text-sm">
                    {new Date(
                      weatherData.daily.time[index + 1] * 1000
                    ).toLocaleDateString()}
                  </h1>
                  <Lottie
                    animationData={
                      weatherInterpretationCodes[
                        weatherData.daily.weather_code[index + 1]
                      ].animatedIcon
                    }
                    style={{
                      marginRight: 20,
                      filter:
                        "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                    }}
                    className="w-auto h-20 "
                    // Adjust any other props if needed
                  />
                  <h1 className="text-xl font-semibold m-1 ">
                    {
                      weatherInterpretationCodes[
                        weatherData.daily.weather_code[index + 1]
                      ].desc
                    }
                  </h1>
                  <div className="flex flex-row">
                    <div className="m-6 flex justify-between flex-col">
                      <p className="font-bold text-xl">
                        {weatherData.daily.temperature_2m_min[index + 1]} °C
                      </p>
                      <p>bis</p>
                      <p className="font-bold text-xl">
                        {weatherData.daily.temperature_2m_max[index + 1]} °C
                      </p>
                    </div>
                    <div>
                      <h1 className="text-l mt-2">Windstärke</h1>
                      <h4 className="font-extralight">
                        {weatherData.daily.wind_speed_10m_max[index + 1]} KM/h
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wetter;

/*

                  <img
                    className="w-20 h-auto"
                    src={cloudsIcon}
                    alt="weather icon"
                    style={{
                      filter:
                        "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                    }}



      <div className="bg-gray-300 bg-opacity-70 rounded-lg p-8 flex flex-wrap max-w-screen-xl">
        <div className=" flex justify-center w-full pb-10">
          <img src={cloudsIcon} alt="weather icon" />
          <div className="flex flex-col items-center justify-center">
            <h2 className='text-2xl font-bold'>{weatherInterpretationCodes[currentWeatherData.current.weather_code].desc}</h2>
            <p>currentWeatherData.current.</p>
            <p>CURRENT WEATHER</p>
          </div>
        </div>

        <div className="text-center mb-8 flex flex-wrap" style={{ width: "calc(100% - 16px)", margin: "8px" }}>
          {weatherData && weatherData.daily && weatherData.daily.time.slice(1, 5).map((dailyData, index) => (
            <div key={index} className="text-center mb-8" style={{ width: "calc(50% - 16px)", margin: "8px" }}>
              <div className="flex items-center justify-center mb-4">
                {weatherData.daily.weather_code && (
                  <Lottie
                    animationData={weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].animatedIcon}
                    style={{ width: 200, height: 200, marginRight: 20, stroke: "#ffc107" }}
                    // Adjust any other props if needed
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold">
                    {weatherData.daily.weather_code &&
                      weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].desc
                    }
                  </h2>
                  <h5 className="mb-2">
                    Last Info: {weatherData.daily.time ? new Date(weatherData.daily.time[index + 1] * 1000).toLocaleDateString() : 'N/A'}
                  </h5>
                  <p>
                    Temperature: {weatherData.daily.temperature_2m_min && weatherData.daily.temperature_2m_max &&
                      `${weatherData.daily.temperature_2m_min[index + 1]} °C - ${weatherData.daily.temperature_2m_max[index + 1]} °C`
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


*/
