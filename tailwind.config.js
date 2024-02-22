/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       'background1': '#14213d',
       'background2': '#000000',
       'primary': '#ffffff',
       'secondary': '#e5e5e5',
       'accent': '#ffc107',
       'site-background': '#222222',
      },
      backgroundImage: {
        'news-it' : 'url("./assets/news/bgnewsit.jpg")',
        'news-gardening' : 'url("./assets/news/bgnewsgardening.jpg")',
        'schoolplane' : 'url("./assets/schoolplan/bgschoolplan.jpg")',
        'foodplan' : 'url("./assets/food/bgfood.jpg")',
        'weather-day' : 'url("./assets/weather/bgweatherday.jpg")',
        'weather-night' : 'url("./assets/weather/bgweathernight.jpg")',
        'weather-stars' : 'url("./assets/stars.jpg")',
        'weather-day': 'url("./assets/weather/bgweatherday.jpg")',
      }
    },

    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      oswald: ['Oswald', 'sans-serif']
    },
  },
  plugins: [],
}

