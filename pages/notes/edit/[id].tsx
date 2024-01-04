// pages/notes/[id].js

import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Grid,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  GridItem,
  Heading,
  Text,
  Button,
  Box,
  Textarea,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Notes() {
  const router = useRouter();
  const { id } = router?.query;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const [isEdit, setIsEdit] = useState(false); // State to determine if it's an edit or add

  const HandleSubmit = async () => {
    try {
      if (isEdit) {
        // Logic for handling edit submission
        const response = await fetch(`/api/notes/edit/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: notes?.title,
            description: notes?.description,
          }),
        });

        const result = await response.json();
        if (result?.success) {
          onClose(); // Close the modal after submitting
          // You can also trigger a data refetch here if needed
        }
      } else {
        // Logic for handling add submission
        // Example: You can use your existing add notes logic here
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      if (id) {
        const res = await fetch(`/api/notes/${id}`);
        const listNotes = await res.json();
        setNotes(listNotes?.data);
        setIsEdit(true); // Set to edit mode if there's an ID
      } else {
        setIsEdit(false); // Set to add mode if there's no ID
      }
    }
    fetchingData();
  }, [id]);

  const handleToggleForm = () => {
    onOpen(); // Open the modal
  };

  return (
    <>
      <Card margin="5" padding="5">
        <Heading>{isEdit ? "Edit Notes" : "Add Notes"}</Heading>
        <Grid gap="5">
          <GridItem>
            <Text>Title</Text>
            <Input
              type="text"
              value={notes?.title}
              onChange={(event) =>
                setNotes({ ...notes, title: event.target.value })
              }
            />
          </GridItem>
          <GridItem>
            <Text>Description</Text>
            <Textarea
              value={notes?.description}
              onChange={(event) =>
                setNotes({ ...notes, description: event.target.value })
              }
            />
          </GridItem>
          <GridItem>
            <Button onClick={handleToggleForm} colorScheme={isEdit ? "green" : "blue"}>
              {isEdit ? "Edit" : "Add"}
            </Button>
          </GridItem>
        </Grid>
      </Card>

      {/* Add/Edit Notes Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit Notes" : "Add Notes"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Render your add/edit form inside the modal */}
            <Text>Title</Text>
            <Input
              type="text"
              value={notes?.title}
              onChange={(event) =>
                setNotes({ ...notes, title: event.target.value })
              }
            />
            <Text>Description</Text>
            <Textarea
              value={notes?.description}
              onChange={(event) =>
                setNotes({ ...notes, description: event.target.value })
              }
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme={isEdit ? "green" : "blue"} mr={3} onClick={HandleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
