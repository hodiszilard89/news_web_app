import { ComponentMultiStyleConfig } from "@chakra-ui/react";

//import BgImage from "../../images/netflix-roulette.png";

export const PageHeader: ComponentMultiStyleConfig = {
  parts: ["addButton", "background", "container"],
  baseStyle: {
    addButton: {
      background: "interactive.button.background.secondary",
      color: "interactive.button.secondary",
      textTransform: "uppercase",
      _hover:{
        background: undefined,
      },
    },
    background: {
      //backgroundImage: BgImage,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      bottom: 0,
      filter: "blur(8.15485px)",
      left: "-10%",
      opacity: "0.3",
      position: "absolute",
      right: "-10%",
      top: "-10%",
      zIndex: 0,
    },
    container: {
      backgroundColor: "black",
      overflow: "hidden",
      paddingY: 5,
      position: "relative",
    },
  },
};
