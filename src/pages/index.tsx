import {
    Center,
    useCheckboxGroup,
    Grid,
    GridItem,
    Heading,
    VStack,
    useToast
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "../components/Head"
import { useEffect, useState } from "react"
import CheckGroup from "../components/CheckGroup"
import SlotTable from "../components/SlotTable"
import formatContent from "../utils/formatContent"
import findFreeSlots from "vit-timetable-explorer"
import type Slots from "vit-timetable-explorer/dist/src/types/slots"

const Home: NextPage = () => {
    const toast = useToast()
    const [content, setContent] = useState<{ [key: string]: string }>({})
    const [slots, setSlots] = useState<Slots>({})
    const { value, getCheckboxProps } = useCheckboxGroup()

    useEffect(() => {
        const data = localStorage.getItem("data")

        if (data) {
            try {
                setContent(formatContent(data))
                toast({
                    title: "Success",
                    description:
                        "We've imported your timetable data successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                })
            } catch (err) {
                localStorage.removeItem("data")
            }
        }
    }, [])

    useEffect(() => {
        const data = value.map((v) => content[v])
        const freeSlots = findFreeSlots(data)
        setSlots(freeSlots)
    }, [value])

    return (
        <Center minH="100vh">
            <Head />
            <VStack w="100%" p={4}>
                <Heading as="h1" size="lg" textAlign="center" mb={4}>
                    VIT Free Slot Finder
                </Heading>
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        lg: "repeat(4, 1fr)"
                    }}
                    justifyContent="center"
                    w="100%"
                    gap={8}
                    borderColor="gray"
                    borderWidth={1}
                    rounded="lg"
                    px={8}
                    py={4}>
                    <GridItem colSpan={1}>
                        <Heading as="h2" size="md" textAlign="center" mb={4}>
                            Members
                        </Heading>
                        <CheckGroup
                            names={Object.keys(content)}
                            props={getCheckboxProps}
                        />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, lg: 3 }}>
                        <Heading as="h2" size="md" textAlign="center" mb={4}>
                            Free Slots
                        </Heading>
                        <SlotTable slots={slots} />
                    </GridItem>
                </Grid>
            </VStack>
        </Center>
    )
}

export default Home
