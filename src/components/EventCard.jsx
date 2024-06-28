import {
  AspectRatio,
  Container,
  Flex,
  Image,
  Grid,
  Text,
} from "@chakra-ui/react";
import { formatISOToNormal } from "./formatISOToNormal";

export const EventCard = ({ event, categories }) => {
  const date = formatISOToNormal(event.startTime).dateDMY;
  const time = formatISOToNormal(event.startTime).time + " - " + formatISOToNormal(event.endTime).time;

  const categoryNames = event.categoryIds.map((categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category && category.name;
  });

  return (
    <Container height="100%" background="teal.100" borderRadius="10px" padding={0}>
      <AspectRatio ratio={3 / 2}>
        <Image
          src={event.image}
          alt={"Picture of " + event.title}
          width="100%"
          borderTopRadius="10px"
        />
      </AspectRatio>
      <Flex
        padding={["5%", "15px"]}
        flexDir="column"
        rowGap="5px"
        alignItems="center"
        textAlign="center"
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
        <Text>At {event.location}</Text>
        <Text>
          Category:{" "}
          {categoryNames.length === 2
            ? categoryNames.join(" and ")
            : categoryNames}
        </Text>
      </Flex>
    </Container>
  );
};
