/** @type {import('tailwindcss').Config} */
export const content = [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
]
export const theme = {
  extend: {
    colors: {
      dominant: '#EFFCFA',
      dominantdark: '#156D62',
      secondary: '#0045d9',
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
}
export const plugins = []
