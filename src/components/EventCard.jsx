import {
  AspectRatio,
  Box,
  Container,
  Flex,
  Image,
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

  return `${formattedDate} ${formattedStartTime} - ${formattedEndTime}`;
};

export const EventCard = ({ event }) => {
  const formattedDateRange = formatDate(event.startTime, event.endTime);

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
        <Box border="2px" borderColor="teal.200" paddingX="10px" paddingY="5px">
          <Text>Time and date:</Text>
          <Text>{formattedDateRange}</Text>
        </Box>
 
      </Flex>
    </Container>
  );
};
