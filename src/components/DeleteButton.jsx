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

  const deleteEvent = async () => {
        try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(
          `Failed to delete the event. Status: ${response.status}`
        );
      }
      toast({
          title: "Event deleted",
          description: `${event.title} is succesfully deleted.`,
          status: "success",
        });
      navigate(`/`);
    } catch (error) {
      console.error("An error occurred while deleting the event:", error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>
        Delete event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={["xs", "sm", "md"]}>
        <ModalOverlay />
        <ModalContent textAlign="center" >
          <ModalHeader  fontWeight="bold">Caution!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the event: {event.title}?
          </ModalBody>
          <ModalFooter flexDirection={["column", "row"]} gap="5px">
            <Button borderColor="red.700" border="1px solid" onClick={deleteEvent} width="180px">Yes I want to delete</Button>
              <Button borderColor="red.700" border="1px solid" onClick={onClose} width="180px">No, please go back</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
