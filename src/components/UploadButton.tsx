import { AttachmentIcon } from "@chakra-ui/icons"
import { Box, Button, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useRef, FormEvent } from "react"
import formatContent from "../utils/formatContent"
import findFreeSlots from "vit-timetable-explorer"

const UploadButton = ({ profile }: { profile?: string }) => {
    const router = useRouter()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    let fileRef = useRef<HTMLInputElement>()

    const readFile = (event: FormEvent<HTMLInputElement>) => {
        setLoading(true)
        const fileReader = new FileReader()
        //@ts-ignore
        const { files } = event.target

        fileReader.readAsText(files[0], "UTF-8")
        fileReader.onload = (e) => {
            const content = e.target!.result
            if (content) {
                const contentString = content.toString().replace(/\r\n/g, "\n")

                try {
                    const data = formatContent(contentString)
                    const timings = findFreeSlots(
                        Object.keys(data).map((k) => data[k])
                    )
                    localStorage.setItem(
                        profile ? profile : "default",
                        contentString
                    )
                    setLoading(false)
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
            }
        }
    }

    return (
        <Box alignSelf="center">
            <input
                //@ts-ignore
                ref={fileRef}
                type="file"
                accept=".txt"
                onChange={readFile}
                style={{ display: "none" }}></input>
            <Button
                type="submit"
                onClick={() => {
                    fileRef.current!.click()
                }}
                leftIcon={<AttachmentIcon />}
                isLoading={loading}>
                Upload TXT file
            </Button>
        </Box>
    )
}

export default UploadButton
