import React from "react";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { EventCard } from "../components/EventCard";

const queryClient = new QueryClient();

export const EventsPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EventsList />
    </QueryClientProvider>
  );
};

const fetchEvents = async () => {
  const res = await fetch(`http://localhost:3000/events`);
  return res.json();
};

const EventsList = () => {
  const { data, status, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  return (
    <Container
      className="events-page"
      maxW="100%"
      margin={0}
    >
      {status === "error" && (
        <>
          <i>The following error occured: </i>
          <b>{error.message}</b>
        </>
      )}
      {status === "loading" && <p>Loading events...</p>}
      {status === "success" && (
        <Container className="events-list" margin={0} maxW="100%">
          <Heading>List of events</Heading>
          <SimpleGrid
            width="100%"
            minChildWidth={{ base: "250px", lg: "300px" }}
            spacing={{ base: "5vw", md: "3vw", xl: "2vw" }}
          >
            {data.map((event) => (
              <div key={event.id} className="event-box">
                <Link to={`event/${event.id}`}>
                  <EventCard event={event} />
                </Link>
              </div>
            ))}
          </SimpleGrid>
        </Container>
      )}
    </Container>
  );
};
