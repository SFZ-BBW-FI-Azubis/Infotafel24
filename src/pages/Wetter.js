import React, { useState, useEffect } from "react";
import axios from "axios";

import "./css/stars.css";

import HourlyForecastComponent from "../components/HourlyForecastComponent";
import DailyForecastComponent from "../components/DailyForecastComponent";
import CurrentWeatherComponent from "../components/CurrentWeatherComponent";

const API_BASE_URL = "http://localhost:8000/cache";

const debug = false;

/**
 * Renders the weather component.
 * Fetches weather data from an API and displays the current weather, hourly forecast, and daily forecast.
 * Handles loading and error states.
 *
 * @returns {JSX.Element} The rendered weather component.
 */
function Wetter() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weatherResponse] =
          await Promise.all([
            axios.get(`${API_BASE_URL}/weather`),

          ]);

        if (debug) {
          console.log("Weather data:", weatherResponse.data);

        }

        setWeatherData(weatherResponse.data);
        setLoading(false); // Set loading to false when all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., set loading to false and display error message
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { current: { time } = {} } = weatherData || {};

  if (loading) {
    return (
      <div className="bg-weatherday bg-cover min-h-full h-screen flex flex-col justify-center items-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-weatherday bg-cover min-h-full h-screen flex flex-col justify-center items-center">
        <div className="text-white text-2xl">Error: Data not available</div>
      </div>
    );
  }

  return (
    <div className="bg-weather-day bg-cover min-h-full h-screen flex flex-col flex-grow items-center">
      <div className="bg-black bg-opacity-80 flex h-full w-full justify-center items-center flex-col">
        {/* Current Weather */}
        <CurrentWeatherComponent currentWeatherData={weatherData} />
        {/* HOURLY FORECAST */}
        <HourlyForecastComponent
          hourlyWeatherData={weatherData}
          currentTime={time}
        />
      </div>
      {/* DAILY Forecast */}
      <DailyForecastComponent weatherData={weatherData} />
    </div>
  );
}

export default Wetter;
