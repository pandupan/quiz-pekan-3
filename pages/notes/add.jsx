import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Flex, Grid, Card, CardBody, CardFooter, CardHeader, GridItem, Heading, Text, Button, Box, Textarea, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "../../hooks/useMutation";


export default function Notes() {
  const { mutate } = useMutation()
  const router = useRouter()

  const [notes, setNotes] = useState({
    title:"",
    description:"",
    }
  )

  console.log("notes =>", notes)

  const HandleSubmit = async () => {
    const response =await mutate({
      url : "http://localhost:3000/api/notes/add",
      method: "POST",
      payload : notes
    })
    console.log("response =>", response)
   };


 return (
  <>

    <Card margin="5" padding="5">
    <Heading>Add Notes</Heading>
     <Grid gap="5">
      <GridItem>
       <Text>Title</Text>
       <Input
        type="text"
        onChange={(event) =>
         setNotes({ ...notes, title: event.target.value })
        }
       />
     </GridItem>
     <GridItem>
      <Text>Description</Text>
       <Textarea
        onChange={(event) =>
         setNotes({ ...notes, description: event.target.value })
        }
      />
     </GridItem>
     <GridItem>
      <Button onClick={() => HandleSubmit()} colorScheme="blue">
       Submit
      </Button>
     </GridItem>
    </Grid>
   </Card>

  </>
 );
}


