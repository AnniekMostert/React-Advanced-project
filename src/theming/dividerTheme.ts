import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const red = defineStyle({
  border: "2px solid",
  borderColor: "red.700",
});

export const dividerTheme = defineStyleConfig({
  variants: { red },
});
