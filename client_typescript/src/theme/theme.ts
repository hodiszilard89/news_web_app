import { theme as chakraTheme, extendTheme } from "@chakra-ui/react";
import "@fontsource/montserrat";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/900.css";

import * as components from "./components";
import { transparentize } from "./utils/transparentize";

const colors = {
  gray: {
    200: "#979797",
    400: "#606060",
    500: "#555555",
    600: "#424242",
    700: "#323232",
    900: "#232323",
    1000: "#080707",
  },
  red: {
    500: "#F65261",
  },
};

const colorTokens = {
  background: {
    default: colors.gray["500"],
    hover: colors.red["500"],
    medium: colors.gray["600"],
    dark: colors.gray["900"]
  },
  border: {
    default: colors.gray["200"],
    highlighted: colors.red["500"],
  },
  text: {
    default: chakraTheme.colors.white,
    highlighted: colors.red["500"],
  },
  interactive: {
    button: {
      default: chakraTheme.colors.white,
      secondary: colors.red["500"],
      background: {
        default: colors.red["500"],
        secondary: transparentize(colors.gray["400"], 68),
      },
    },
    input: {
      background: {
        default: transparentize(colors.gray["700"], 94.8),
        dark: transparentize(colors.gray["700"], 80),
      },
      dropdown: transparentize(colors.gray["900"], 91.81),
      placeholder: transparentize(chakraTheme.colors.white, 30),
    },
  },
};

const fonts = {
  body: "Montserrat"
};

const styles = {
  global: {
    body: {
      backgroundColor: "gray.500",
      color: "black",
      height: "100vh",
      paddingY: 12,
    },
    "#root": {
      height: "100%"
    }
  }  
};

export const theme = extendTheme({
  components: {
    ...chakraTheme.components,
    ...components,
  },
  colors: {
    ...colors,
    ...colorTokens,
  },
  fonts,
  styles,
});
