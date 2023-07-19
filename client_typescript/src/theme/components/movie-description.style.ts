import { ComponentMultiStyleConfig } from "@chakra-ui/theme";

export const MovieDescription: ComponentMultiStyleConfig = {
  parts: ["container", "description", "homeLink", "timeStamp", "title"],
  baseStyle: {
    container: {
      bgColor: "background.dark",
      overflow: "hidden",
      paddingBottom: 7,
      paddingTop: 9,
      paddingX: 16,
    },
    description: {
      fontSize:"xl",
      fontWeight: "light",
      opacity: 0.5,
    },
    homeLink: {
      color: "text.highlighted",
      fontSize: "3xl",
      _hover: {
        textDecoration: "none",
      }
    },
    timeStamp: {
      color: "text.highlighted",
      fontSize: "2xl",
      fontWeight: "light",
      marginBottom: 7
    },
    title: {
      fontSize: "4xl",
      fontWeight: "light",
      textTransform: "uppercase",
    },
  },
};
