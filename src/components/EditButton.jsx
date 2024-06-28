import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { formatISOToNormal } from "./formatISOToNormal";
import { formatNormalToISO } from "./formatNormalToISO";

export const EditButton = ({ event, categories }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const onSubmit = async (data) => {
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

    const editEvent = async () => {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        body: JSON.stringify(editedEvent),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error('Failed to edit event');
      }
      return response.json();
    };
    try {
      await toast.promise(editEvent(), {
        success: {
          title: "The event is changed",
          description: "Looks great",
        },
        error: {
          title: "The event couldn't be edited",
          description: "Something wrong",
        },
        loading: {
          title: "The changes are being processed",
          description: "Please wait",
        },
      });
      onClose();
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Error during editing event:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Edit event</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "full", sm: "xl" }}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            border="1px solid"
            _hover={{ background: "teal.100" }}
            _focusVisible={{ background: "teal.100" }}
          />
          <ModalBody paddingY={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex flexDirection="column" rowGap="10px">
                <FormControl className="title">
                  <FormLabel w="200px">Title</FormLabel>

                  <Input
                    type="text"
                    variant="modal"
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
                    variant="modal"
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
                    variant="modal"
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
                        variant="modal"
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
                    variant="modal"
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
                      variant="modal"
                      width="150px"
                      defaultValue={formatISOToNormal(event.startTime).dateYMD}
                      {...register("startingDate", {
                        required: "Select the date your event starts",
                      })}
                    />
                    <Input
                      type="time"
                      variant="modal"
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
                      variant="modal"
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
                      variant="modal"
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
                <Button type="submit" variant="modal">
                  Edit event
                </Button>
                <Button variant="modal" onClick={onClose}>
                  Back
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
