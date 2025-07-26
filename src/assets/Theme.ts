import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0056A2"
    },
    secondary: {
      main: "#ff0000",
    },
    background: {
      default: "#d9d9d9",
      paper: "#ffffff",
    },
  },
  typography: {
    //fontFamily: "Inter, Sarabun, Poppins, sans-serif",
    h1: {
      fontFamily: "Sarabun, sans-serif",
    },
    h2: {
      fontFamily: "Sarabun, sans-serif",
    },
    body1: {
      fontFamily: "Inter, sans-serif",
    },
    body2: {
      fontFamily: "Poppins, sans-serif",
    },
  },
});

export default theme;
