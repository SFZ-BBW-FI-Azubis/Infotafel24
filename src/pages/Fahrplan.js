import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Icon from "@mui/material/Icon";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRight from "@mui/icons-material/ArrowRight";

import fahrplan31 from "../assets/busplan/verlaufplan/31fahrplan.jpg";

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
    <div className=" bg-busplan bg-cover bg-center bg-no-repeat text-white flex-grow w-screen justify-evenly overflow-hidden">
      <div className="bg-black flex bg-opacity-60 h-screen w-full flex-col margin-0">
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <div className="w-full flex justify-center items-center flex-col">
              <p className="text-4xl">31</p>
              <div className="flex flex-row justify-evenly w-full">
                {busplanData["31"].departureTimes
                  .slice(0, 4)
                  .map((time, index) => (
                    <div
                      key={index}
                      className="text-2xl flex justify-evenly items-center"
                    >
                      {" "}
                      {/* Added 'flex' and 'items-center' classes */}
                      <p>{time}</p>
                      {index < 3 ? (
                        <Icon as={ArrowRight} w={6} h={6} className="ml-2" />
                      ) : null}{" "}
                      {/* Added margin-left for spacing between text and icon */}
                    </div>
                  ))}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex justify-center">
              <img src={fahrplan31} alt="" className="h-auto w-1/2"></img>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <div className="w-full flex justify-center items-center flex-col">
              <p className="text-4xl">62</p>
              <div className="flex flex-row">
                {busplanData["62"].departureTimes
                  .slice(0, 4)
                  .map((time, index) => (
                    <div key={index} className="mr-8 text-2xl">
                      {time} <Icon as={ArrowRight} w={6} h={6} />
                    </div>
                  ))}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails className="flex flex-row text-black"></AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default Fahrplan;
