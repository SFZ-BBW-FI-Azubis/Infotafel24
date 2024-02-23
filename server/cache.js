const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');

const app = express();
const PORT = 8000;

/*const latitude = 64.78689907427604
const longitude = -46.8052011398324*/

const latitude = 50.84310553905255 
const longitude = 12.875960703035425



app.use(cors());

const CACHE_FILE_CURRENT_WEATHER = path.join(__dirname, 'current_weather_cache.json');
const CACHE_FILE_FORECAST = path.join(__dirname, 'forecast_cache.json');
const CACHE_FILE_HOURLY_FORECAST = path.join(__dirname, 'hourly_forecast_cache.json');
const CACHE_FILE_BUSPLAN = path.join(__dirname, 'busplan_cache.json');

// Function to fetch current weather data from the online API
const fetchCurrentWeatherData = async () => {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/dwd-icon?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,cloud_cover,apparent_temperature,rain,weather_code,wind_speed_10m,wind_direction_10m&timeformat=unixtime&timezone=Europe%2FBerlin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    throw error;
  }
};

// Function to fetch forecast data from the online API
const fetchForecastData = async () => {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,wind_speed_10m_max&timeformat=unixtime&timezone=Europe%2FBerlin`);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};

const fetchHourlyForecastData = async () => {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,weather_code&timeformat=unixtime&timezone=Europe%2FBerlin&forecast_days=3`)
    return response.data;
  } catch (error) {
    console.error('Error fetching hourly forecast data:', error);
    throw error;
  }
}

// Function to check if the cached data for current weather is expired (5 minutes)
const isCurrentWeatherCacheExpired = (timestamp) => {
  return Date.now() - timestamp >= 5 * 60 * 1000;
};

const isHourlyForecastCacheExpired = (timestamp) => {
  return Date.now() - timestamp >= 60 * 60 * 1000;
}

// Function to check if the cached data for forecast is expired (every day at 00:00:00)
const isForecastCacheExpired = (timestamp) => {
  const currentDate = new Date();
  const midnight = new Date(currentDate);
  midnight.setHours(24, 0, 0, 0);
  return currentDate >= midnight || Date.now() - timestamp >= midnight - currentDate;
};

// Endpoint to update current weather data
app.get('/update/current_weather', async (req, res) => {
  try {
    let data;
    let timestamp;
    if (fs.existsSync(CACHE_FILE_CURRENT_WEATHER)) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_CURRENT_WEATHER, 'utf8'));
      if (!isCurrentWeatherCacheExpired(cachedData.timestamp)) {
        // Return cached data if not expired
        res.json(cachedData.data);
        return;
      }
    }
    // Fetch new data from the online API
    data = await fetchCurrentWeatherData();
    timestamp = Date.now();
    const cacheData = { data, timestamp };
    fs.writeFileSync(CACHE_FILE_CURRENT_WEATHER, JSON.stringify(cacheData));
    res.json(data);
  } catch (error) {
    res.status(500).send('Failed to update current weather data');
  }
});

// Endpoint to update forecast data
app.get('/update/forecast', async (req, res) => {
  try {
    let data;
    let timestamp;
    if (fs.existsSync(CACHE_FILE_FORECAST)) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_FORECAST, 'utf8'));
      if (!isForecastCacheExpired(cachedData.timestamp)) {
        // Return cached data if not expired
        res.json(cachedData.data);
        return;
      }
    }
    // Fetch new data from the online API
    data = await fetchForecastData();
    timestamp = Date.now();
    const cacheData = { data, timestamp };
    fs.writeFileSync(CACHE_FILE_FORECAST, JSON.stringify(cacheData));
    res.json(data);
  } catch (error) {
    res.status(500).send('Failed to update forecast data');
  }
});

// Endpoint to retrieve current weather data from the JSON file
app.get('/cache/current_weather', async (req, res) => {
    try {
      if (fs.existsSync(CACHE_FILE_CURRENT_WEATHER)) {
        const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_CURRENT_WEATHER, 'utf8'));
        if (!isCurrentWeatherCacheExpired(cachedData.timestamp)) {
          // Return cached data if not expired
          res.json(cachedData.data);
          return;
        }
      }
      // Fetch new data from the online API if cache is expired or missing
      const data = await fetchCurrentWeatherData();
      const timestamp = Date.now();
      const cacheData = { data, timestamp };
      fs.writeFileSync(CACHE_FILE_CURRENT_WEATHER, JSON.stringify(cacheData));
      res.json(data);
    } catch (error) {
      res.status(500).send('Failed to retrieve current weather data');
    }
  });

  app.get('/cache/hourly_forecast', async (req, res) => {
    try {
      if (fs.existsSync(CACHE_FILE_HOURLY_FORECAST)) {
        const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_HOURLY_FORECAST, 'utf8'));
        if (!isHourlyForecastCacheExpired(cachedData.timestamp)) {
          // Return cached data if not expired
          res.json(cachedData.data);
          return;
        }
      }
        // Fetch new data from the online API if cache is expired or missing
      const data = await fetchHourlyForecastData();
      const timestamp = Date.now();
      const cacheData = { data, timestamp };
      fs.writeFileSync(CACHE_FILE_HOURLY_FORECAST, JSON.stringify(cacheData));
      res.json(data);
    } catch (error) {
      res.status(500).send('Failed to retrieve hourly forecast data');
    }
  })
  

  app.get('/cache/forecast', async (req, res) => {
    try {
      if (fs.existsSync(CACHE_FILE_FORECAST)) {
        const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_FORECAST, 'utf8'));
        if (!isForecastCacheExpired(cachedData.timestamp)) {
          // Return cached data if not expired
          res.json(cachedData.data);
          return;
        }
      }
      // Fetch new data from the online API if cache is expired or missing
      const data = await fetchForecastData();
      const timestamp = Date.now();
      const cacheData = { data, timestamp };
      fs.writeFileSync(CACHE_FILE_FORECAST, JSON.stringify(cacheData));
      res.json(data);
    } catch (error) {
      res.status(500).send('Failed to retrieve forecast data');
    }
  });















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
    const lineNr = $(element).find(".std3_dm-mot-info a").text().trim().replace(/[^0-9]/g, '').substring(2, 0)
    const desc = $(element).find(".std3_dm-mot-info").text().trim().replace("Stadtbus", "").replace(/\d+/g, '');
    const time = $(element).find(".std3_dm-time:first").text().trim();
    const realtime = $(element).find(".std3_realtime-column").text().trim();
    //const timestamp = new Date(`${new Date().toLocaleDateString()} ${time}`).getTime();
    // Check if the combination of lineNr and desc already exists in data array
    const existingEntryIndex = data.findIndex(entry => entry.lineNr === lineNr && entry.desc === desc);

    if (existingEntryIndex !== -1) {
      // If combination exists, push time and realtime to its array
      data[existingEntryIndex].times.push({ time, realtime });
    } else {
      // If combination does not exist, create a new entry
      data.push({ lineNr, desc, times: [{ time, realtime }] });
    }
  });
  //console.log("Parsed data:", data)
  return data;
}

function formatBusData(parsedData) {
  const busData = {};
  parsedData.forEach(entry => {
    const { lineNr, desc, times } = entry;
    const departureTimes = times.map(timeObj => timeObj.time);
    const realTimes = times.map(timeObj => timeObj.realtime);
    busData[lineNr.trim()] = { desc: desc.trim(), departureTimes, realTimes };
  });
  return busData;
}


function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}.${month}.${year}`;
}

function formatTime(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}%3A${minutes}`;
}

app.get('/cache/busplan', async (req, res) => {
  const baseUrl = "https://efa.vvo-online.de/VMSSL3/XSLT_DM_REQUEST";
  const currentDate = new Date();
  const url = `${baseUrl}?language=de&std3_suggestMacro=std3_suggest&std3_commonMacro=dm&itdLPxx_contractor=&std3_contractorMacro=&includeCompleteStopSeq=1&mergeDep=1&mode=direct&useRealtime=1&name_dm=Chemnitz%2C+Flemmingstr&nameInfo_dm=36030194&type_dm=any&itdDateDayMonthYear=${formatDate(currentDate)}&itdTime=${formatTime(currentDate)}&itdDateTimeDepArr=dep&includedMeans=checkbox&itdLPxx_ptActive=on&useRealtime=1&inclMOT_0=true&inclMOT_1=true&inclMOT_2=true&inclMOT_3=true&inclMOT_4=true&inclMOT_5=true&inclMOT_6=true&inclMOT_7=true&inclMOT_8=true&inclMOT_9=true&inclMOT_10=true&inclMOT_17=true&inclMOT_19=true&imparedOptionsActive=1&sessionID=0&requestID=0&itdLPxx_directRequest=1&coordOutputFormat=WGS84[dd.ddddd]`;

  try {
    if (fs.existsSync(CACHE_FILE_BUSPLAN)) {
      const cachedData = JSON.parse(fs.readFileSync(CACHE_FILE_BUSPLAN, 'utf8'));
      const busKeys = Object.keys(cachedData.busData)
      //console.log("Cached data:", cachedData.busData["31"].departureTimes[0]);

      const anyBusDepart = busKeys.some(key => {
        const entry = cachedData.busData[key];
        const departureTime = new Date(`${currentDate.toDateString()} ${entry.departureTimes[0]}`).getTime();
        console.log("Departure time:", departureTime - currentDate.getTime() >= 60 * 1000);
        if (currentDate.getTime() - departureTime[0] >= 60 * 1000) {
          console.log("Bus already departed:", entry);
        }
        //console.log(departureTime, currentDate.getTime())
        return departureTime - currentDate.getTime() >= 60 * 1000
      })

      if (!anyBusDepart ) {
        // Return cached data if not expired
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
  

app.get('/cache/food', async (req, res) => {
  const token = "bxe9h5h013rp29vcz1jbjkst7fwnqupl"
  try {
    console.log("Fetching speiseplan data...")
    const response = await axios.get("https://www.besser-verpflegt.de/kunden/essen/2024/8/", {
      headers: {
        "Cookie": `sessionid=${token}`
      }
    });


    console.log("Response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching speiseplan data:", error);
    throw error;
  }
});



/*function execute() {
  return gapi.client.search.cse.list({
    "cx": "b36d8eb65f0024130",
    "imgType": "photo",
    "num": 5,
    "q": "Julian Scheibel",
    "searchType": "image"
  })*/


// Google JSON Search API: AIzaSyDPerw4_0S1-qOjJBL8LAurFqbjR0xSJZM




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
