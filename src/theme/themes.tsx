import blue from "./blue";
import ink from "./ink";
import white from "./white";

export const THEME_SUPPORT = {
  LIGHT: "light",
  DARK: "dark",
};

export default {
  dark: {
    dark: true,
    colors: {
      primary: blue.BLUE100,
      background: ink.INK100,
      card: white.WHITE100,
      text: white.WHITE100,
      border: ink.INK10,
      gray: ink.INK60,
      backgroundLight: ink.INK80,

      //new theme colors
    },
  },
  light: {
    dark: false,
    colors: {
      primary: blue.BLUE100,
      background: white.WHITE100,
      card: ink.INK100,
      text: ink.INK100,
      border: ink.INK40,
      gray: ink.INK60,
      backgroundLight: ink.INK10,

      //new theme colors
    },
  },
};
