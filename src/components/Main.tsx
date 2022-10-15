import { Box, Heading, VStack, useToast, Stack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import CheckGroup from "../components/CheckGroup"
import SlotTable from "../components/SlotTable"
import formatContent from "../utils/formatContent"
import findFreeSlots from "vit-timetable-explorer"
import type Slots from "vit-timetable-explorer/dist/src/types/slots"
import { useRouter } from "next/router"
import Navbar from "../components/Navbar"
import CTA from "../components/CTA"
import Error from "next/error"
import Timetable from "./Timetable"

const Main = () => {
    const router = useRouter()
    const { profile } = router.query

    const toast = useToast()
    const [content, setContent] = useState<{ [key: string]: string }>({})
    const [slots, setSlots] = useState<Slots>({})
    const [checkedItems, setCheckedItems] = useState<boolean[]>([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        setCheckedItems(Object.keys(content).map(() => false))
    }, [content])

    useEffect(() => {
        const data = localStorage.getItem(
            `slot-finder-profile-${profile ? profile : ""}`
        )
        setNotFound(data || data?.length === 0 ? false : true)

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
                localStorage.removeItem(
                    `slot-finder-profile-${profile ? profile : ""}`
                )
                router.reload()
            }
        } else if (data?.length === 0) {
            setContent(formatContent(data))
        }
    }, [profile])

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
            localStorage.removeItem(
                `slot-finder-profile-${profile ? profile : ""}`
            )
            router.reload()
        }
    }, [checkedItems, content])

    if (profile && notFound) return <Error statusCode={404} />

    return (
        <VStack w="100%" p={4} spacing={4}>
            <Navbar profile={profile?.toString()} />
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
                            profile={profile?.toString()}
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
            <Box w="100%" pt={4}>
                <Heading as="h2" size="md" textAlign="center" mb={4}>
                    Timetable View
                </Heading>
                <Timetable freeSlots={slots} />
            </Box>
        </VStack>
    )
}

export default Main
