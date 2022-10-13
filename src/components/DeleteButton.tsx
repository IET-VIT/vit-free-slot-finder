import { DeleteIcon } from "@chakra-ui/icons"
import { Tooltip } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { useRouter } from "next/router"

const DeleteButton = ({ profile }: { profile?: string }) => {
    const router = useRouter()
    return (
        <Tooltip label="Delete profile">
            <IconButton
                onClick={() => {
                    if (profile) {
                        localStorage.removeItem(
                            `slot-finder-profile-${profile}`
                        )
                        router.push("/")
                    }
                }}
                icon={<DeleteIcon />}
                fontSize="xl"
                aria-label="Delete profile"
                size="lg"
                variant="ghost"
            />
        </Tooltip>
    )
}

export default DeleteButton
