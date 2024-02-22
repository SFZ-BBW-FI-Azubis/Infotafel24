const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

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
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
