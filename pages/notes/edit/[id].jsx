import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Flex, Grid, Card, CardBody, CardFooter, CardHeader, GridItem, Heading, Text, Button, Box, Textarea, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";



export default function Notes() {
  const router = useRouter()
  const {id} = router?.query

  const [notes, setNotes] = useState({
    title:"",
    description:"",
    }
  )

  const HandleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: notes?.title,
            description: notes?.description,
          }),
        }
      );
      const result = await response.json();
      console.log("Server Response:", result); // Log the server response
      if (result?.success) {
        router.push("/notes");
      } else {
        console.error("Update failed:", result?.error);
      }
    } catch (error) {
      console.error("Error during update:", error);
    }
  };
  

   useEffect(()=>{
     async function fecthingData(){
       const res = await fetch(`http://localhost:3000/api/notes/${id}`)
       const listNotes = await res.json()
       console.log(listNotes)
       setNotes(listNotes?.data)
     }
     fecthingData();
     
   }, [id])
 
//    console.log('id =>', id)


 return (
  <>

    <Card margin="5" padding="5">
    <Heading>Edit Notes</Heading>
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
      <Button onClick={() => HandleSubmit()} colorScheme="blue">
       Submit
      </Button>
     </GridItem>
    </Grid>
   </Card>


  </>
 );
}


