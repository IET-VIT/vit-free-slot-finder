import {
    Center,
    Box,
    Heading,
    VStack,
    useToast,
    Stack,
    HStack,
    Spacer
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "../components/Head"
import { useEffect, useState } from "react"
import CheckGroup from "../components/CheckGroup"
import SlotTable from "../components/SlotTable"
import formatContent from "../utils/formatContent"
import findFreeSlots from "vit-timetable-explorer"
import type Slots from "vit-timetable-explorer/dist/src/types/slots"
import ColorToggle from "../components/ColorToggle"

const Home: NextPage = () => {
    const toast = useToast()
    const [content, setContent] = useState<{ [key: string]: string }>({})
    const [slots, setSlots] = useState<Slots>({})
    const [checkedItems, setCheckedItems] = useState<boolean[]>([])

    useEffect(() => {
        setCheckedItems(Object.keys(content).map(() => false))
    }, [content])

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
        const names = Object.keys(content)
        names.sort()
        const value = []
        for (var i = 0; i < checkedItems.length; i++) {
            if (checkedItems[i]) value.push(names[i])
        }

        const data = value.map((v) => content[v])
        const freeSlots = findFreeSlots(data)
        setSlots(freeSlots)
    }, [checkedItems, content])

    return (
        <Center minH="100vh">
            <Head />
            <VStack w="100%" p={4} spacing={4}>
                <HStack justifyContent="center" alignItems="center" w="100%">
                    <Heading as="h1" size="lg" textAlign="start">
                        VIT Free Slot Finder
                    </Heading>
                    <Spacer />
                    <ColorToggle />
                </HStack>
                <Stack
                    direction={{ base: "column", lg: "row" }}
                    justifyContent="center"
                    w="100%"
                    spacing={8}
                    borderColor="gray"
                    borderWidth={1}
                    rounded="lg"
                    px={{ base: 4, md: 8 }}
                    py={4}>
                    <Box w={{ base: "100%", lg: "33%" }}>
                        <Heading as="h2" size="md" textAlign="center" mb={4}>
                            Members
                        </Heading>
                        <CheckGroup
                            names={Object.keys(content)}
                            checkedItems={checkedItems}
                            setCheckedItems={setCheckedItems}
                        />
                    </Box>
                    <Box w={{ base: "100%", lg: "67%" }}>
                        <Heading as="h2" size="md" textAlign="center" mb={4}>
                            Free Slots
                        </Heading>
                        <SlotTable slots={slots} />
                    </Box>
                </Stack>
            </VStack>
        </Center>
    )
}

export default Home
