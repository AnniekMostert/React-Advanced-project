import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const outline = defineStyle({
  bgColor: "teal.100",
  border: "1px solid",
  borderColor: "red.700",
  _hover: { bgColor: "teal.200" },
  _active: { bgColor: "teal.200" },
  _focusVisible: { shadow: "none" },
});

const modal = defineStyle({
  border: "1px solid",
  borderColor: "red.700",
  _hover: { bgColor: "teal.100" },
  _active: { bgColor: "teal.100" },
  _focusVisible: { shadow: "none" },
})

export const buttonTheme = defineStyleConfig({
  variants: { outline, modal }, defaultProps: { variant: "outline"}
});
