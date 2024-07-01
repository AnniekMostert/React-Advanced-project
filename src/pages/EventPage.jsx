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
      maxW="800px"
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
          background="teal.200"
          borderTopRightRadius="8px"
          _hover={{ bgColor: "teal.300" }}
          _active={{ bgColor: "teal.300" }}
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
        <Text fontSize="3xl" as="b" textAlign="center" marginTop={3}>
          {event.title}
        </Text>
        <Text fontSize="2xl" marginBottom={6}>
          {event.description}
        </Text>
        <Flex
          direction={{ base: "column", sm: "row" }}
          wrap="wrap"
          width="100%"
          justifyContent="space-around"
        >
          <Box
            margin={3}
            padding={3}
            border="2px solid"
            borderColor="teal.200"
            position="relative"
            textAlign="start"
          >
            <Text
              position="absolute"
              top="-12px"
              left="10px"
              bgColor="teal.200"
              paddingX="5px"
            >
              Information:
            </Text>

            <Grid
              templateColumns="1fr 2fr"
              columnGap={3}
              justifyItems="start"
              rowGap={1}
              marginTop={2}
            >
              <Text as="b">Date: </Text>
              <Text>{date}</Text>
              <Text as="b">Time: </Text>
              <Text>{time}</Text>
              <Text as="b">Location:</Text>
              <Text>{event.location}</Text>
              <Text as="b">Category: </Text>
              <Text>
                {categoryNames.length === 2
                  ? categoryNames.join(" and ")
                  : categoryNames}
              </Text>
            </Grid>
          </Box>

          <Box
            margin={3}
            padding={3}
            paddingTop={5}
            border="2px solid"
            borderColor="teal.200"
            position="relative"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="stretch"
          >
            <Text
              position="absolute"
              top="-12px"
              left="10px"
              bgColor="teal.200"
              paddingX="5px"
            >
              Actions:
            </Text>
            <EditButton event={event} categories={categories} />
            <DeleteButton event={event} />
            <Link to={`/`}>
              <Button minW="100%">Back to home</Button>
            </Link>
          </Box>

          <Box
            margin={3}
            padding={3}
            border="2px solid"
            borderColor="teal.200"
            display="flex"
            flexDirection="column"
            position="relative"
          >
            <Text
              position="absolute"
              top="-12px"
              left="10px"
              bgColor="teal.200"
              paddingX="5px"
            >
              Created by:
            </Text>
            <Text as="b" fontSize="2xl" mb={3} mt={1}>
              {createdBy.name}
            </Text>
            <Image
              src={createdBy.image}
              alt={"Picture of " + createdBy.name}
              width={200}
              alignSelf="center"
            />
          </Box>

        </Flex>
      </Flex>
    </Container>
  );
};
