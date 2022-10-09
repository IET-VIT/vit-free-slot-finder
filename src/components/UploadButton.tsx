import { AttachmentIcon } from "@chakra-ui/icons"
import { Box, Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState, useRef, FormEvent } from "react"

const UploadButton = () => {
    const router = useRouter()
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
            if (content) localStorage.setItem("data", content.toString())
            setLoading(false)
            router.reload()
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
