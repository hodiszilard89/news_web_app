import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const MovieListItem: ComponentMultiStyleConfig = {
  parts: ["description", "header", "menu", "releaseDate"],
  baseStyle: {
    description: {
      justifyContent: "space-between",
      opacity: 0.5,
    },
    header: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      gap: 2,
    },
    menu: {
      position: "absolute",
      right: 4,
      top: 4,
      visibility: "hidden",

      _groupHover: {
        visibility: "visible",
      },
    },
    releaseDate: {
      alignSelf: "flex-start",
      border: "solid 1px",
      borderColor: "border.default",
      borderRadius: 4,
      fontSize: "sm",
      paddingX: 2,
      paddingY: 1,
    },
  },
};
