const defaultTheme = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "xs": "475px",
      ...defaultTheme.screens
    },      
    extend: {
      fontFamily: {
        domaine: 'Domaine, cursive',
        proxima: 'Proxima-regular, cursive',
        proxbold: 'Proxima-bold, cursive',
        inter: 'Inter, cursive',
      },     
    },
  },
  plugins: [],
}