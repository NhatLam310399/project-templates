import { createTheme } from "@material-ui/core";

export const defaultMaterialTheme = createTheme({
    palette: {
        primary: {
            light: "#351568",
            main: "#351568",
            dark: "#351568",
        },
        success: {
            light: "#3988ff",
            main: "#3988ff",
            dark: "#3988ff",
        },
        warning: {
            light: "#f88f01",
            main: "#f88f01",
            dark: "#f88f01",
        },
        error: {
            light: "#c72c41",
            main: "#c72c41",
            dark: "#c72c41",
        },
    },
    typography: {
        fontFamily: [
            "-apple-system",
            "SF-Pro-Text",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});
