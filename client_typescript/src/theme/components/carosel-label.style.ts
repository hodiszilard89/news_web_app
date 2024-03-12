import { ComponentMultiStyleConfig } from "@chakra-ui/react";
import { transform } from "typescript";

export const CaroselLabel: ComponentMultiStyleConfig = {
  parts: ["caruselItem", "image"],
  baseStyle: {
    caruselItem: {
      "::before": {
        // content: "attr(data-length)",
        backgroundColor: "black",
        color: "white",
        padding: "2px 5px",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: -1,
      },
    },
    image: {
      transition: "all .7s ease;",
      display:
        "inline-block" /* change the default display type to inline-block */,
      overflow: "hidden" /* hide the overflow */,
      verticalAlign: "middle",
      _hover: {
        transform: "scale(1.1)",
      },
    },
  },
};
