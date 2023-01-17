/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dominant: '#EFFCFA', // Cosmic Latte  #EFFCFA
        dominantdark: '#156D62',
        secondary: '#0045d9', // Blue #0045d9  purple #453C67
        accent: '#46c2cb',
        light: '#f7fefd',
        dark: '#072521',
        sucess: '#00A322',
        danger: '#A32200'
      },
      fontFamily: {
        handfont: ['handfont']
      }
    }
  },
  plugins: []
}
