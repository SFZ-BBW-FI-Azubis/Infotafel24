import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";
import weatherAnimation from "../assets/weather/animatedLogos/cloud-lightning.json";
import weatherInterpretationCodes from '../extras/weatherInterpretationCodes';

function Wetter() {
  // Define state to store the data fetched from the API
  const [weatherData, setWeatherData] = useState(null);


  // Define a function to fetch data from the API
  const fetchData = async () => {
    try {
      // Make the API call
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=50.8357&longitude=12.9292&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,wind_speed_10m_max&timeformat=unixtime&timezone=Europe%2FBerlin');
      // Parse the response as JSON
      const data = await response.json();
      // Update the state with the fetched data
      data.daily.time.map((dailyData, index) => {
        console.log(data.daily.weather_code[index]);
      });
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Use useEffect to trigger the API call when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs only once when component mounts






  return (
    <div className="bg-site-background min-h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-300 bg-opacity-80 rounded-lg p-8 flex flex-wrap max-w-screen-xl justify-between">
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
                <p>Sonnenaufgang: {new Date(weatherData.daily.sunrise[index + 1] * 1000).toLocaleTimeString()}</p>
                <p>Sonnenuntergang: {new Date(weatherData.daily.sunset[index + 1] * 1000).toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
}

export default Wetter;


/*

    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-300 bg-opacity-80 rounded-lg p-8">
        {weatherData && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Weather Information</h2>
            <h5 className="mb-2">Last Info: {weatherData.current.time ? new Date(weatherData.current.time * 1000).toLocaleString() : 'N/A'}</h5>
            <p>Temperature: {weatherData.current.temperature_2m} °C</p>
            <p>Condition: {weatherData.condition}</p>
          </div>
        )}
        {weatherData && weatherData.forecast ? (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {/* Display other weather information in a 2x2 grid }
            {weatherData.forecast.map((forecastItem, index) => (
              <div key={index} className="bg-gray-300 bg-opacity-80 rounded-lg p-4">
                <h3 className="font-bold">{forecastItem.time ? new Date(forecastItem.time * 1000).toDateString() : 'N/A'}</h3>
                <p>Temperature: {forecastItem.temperature_2m} °C</p>
                <p>Condition: {forecastItem.condition}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">Loading...</p>
        )}
      </div>
    </div>

*/