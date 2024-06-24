import { inputAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle({
  field: {
    color: "red.700",
    _placeholder: {
      color: "red.700",
    },
  },
});

const variantOutline = definePartsStyle({
  field: {
    borderColor: "red.700",
    _hover: { borderColor: "red.700", bgColor: "teal.200" },
    _focusVisible: {
      borderColor: "red.700",
      bgColor: "teal.200",
      boxShadow: "none",
      _placeholder: {
        color: "red.700",
      },
    },
  },
});

const variants = {
  outline: variantOutline,
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  defaultProps: { variant: "outline" },
});
