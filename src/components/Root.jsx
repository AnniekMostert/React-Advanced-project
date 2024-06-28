import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Header } from "./Header";

export const Root = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};
