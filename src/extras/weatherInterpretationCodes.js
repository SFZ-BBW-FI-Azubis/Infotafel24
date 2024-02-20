
// Animated Icons

//Sun
import sun from "../assets/weather/animatedLogos/sun.json";
import haze from "../assets/weather/animatedLogos/haze.json";
import windyWeather from "../assets/weather/animatedLogos/windy-weather.json";
import lightningBolt from "../assets/weather/animatedLogos/lightning-bolt.json";

//Clouds
import partlyCloudy from "../assets/weather/animatedLogos/partly-cloudy-day.json";
import cloud from "../assets/weather/animatedLogos/cloud.json";
import cloudLightning from "../assets/weather/animatedLogos/cloud-lightning.json";


//Rain
import rainCloud from "../assets/weather/animatedLogos/rain-cloud.json";
import storm from "../assets/weather/animatedLogos/storm.json";
import rain from "../assets/weather/animatedLogos/rain.json";
import lightRain from "../assets/weather/animatedLogos/light-rain.json";
import torrentialRain from "../assets/weather/animatedLogos/torrential-rain.json";
//Snow
import snowStorm from "../assets/weather/animatedLogos/snow-storm.json";
import lightSnow from "../assets/weather/animatedLogos/light-snow.json";
//Fog
import fog from "../assets/weather/animatedLogos/fog.json";



const weatherInterpretationCodes = {
  0: { desc: 'Klarer Himmel', animatedIcon: sun },
  1: { desc: 'Hauptsächlich klar', animatedIcon: haze },
  2: { desc: 'Teilweise bewölkt', animatedIcon: partlyCloudy },
  3: { desc: 'Bedeckt', animatedIcon: cloud },
  45: { desc: 'Nebel', animatedIcon: fog },
  48: { desc: 'Rauhreif-Nebel', animatedIcon: fog },
  51: { desc: 'Leichter Nieselregen', animatedIcon: lightRain },
  53: { desc: 'Mäßiger Nieselregen', animatedIcon: rain },
  55: { desc: 'Starker Nieselregen', animatedIcon: torrentialRain },
  56: { desc: 'Leichter Gefrierender Nieselregen', animatedIcon: rain },
  57: { desc: 'Starker Gefrierender Nieselregen', animatedIcon: rain },
  61: { desc: 'Leichter Regen', animatedIcon: rain },
  63: { desc: 'Mäßiger Regen', animatedIcon: rain },
  65: { desc: 'Starker Regen', animatedIcon: storm },
  66: { desc: 'Leichter Gefrierender Regen', animatedIcon: rain },
  67: { desc: 'Starker Gefrierender Regen', animatedIcon: rain },
  71: { desc: 'Leichter Schneefall', animatedIcon: lightSnow },
  73: { desc: 'Mäßiger Schneefall', animatedIcon: lightSnow },
  75: { desc: 'Starker Schneefall', animatedIcon: snowStorm },
  77: { desc: 'Schneekörner', animatedIcon: lightSnow },
  80: { desc: 'Leichte Regenschauer', animatedIcon: lightRain },
  81: { desc: 'Mäßige Regenschauer', animatedIcon: rain },
  82: { desc: 'Heftige Regenschauer', animatedIcon: rain },
  85: { desc: 'Leichte Schneeschauer', animatedIcon: lightSnow },
  86: { desc: 'Starker Schneeschauer', animatedIcon: snowStorm },
  95: { desc: 'Leichtes Gewitter', animatedIcon: lightningBolt },
  96: { desc: 'Gewitter mit leichtem Hagel', animatedIcon: cloudLightning },
  99: { desc: 'Gewitter mit schwerem Hagel', animatedIcon: cloudLightning },
};



export default weatherInterpretationCodes;
