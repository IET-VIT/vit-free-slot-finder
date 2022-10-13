import { VStack, ButtonGroup, Button, Heading, Divider } from "@chakra-ui/react"
import UploadButton from "./UploadButton"
import { CloseIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"

const CTA = ({
    names,
    checkedItems,
    profile
}: {
    names: string[]
    checkedItems: boolean[]
    profile?: string
}) => {
    const router = useRouter()
    return (
        <VStack px={4}>
            <ButtonGroup
                variant="solid"
                alignSelf="center"
                size={{ base: "sm", sm: "md" }}
                colorScheme="blue">
                <UploadButton profile={profile}/>
                {names.length > 0 && (
                    <Button
                        alignSelf="center"
                        leftIcon={<CloseIcon />}
                        onClick={() => {
                            localStorage.removeItem(
                                profile ? profile : "default"
                            )
                            router.reload()
                        }}>
                        Clear
                    </Button>
                )}
            </ButtonGroup>
            {names.length > 0 && <Divider />}
            <Heading as="h6" alignSelf="center" size="xs">{`${
                names.length > 0
                    ? `${checkedItems.reduce(
                          (previousValue, currentValue) =>
                              currentValue ? previousValue + 1 : previousValue,
                          0
                      )} selected of `
                    : ``
            }${names.length} member(s)`}</Heading>
        </VStack>
    )
}

export default CTA
