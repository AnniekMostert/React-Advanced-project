import React from "react";
import { Button, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { EventCard } from "../components/EventCard";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  return (
    <Container className="events-page" maxW="100%" margin={0}>
      <Link to={`add-event`}>
        <Button>Add event</Button>
      </Link>
      <Heading>List of events</Heading>
      <SimpleGrid
        width="100%"
        minChildWidth={{ base: "250px", lg: "300px" }}
        spacing={{ base: "5vw", md: "3vw", xl: "2vw" }}
      >
        {events.map((event) => (
          <div key={event.id} className="event-box">
            <Link to={`event/${event.id}`}>
              <EventCard event={event} categories={categories} />
            </Link>
          </div>
        ))}
      </SimpleGrid>
    </Container>
  );
};
