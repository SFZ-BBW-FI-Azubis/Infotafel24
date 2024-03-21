import React, { useRef } from "react";
import Lottie from "lottie-react";
import weatherInterpretationCodes from "../extras/weatherInterpretationCodes.js";

function HourlyForecastComponent({ hourlyWeatherData, currentTime }) {
  const ref = useRef(null);

  const onWheel = (e) => {
    const element = ref.current;
    if (element) {
      const delta = e.deltaY !== undefined ? e.deltaY : e.deltaX;
      element.scrollTo({
        left: element.scrollLeft + delta,
      });
    }
  };

  return (
    <div className="text-white w-screen sm:max-w-screen-lg">
      <div className="flex flex-row">
        <div
          className="flex flex-row items-end overflow-x-auto"
          ref={ref}
          onWheel={(e) => onWheel(e)}
        >
          {hourlyWeatherData?.hourly?.time.map((hourlyData, index) => {
            // Filter only future timestamps
            if (hourlyData <= currentTime) return null;

            const hourOfDay = new Date(hourlyData * 1000).getHours();
            let icon;

            if (hourOfDay >= 6 && hourOfDay < 18) {
              icon = weatherInterpretationCodes[hourlyWeatherData.hourly.weather_code[index]].day.animatedIcon;
            } else {
              icon = weatherInterpretationCodes[hourlyWeatherData.hourly.weather_code[index]].night.animatedIcon;
            }

            const currentDay = new Date(hourlyData * 1000).toLocaleDateString("de-DE", { weekday: "long" });
            const isFirstItemOfDay = index === 0 || currentDay !== new Date(hourlyWeatherData.hourly.time[index - 1] * 1000).toLocaleDateString("de-DE", { weekday: "long" });

            return (
              <div
                key={index}
                className={`mb-4 text-l ${isFirstItemOfDay ? "ml-16" : "mr-4"}`}
              >
                {isFirstItemOfDay && (
                  <h2 className="text-2xl font-semibold mb-2 flex justify-center">
                    {currentDay}
                  </h2>
                )}
                <div className="items-center justify-center flex flex-col">
                  <p>
                    {new Date(hourlyData * 1000).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <Lottie
                    animationData={
                      hourlyWeatherData
                        ? icon
                        : null
                    }
                    className="w-28 h-auto"
                    //autoplay={false}
                    //initialSegment={[0.5, 1]}
                  />
                  <p>{hourlyWeatherData.hourly.temperature_2m[index]} °C</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Check if two timestamps belong to different days
const isDifferentDay = (timestamp1, timestamp2) => {
  const date1 = new Date(timestamp1 * 1000);
  const date2 = new Date(timestamp2 * 1000);

  return (
    date1.getFullYear() !== date2.getFullYear() ||
    date1.getMonth() !== date2.getMonth() ||
    date1.getDate() !== date2.getDate()
  );
};

export default HourlyForecastComponent;