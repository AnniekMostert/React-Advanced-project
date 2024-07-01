import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { EventCard } from "../components/EventCard";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [chosenCategory, setChosenCategory] = useState(0);
  const [searchValue, setsearchValue] = useState("");

  const filteredEvents = events.filter((event) =>
    chosenCategory != 0
      ? event.categoryIds.includes(Number(chosenCategory))
      : events
  );

  const matchedEvents = filteredEvents.filter(({ title }) =>
    title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container className="events-page" maxW="100%" margin={0}>
      <Box position="relative">
        <Link to={`add-event`}>
          <Button
            display={{ base: "none", md: "inline-block" }}
            width="100px"
            height="100px"
            variant="modal"
            whiteSpace="normal"
            fontWeight="bold"
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            right="calc((100vw - 2rem - 650px) / 4)"
            //transition
            boxShadow="rgba(17, 12, 46, 0.5) 0px 48px 100px 0px"
            transition="boxShadow 0.6s ease"
            _hover={{
              boxShadow: "rgba(17, 12, 46, 5) 0px 48px 100px 0px",
            }}
          >
            Add new event
          </Button>
          <Flex direction="column" maxW="450px" my="1rem" mx="auto">
            <Heading>List of events</Heading>
            <Input
              onChange={(event) => setsearchValue(event.target.value)}
              placeholder="Search for events"
              my="0.5rem"
            />
            <RadioGroup defaultValue="0" onChange={setChosenCategory}>
              <Stack direction={{ base: "column", sm: "row" }} columnGap="10px">
                <Radio
                  spacing="5px"
                  border="1px solid"
                  borderColor="red.700"
                  _checked={{ background: "teal.200" }}
                  value="0"
                >
                  all
                </Radio>
                <Radio
                  spacing="5px"
                  border="1px solid"
                  borderColor="red.700"
                  _checked={{ background: "teal.200" }}
                  value="1"
                >
                  sports
                </Radio>
                <Radio
                  spacing="5px"
                  border="1px solid"
                  borderColor="red.700"
                  _checked={{ background: "teal.200" }}
                  value="2"
                >
                  games
                </Radio>
                <Radio
                  spacing="5px"
                  border="1px solid"
                  borderColor="red.700"
                  _checked={{ background: "teal.200" }}
                  value="3"
                >
                  relaxation
                </Radio>
              </Stack>
            </RadioGroup>
          </Flex>
        </Link>
      </Box>

      <SimpleGrid
        width="100%"
        minChildWidth={{ base: "250px", lg: "300px" }}
        spacing={{ base: "5vw", md: "3vw", xl: "2vw" }}
      >
        {matchedEvents.map((event) => (
          <Link key={event.id} to={`event/${event.id}`}>
            <EventCard event={event} categories={categories} />
          </Link>
        ))}
      </SimpleGrid>
    </Container>
  );
};
