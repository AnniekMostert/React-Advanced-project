import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";

export const loader = async () => {
  const users = await fetch(`http://localhost:3000/users`);
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const AddEvent = () => {
  const { users, events, categories } = useLoaderData();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    reset,
  } = useForm();

  const formatTimestamp = (date, time) => {
    const timeStamp = new Date(`${date}T${time}`);
    const timeStampISO = timeStamp.toISOString();
    return timeStampISO;
  };

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

  const createEvent = async (newEvent) => {
    console.log(JSON.stringify(newEvent, null, 3));
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: { "Content-Type": "application/json;charset=utf=8" },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to create an event. Status: ${response.status}`
        );
      }
      const responseData = await response.json();
      console.log(responseData);
      console.log(response);
    } catch (error) {
      console.error("An error occurred while creating a event:", error);
    }
  };

  const onSubmit = (data) => {
    const startTime = formatTimestamp(
      getValues("startingDate"),
      getValues("startingTime")
    );
    const endTime = formatTimestamp(
      getValues("endingDate"),
      getValues("endingTime")
    );

    const newEvent = {
      id: events.length + 1,
      createdBy: Number(data.createdBy),
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: data.categoryIds.map((id) => Number(id)),
      startTime,
      endTime,
    };
    console.log(JSON.stringify(newEvent, null, 3));

    createEvent(newEvent);
    // navigate("/");
    // reset();
  };

  return (
    <>
      <Heading textAlign="center" margin="5vw">
        Add event:
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
            <FormControl className="createdBy">
              <FormLabel>
                My name <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Select
                name="createdBy"
                defaultValue={2}
                placeholder="Select user"
                borderColor="red.700"
                _hover={{ borderColor: "red.700", bgColor: "teal.200" }}
                _focusVisible={{
                  borderColor: "red.700",
                  bgColor: "teal.200",
                }}
                {...register("createdBy", {
                  required: "Select your name",
                })}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              <Text color="red.500">{errors.createdBy?.message}</Text>
            </FormControl>

            <FormControl className="title">
              <FormLabel>
                Title <span style={{ color: "red" }}>*</span>
              </FormLabel>

              <Input
                type="text"
                name="title"
                defaultValue="Boogschieten"
                {...register("title", {
                  required: "Fill in a title for your event",
                })}
              />
              <Text color="red.500">{errors.title?.message}</Text>
            </FormControl>

            <FormControl className="description">
              <FormLabel>
                Short description <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="description"
                defaultValue="Boogschietworkshop voor kinderen en volwassenen"
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
              <FormLabel>
                Image url <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Input
                type="text"
                name="image"
                defaultValue="https://www.pexels.com/nl-nl/foto/doelwit-doel-boogschieten-detailopname-6540680/"
                {...register("image", {
                  required: "Upload an image for your event",
                })}
              />
              <Text color="red.500">{errors.image?.message}</Text>
            </FormControl>

            <FormControl className="category">
              <FormLabel>
                Category <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Stack dir="column">
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    name={category.id}
                    value={category.id}
                    _hover={{
                      "& .chakra-checkbox__control": { bgColor: "teal.200" },
                    }}
                    _checked={{
                      "& .chakra-checkbox__control": {
                        background: "red.700",
                        borderColor: "red.700",
                        _hover: {
                          background: "red.700",
                          borderColor: "red.700",
                        },
                      },
                    }}
                    borderColor="red.700"
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

            <FormControl className="startTime">
              <FormLabel>
                Start time <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Flex gap="5px">
                <Input
                  type="date"
                  width="150px"
                  defaultValue="2024-07-06"
                  {...register("startingDate", {
                    required: "Select the date your event starts",
                  })}
                />
                <Input
                  type="time"
                  width="150px"
                  defaultValue="14:00"
                  {...register("startingTime", {
                    required: "Select the time your event starts",
                  })}
                />
              </Flex>
              <Text color="red.500">{errors.startingDate?.message}</Text>
              <Text color="red.500">{errors.startingTime?.message}</Text>
            </FormControl>

            <FormControl className="endTime">
              <FormLabel>
                End time <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Flex gap="5px">
                <Input
                  type="date"
                  width="150px"
                  defaultValue="2024-07-06"
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
                  defaultValue="15:30"
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
              Add event
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
};
