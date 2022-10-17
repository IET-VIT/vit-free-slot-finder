import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogProps,
    Textarea
} from "@chakra-ui/react"
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react"
import { Input, Button, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import findFreeSlots from "vit-timetable-explorer"
import formatContent from "../utils/formatContent"

const AddMannual = ({
    profile,
    isOpen,
    leastDestructiveRef,
    onClose
}: { profile?: string } & AlertDialogProps) => {
    const router = useRouter()
    const toast = useToast()
    const [name, setName] = useState("")
    const [timetable, setTimetable] = useState("")
    const [loading, setLoading] = useState(false)

    //@ts-ignore
    const handleNameChange = (e) => setName(e.target.value)
    //@ts-ignore
    const handleTimetableChange = (e) => setTimetable(e.target.value)

    const prefix = "slot-finder-profile-"

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={leastDestructiveRef}
            onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Add a mannual entry
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="Member name"
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <FormHelperText>
                                Enter a name for the new member
                            </FormHelperText>
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Timetable</FormLabel>
                            <Textarea
                                placeholder="Member Timetable"
                                value={timetable}
                                onChange={handleTimetableChange}
                            />
                            <FormHelperText>
                                Copy paste the timetable as on VTOP
                            </FormHelperText>
                        </FormControl>
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        {
                            //@ts-ignore
                            <Button ref={leastDestructiveRef} onClick={onClose}>
                                Cancel
                            </Button>
                        }
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                setLoading(true)
                                const contentString = `\r${name.trim()},\"${timetable.trim()}\"`
                                try {
                                    const data = formatContent(
                                        "name,timetable" + contentString
                                    )
                                    const timings = findFreeSlots(
                                        Object.keys(data).map((k) => data[k])
                                    )

                                    const existing = localStorage.getItem(
                                        `${prefix}${profile ? profile : ""}`
                                    )

                                    localStorage.setItem(
                                        `${prefix}${profile ? profile : ""}`,
                                        existing
                                            ? existing.trim() + contentString
                                            : "name,timetable" + contentString
                                    )
                                    setLoading(false)
                                    onClose()
                                    router.reload()
                                } catch (err) {
                                    setLoading(false)
                                    toast({
                                        title: "Invalid formatting",
                                        description:
                                            "We were unable to import your timetable data",
                                        status: "error",
                                        duration: 5000,
                                        isClosable: true
                                    })
                                }
                            }}
                            ml={3}
                            isLoading={loading}
                            isDisabled={
                                name.trim() === "" || timetable.trim() === ""
                            }>
                            Create
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AddMannual
