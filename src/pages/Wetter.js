import React, { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import axios from "axios";
import weatherAnimation from "../assets/weather/animatedLogos/cloud-lightning.json";
import weatherInterpretationCodes from "../extras/weatherInterpretationCodes";
import { horizontalScroll, useHorizontalScroll } from "../extras/horizontalScroll";
import "./css/stars.css";

import cloudsIcon from "../assets/weather/staticLogos/clouds.svg";
import thermometerMAX from "../assets/weather/staticLogos/icons8-thermometer-up-100.svg";
import thermometerMIN from "../assets/weather/staticLogos/icons8-thermometer-down-100.svg";
import thermometer from "../assets/weather/staticLogos/thermometer.svg";
import S_wind from "../assets/weather/staticLogos/wind.svg";
import rain from "../assets/weather/staticLogos/moderate-rain.svg"
import compass from "../assets/weather/staticLogos/compass.svg";

const API_BASE_URL = "http://localhost:8000/cache";

function Wetter() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);


  const ref = useRef(null);

  const onWheel = (e) => {
    e.preventDefault(); // Prevent default scrolling behavior
    const element = ref.current;
    if (element) {
      const delta = e.deltaY !== undefined ? e.deltaY : e.deltaX; // Use deltaY if available, otherwise use deltaX
      element.scrollTo({
        left: element.scrollLeft + delta,
      });
    }
  };
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [forecastResponse, currentResponse, hourlyResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/forecast`),
          axios.get(`${API_BASE_URL}/current_weather`),
          axios.get(`${API_BASE_URL}/hourly_forecast`),
        ]);

        console.log("Forecast data:", forecastResponse.data);
        console.log("Current weather data:", currentResponse.data);
        console.log("Hourly weather data:", hourlyResponse.data);

        setWeatherData(forecastResponse.data);
        setCurrentWeatherData(currentResponse.data);
        setHourlyWeatherData(hourlyResponse.data);
        setLoading(false); // Set loading to false when all data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, e.g., set loading to false and display error message
        setLoading(false);
      }
    };


    fetchData();
  }, []);

  useEffect(() => {
    const startScrolling = setTimeout(() => {
      const element = ref.current;
      if (element) {
        const scrollAmount = element.scrollWidth - element.clientWidth; // Scroll the full width of the content
        const duration = 50000; // Duration of the scrolling animation (in milliseconds)
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1); // Ensure progress is capped at 1

          element.scrollTo({
            left: scrollAmount * progress,
            behavior: 'auto' // Use 'auto' for smoother animation
          });

          if (progress < 1) {
            requestAnimationFrame(animateScroll); // Continue animation if not completed
          }
        };

        requestAnimationFrame(animateScroll); // Start the animation loop
      }
    }, 5000); // Wait for 5 seconds before starting continuous scrolling

    return () => {
      clearTimeout(startScrolling);
    };
  }, []);

  const filteredHourlyData = hourlyWeatherData?.hourly?.time.filter(time => time > currentWeatherData.current.time);

  if (loading) {
    return (
      <div className="bg-weatherday bg-cover min-h-full h-screen flex flex-col justify-center items-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }


  // Add additional checks for missing data
  if (!weatherData || !currentWeatherData || !hourlyWeatherData) {
    return (
      <div className="bg-weatherday bg-cover min-h-full h-screen flex flex-col justify-center items-center">
        <div className="text-white text-2xl">Error: Data not available</div>
      </div>
    );
  }

  return (
    <div className="bg-bg-weather-day bg-cover min-h-full h-screen flex flex-col flex-grow items-center">
      {/* Current Weather */}
      <div className="bg-black bg-opacity-80 flex h-full w-full justify-center items-center flex-col">
        <div className="flex flex-row justify-evenly w-screen sm:max-w-screen-lg sm:mb-52">
          <div className="sm:mr-64">
            <h1 className="text-4xl font-bold text-white m-12">
              {currentWeatherData?.current
                ? weatherInterpretationCodes[currentWeatherData.current.weather_code].day.desc
                : null}
            </h1>
            <Lottie
              animationData={
                currentWeatherData?.current
                  ? weatherInterpretationCodes[currentWeatherData.current.weather_code].day.animatedIcon
                  : null
              }
              className="w-auto h-96"
            />
          </div>
          <div className="text-white flex flex-col">
            <div className="flex flex-col justify-evenly min-h-fit flex-grow">
              <p className="text-5xl flex flex-row">
              <img
                  src={thermometer}
                  className="w-12 h-auto mr-10"
                  alt=""
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {currentWeatherData?.current ? currentWeatherData.current.temperature_2m : null} °C
              </p>
              <p className="flex flex-row text-5xl">
                <img
                  src={S_wind}
                  className="w-12 h-auto mr-10"
                  alt=""
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {currentWeatherData?.current ? currentWeatherData.current.wind_speed_10m : null} KM/h
              </p>
              <p className="text-5xl flex flex-row">
                <img
                  src={compass}
                  className="w-12 h-auto mr-10"
                  alt=""
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                    transform: `rotate(${currentWeatherData?.current ? currentWeatherData.current.wind_direction_10m +90 : 0}deg)`
                  }}
                />
                {currentWeatherData?.current ? currentWeatherData.current.wind_direction_10m : null} °
              </p>
              <p className="flex flex-row text-5xl">
                <img
                  src={cloudsIcon}
                  className="w-12 h-auto mr-10"
                  alt=""
                  style={{
                    filter:
                      "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                  }}
                />
                {currentWeatherData?.current ? currentWeatherData.current.cloud_cover:null} %
                </p>
              <p className="flex flex-row text-5xl">
                <img src={rain} alt="" className="w-12 h-auto mr-10" style={{filter: "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)"}} />
                {currentWeatherData?.current ? currentWeatherData.current.rain:null} mm
              </p>
            </div>
          </div>
        </div>

        {/* HOURLY FORECAST */}
        <div className="text-white w-screen sm:max-w-screen-lg">
          <div className="flex flex-row">
            <div className="flex flex-row items-end overflow-x-auto" ref={ref} onWheel={(e) => onWheel(e)}>
            {filteredHourlyData?.map((hourlyData, index) => (
    <div key={index} className={`mb-4 text-l ${isDifferentDay(filteredHourlyData[index - 1], hourlyData) ? 'ml-16' : 'mr-4'}`}>
      {/* Add a header for each new day */}
      {index === 0 || isDifferentDay(filteredHourlyData[index - 1], hourlyData) ? (
        <h2 className="text-2xl font-semibold mb-2 flex justify-center">
          {new Date(hourlyData * 1000).toLocaleDateString("de-DE", {
            weekday: "long",
          })}
        </h2>
      ) : null}
      <div className="items-center justify-center flex flex-col">
        <p>
          {new Date(hourlyData * 1000).toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <Lottie
          animationData={
            currentWeatherData?.current
              ? weatherInterpretationCodes[hourlyWeatherData.hourly.weather_code[index + 1]].day.animatedIcon
              : null
          }
          className="w-28 h-auto"
          autoplay={false}
          initialSegment={[0.5, 1]}
        />
        <p>{hourlyWeatherData.hourly.temperature_2m[index + 1]} °C</p>
      </div>
    </div>
  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forecast */}
      <div className="flex items-end justify-end">
        <div className="bg-black flex flex-col w-screen text-white border-t-2 border-t-gray-500">
          <div className="flex flex-wrap text-center justify-evenly">
            {weatherData?.daily?.time.slice(1, 6).map((dailyData, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              >
                <h1 className="text-l mt-2 font-medium">
                  {new Date(dailyData * 1000).toLocaleDateString("de-DE", {
                    weekday: "long",
                  })}
                </h1>
                <h1 className="text-sm">
                  {new Date(dailyData * 1000).toLocaleDateString()}
                </h1>
                <Lottie
                  animationData={
                    weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].day
                      .animatedIcon
                  }
                  className="w-auto h-28"
                />
                <h1 className="text-xl font-semibold m-1">
                  {
                    weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].day
                      .desc
                  }
                </h1>
                <div className="flex flex-row items-center justify-evenly">
                  <div className="m-6 flex justify-between flex-col">
                    <p className="font-bold text-xl flex flex-row">
                      <img
                        src={thermometerMAX}
                        alt=""
                        className="w-6 h-6"
                        style={{
                          filter:
                            "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                        }}
                      />
                      {weatherData.daily.temperature_2m_max[index + 1]} °C
                    </p>
                  </div>
                  <div>
                  <p className="font-bold text-xl flex flex-row">
                      <img
                        src={thermometerMIN}
                        className="w-6 h-6"
                        alt=""
                        style={{
                          filter:
                            "invert(80%) sepia(63%) saturate(2257%) hue-rotate(350deg) brightness(102%) contrast(107%)",
                        }}
                      />
                      {weatherData.daily.temperature_2m_min[index + 1]} °C
                    </p>
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


// Function to check if two timestamps belong to different days
const isDifferentDay = (timestamp1, timestamp2) => {
  // Convert timestamps to Date objects
  const date1 = new Date(timestamp1 * 1000);
  const date2 = new Date(timestamp2 * 1000);

  // Compare year, month, and day of the two dates
  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
};


export default Wetter;
