import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const GenreList: ComponentMultiStyleConfig = {
  parts: ["list", "listItem"],
  baseStyle: {
    list: {
      fontSize: "md",
      listStyleType: "none",
      margin: 0,
      padding: 0,
      textTransform: "uppercase",

      "a": {
        display: "block",
        paddingY: 4,
        _hover: {
          textDecoration: "none",
        },
      },
    },
    listItem: {
      borderBottom: "solid 3px",
      borderColor: "transparent",
      _hover: {
        borderBottomColor: "border.highlighted",
      },
      _selected: {
        borderBottomColor: "border.highlighted",
      },
    },
  },
};
