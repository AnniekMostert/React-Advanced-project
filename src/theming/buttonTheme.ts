import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({
  border: "1px solid",
  borderColor: "red.700",
  _focusVisible: { shadow: "none" },
});

const outline = defineStyle({
  ...baseStyle,
  bgColor: "teal.100",
  _hover: { bgColor: "teal.200" },
  _active: { bgColor: "teal.200" },
});

const modal = defineStyle({
  _hover: { bgColor: "teal.100" },
  _active: { bgColor: "teal.100" },
});

const header = defineStyle({
  bgColor: "teal.200",
  _hover: { bgColor: "teal.100" },
  _active: { bgColor: "teal.100" },
});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: { outline, modal, header },
  defaultProps: { variant: "outline" },
});
