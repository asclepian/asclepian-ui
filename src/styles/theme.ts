interface ITheme {
    dominant:string,
    secondary: string,
    secondaryDark: string,
    secondaryLight: string,
    accent: string,
    fonts: {
        normal: string,
        bold: string,
        italic: string,
        light: string
    }
};
const theme:ITheme = {
    // dominant: "#FBF8F3",
    dominant:"#edebe6",
    secondary: "#464D78",
    secondaryDark: "#0f1018",
    secondaryLight: "#8695de",
    accent: "#4AB097",
    fonts: {
        normal: 'NexaBook',
        bold: 'NexaHeavy',
        italic: 'NexaBookItalic',
        light: 'NexaThin'
    }
};
export default theme;