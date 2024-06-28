import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { formatISOToNormal } from "../components/formatISOToNormal";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(`http://localhost:3000/categories`);
  return {
    event: await event.json(),
    categories: await categories.json(),
  };
};

export const EditEvent = () => {
  const { event, categories } = useLoaderData();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    reset,
  } = useForm({ defaultValues: event });

  const validateEndtime = () => {
    const ST = getValues("startingTime");
    const SD = getValues("startingDate");
    const ET = getValues("endingTime");
    const ED = getValues("endingDate");
    if (SD === ED) {
      if (ST > ET) {
        return "The end time cannot be before the start time";
      }
      if (ST === ET) {
        return "I think your event takes longer than that 😄";
      }
    }
    return true;
  };

  const editEvent = async (editedEvent) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(editedEvent),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to edit the event. Status: ${response.status}`);
      }
      navigate(`/event/${event.id}`);
    } catch (error) {
      console.error("An error occurred while editing the event:", error);
    }
  };

  const onSubmit = (data) => {
    const startTime = formatNormalToISO(
      getValues("startingDate"),
      getValues("startingTime")
    );
    const endTime = formatNormalToISO(
      getValues("endingDate"),
      getValues("endingTime")
    );

    const editedEvent = {
      createdBy: event.createdBy,
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: data.categoryIds.map((id) => Number(id)),
      location: data.location,
      startTime,
      endTime,
    };

    editEvent(editedEvent);
    reset();
  };

  return (
    <>
      <Heading textAlign="center" margin="5vw">
        Edit event:
      </Heading>
      <Box
        bgColor="teal.100"
        width={{ base: "90vw", sm: "90vw" }}
        borderRadius="10px"
        marginX="auto"
        padding="5vw"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" rowGap="10px">
            <FormControl className="title">
              <FormLabel>Title</FormLabel>

              <Input
                type="text"
                name="title"
                {...register("title", {
                  required: "Fill in a title for your event",
                })}
              />
              <Text color="red.500">{errors.title?.message}</Text>
            </FormControl>

            <FormControl className="description">
              <FormLabel>Short description</FormLabel>
              <Input
                type="text"
                name="description"
                {...register("description", {
                  required: "Fill in a short description for your event",
                  maxLength: {
                    value: 50,
                    message: "Please, keep the description short",
                  },
                })}
              />
              <Text color="red.500">{errors.description?.message}</Text>
            </FormControl>

            <FormControl className="image">
              <FormLabel>Image url</FormLabel>
              <Input
                type="text"
                name="image"
                {...register("image", {
                  required: "Upload an image for your event",
                })}
              />
              <Text color="red.500">{errors.image?.message}</Text>
            </FormControl>

            <FormControl className="category">
              <FormLabel>Category</FormLabel>
              <Stack dir="column">
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    name={category.id}
                    value={category.id}
                    defaultChecked={event.categoryIds.includes(category.id)}
                    {...register("categoryIds", {
                      validate: (value) =>
                        value.length > 0 ||
                        "At least one category must be selected",
                    })}
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </Stack>
              {errors.categoryIds && (
                <Text color="red.500">{errors.categoryIds.message}</Text>
              )}
            </FormControl>

            <FormControl className="location">
              <FormLabel>Location</FormLabel>

              <Input
                type="text"
                name="location"
                {...register("location", {
                  required: "Fill in a location for your event",
                })}
              />
              <Text color="red.500">{errors.location?.message}</Text>
            </FormControl>

            <FormControl className="startTime">
              <FormLabel>Start time</FormLabel>
              <Flex gap="5px">
                <Input
                  type="date"
                  width="150px"
                  defaultValue={formatISOToNormal(event.startTime).dateYMD}
                  {...register("startingDate", {
                    required: "Select the date your event starts",
                  })}
                />
                <Input
                  type="time"
                  width="150px"
                  defaultValue={formatISOToNormal(event.startTime).time}
                  {...register("startingTime", {
                    required: "Select the time your event starts",
                  })}
                />
              </Flex>
              <Text color="red.500">{errors.startingDate?.message}</Text>
              <Text color="red.500">{errors.startingTime?.message}</Text>
            </FormControl>

            <FormControl className="endTime">
              <FormLabel>End time</FormLabel>
              <Flex gap="5px">
                <Input
                  type="date"
                  width="150px"
                  defaultValue={formatISOToNormal(event.endTime).dateYMD}
                  {...register("endingDate", {
                    required: "Select the date your event ends",
                    validate: (value) =>
                      value >= getValues("startingDate") ||
                      "The end date cannot be before the start date",
                  })}
                />
                <Input
                  type="time"
                  width="150px"
                  defaultValue={formatISOToNormal(event.endTime).time}
                  {...register("endingTime", {
                    required: "Select the time your event ends",
                    validate: validateEndtime,
                  })}
                />
              </Flex>
              <Text color="red.500">{errors.endingDate?.message}</Text>
              <Text color="red.500">{errors.endingTime?.message}</Text>
            </FormControl>

            <Button
              type="submit"
              bgColor="teal.100"
              border="1px"
              _hover={{ bgColor: "teal.200" }}
              marginTop="10px"
            >
              Edit event
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};
