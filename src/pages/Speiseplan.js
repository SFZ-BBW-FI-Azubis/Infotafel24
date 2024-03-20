import React, { useEffect, useState } from "react";
import axios from "axios";

function Speiseplan() {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/food");
        setMealPlan(response.data.parsedFooddata); // Set mealPlan to parsedFooddata
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Counter to track tabindex
  let tabIndexCounter = 1;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div
      className="bg-foodplan text-white flex-grow min-w-screen"
      style={{
        width: "100%",
        margin: "0px",
        overflowY: isMobile ? "scroll" : "hidden",
        overflowX: isMobile ? "scroll" : "hidden",
        height: "100%",
      }}
    >
      <div
        className={`mealContainer flex flex-grow ${
          isMobile ? "flex-col" : "flex-row items-center"
        } min-h-screen bg-black bg-opacity-80`}
      >
        {!loading && Array.isArray(mealPlan) && mealPlan.length > 0 ? (
          mealPlan.map((day) => (
            <div
              className="flex flex-col bg-gray-700 p-4 m-4 rounded-lg"
              key={day.date}
              style={{ height: isMobile ? "120%" : "80vh", width: isMobile ? "90vw" : "20%" }}
            >
              <h1
                className="text-2xl font-bold"
                tabIndex={tabIndexCounter++}
                style={{ borderBottom: "2px solid white" }}
              >
                {day.date}
              </h1>
              <div className="flex flex-col flex-grow">
                {/* Accessing menuName and alergenes arrays from meals.menus */}
                {day.meals.menus.menuName.map((meal, index) => (
                  <div
                    className="flex flex-col flex-grow"
                    key={index}
                    style={{ height: "100%" }}
                  >
                    <p
                      className="text-xl flex-grow"
                      style={{ height: "20%" }}
                      tabIndex={tabIndexCounter++}
                    >
                      {meal}
                    </p>
                    {/* Accessing alergenes array using the same index */}
                    <p
                      className="text-sm"
                      style={{
                        borderBottom: "1px solid white",
                        paddingBottom: "20px",
                      }}
                      tabIndex={tabIndexCounter++}
                    >
                      Allergene: {day.meals.menus.alergenes[index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl" style={{ borderBottom: "2px solid white" }}>
            {loading ? "Loading..." : "No data available"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Speiseplan;
