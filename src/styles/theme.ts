interface ITheme {
  dominant: string
  secondary: string
  dominantDark: string
  secondaryDark: string
  secondaryLight: string
  accent: string
  roundCornerDiameter: string
  fonts: {
    normal: string
    bold: string
    italic: string
    light: string
  }
}
const theme: ITheme = {
  // dominant: "#FBF8F3",
  dominant: '#edebe6',
  dominantDark: '#d1cfcb',
  secondary: '#464D78',
  secondaryDark: '#363b5c',
  secondaryLight: '#8695de',
  accent: '#4AB097',
  roundCornerDiameter: '1em',
  fonts: {
    normal: 'NexaBook',
    bold: 'NexaHeavy',
    italic: 'NexaBookItalic',
    light: 'NexaThin'
  }
}
export default theme
