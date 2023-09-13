import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const GenreSelector: ComponentMultiStyleConfig = {
  parts: ["button", "checkboxList", "checkboxRoot", "itemsList", "menuItem", "placeholder"],
  baseStyle: {
    button: {
      backgroundColor: "transparent",
      border: "1px solid black",
      borderRadius: "4px",
      height: "auto",
      minHeight: 5,
      paddingY: 1.5,
      width: 400,

      _active: {
       // background: "interactive.input.background.default",
        boxShadow: "0 0 0 1px #3182ce",
      },
      _hover: {
        background: "",
      },
      _focus: {
        boxShadow: "0 0 0 1px #3182ce",
      },
    },
    itemsList: {

      maxWidth: "100%",
      overflow: "hidden",
      textAlign: "left",
      textOverflow: "ellipsis",
    },
    checkboxRoot: {
      
      width: "calc(100% - 6px)",
    },
    checkboxList: {
      start:"122px",
      //backgroundColor: "interactive.input.dropdown",
      border: "none",
      maxHeight: "sm",
      overflowY: "scroll",
      width:5,
      placement:"right",
    },
    menuItem: {
      _hover: {
       // backgroundColor: "transparent",
      },
      _focus: {
       // backgroundColor: "transparent",
      },
      "input:not(:checked) + .chakra-checkbox__control": {
        // backgroundColor: "white",
        // borderColor: "white",
      },
      ".chakra-checkbox__label": {
        opacity: 0.8,
      },
    },
    placeholder: {
      color: "black",
      fontWeight: "normal",
      textAlign: "left",
    },
  },
};
