import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const NewsItemMenu: ComponentMultiStyleConfig = {
  parts: ["closeIcon", "menuButton", "menuItem", "menuList"],
  baseStyle: {
    closeIcon: {
      justifyContent: "flex-end",
      padding: 2.5,
      _hover: {
       //background: "background.dark",
      },
    },
    menuButton: {
      //backgroundColor: "background.dark",
      _active: {
       // backgroundColor: undefined,
      },
      _hover: {
       // backgroundColor: undefined,
      },
    },
    menuItem: {
      _hover: {
        backgroundColor: "background.hover",
      },
    },
    menuList: {
     // backgroundColor: "background.dark",
      border: "none",
      paddingTop: 0,
    },
  },
};
