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
                                document.write(content)

                                var hiddenElement = document.createElement("a")
                                hiddenElement.href =
                                    "data:text/csv;charset=utf-8," +
                                    encodeURI(content)
                                hiddenElement.target = "_blank"

                                hiddenElement.download = "updated.csv"
                                hiddenElement.click()
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
