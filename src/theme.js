import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { Lato } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const lato = Lato({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FF3524",
    },
    secondary: {
      main: "#479696",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: lato.style.fontFamily,
  },
});

export default theme;
