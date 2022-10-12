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

const AddProfile = ({
    isOpen,
    leastDestructiveRef,
    onClose
}: AlertDialogProps) => {
    const router = useRouter()
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    //@ts-ignore
    const handleInputChange = (e) => setInput(e.target.value)
    const [exists, setExists] = useState(false)
    const isError = input.trim().length > 15 || exists
    const prefix = "slot-finder-profile-"

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={leastDestructiveRef}
            onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Create a new Profile
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        <FormControl isInvalid={isError} isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="Just a random name maybe..."
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                            />
                            {!isError ? (
                                <FormHelperText>
                                    Enter a name for the new profile
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>
                                    {exists
                                        ? "Profile with the given name already exists"
                                        : "Name has to be less than or equal to 15 characters"}
                                </FormErrorMessage>
                            )}
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
                                const data = localStorage.getItem(
                                    `${prefix}${input.trim()}`
                                )
                                setExists(
                                    data || data?.length === 0 ? true : false
                                )

                                if (!(data || data?.length === 0)) {
                                    localStorage.setItem(
                                        `${prefix}${input.trim()}`,
                                        ""
                                    )
                                    setLoading(false)
                                    router.push(`/${input.trim()}`)
                                    onClose()
                                } else setLoading(false)
                            }}
                            ml={3}
                            isLoading={loading}
                            isDisabled={input.trim() === "" || isError}>
                            Create
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AddProfile
