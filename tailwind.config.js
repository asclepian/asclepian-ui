/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        dominant: '#edebe6',
        dominantdark: '#696866',
        accent: '#00B8CD',
        secondary: '#7B00CD',
        light: '#edebe6',
        dark: '#696866',
        sucess: '#52CD00',
        danger: '#CD1500',
        secondarydark: '#363b5c',
        secondarylight: '#8695de'
      }
    }
  },
  plugins: []
}
