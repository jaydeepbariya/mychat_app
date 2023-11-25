/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "white":"rgb(255, 255, 255)",
        "black":"rgb(0, 23, 31)",
        "navyBlue":"rgb(0, 52, 89)",
        "lightBlue":"rgb(0, 126, 167)",
        "skyBlue":"rgb(0, 168, 232)",
        "yellow":"rgb(255, 183, 3)",
        "orange":"rgb(251, 133, 0)"
      },
      fontFamily: {
        "mukta":"Mukta, sans-serif"
      }
    }
  
  },
  plugins: [],
}