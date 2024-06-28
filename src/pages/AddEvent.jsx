import {
  Box,
  Button,
  Checkbox,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { formatNormalToISO } from "../components/formatNormalToISO";

export const loader = async () => {
  const users = await fetch(`http://localhost:3000/users`);
  const categories = await fetch(`http://localhost:3000/categories`);
  return {
    users: await users.json(),
    categories: await categories.json(),
  };
};

export const AddEvent = () => {
  const { users, categories } = useLoaderData();
  const navigate = useNavigate();
  const toast = useToast();

  const defaultValues = {
    createdBy: "2",
    title: "Boogschieten",
    description: "Boogschietworkshop voor kinderen en volwassenen",
    image: "../boogschieten.jpg",
    categoryIds: ["1"],
    location: "Panbos",
    startingDate: "2024-07-06",
    startingTime: "14:00",
    endingDate: "2024-07-06",
    endingTime: "15:30",
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    reset,
  } = useForm({ defaultValues });

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
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(newEvent),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to create an event. Status: ${response.status}`
        );
      }
      const id = (await response.json()).id;
      navigate(`/event/${id}`);
    } catch (error) {
      console.error("An error occurred while creating a event:", error);
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

    const newEvent = {
      createdBy: Number(data.createdBy),
      title: data.title,
      description: data.description,
      image: data.image,
      categoryIds: data.categoryIds.map((id) => Number(id)),
      location: data.location,
      startTime,
      endTime,
    };

    createEvent(newEvent);
    reset();
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
        position="relative"
      >
        <Link to={`/`}>
        <CloseButton
          position="absolute"
          right="0px"
          top="0px"
          borderRadius="0px"
          background="teal.100"
          borderTopRightRadius="9px"
          _hover={{ bgColor: "teal.200" }}
          _active={{ bgColor: "teal.200" }}
          _focusVisible={{ shadow: "none" }}
        />
      </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" rowGap="10px">
            <FormControl className="createdBy">
              <FormLabel>
                My name <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Select
                name="createdBy"
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
              <FormLabel>
                Location <span style={{ color: "red" }}>*</span>
              </FormLabel>

              <Input
                type="text"
                name="location"
                {...register("location", {
                  required: "Fill in a location for your event",
                })}
              />
              <Text color="red.500">{errors.title?.message}</Text>
            </FormControl>

            <FormControl className="startTime">
              <FormLabel>
                Start time <span style={{ color: "red" }}>*</span>
              </FormLabel>
              <Flex gap="5px">
                <Input
                  type="date"
                  width="150px"
                  {...register("startingDate", {
                    required: "Select the date your event starts",
                  })}
                />
                <Input
                  type="time"
                  width="150px"
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
              onClick={() =>
                toast({
                  title: "Event created",
                  description: `${getValues("title")} is succesfully created.`,
                  status: "success",
                })
              }
            >
              Add event
            </Button>
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
        </form>
      </Box>
    </>
  );
};
