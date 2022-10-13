import { Box, Heading, VStack, useToast, Stack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "../components/Head"
import { useEffect, useState } from "react"
import CheckGroup from "../components/CheckGroup"
import SlotTable from "../components/SlotTable"
import formatContent from "../utils/formatContent"
import findFreeSlots from "vit-timetable-explorer"
import type Slots from "vit-timetable-explorer/dist/src/types/slots"
import { useRouter } from "next/router"
import Navbar from "../components/Navbar"
import CTA from "../components/CTA"

const Home: NextPage<{ profile?: string }> = ({ profile }) => {
    const router = useRouter()
    const toast = useToast()
    const [content, setContent] = useState<{ [key: string]: string }>({})
    const [slots, setSlots] = useState<Slots>({})
    const [checkedItems, setCheckedItems] = useState<boolean[]>([])

    useEffect(() => {
        setCheckedItems(Object.keys(content).map(() => false))
    }, [content])

    useEffect(() => {
        const data = localStorage.getItem(profile ? profile : "default")

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
                localStorage.removeItem(profile ? profile : "default")
                router.reload()
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

        try {
            const freeSlots = findFreeSlots(data)
            setSlots(freeSlots)
        } catch (err) {
            localStorage.removeItem(profile ? profile : "default")
            router.reload()
        }
    }, [checkedItems, content])

    return (
        <>
            <Head />
            <VStack w="100%" p={4} spacing={4}>
                <Navbar />
                <Stack
                    direction={{ base: "column", lg: "row" }}
                    justifyContent="center"
                    w="100%"
                    spacing={8}
                    borderColor="gray"
                    borderWidth={1}
                    rounded="lg"
                    p={{ base: 4, sm: 8 }}>
                    <Box w={{ base: "100%", lg: "33%" }}>
                        <Heading as="h2" size="md" textAlign="center" mb={4}>
                            Members
                        </Heading>
                        <VStack h={{ base: "inherit", lg: "80vh" }} spacing={4}>
                            <CTA
                                names={Object.keys(content)}
                                checkedItems={checkedItems}
                                profile={profile}
                            />
                            <CheckGroup
                                names={Object.keys(content)}
                                checkedItems={checkedItems}
                                setCheckedItems={setCheckedItems}
                            />
                        </VStack>
                    </Box>
                    <Box w={{ base: "100%", lg: "67%" }}>
                        <Heading as="h2" size="md" textAlign="center" mb={4}>
                            Free Slots
                        </Heading>
                        <SlotTable slots={slots} />
                    </Box>
                </Stack>
            </VStack>
        </>
    )
}

export default Home
