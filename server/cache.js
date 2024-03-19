const express = require("express");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();
const PORT = 8000;

const latitude = 50.84310553905255;
const longitude = 12.875960703035425;


app.use(cors());


const CACHE_FILE_BUSPLAN = path.join(__dirname, "busplan_cache.json");
const CACHE_FILE_MEALPLAN = path.join(__dirname, "mealplan_cache.json");
const CACHE_FILE_WEATHER = path.join(__dirname, "weather_cache.json");

// full api link
// https://api.open-meteo.com/v1/dwd-icon?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloud_cover,apparent_temperature,rain,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,wind_speed_10m_max&&hourly=temperature_2m,rain,weather_code&forecast_days=3&timeformat=unixtime&timezone=Europe%2FBerlin
// full api link
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime


//#region [rgba(90,155,243,0.1)] WEATHER DATA
// Function to fetch current weather data from the online API

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,rain,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timeformat=unixtime`,
    )
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}



const isTimestampExpired = (timestamp, expirationTime) => {
  //Time in Minutes
  return Date.now() - timestamp >= expirationTime * 60 * 1000;
}

app.get("/cache/weather", async (req, res) => {
  try {

    if (fs.existsSync(CACHE_FILE_WEATHER)) {
      const cachedData = JSON.parse(
        fs.readFileSync(CACHE_FILE_WEATHER, "utf8")
      )
      if (!isTimestampExpired(cachedData.timestamp, 5)) {
        res.json(cachedData.data);
        return;
      }
    }
    let data = await fetchWeatherData();
    let timestamp = Date.now();
    const cacheData = { data, timestamp };
    fs.writeFileSync(CACHE_FILE_WEATHER, JSON.stringify(cacheData));
    res.json(data);

  } catch(error) {
    res.status(500).send("Failed to retrieve weather data");
  }
})
//#endregion

//#region [rgba(255, 222, 0, 0.1)] FAHRPLAN DATA



// FAHRPLAN
async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching HTML:", error);
    throw error;
  }
}

function parseHTML(html) {
  const $ = cheerio.load(html);
  const data = [];
  $("div.std3_departure-line").each((index, element) => {
    const lineNr = $(element)
      .find(".std3_dm-mot-info a")
      .text()
      .trim()
      .replace(/[^0-9]/g, "")
      .substring(2, 0);
    const desc = $(element)
      .find(".std3_dm-mot-info")
      .text()
      .trim()
      .replace("Stadtbus", "")
      .replace(/\d+/g, "");
    const time = $(element).find(".std3_dm-time:first").text().trim();
    const realtime = $(element).find(".std3_realtime-column").text().trim();
    const existingEntryIndex = data.findIndex(
      (entry) => entry.lineNr === lineNr && entry.desc === desc
    );

    if (existingEntryIndex !== -1) {
      if (!realtime) {
        data[existingEntryIndex].times.push({ time });
      } else {
        data[existingEntryIndex].times.push({ time, realtime });
      }
    } else {
      if (!realtime) {
        data.push({ lineNr, desc, times: [{ time }] });
      } else {
        data.push({ lineNr, desc, times: [{ time, realtime }] });
      }
    }
    console.log(data);
  });

  return data;
}

function formatBusData(parsedData) {
  const busData = {};
  parsedData.forEach((entry) => {
    const { lineNr, desc, times } = entry;
    const departureTimes = times.map((timeObj) => timeObj.time);
    const realTimes = times.map((timeObj) => timeObj.realtime);
    busData[lineNr.trim()] = { desc: desc.trim(), departureTimes, realTimes };
  });
  return busData;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}.${month}.${year}`;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}%3A${minutes}`;
}

app.get("/cache/busplan", async (req, res) => {
  const baseUrl = "https://efa.vvo-online.de/VMSSL3/XSLT_DM_REQUEST";
  const currentDate = new Date();
  const url = `${baseUrl}?language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=dm&itdLPxx_contractor=&std3_contractorMacro=&includeCompleteStopSeq=1&mergeDep=1&mode=direct&useRealtime=1&name_dm=Chemnitz%2C+Flemmingstr&nameInfo_dm=36030194&type_dm=any&itdDateDayMonthYear=${formatDate(
    currentDate
  )}&itdTime=${formatTime(
    currentDate
  )}&itdDateTimeDepArr=dep&includedMeans=checkbox&itdLPxx_ptActive=on&useRealtime=1&inclMOT_0=true&inclMOT_1=true&inclMOT_2=true&inclMOT_3=true&inclMOT_4=true&inclMOT_5=true&inclMOT_6=true&inclMOT_7=true&inclMOT_8=true&inclMOT_9=true&inclMOT_10=true&inclMOT_17=true&inclMOT_19=true&imparedOptionsActive=1&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]`;

  try {
    if (fs.existsSync(CACHE_FILE_BUSPLAN)) {
      const cachedData = JSON.parse(
        fs.readFileSync(CACHE_FILE_BUSPLAN, "utf8")
      );
      //console.log(cachedData)
      if (!isTimestampExpired(cachedData.timestamp, 1)) {
        res.json(cachedData);
        return;
      }
    }
    const html = await fetchHTML(url);
    const timestamp = Date.now();
    const parsedData = parseHTML(html);
    const busData = formatBusData(parsedData);
    const cacheData = { timestamp, busData };
    fs.writeFileSync(CACHE_FILE_BUSPLAN, JSON.stringify(cacheData));
    res.json(cacheData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//#endregion

//#region [rgba(255, 0, 222, 0.1)] FOOD DATA
async function parseFoodHTML(html) {
  const $ = cheerio.load(html);
  const daysOfWeek = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
  const data = [];
  $("div.speiseplan-lang .kw.slide:first").each((index, element) => {
    let i = 2;
    daysOfWeek.forEach((day) => {
      const dayData = $(element).find(`div:contains(${day})`);
      const meals = { menus: { menuName: [], alergenes: [] }, soup: { soupName: [], alergens: [] } };
      const date = $(element).find(`.col${i}.row1 span`).text().trim().replace(/\s\s+/g, " ");

      for (let j = 2; j <= 6; j++) {
        const meal = $(element).find(`.col${i}.row${j} p.gericht`).text().trim().replace(/\s\s+/g, " ");
        const menuParts = meal.split("/");

        if (menuParts.length > 1) {
          if (j === 2) {
            meals.soup.soupName.push(menuParts[0].trim());
            meals.soup.alergens.push(menuParts[1].trim());

          } else {
            meals.menus.menuName.push(menuParts[0].trim());
            meals.menus.alergenes.push(menuParts[1].trim());
          }
        }
      }
      data.push({ date, meals });
      i++;
    });
  });

  return data;
}

function getWeekNumber(date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
}

app.get("/cache/food", async (req, res) => {
  try {
    if (fs.existsSync(CACHE_FILE_MEALPLAN)) {
      const cachedData = JSON.parse(
        fs.readFileSync(CACHE_FILE_MEALPLAN, "utf8")
      );
      res.json(cachedData);
      return;
    }
    const date = new Date();
    const token = "k1biqe1x82qxr62ossx0dvfs0ycxgeo3";
    const year = date.getFullYear();
    const week = getWeekNumber(date);

    try {
      console.log("Fetching speiseplan data...");
      const response = await axios.get(
        `https://www.kantine-chemnitz.de/speiseplan.html`,
      );
      const parsedFooddata = await parseFoodHTML(response.data);

      const timestamp = Date.now();
      const cacheData = { parsedFooddata, timestamp };
      fs.writeFileSync(CACHE_FILE_MEALPLAN, JSON.stringify(cacheData));

      res.json(parsedFooddata);
    } catch (error) {
      console.error("Error fetching speiseplan data:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//#endregion





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
