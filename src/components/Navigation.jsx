import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Box bgColor="teal.200">
      <nav>
        <ul>
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <Link to="/event/1">Event</Link>
          </li>
        </ul>
      </nav>
    </Box>
  );
};
