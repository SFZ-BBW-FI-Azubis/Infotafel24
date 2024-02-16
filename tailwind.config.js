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
    },

    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      oswald: ['Oswald', 'sans-serif']
    },
  },
  plugins: [],
}

