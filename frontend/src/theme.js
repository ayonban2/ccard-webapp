import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "#181818",
        color: "goldenrod",
      },
    },
  },
  colors: {
    gold: {
      500: "#FFD700",
    },
    goldenrod: "#FFD700",
    black: "#181818",
    gray: {
      200: "#F5F5F5",
      400: "#BDBDBD",
      600: "#333",
    },
  },
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Inter, sans-serif",
  },
});

export default theme;