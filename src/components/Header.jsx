import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const stickyStyle = {
    position: ["sticky", "-webkit-sticky"],
    top: "0",
    zIndex: "10",
  };
  return (
    <Flex
      bgColor="teal.200"
      flexDirection="column"
      alignItems="center"
      paddingY="10px"
      gap="10px"
      textAlign="center"
      sx={stickyStyle}
    >
      <Heading>Find your next unforgettable event</Heading>
      <Flex flexDirection="row" gap="10px">
        <Link to="/">
          <Button>All events</Button>
        </Link>
        <Link to="/add-event">
          <Button>Add event</Button>
        </Link>
      </Flex>
    </Flex>
  );
};
