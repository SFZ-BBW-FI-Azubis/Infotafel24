import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function Speiseplan() {
  const [loading, setLoading] = useState(true);
  const [mealPlan, setMealPlan] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/food");
        setMealPlan(response.data);
        //console.log(mealPlan.map((day) => day.date + ": " + day.meals.menus.menuName));

        /*mealPlan.forEach(element => {
          //console.log(element);
          //console.log(element.meals.menus.menuName)
        });*/

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  let mealIndex = 0;

  return (
    <div className=" bg-site-background w-screen mx-auto px-4 text-white flex-grow min-w-screen flex justify-center">
      <div className="flex flex-row items-center w-fit h-auto">
        {mealPlan ? (
          mealPlan.map((day) => (
            <div
              className="flex flex-col bg-gray-700 p-4 m-4 rounded-lg"
              key={day.date}
            >
              <h1 className="text-2xl font-bold">{console.log(day)}</h1>
              <div className="flex flex-col">
                {day.meals.menus.menuName.map((meal) => (
                  <div className="flex flex-row" key={mealIndex++}>
                    <p className="text-xl">{meal}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-2xl">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Speiseplan;
