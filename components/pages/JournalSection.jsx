import { useEffect } from "react";
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "../../hooks/useMutation";
import { Spinner } from "@chakra-ui/react";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";

export default function Notes() {
  const router = useRouter();
  const { mutate } = useMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useSWR(
    "https://paace-f178cafcae7b.nevacloud.io/api/notes",
    fetcher,
    { revalidateOnFocus: true }
  );

  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });


  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (notes.mode === "edit") {
        response = await fetch(`/api/notes/edit/${notes.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: notes?.title,
            description: notes?.description,
          }),
        });
      } else {
        response = await mutate({
          url: "http://localhost:3000/api/notes/add",
          method: "POST",
          payload: notes,
        });
      }

      const result = await response.json();
      if (result?.success) {
        onCloseModal();
      }
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes"
      );
      const listNotes = await res.json();
      setNotes({ ...listNotes, mode: "add" });
    }
    fetchingData();
  }, []);

  const handleToggleForm = () => {
    onOpen();
  };

  if (isLoading) {
    return (
      <Flex
        alignItems="center"
        justifyContent="center"
        width="full"
        height="100vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <div className="text-black my-10 p-4 w-full h-auto">
      <Box padding="5">
        <Flex justifyContent="end" className="my-8">
          <Button onClick={handleToggleForm} colorScheme="blue">
            Add Notes
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{notes.mode === "edit" ? "Edit" : "Add"} Notes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
              <Button colorScheme={notes.mode === "edit" ? "green" : "blue"} mr={3} onClick={handleSubmit}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Flex justifyContent="center" gap={6}>
          <Grid templateColumns="repeat(3, 1fr)" gap={20}>
            {data?.data?.map((items, id) => (
              <GridItem key={id}>
                <Card>
                  <CardHeader>
                    <Heading size="md">{items.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{items?.description}</Text>
                  </CardBody>
                  <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                      "& > button": {
                        minW: "136px",
                      },
                    }}
                    gap={4}
                  >
                    <Button
                      flex="1"
                      colorScheme="green"
                      onClick={() => {
                        setNotes({ ...items, mode: "edit" });
                        handleToggleForm();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      flex="1"
                      colorScheme="red"
                      onClick={() => handleDelete(items.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </div>
  );
}
