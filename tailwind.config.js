/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dominant: '#f2f7a1',
        dominantdark: '#7a8200',
        secondary: '#453C67',
        accent: '#46c2cb',
        light: '#FDFFDA',
        dark: '#3e4200',
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
