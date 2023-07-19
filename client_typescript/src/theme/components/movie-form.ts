import { ComponentMultiStyleConfig } from "@chakra-ui/react";

export const MovieForm: ComponentMultiStyleConfig = {
  parts: ["inputField", "dateField"],
  baseStyle: {
    inputField: {
      backgroundColor: "interactive.input.background.default",
      border: "none",
      borderColor: "transparent",
      borderRadius: "4px",
      opacity: 0.8,

      _placeholder: {
        color: "interactive.input.placeholder",
      },

      "&[type='date']": {
        "&::-webkit-calendar-picker-indicator": {
          display: "none",
          "-webkit-appearance": "none",
        },
        "&:empty": {
          color: "interactive.input.placeholder",
          opacity: "0.8",
        },
      },
    },
  },
};
