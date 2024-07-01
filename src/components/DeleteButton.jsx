import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const DeleteButton = ({ event }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onDelete = async () => {
    const deleteEvent = async () => {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete the event. Status: ${response.status}`
        );
      }
    };

    try {
      await toast.promise(deleteEvent(), {
        success: {
          title: "Event deleted",
          description: `${event.title} is succesfully deleted.`,
        },
        error: {
          title: "Something wrong",
          description: `${event.title} couldn't be deleted`,
        },
        loading: {
          title: "Please wait",
          description: `${event.title} is being deleted`,
        },
      });
      navigate(`/`);
    } catch (error) {
      console.error("An error occurred while deleting the event:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Delete event</Button>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md"]}>
        <ModalOverlay />
        <ModalContent textAlign="center">
          <ModalHeader fontWeight="bold">Caution!</ModalHeader>
          <ModalCloseButton
            border="1px solid"
            bgColor="teal.100"
            _hover={{ background: "teal.200" }}
            _focusVisible={{ background: "teal.200" }}
          />
          <ModalBody>
            Are you sure you want to delete the event: {event.title}?
          </ModalBody>
          <ModalFooter flexDirection={["column", "row"]} gap="10px">
            <Button variant="modal" onClick={onDelete} flex={{ sm: 1 }}>
              Yes I want to delete
            </Button>
            <Button variant="modal" onClick={onClose} flex={{ sm: 1 }}>
              No, please go back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
