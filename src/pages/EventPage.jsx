import React from "react";
import {
  AspectRatio,
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { formatISOToNormal } from "../components/formatISOToNormal";
import { DeleteButton } from "../components/DeleteButton";
import { EditButton } from "../components/EditButton";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);
  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();

  const date = formatISOToNormal(event.startTime).dateDMY;
  const time =
    formatISOToNormal(event.startTime).time +
    " - " +
    formatISOToNormal(event.endTime).time;

  const categoryNames = event.categoryIds.map((categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category && category.name;
  });

  const createdBy = users.find((user) => user.id === event.createdBy);

  return (
    <Container
      width="auto"
      maxW="992px"
      background="teal.100"
      borderRadius={{ base: 0, sm: "10px" }}
      my={{ base: 0, sm: "5vw" }}
      padding={0}
      position="relative"
    >
      <AspectRatio ratio={{ base: 3 / 2, sm: 2 / 1, md: 3 / 1 }}>
        <Image
          src={event.image}
          alt={"Picture of " + event.title}
          maxW="100%"
          borderTopRadius="10px"
        />
      </AspectRatio>
      <Link to={`/`}>
        <CloseButton
          position="absolute"
          right="0px"
          top="0px"
          borderRadius="0px"
          background="teal.100"
          borderTopRightRadius="8px"
          _hover={{ bgColor: "teal.200" }}
          _active={{ bgColor: "teal.200" }}
          _focusVisible={{ shadow: "none" }}
        />
      </Link>
      <Flex
        padding={["5%", "15px"]}
        flexDir="column"
        rowGap="5px"
        alignItems="center"
        textAlign="center"
        maxW="100%"
      >
        <Text fontSize="1.4em" fontWeight="bold" textAlign="center">
          {event.title}
        </Text>
        <Text>{event.description}</Text>
        <Grid
          templateColumns="1fr 2fr"
          gap={1}
          border="2px"
          borderColor="teal.200"
          paddingX="10px"
          paddingY="5px"
        >
          <Text>Date: </Text>
          <Text>{date}</Text>
          <Text>Time: </Text>
          <Text>{time}</Text>
        </Grid>
        <Text>{event.location}</Text>
        <Text>
          Category:{" "}
          {categoryNames.length === 2
            ? categoryNames.join(" and ")
            : categoryNames}
        </Text>
        <Box border="2px" borderColor="teal.200" paddingX="10px" paddingY="5px">
          <Text>Created by</Text>
          <Text>{createdBy.name}</Text>
          <Image
            src={createdBy.image}
            alt={"Picture of " + createdBy.name}
            width="200px"
          />
        </Box>
        <EditButton event={event} categories={categories} />
        <DeleteButton event={event} />
        <Link to={`/`}>
          <Button
            width={{ base: "100%", sm: "200px" }}
            marginTop="5px"
            variant="outline"
          >
            Back
          </Button>
        </Link>
      </Flex>
    </Container>
  );
};
