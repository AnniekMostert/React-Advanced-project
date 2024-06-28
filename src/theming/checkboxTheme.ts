import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    borderColor: "red.700",
    _hover: {
      bgColor: "teal.200",
    },
    _focusVisible: {
      bgColor: "teal.200",
      boxShadow: "none",
      outline: "none"
    },
    _checked: {
      background: "red.700",
      borderColor: "red.700",
      _hover: {
        background: "red.700",
        borderColor: "red.700",
      },
    },
  },
});

const modal = definePartsStyle({
  control: defineStyle({
    _hover: {
      bgColor: "teal.100"
    }
  })
})

export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
  variants: { modal },
});
