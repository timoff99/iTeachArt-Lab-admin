import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: ["Nunito"].join(","),
    fontWeightMedium: 600,
    h2: {
      fontSize: 26,
    },
    h3: {
      fontSize: 22,
    },
    h4: {
      fontSize: 20,
    },
    h5: {
      fontSize: 18,
    },
  },
  palette: {
    primary: {
      main: "#FFBC01",
    },
    success: {
      main: "#00E343",
    },
    warning: {
      main: "#FBB500",
    },
    error: {
      main: "#F70202",
    },
  },
});
