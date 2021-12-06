import { createMuiTheme } from "@material-ui/core";

export const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#334b89",
      main: "#001E6C",
      dark: "#00154b",
    },
    success: {
      light: "#4baaef",
      main: "#1E95EB",
      dark: "#1568a4",
    },
    info: {
      light: "#339b6f",
      main: "#00834C",
      dark: "#005b35",
    },
    warning: {
      light: "#f8a94b",
      main: "#F88F01",
      dark: "#ac6715",
    },
    error: {
      light: "#da3733",
      main: "#C72C41",
      dark: "#920400",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "SVN-Gilroy",
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
