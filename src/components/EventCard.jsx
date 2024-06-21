import {
  AspectRatio,
  Container,
  Flex,
  Image,
  Grid,
  Text,
} from "@chakra-ui/react";

const formatDate = (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const formattedDate = startDate.toLocaleDateString("en-GB");
  const formattedStartTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateAndTime = {date: formattedDate, time: formattedStartTime + " - " + formattedEndTime};

  return dateAndTime;
};

export const EventCard = ({ event, categories }) => {
  const date = formatDate(event.startTime, event.endTime).date.replaceAll("/", "-");
  const time = formatDate(event.startTime, event.endTime).time;

  const categoryNames = event.categoryIds.map((categoryId) => {
    const category = categories.find((category) => category.id === categoryId);
    return category && category.name;
  });

  console.log(JSON.stringify(event, null, 3));

  return (
    <Container background="teal.100" borderRadius="10px" padding={0}>
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
      >
        <Text fontSize="1.4em" fontWeight="bold" textAlign="center">
          {event.title}
        </Text>
        <Text>{event.description}</Text>
        <Grid templateColumns="1fr 2fr" gap={1} border="2px" borderColor="teal.200" paddingX="10px" paddingY="5px">
          <Text>Date: </Text>
          <Text>{date}</Text>
          <Text>Time: </Text>
          <Text>{time}</Text>
        </Grid>
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
