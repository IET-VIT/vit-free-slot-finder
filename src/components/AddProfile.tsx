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
    //@ts-ignore
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input.trim().length > 15
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
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={input}
                                onChange={handleInputChange}
                            />
                            {!isError ? (
                                <FormHelperText>
                                    Enter a name for the new profile
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>
                                    Name has to be less than or equal to 15
                                    characters
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
                                localStorage.setItem(
                                    `${prefix}${input.trim().toLowerCase()}`,
                                    ""
                                )
                                router.push(`/${input.trim().toLowerCase()}`)
                            }}
                            ml={3}
                            isDisabled={input === "" || isError}>
                            Create
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default AddProfile
