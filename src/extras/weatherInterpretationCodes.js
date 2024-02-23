// Function to import animated icons dynamically
function importAnimatedIcon(iconName) {
  return import(`../assets/weather/newWeatherIconsAnimated/${iconName}.json`);
}

// Function to import static icons dynamically
function importStaticIcon(iconName) {
  return import(`../assets/weather/staticLogos/${iconName}.svg`);
}


const weatherInterpretationCodes = {
  0: {
    "day":{
      desc: "Sonnig",
      animatedIcon: await importAnimatedIcon('clear-day'),
      staticIcon: await importStaticIcon("sun"),
    },
    "night":{
      desc: "Klarer Himmel",
      animatedIcon: await importAnimatedIcon('clear-night'),
      staticIcon: await importStaticIcon("sun"),
    }
  },
  1: {
    "day":{
      desc: "Hauptsächlich Sonnig",
      animatedIcon: await importAnimatedIcon('haze-day'),
      staticIcon: await importStaticIcon("partly-cloudy"),
    },
    "night":{
      desc: "Hauptsächlich klar",
      animatedIcon: await importAnimatedIcon('haze-night'),
      staticIcon: await importStaticIcon("partly-cloudy"),
    }
  },
  2: {
    "day":{
      desc: "Teilweise bewölkt",
      animatedIcon: await importAnimatedIcon('partly-cloudy-day'),
      staticIcon: await importStaticIcon("partly-cloudy"),
    },
    "night":{
      desc: "Teilweise bewölkt",
      animatedIcon: await importAnimatedIcon('partly-cloudy-night'),
      staticIcon: await importStaticIcon("partly-cloudy"),
    }
  },
  3: {
    "day":{
      desc: "Bedeckt",
      animatedIcon: await importAnimatedIcon('cloudy'),
      staticIcon: await importStaticIcon("cloud"),
    },
    "night":{
      desc: "Bedeckt",
      animatedIcon: await importAnimatedIcon('cloudy'),
      staticIcon: await importStaticIcon("cloud"),
    }
  },
  45: {
    "day":{
      desc: "Nebel",
      animatedIcon: await importAnimatedIcon('fog-day'),
      staticIcon: await importStaticIcon("cloud"),
    },
    "night":{
      desc: "Nebel",
      animatedIcon: await importAnimatedIcon('fog-night'),
      staticIcon: await importStaticIcon("cloud"),
    }
  },
  48: {
    "day":{
      desc: "Rauhreif-Nebel",
      animatedIcon: await importAnimatedIcon('fog-day'),
      staticIcon: await importStaticIcon("cloud"),
    },
    "night":{
      desc: "Rauhreif-Nebel",
      animatedIcon: await importAnimatedIcon('fog-night'),
      staticIcon: await importStaticIcon("cloud"),
    }
  },
  51: {
    "day":{
      desc: "Leichter Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-day-drizzle'),
      staticIcon: await importStaticIcon("light-rain"),
    },
    "night":{
      desc: "Leichter Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-night-drizzle'),
      staticIcon: await importStaticIcon("light-rain"),
    }
  },
  53: {
    "day":{
      desc: "Mäßiger Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-day-hail'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Mäßiger Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-night-hail'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  55: {
    "day":{
      desc: "Starker Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-day-rain'),
      staticIcon: await importStaticIcon("torrential-rain"),
    },
    "night":{
      desc: "Starker Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-night-rain'),
      staticIcon: await importStaticIcon("torrential-rain"),
    }
  },
  56: {
    "day":{
      desc: "Leichter Gefrierender Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-day-drizzle'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Leichter Gefrierender Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-night-drizzle'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  57: {
    "day":{
      desc: "Starker Gefrierender Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-day-rain'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Starker Gefrierender Nieselregen",
      animatedIcon: await importAnimatedIcon('overcast-night-rain'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  61: {
    "day":{
      desc: "Leichter Regen",
      animatedIcon: await importAnimatedIcon('overcast-day-rain'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Leichter Regen",
      animatedIcon: await importAnimatedIcon('overcast-night-rain'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  63: {
    "day":{
      desc: "Mäßiger Regen",
      animatedIcon: await importAnimatedIcon('overcast-day-rain'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Mäßiger Regen",
      animatedIcon: await importAnimatedIcon('overcast-night-rain'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  65: {
    "day":{
      desc: "Starker Regen",
      animatedIcon: await importAnimatedIcon('overcast-day-rain'),
      staticIcon: await importStaticIcon("storm"),
    },
    "night":{
      desc: "Starker Regen",
      animatedIcon: await importAnimatedIcon('overcast-night-rain'),
      staticIcon: await importStaticIcon("storm"),
    }
  },
  66: {
    "day":{
      desc: "Leichter Gefrierender Regen",
      animatedIcon: await importAnimatedIcon('overcast-day-sleet'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Leichter Gefrierender Regen",
      animatedIcon: await importAnimatedIcon('overcast-night-sleet'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  67: {
    "day":{
      desc: "Starker Gefrierender Regen",
      animatedIcon: await importAnimatedIcon('overcast-day-sleet'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Starker Gefrierender Regen",
      animatedIcon: await importAnimatedIcon('overcast-night-sleet'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  71: {
    "day":{
      desc: "Leichter Schneefall",
      animatedIcon: await importAnimatedIcon('overcast-day-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    },
    "night":{
      desc: "Leichter Schneefall",
      animatedIcon: await importAnimatedIcon('overcast-night-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    }
  },
  73: {
    "day":{
      desc: "Mäßiger Schneefall",
      animatedIcon: await importAnimatedIcon('overcast-day-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    },
    "night":{
      desc: "Mäßiger Schneefall",
      animatedIcon: await importAnimatedIcon('overcast-night-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    }
  },
  75: {
    "day":{ 
      desc: "Starker Schneefall",
      animatedIcon: await importAnimatedIcon('overcast-day-snow'),
      staticIcon: await importStaticIcon("snow-storm"),
    },
    "night":{
      desc: "Starker Schneefall",
      animatedIcon: await importAnimatedIcon('overcast-night-snow'),
      staticIcon: await importStaticIcon("snow-storm"),
    }
  },
  77: {
    "day":{
      desc: "Schneekörner",
      animatedIcon: await importAnimatedIcon('overcast-day-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    },
    "night":{
      desc: "Schneekörner",
      animatedIcon: await importAnimatedIcon('overcast-night-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    }
  },
  80: {
    "day":{
      desc: "Leichte Regenschauer",
      animatedIcon: await importAnimatedIcon('overcast-day-drizzle'),
      staticIcon: await importStaticIcon("light-rain"),
    },
    "night":{
      desc: "Leichte Regenschauer",
      animatedIcon: await importAnimatedIcon('overcast-night-drizzle'),
      staticIcon: await importStaticIcon("light-rain"),
    }
  },
  81: {
    "day":{
      desc: "Mäßige Regenschauer",
      animatedIcon: await importAnimatedIcon('overcast-day-rain'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Mäßige Regenschauer",
      animatedIcon: await importAnimatedIcon('overcast-night-rain'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  82: {
    "day":{
      desc: "Heftige Regenschauer",
      animatedIcon: await importAnimatedIcon('overcast-day-rain'),
      staticIcon: await importStaticIcon("rain"),
    },
    "night":{
      desc: "Heftige Regenschauer",
      animatedIcon: await importAnimatedIcon('overcast-night-rain'),
      staticIcon: await importStaticIcon("rain"),
    }
  },
  85: {
    "day":{
      desc: "Leichte Schneeschauer",
      animatedIcon: await importAnimatedIcon('overcast-day-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    },
    "night":{
      desc: "Leichte Schneeschauer",
      animatedIcon: await importAnimatedIcon('overcast-night-snow'),
      staticIcon: await importStaticIcon("light-snow"),
    }
  },
  86: {
    "day":{
      desc: "Starker Schneeschauer",
      animatedIcon: await importAnimatedIcon('overcast-day-snow'),
      staticIcon: await importStaticIcon("snow-storm"),
    },
    "night":{
      desc: "Starker Schneeschauer",
      animatedIcon: await importAnimatedIcon('overcast-night-snow'),
      staticIcon: await importStaticIcon("snow-storm"),
    }
  },
  95: {
    "day":{
      desc: "Leichtes Gewitter",
      animatedIcon: await importAnimatedIcon('thunderstorms-day-overcast'),
      staticIcon: await importStaticIcon("cloud-lightning"),
    },
    "night":{
      desc: "Leichtes Gewitter",
      animatedIcon: await importAnimatedIcon('thunderstorms-night-overcast'),
      staticIcon: await importStaticIcon("cloud-lightning"),
    }
  },
  96: {
    "day":{
      desc: "Gewitter mit leichtem Hagel",
      animatedIcon: await importAnimatedIcon('thunderstorms-day-rain'),
      staticIcon: await importStaticIcon("cloud-lightning"),
    },
    "night":{
      desc: "Gewitter mit leichtem Hagel",
      animatedIcon: await importAnimatedIcon('thunderstorms-night-rain'),
      staticIcon: await importStaticIcon("cloud-lightning"),
    }
  },
  99: {
    "day":{
      desc: "Gewitter mit schwerem Hagel",
      animatedIcon: await importAnimatedIcon('thunderstorms-day-extreme-rain'),
      staticIcon: await importStaticIcon("cloud-lightning"),
    },
    "night":{
      desc: "Gewitter mit schwerem Hagel",
      animatedIcon: await importAnimatedIcon('thunderstorms-night-extreme-rain'),
      staticIcon: await importStaticIcon("cloud-lightning"),
    }
  }
};


/*const weatherInterpretationCodes = {




  1: { desc: 'Hauptsächlich klar', animatedIcon: haze, staticIcon: "partly-cloudy" },
  2: { desc: 'Teilweise bewölkt', animatedIcon: partlyCloudy, staticIcon: "partly-cloudy" },
  3: { desc: 'Bedeckt', animatedIcon: cloud, staticIcon: "cloud" },
  45: { desc: 'Nebel', animatedIcon: fog, staticIcon: "cloud" },
  48: { desc: 'Rauhreif-Nebel', animatedIcon: fog, staticIcon: "cloud" },
  51: { desc: 'Leichter Nieselregen', animatedIcon: lightRain, staticIcon: "light-rain" },
  53: { desc: 'Mäßiger Nieselregen', animatedIcon: rain, staticIcon: "rain" },
  55: { desc: 'Starker Nieselregen', animatedIcon: torrentialRain, staticIcon: "torrential-rain" },
  56: { desc: 'Leichter Gefrierender Nieselregen', animatedIcon: rain, staticIcon: "rain" },
  57: { desc: 'Starker Gefrierender Nieselregen', animatedIcon: rain, staticIcon: "rain" },
  61: { desc: 'Leichter Regen', animatedIcon: rain, staticIcon: "rain" },
  63: { desc: 'Mäßiger Regen', animatedIcon: rain, staticIcon: "rain" },
  65: { desc: 'Starker Regen', animatedIcon: storm, staticIcon: "storm" },
  66: { desc: 'Leichter Gefrierender Regen', animatedIcon: rain, staticIcon: "rain" },
  67: { desc: 'Starker Gefrierender Regen', animatedIcon: rain, staticIcon: "rain" },
  71: { desc: 'Leichter Schneefall', animatedIcon: lightSnow, staticIcon: "light-snow" },
  73: { desc: 'Mäßiger Schneefall', animatedIcon: lightSnow, staticIcon: "light-snow" },
  75: { desc: 'Starker Schneefall', animatedIcon: snowStorm, staticIcon: "snow-storm" },
  77: { desc: 'Schneekörner', animatedIcon: lightSnow, staticIcon: "light-snow" },
  80: { desc: 'Leichte Regenschauer', animatedIcon: lightRain, staticIcon: "light-rain" },
  81: { desc: 'Mäßige Regenschauer', animatedIcon: rain, staticIcon: "rain" },
  82: { desc: 'Heftige Regenschauer', animatedIcon: rain, staticIcon: "rain" },
  85: { desc: 'Leichte Schneeschauer', animatedIcon: lightSnow, staticIcon: "light-snow" },
  86: { desc: 'Starker Schneeschauer', animatedIcon: snowStorm, staticIcon: "snow-storm" },
  95: { desc: 'Leichtes Gewitter', animatedIcon: lightningBolt, staticIcon: "cloud-lightning" },
  96: { desc: 'Gewitter mit leichtem Hagel', animatedIcon: cloudLightning, staticIcon: "cloud-lightning" },
  99: { desc: 'Gewitter mit schwerem Hagel', animatedIcon: cloudLightning, staticIcon: "cloud-lightning" },
};
*/

export default weatherInterpretationCodes;