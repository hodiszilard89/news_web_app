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
    proba: {
      // //whiteSpace:"normal",
      // //overflow: "hidden",
      //   position: "absolute",
      // //content:"attr(data-length)",
      // backgroundColor:"black",
      // padding: "2px 5px",
      // color:"white",
      _hover: {
        // cursor:"pointer",
        position: "relative",
        display: "inline-block",
        _before: {
          content: "''",
          position: "relative",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "2px", // Vonal magassága
          backgroundColor: "blue", // Vonal színe
          transform: "scaleX(0)", // Alapértelmezésben láthatatlan
          transformOrigin: "center",
          transition: "transform 0.5s ease-in-out", // Animáció a sima átmenethez
        },
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
