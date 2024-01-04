import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Flex, Grid, Card, CardBody, CardFooter, CardHeader, GridItem, Heading, Text, Button, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useQueries } from "../../hooks/useQueries";
import { Spinner } from '@chakra-ui/react'
import fetcher from "../../utils/fetcher"
import useSWR from "swr";

const LayoutComponent = dynamic(() => import("@/Layout"));

export default function Notes() {
  const { data, isError, isLoading } = useSWR('http://localhost:3000/api/notes/', fetcher, {revalidateOnFocus: true})

  // const {data, isLoading, isError} = useQueries({prefixUrl : 'https://paace-f178cafcae7b.nevacloud.io/api/notes'})
  console.log('Data useQueries',data)
  console.log('isLoading',isLoading)
  console.log('isError',isError)
  const router = useRouter()

  const [notes, setNotes] = useState()

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
       `http://localhost:3000/api/notes/delete/${id}`,
       {
        method: "DELETE",
       }
      );
      const result = await response.json();
      if (result?.success) {
       router.reload()
      }
     } catch (error) {}
  }

  useEffect(()=>{
    async function fecthingData(){
      const res = await fetch('http://localhost:3000/api/notes/')
      const listNotes = await res.json()
      setNotes(listNotes)
    }
    fecthingData();
    
  }, [])

  console.log('notes =>', notes)

  // console.log('notes =>', notes)

  if (isLoading){
    return (
      <Flex alignItems="center" justifyContent="center" width="full" height="100vh">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Flex>
    )
  }


 return (
  <>
    <LayoutComponent metaTitle="Notes" metaDescription={"Ini adalah bagian Notes"}>
      <Box padding="5">
        <Flex justifyContent="end" onClick={() => router.push('/notes/add')}>
          <Button colorScheme="blue">Add Notes</Button>
        </Flex>
        <Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap={5}>
            {data?.data?.map((items,id) => (
              <GridItem key={id}>
                <Card>
                  <CardHeader>
                    <Heading size='md'>{items.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{items?.description}</Text>
                  </CardBody>
                  <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                      '& > button': {
                        minW: '136px',
                      },
                    }}
                  >
                    <Button flex='1' colorScheme="green" onClick={() => router.push(`/notes/edit/${items.id}`)}>
                      Edit
                    </Button>
                    <Button flex='1' colorScheme="red" onClick={() => handleDelete(items.id)} >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
    </LayoutComponent>
  </>
 );
}

// export async function getStaticProps() {
//   const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes')
//   const notes = await res.json()
//   return { props: { notes }, revalidate: 10 }
// }

