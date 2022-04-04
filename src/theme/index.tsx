import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    fontSizeArr: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    fontSizeArr?: PaletteOptions["primary"];
  }
}
export const theme = createTheme({
  typography: {
    fontFamily: ["Nunito"].join(","),
    fontWeightMedium: 600,
    h1: {
      fontSize: 53,
    },
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
