import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Flex bgColor="teal.200" flexDirection="column" alignItems="center" paddingY="10px" gap="10px" textAlign="center" >
      <Heading>Find your next unforgettable event</Heading>
      <Flex flexDirection="row" gap="10px" >
            <Link to="/"><Button variant="header">All events</Button></Link>
            <Link to="/add-event"><Button variant="header">Add event</Button></Link>
      </Flex>
      
    </Flex>
  );
};
