import React, { useEffect, useState } from "react";
import axios from "axios";

function Speiseplan() {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/food");
        setMealPlan(response.data);
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

  return (
    <div
      className="bg-foodplan text-white flex-grow min-w-screen flex justify-center"
      style={{ width: "100%", margin: "0px" }}
    >
      <div className="flex flex-row items-center h-auto bg-black bg-opacity-80">
        {loading ? (
          <div className="text-2xl" style={{ borderBottom: "2px solid white" }}>
            Loading...
          </div>
        ) : (
          mealPlan.map((day) => (
            <div
              className="flex flex-col bg-gray-700 p-4 m-4 rounded-lg"
              key={day.date}
              style={{ height: "90%", width: "20%" }}
            >
              <h1 
                className="text-2xl font-bold"
                tabIndex={tabIndexCounter++}
                style={{ borderBottom: "2px solid white" }}
              >
                {day.date}
              </h1>
              <div className="flex flex-col flex-grow">
                {day.meals.menus.menuName.map((meal, index) => (
                  <div
                    className="flex flex-col flex-grow"
                    key={index}
                    style={{ height: "100%" }}
                  >
                    <p className="text-xl flex-grow" style={{ height: "20%" }} tabIndex={tabIndexCounter++}>
                      {meal}
                    </p>
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
        )}
      </div>
    </div>
  );
}

export default Speiseplan;
