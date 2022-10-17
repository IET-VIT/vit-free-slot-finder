import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogProps
} from "@chakra-ui/react"
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel
} from "@chakra-ui/react"
import { Input, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

const AddMannual = ({
    isOpen,
    leastDestructiveRef,
    onClose
}: AlertDialogProps) => {
    const router = useRouter()
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
                            <Input
                                placeholder="Member Timetable"
                                type="text"
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

                                setLoading(false)
                                //router.push(`/${input.trim()}`)
                                onClose()
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
