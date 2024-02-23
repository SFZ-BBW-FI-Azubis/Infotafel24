import React from 'react';
import weatherInterpretationCodes from "../extras/weatherInterpretationCodes";
import Lottie from 'lottie-react';
import thermometerMAX from "../assets/weather/staticLogos/icons8-thermometer-up-100.svg";
import thermometerMIN from "../assets/weather/staticLogos/icons8-thermometer-down-100.svg";

// Component to display daily weather forecast
export default function DailyForecastComponent({weatherData}) {
  return (
    <div className="flex items-end justify-end">
      <div className="bg-black flex flex-col w-screen text-white border-t-2 border-t-gray-500">
        <div className="flex flex-wrap text-center justify-evenly">
          {weatherData?.daily?.time.slice(1, 6).map((dailyData, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
            >
              {/* Display weekday */}
              <h1 className="text-l mt-2 font-medium">
                {new Date(dailyData * 1000).toLocaleDateString("de-DE", {
                  weekday: "long",
                })}
              </h1>
              {/* Display date */}
              <h1 className="text-sm">
                {new Date(dailyData * 1000).toLocaleDateString()}
              </h1>
              {/* Display weather animation */}
              <Lottie
                animationData={
                  weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].day
                    .animatedIcon
                }
                className="w-auto h-28"
              />
              {/* Display weather description */}
              <h1 className="text-xl font-semibold m-1">
                {
                  weatherInterpretationCodes[weatherData.daily.weather_code[index + 1]].day
                    .desc
                }
              </h1>
              <div className="flex flex-row items-center justify-evenly">
                <div className="m-6 flex justify-between flex-col">
                  {/* Display maximum temperature */}
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
                  {/* Display minimum temperature */}
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
  );
}
