import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ArrowRight from "@mui/icons-material/ArrowRight";

import fahrplan31 from "../assets/busplan/verlaufplan/31fahrplan.jpg";
import { ThemeProvider } from "@emotion/react";
import { SvgIcon, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const locations = {
  31: {
    extra_times: [1, 2, 3, 5, 6, 7, 11, 12, 14, 15, 17, 18, 22],
    locations: [
      "Rehabilitationszentrum für Blinde, Chemnitz",
      "Frauen- und Kinderklinik, Chemnitz",
      "Klinikum Flemmingstr., Chemnitz",
      "Talanger, Chemnitz",
      "Wattstraße, Chemnitz",
      "Kanalstraße, Chemnitz",
      "Leonhardtstraße, Chemnitz",
      "Henriettenstraße, Chemnitz",
      "Gerhart-Hauptmann-Platz, Chemnitz",
      "Marianne-Brandt-Straße, Chemnitz",
      "Reichsstraße, Chemnitz",
      "Zentralhaltestelle, Chemnitz",
    ],
  },

  62: {
    extra_times: [1, 2, 3, 5, 6, 7, 11, 12, 14, 15, 17, 18, 22],
    locations: ["DEBUG1", "DEBUG2", "DEBUG3", "DEBUG4", "DEBUG5", "DEBUG6"],
  },
};

function Fahrplan() {
  const [busplanData, setBusplanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/cache/busplan");
        console.log("Fahrplan data:", response.data.busData);
        setBusplanData(response.data.busData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if departure time has passed for any bus
      const currentTime = new Date().getTime();
      const updatedBusplanData = { ...busplanData };
      console.log("Trying to update.");

      for (const bus in busplanData) {
        const departureTime = new Date(
          busplanData[bus].departureTimes[0]
        ).getTime();
        if (departureTime < currentTime) {
          // Update departure time to the next one
          updatedBusplanData[bus].departureTimes.shift();
        }
      }

      setBusplanData(updatedBusplanData);
    }, 60000); // Check every minute

    return () => clearTimeout(timer);
  }, [busplanData]);

  if (loading) {
    return (
      <div className=" bg-site-background mx-auto px-4 text-white flex-grow w-screen justify-evenly">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto bg-busplan bg-opacity-20 text-white flex-grow w-screen justify-evenly overflow-hidden"
      tabIndex="0"
    >
      <div
        className="bg-black bg-opacity-70 h-screen w-screen flex flex-grow items-center"
        tabIndex="0"
      >
        <div
          className="flex w-full justify-center items-center flex-col "
          tabIndex="0"
        >
          <ThemeProvider theme={darkTheme}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              className="w-full sm:w-3/4 rounded-2xl"
              tabIndex="0"
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                tabIndex="0"
              >
                <div
                  className="flex flex-col items-center w-full font-semibold"
                  tabIndex="0"
                >
                  <p className="text-3xl pb-10 " tabIndex="0">
                    Bus 31
                  </p>
                  <div
                    className="flex w-full justify-evenly items-center"
                    tabIndex="0"
                  >
                    {busplanData["31"].departureTimes
                      .slice(0, 4)
                      .map((time, index, array) => (
                        <React.Fragment key={index}>
                          <Typography tabIndex="0">{time}</Typography>
                          {index !== array.length - 1 && (
                            <SvgIcon component={ArrowRight} tabIndex="0" />
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                  <div
                    className="flex w-full justify-evenly items-center"
                    tabIndex="0"
                  >
                    {busplanData["31"].realTimes
                      .slice(0, 4)
                      .map((time, index, array) => {
                        let typographyClass = "";
                        if (busplanData["31"].departureTimes[index] !== time) {
                          typographyClass = "text-red-500"; // Apply red color if the time is earlier
                        } else {
                          typographyClass = "text-green-500"; // Apply green color if the time is the same
                        }

                        return (
                          <React.Fragment key={index}>
                            <p className={typographyClass} tabIndex="0">
                              {time}
                            </p>
                            {index !== array.length - 1 && (
                              <SvgIcon component={ArrowRight} tabIndex="0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <div
                    className="grid grid-cols-7 grid-rows-1 w-full justify-evenly"
                    tabIndex="0"
                  ></div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div
                  className="flex flex-row w-full justify-evenly"
                  tabIndex="0"
                >
                  <div className="flex flex-col space-y-4" tabIndex="0">
                    {locations["31"].locations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center"
                        tabIndex="0"
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full"
                          tabIndex="0"
                        ></div>
                        <div className="ml-4" tabIndex="0">
                          <Typography tabIndex="0">{location}</Typography>
                          <Typography tabIndex="0">
                            {addMinutesToTime(
                              busplanData["31"].realTimes[0],
                              locations["31"].extra_times[index]
                            )}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-1/2" tabIndex="0">
                    <img
                      src={fahrplan31}
                      alt="Fahrplan 31"
                      className="w-full"
                    />
                  </div>
                  {/* Add more stations as needed */}
                </div>
                <p className="text-xs text-gray-400" tabIndex="0">
                  *Alle Angaben sind unverbindlich. Es wird lediglich eine
                  ungefähre Zeit angegeben. Busse können an bestimmten
                  Haltestellen früher oder später eintreffen. Die angegebenen
                  Zeiten sind daher nur Richtwerte.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              className="w-full sm:w-3/4 rounded-2xl "
              tabIndex="0"
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
                tabIndex="0"
              >
                <div
                  className="flex flex-col items-center w-full font-semibold"
                  tabIndex="0"
                >
                  <p className="text-3xl pb-10 " tabIndex="0">
                    Bus 62
                  </p>
                  <div
                    className="flex w-full justify-evenly items-center"
                    tabIndex="0"
                  >
                    {busplanData["62"].departureTimes
                      .slice(0, 4)
                      .map((time, index, array) => (
                        <React.Fragment key={index}>
                          <Typography tabIndex="0">{time}</Typography>
                          {index !== array.length - 1 && (
                            <SvgIcon component={ArrowRight} tabIndex="0" />
                          )}
                        </React.Fragment>
                      ))}
                  </div>
                  <div
                    className="flex w-full justify-evenly items-center"
                    tabIndex="0"
                  >
                    {busplanData["62"].realTimes
                      .slice(0, 4)
                      .map((time, index, array) => {
                        let typographyClass = "";
                        if (busplanData["62"].departureTimes[index] !== time) {
                          typographyClass = "text-red-500"; // Apply red color if the time is earlier
                        } else {
                          typographyClass = "text-green-500"; // Apply green color if the time is the same
                        }

                        return (
                          <React.Fragment key={index}>
                            {time !== null ? (
                              <p className={typographyClass} tabIndex="0">
                                {time}
                              </p>
                            ) : (
                              <p className={typographyClass} tabIndex="0">
                                N/A
                              </p>
                            )}
                            {index !== array.length - 1 && (
                              <SvgIcon component={ArrowRight} tabIndex="0" />
                            )}
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <div
                    className="grid grid-cols-7 grid-rows-1 w-full justify-evenly"
                    tabIndex="0"
                  ></div>
                </div>
              </AccordionSummary>
              <AccordionDetails tabIndex="0">
                <div className="flex flex-row w-full justify-evenly">
                  <div className="flex flex-col space-y-4">
                    {locations["62"].locations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center"
                        tabIndex="0"
                      >
                        <div
                          className="w-4 h-4 bg-white rounded-full"
                          tabIndex="0"
                        ></div>
                        <div className="ml-4" tabIndex="0">
                          <Typography tabIndex="0">{location}</Typography>
                          <Typography tabIndex="0">
                            {addMinutesToTime(
                              busplanData["62"].realTimes[0],
                              locations["62"].extra_times[index]
                            )}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="w-1/2" tabIndex="0">
                    <img
                      src={fahrplan31}
                      alt="Fahrplan 31"
                      className="w-full"
                    />
                  </div>
                  {/* Add more stations as needed */}
                </div>
                <p className="text-xs text-gray-400" tabIndex="0">
                  *Alle Angaben sind unverbindlich. Es wird lediglich eine
                  ungefähre Zeit angegeben. Busse können an bestimmten
                  Haltestellen früher oder später eintreffen. Die angegebenen
                  Zeiten sind daher nur Richtwerte.
                </p>
              </AccordionDetails>
            </Accordion>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}

const addMinutesToTime = (timeString, extraMinutes) => {
  // Split the time string into hours and minutes
  const [hoursStr, minutesStr] = timeString.split(":");
  let hours = parseInt(hoursStr);
  let minutes = parseInt(minutesStr);

  // Add the extra minutes
  minutes += extraMinutes;

  // Adjust hours if minutes exceed 60
  hours += Math.floor(minutes / 60);
  minutes = minutes % 60;

  // Format hours and minutes
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Construct the new time string
  return `${formattedHours}:${formattedMinutes}`;
};

export default Fahrplan;
