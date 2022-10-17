import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogProps
} from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import downloadCSV from "../utils/downloadCSV"

const ConfirmDialog = ({
    content,
    isOpen,
    leastDestructiveRef,
    onClose
}: { content: string } & AlertDialogProps) => {
    const router = useRouter()
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={leastDestructiveRef}
            onClose={onClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Do you wish to download the updated CSV file?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        {
                            <Button
                                //@ts-ignore
                                ref={leastDestructiveRef}
                                onClick={() => {
                                    onClose
                                }}>
                                Cancel
                            </Button>
                        }
                        <Button
                            colorScheme="blue"
                            onClick={() => {
                                downloadCSV(content)
                                onClose()
                            }}
                            ml={3}>
                            Download
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default ConfirmDialog
